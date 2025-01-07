const User = require('../../schemas/oauth/oauth.schema');

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

  
module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};