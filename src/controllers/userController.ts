import { Request, Response } from "express";
import UserModel, { UserDocument } from "../database/models/userModel";
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../config";
import { getUserByIdHelper } from "../services/userService";
import { hashPassword } from "../utils/password";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
export default class UserController {

  static createUser = async (req: Request, res: Response) => {
  try {
    // Destructure email from request body
    const { email, password, ...otherDetails } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
        data: null,
      });
    }

    // Hash the user's password
    const hashedPass = await hashPassword(password);

    // Create new user object
    const user = { ...otherDetails,  email, password: hashedPass };

    // Save the new user in the database
    const newUser = await UserModel.create(user);

    if (newUser) {
      return res.status(201).json({
        message: "Signup successful",
        // data: newUser,
      });
    } else {
      return res.status(500).json({
        message: "Failed to signup",
        data: null,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


/**
 * Controller function to get user by ID and send a response.
 * @param req Request
 * @param res Response
 */
static  getUserById = async (req: Request, res: Response) => {
  const id: string = req.params.userId;
  const user = await getUserByIdHelper(id); // Reuse helper function

  if (user) {
    return res.status(200).json({
      message: "User found",
      data: user,
    });
  } else {
    return res.status(404).json({
      message: "User not found",
      data: null,
    });
  }
};



static findAllUsers = async (req: Request, res: Response) => {
    const arrayOfUsers = await UserModel.find().select("-password");

    if (arrayOfUsers.length > 0) {
      // Users found
      return res.status(200).json({
        message: "Users found",
        data: arrayOfUsers,
      });
    } else {
      return res.status(404).json({
        message: "No users found",
        data: null,
      });
    }
};



static deleteUserById = async (req: Request, res: Response) => {
    const id: string = req.params.userId;

    const user = await UserModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (deletedUser) {
      return res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      return res.status(500).json({
        message: "Failed to delete user",
      });
    }
  };
  static updateUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
      const user = req.user;
      if (!user || !user._id) {
        return res.status(401).json({ message: "Unauthorized: No user found" });
      }

      const { username } = req.body;
      const updateFields: Partial<UserDocument> = {};

      if (username) {
        updateFields.username = username;
      }

      const profileImageFile = (req.files as any)?.profileImage?.[0];
      if (profileImageFile) {
        const result = await cloudinary.uploader.upload(profileImageFile.path);
        if (result.secure_url) {
          updateFields.profileImage = result.secure_url;
        } else {
          return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
        }
      }

      const updatedUser = await UserModel.findByIdAndUpdate(user._id, updateFields, { new: true });
      if (updatedUser) {
        return res.status(200).json({
          message: "User updated successfully",
          data: {
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            profileImage: updatedUser.profileImage,
          },
        });
      } else {
        return res.status(500).json({ message: "Failed to update user" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

  static showProfile = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
      const user = req.user;
      if (!user || !user._id) {
        return res.status(401).json({ message: "Unauthorized: No user found" });
      }
      const profile = await UserModel.findById(user._id).select("-password");
      if (profile) {
        return res.status(200).json({
          message: "Profile found",
          data: profile,
        });
      } else {
        return res.status(404).json({ message: "Profile not found" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
}