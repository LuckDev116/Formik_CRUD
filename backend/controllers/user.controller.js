const { User } = require("../models");

async function getAllUsers(search) {
  let options = {};

  if (search) {
    options = {
      ...options,
      $or: [
        { email: new RegExp(search, 'i') },
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
      ]
    }
  }

  try {
    const users = await User.find(options);
    return { success: true, users };
  } catch (err) {
    return { success: false, code: 500, message: err.message };
  }
}

async function getUserById(id) {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return { success: false, code: 404, message: 'User doesn\'t exist' }
    }
    return { success: true, user }
  } catch (err) {
    return { success: false, code: 404, message: 'User doesn\'t exist' }
  }
}

async function createUser(user) {
  try {
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      return { success: false, code: 400, message: 'Email already exist' }
    }
  } catch (err) {
    return { success: false, code: 500, message: err.message }
  }

  if ( !user.email || !user.firstName || !user.lastName ) {
    return { success: false, code: 422, message: 'All fields are required' }
  }

  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();

    return {
      success: true,
      user: savedUser,
      message: "User is created successfully"
    }
  } catch (err) {
    return { success: false, code: 500, message: err.message }
  }
}

async function updateUser(id, email = '', firstName = '', lastName = '') {
  let user;
  try {
    user = await User.findById(id);

    if (!user) {
      return { success: false, code: 404, message: 'User doesn\'t exist' };
    }

    const existingUser = await User.findOne({ email });

    if (existingUser && email !== user.email) {
      return { success: false, code: 409, message: 'Email is already exist' }
    }

    if (email) {
      user.email = email
    }
    if (firstName) {
      user.firstName = firstName
    }
    if (lastName) {
      user.lastName = lastName
    }

    const updatedUser = await user.save()
    return {
      success: true,
      data: updatedUser,
      message: "User is updated successfully"
    };
  } catch (err) {
    return { success: false, code: 500, message: err.message };
  }
}

async function deleteUser(id) {
  let user;
  try {
    user = await User.findById(id);

    if (!user) {
      return { success: false, code: 404, message: 'User doesn\'t exist' };
    }

    await user.remove();

    return {
      success: true,
      message: 'User is deleted'
    };
  } catch (err) {
    return { success: false, code: 500, message: err.message };
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
