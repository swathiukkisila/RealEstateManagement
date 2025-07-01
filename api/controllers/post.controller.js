import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import axios from "axios";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: query.bedroom ? parseInt(query.bedroom) : undefined,
        price: {
          gte: query.minPrice ? parseInt(query.minPrice) : undefined,
          lte: query.maxPrice ? parseInt(query.maxPrice) : undefined,
        },
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });

        return res.status(200).json({ ...post, isSaved: saved ? true : false });
      } catch (err) {
        console.error("JWT verification failed:", err);
      }
    }

    return res.status(200).json({ ...post, isSaved: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    // ✅ Step 1: Just create the post (ML logic removed)
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// PUT /api/posts/:id
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  const { postData, postDetail } = req.body;

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.userId !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...postData,
        postDetail: {
          upsert: {
            update: postDetail,
            create: {
              ...postDetail,
            },
          },
        },
      },
      include: {
        postDetail: true,
      },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update post" });
  }
};


// DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId; // Assuming you're verifying user from auth middleware

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId !== userId)
      return res.status(403).json({ message: "Unauthorized" });

      await prisma.savedPost.deleteMany({
        where: { postId: postId },
      });
      
      // Now delete the actual post
      await prisma.post.delete({
        where: { id: postId },
      });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
