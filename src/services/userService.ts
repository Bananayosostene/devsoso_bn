import UserModel from '../database/models/userModel';

/**
 * Get user by ID without sending a response. This is for reuse.
 * @param id string
 */
export const getUserByIdHelper = async (id: string) => {
  try {
    const user = await UserModel.findById(id).select("-password");
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};