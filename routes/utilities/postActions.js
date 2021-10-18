const { PrismaClient } = require("@prisma/client");
const { checkUserIdExistence, checkPostExistence } = require("./utils");
const { posts } = new PrismaClient();

const getAllPosts = async (req, res) => {
  const allPosts = await posts.findMany({
    select: {
      id: true,
      title: true,
      post: true,
      created_at: true,
      updated_at: true,
      user_id: true,
    },
  });
  return res.status(200).json(allPosts);
};

const getUserPosts = async (req, res) => {
  const userId = +req.params.id;
  const userExists = await checkUserIdExistence(userId, res);

  if (!userExists) {
    return res.status(404).json({
      msg: "User Not Found",
    });
  }

  const userPosts = await posts.findMany({
    select: {
      id: true,
      title: true,
      post: true,
      created_at: true,
      updated_at: true,
    },
    where: {
      user_id: userId,
    },
  });
  return res.status(200).json(userPosts);
};

const getPost = async (req, res) => {
  const postId = +req.params.id;
  const post = await checkPostExistence(postId);

  if (!post) {
    return res.status(404).json({
      msg: "Post Not Found",
    });
  }

  return res.status(200).json(post);
};

const createPost = async (req, res) => {
  const userId = +req.params.id;
  const userExists = await checkUserIdExistence(userId, res);

  if (!userExists) {
    return res.status(404).json({
      msg: "User Not Found",
    });
  }

  const { title, post } = req.body;

  const newPost = await posts.create({
    data: {
      title,
      post,
      user_id: userId,
    },
    select: {
      id: true,
      user_id: true,
    },
  });

  return res.status(201).json({
    msg: `${userExists.username} posted a new post ${newPost.id}`,
  });
};

const updatePost = async (req, res) => {
  const postId = +req.params.id;
  const postExists = await checkPostExistence(postId);

  if (!postExists) {
    return res.status(404).json({
      msg: "Post Not Found",
    });
  }
  const { title, post } = postExists;
  const { title: newTitlt, post: newPost } = req.body;

  const updatedPost = await posts.update({
    where: {
      id: postId,
    },
    data: {
      title: newTitlt || title,
      post: newPost || post,
    },
  });

  return res.status(205).json(updatedPost);
};

const deletePost = async (req, res) => {
  const id = +req.params.id;
  const postExists = await checkPostExistence(id);

  if (!postExists) {
    return res.status(404).json({
      msg: "Post Not Found",
    });
  }

  const deletedPost = await posts.delete({
    where: {
      id,
    },
  });

  res.status(200).json({
    msg: `Post ${deletedPost.id} deleted!`,
  });
};

const deleteUserPosts = async (req, res) => {};

module.exports = {
  getAllPosts,
  getUserPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  deleteUserPosts,
};
