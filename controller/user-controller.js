const User = require("../models/user-model");
const { AppError } = require("../utils/app-error");
const { catchAsync } = require("../utils/catch-async");
const { ApiFeatures } = require("../utils/api-features");

const getAllUsers = catchAsync(async (req, res) => {
  const features = new ApiFeatures(User.find(), req.query, ["password"])
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const [users, total] = await Promise.all([
    features.query,

    User.countDocuments(features.filterObject),
  ]);

  res.status(200).json({
    status: "success",

    page: features.page,

    perPage: features.limit,

    total,

    totalPages: Math.ceil(total / features.limit),

    results: users.length,

    data: {
      users,
    },
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new AppError(404, `user (id: ${req.params.userId}) not found`));
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const addUser = catchAsync(async (req, res) => {
  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || "user",
  });

  res.status(201).json({
    status: "success",
    data: { user },
  });
});

const editUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new AppError(404, `user (id: ${req.params.userId}) not found`));
  }

  const allowedFields = ["firstname", "lastname", "phonenumber", "email", "role"];

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  }

  if (req.body.accountStatus) {
    const { status, reason } = req.body.accountStatus;

    if (status === "active") {
      user.accountStatus = {
        status: "active",
        reason: null,
        at: null,
        by: null,
      };
    } else {
      user.accountStatus = {
        status,
        reason,
        at: new Date(),
        by: req.user._id,
      };
    }
  }

  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const deleteUserById = catchAsync(async (req, res, next) => {
  if (req.user._id.toString() === req.params.userId) {
    return next(
      new AppError(400, "admin cannot deactivate own account from users route"),
    );
  }

  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new AppError(404, `user (id: ${req.params.userId}) not found`));
  }

  user.accountStatus = {
    status: "deactivated",
    reason: "admin_deactivated",
    at: new Date(),
    by: req.user._id,
  };

  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: "success",
    message: "user account has been deactivated",
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  editUserById,
  deleteUserById,
};
