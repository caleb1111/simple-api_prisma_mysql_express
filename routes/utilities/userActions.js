const { PrismaClient } = require("@prisma/client");
const {
  checkUsernameExistence,
  checkEmailExistence,
  checkUserIdExistence,
} = require("./utils");
const { users } = new PrismaClient();

const getAllUsers = async (req, res) => {
  const allUsers = await users.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      age: true,
      address: true,
      post: true,
    },
  });

  res.status(200).json(allUsers);
};

const getUserById = async (req, res) => {
  const id = +req.params.id;
  const userExists = await checkUserIdExistence(id);
  if (!userExists) {
    return res.status(404).json({
      msg: "User Not Found",
    });
  }

  res.status(200).json(userExists);
};

const createNewUser = async (req, res) => {
  const { username, email, age, address } = req.body;

  const usernameExist = await checkUsernameExistence(username);
  if (usernameExist) {
    return res.status(400).json({
      msg: "Username already exists",
    });
  }

  const newUser = await users.create({
    data: {
      username,
      email,
      age,
      address,
    },
  });

  res.status(201).json({
    msg: `New user ${newUser.username} created!`,
  });
};

const updateUserInfo = async (req, res) => {
  const id = +req.params.id;
  const {
    username: newUsername,
    email: newEmail,
    age: newAge,
    address: newAddress,
  } = req.body;
  const userExists = await checkUserIdExistence(id);

  if (!userExists) {
    return res.status(404).json({
      msg: "User Not Found",
    });
  }

  const { username, email, age, address } = userExists;

  if (newUsername) {
    const usernameExist = await checkUsernameExistence(newUsername);
    if (usernameExist) {
      return res.status(400).json({
        msg: `Username already exist!`,
      });
    }
  }

  if (newEmail) {
    const emailExist = await checkEmailExistence(newEmail);
    if (emailExist) {
      return res.status(400).json({
        msg: `Email already exist!`,
      });
    }
  }

  const updatedUser = await users.update({
    where: {
      id,
    },
    data: {
      username: newUsername || username,
      email: newEmail || email,
      age: newAge || age,
      address: newAddress || address,
    },
  });

  res.status(206).json({
    msg: `User ${updatedUser.username} updated!`,
  });
};

const deleteUser = async (req, res) => {
  const id = +req.params.id;
  const userExists = await checkUserIdExistence(id);

  if (!userExists) {
    return res.status(404).json({
      msg: "User Not Found",
    });
  }

  if (userExists.post.length > 0) {
    return res.status(400).json({
      msg: `User with posts can not be deleted!
      Please delete user's posts first!`,
    });
  }

  const deleteUser = await users.delete({
    where: {
      id,
    },
  });

  res.status(200).json({
    msg: `User ${deleteUser.username} deleted!`,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserInfo,
  deleteUser,
};
