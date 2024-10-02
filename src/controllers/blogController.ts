
import { Request, Response } from "express";
import BlogModel from "../database/models/blogModel";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../config";
import UserModel from "../database/models/userModel";
import { sendEmail } from "../services/emailService";
import { newBlogNotificationTemplate } from "../templates/blogTemplate";
dotenv.config();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default class blogController {
    static createBlog = async (req: Request, res: Response) => {
    try {
      const { title, description, mediaType } = req.body;

      if (!req.files || !(req.files as any).media) {
        return res.status(400).json({
          message: "Media file is required",
          data: null,
        });
      }

      const mediaFile = (req.files as any).media[0];

      
      const result = await cloudinary.uploader.upload(mediaFile.path, {
        resource_type: mediaType === 'video' ? 'video' : 'image'
      });

      const newBlog = await BlogModel.create({
        media: {
          type: mediaType,
          url: result.secure_url
        },
        title,
        description,
        comments: [],
        likes: 0,
      });

      const MyUsers = await UserModel.find({ role: "user" });
      for (const user of MyUsers) {
        await sendEmail(
          user.email,
          "New Blog Post",
          newBlogNotificationTemplate(newBlog.title));
       }

      return res.status(201).json({
        message: "Blog post created successfully",
        data: newBlog,
      });

    } catch (error: any) {
      console.error("Error creating blog post:", error);  
      return res.status(500).json({
        message: "Internal Server Error",
        data: null,
        theErrorIs: error.message || error.toString(),  
      });
    }
  };
    
  static findAllBlogs = async (req: Request, res: Response) => {
  try {
    const arrayOfBlogs = await BlogModel.find()
      .populate("comments", "comment")
      .populate("commentedBy", "username")
      .populate("likedBy", "username");

    if (arrayOfBlogs.length > 0) {
      return res.status(200).json({
        message: "Blog posts found",
        data: arrayOfBlogs,
      });
    } else {
      return res.status(404).json({
        message: "No blog posts found",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
    });
  }
};

 static findBlogById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.blogId;
    const blog = await BlogModel.findById(id)
      .populate("comments")
      .populate("commentedBy", "username")
      .populate("likedBy", "username");

    if (blog) {
      return res.status(200).json({
        message: "Blog post found",
        data: blog,
      });
    } else {
      return res.status(404).json({
        message: "Blog post not found",
        data: null,
      });
    }
  } catch (error:any) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      error:error.message
    });
  }
    };
    
    static updateBlogById = async (req: Request, res: Response) => {
    const id: string = req.params.blogId;
    
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog post not found",
        data: null,
      });
    }

    const { title, description, mediaType } = req.body;
    let mediaUpdate = {};

    if (req.files && (req.files as any).media) {
      const mediaFile = (req.files as any).media[0];
      const result = await cloudinary.uploader.upload(mediaFile.path, {
        resource_type: mediaType === 'video' ? 'video' : 'image'
      });
      mediaUpdate = {
        media: {
          type: mediaType,
          url: result.secure_url
        }
      };
    }

    const updateFields = { title, description, ...mediaUpdate };

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (updatedBlog) {
      return res.status(200).json({
        message: "Blog post updated successfully",
        data: updatedBlog,
      });
    } else {
      return res.status(500).json({
        message: "Failed to update blog post",
        data: null,
      });
    }
  };

  static deleteBlogById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.blogId;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog post not found",
        data: null,
      });
    }

    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (deletedBlog) {
      return res.status(200).json({
        message: "Blog post deleted successfully",
        data: deletedBlog,
      });
    } else {
      return res.status(500).json({
        message: "Failed to delete blog post",
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
static updateWatchTime = async (req: Request, res: Response) => {
    try {
      const { blogId } = req.params;
      const { watchTime } = req.body;

      const updatedBlog = await BlogModel.findByIdAndUpdate(
        blogId,
        { watchTime },
        { new: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({
          message: "Blog post not found",
          data: null,
        });
      }

      return res.status(200).json({
        message: "Watch time updated successfully",
        data: updatedBlog,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Internal Server Error",
        data: null,
        error: error.message,
      });
    }
  };
}