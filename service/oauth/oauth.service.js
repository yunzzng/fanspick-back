const User = require("../../schemas/oauth/oauth.schema");

const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

const updateUserById = async (id, updatedData) => {
  return await User.findByIdAndUpdate(id, updatedData, { new: true });
};

const findUserByProviderAndId = async (provider, providerId) => {
  return await User.findOne({ provider, providerId });
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUserById,
  findUserByProviderAndId,
};
