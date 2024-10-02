import { Request, Response } from "express";
import UserModel from "../database/models/userModel";
import BlogModel from "../database/models/blogModel";
import CommentModel from "../database/models/commentModel";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export default class commentLikeController {

static createComment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { comment } = req.body;
    const { blogId } = req.params;
    const userId = req.user?._id;
     if (!comment) {
      return res.status(400).json({
        message: "Comment is required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        message: "user not found",
      });
    }

    const existingBlog = await BlogModel.findById(blogId);

    if (!existingBlog) {
      return res.status(404).json({
        message: "Blog not found",
        data: null,
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    const newComment = await CommentModel.create({
      user: user._id,
      username: user.username,
      blog: blogId,
      comment: comment,
    });

    await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $push: {
            commentedBy: user._id,
            comments: newComment._id, 
        },
      },
    );

    return res.status(201).json({
      message: "Comment created successfully",
      data: {
        blogId: blogId,
        userId: user._id,
        username: user.username,
        comId: newComment._id,
        comment: newComment.comment,
      },
    });
  } catch (error:any) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      error: error.message,
    });
  }
    };
   
  
 static likingBlogById = async (req: AuthenticatedRequest, res: Response) => {
  try {
      const blogId = req.params.blogId;
      const userId = req.user?._id;

      if (!userId) {  
        return res.status(401).json({
          message: "User information not found in the token",
        });
      }

      const blog = await BlogModel.findById(blogId);

      if (blog) {
        const likedIndex = blog.likedBy.indexOf(userId);
        if (likedIndex !== -1) {
          blog.likes -= 1;
          blog.likedBy.splice(likedIndex, 1);
        } else {
          blog.likes += 1;
          blog.likedBy.push(userId);
        }

        await blog.save();

        return res.status(200).json({
          message: "Blog like updated successfully",
          data: blog,
        });
      } else {
        return res.status(404).json({
          message: "Blog not found",
          data: null,
        });
      }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      theErrorIs: error,
    });
  }
};


static findCommentsOnBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;

    const blog = await BlogModel.findById(blogId).populate({
      path: 'comments',
      model: 'Comment',
      select: 'user username comment likedBy'
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        data: null,
      });
    }    

    return res.status(200).json({
      message: "Comments on the blog retrieved successfully",
      data: {
        _id: blog._id,
        image: blog.media,
        title: blog.title,
        description: blog.description,
        comments: blog.comments,
        likedBy: blog.likedBy,
        likes: blog.likes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      theErrorIs: error,
    });
  }
};

    
static  deleteCommentsOnBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;

    const existingBlog = await BlogModel.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({
        message: "Blog not found",
        data: null,
      });
    }

    await CommentModel.deleteMany({ blog: blogId });

    return res.status(200).json({
      message: "Comments on the blog deleted successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      theErrorIs: error,
    });
  }
};

}
