
import { Request, Response } from "express";
import BlogModel from "../database/models/blogModel";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../config";
dotenv.config();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default class blogController {
static createBlog = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    // Debugging log for req.files
    // console.log("req.files:", req.files);  

    // Validate if the image file is provided
    if (!req.files || !(req.files as any).image) {
      return res.status(400).json({
        message: "Image file is required",
        data: null,
      });
    }

    // Validate if the image is an array and has at least one item
    const imageFiles = (req.files as any).image;
    if (!Array.isArray(imageFiles) || imageFiles.length === 0) {
      return res.status(400).json({
        message: "No image file provided",
        data: null,
      });
    }

    // Process the first image file
    const imageFile = imageFiles[0];

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.path);

    // Create a new blog post in the database
    const newBlog = await BlogModel.create({
      image: result.secure_url,
      title,
      description,
      comments: [],
      likes: 0,
    });

    // Return success response
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

    // Check if req.files and req.files.image exist
    const imageFile = (req.files as any)?.image?.[0] as any;
    if (!imageFile) {
      return res.status(400).json({
        message: "Image file is required jhgk",
        data: null,
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.path);
    if (!result || !result.secure_url) {
      return res.status(500).json({
        message: "Failed to upload image to Cloudinary",
        data: null,
      });
    }

    const { title, description } = req.body;
    const updateFields = { title, description, image: result.secure_url };

    // Update the blog post
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
}