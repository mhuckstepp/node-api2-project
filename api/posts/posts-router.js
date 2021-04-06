// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then((post) => {
      if (!post) {
        res.status(404).json("Post not found");
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(500).json("please include a title and contents");
  } else {
    Posts.insert(post)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "The posts information could not be retrieved" });
      });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newPost = req.body;
  if (!newPost.title || !newPost.contents) {
    res.status(500).json("please include a title and contents");
  } else {
    Posts.update(id, newPost)
      .then((post) => {
        if (!post) {
          res.status(404).json("Post not found");
        } else {
          res.status(200).json(newPost);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "The posts information could not be retrieved" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Posts.remove(id)
    .then((post) => {
      if (!post) {
        res.status(404).json("Post not found");
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  Posts.findPostComments(id)
    .then((comments) => {
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res.status(404).json("No comments");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

module.exports = router;
