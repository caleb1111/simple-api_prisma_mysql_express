const { PrismaClient } = require("@prisma/client");

const { users, posts } = new PrismaClient();

const checkUsernameExistence = async (username) => {
  const usernameExists = await users.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
    },
  });
  if (!usernameExists) {
    return undefined;
  }
  return usernameExists;
};

const checkEmailExistence = async (email) => {
  const emailExists = await users.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });
  if (!emailExists) {
    return undefined;
  }
  return emailExists;
};

const checkUserIdExistence = async (userId, res) => {
  const userExists = await users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      age: true,
      address: true,
      post: true,
    },
  });
  if (!userExists) {
    return undefined;
  }
  return userExists;
};

const checkPostExistence = async (postId) => {
  const postExists = await posts.findUnique({
    select: {
      title: true,
      post: true,
      created_at: true,
      updated_at: true,
      user_id: true,
    },
    where: {
      id: postId,
    },
  });

  if (!postExists) {
    return undefined;
  }
  return postExists;
};

module.exports = {
  checkUsernameExistence,
  checkEmailExistence,
  checkUserIdExistence,
  checkPostExistence,
};
