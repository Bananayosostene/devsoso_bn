import express, { Router } from "express";
import { checkPermission, isAuthenticated } from "../middlewares/authMiddleware";
import { uploaded } from "../utils/multer";
import blogController from "../controllers/blogController";

const blogRouter: Router = express.Router();

blogRouter.get(
    "/get/:blogId",
    blogController.findBlogById
);
blogRouter.get(
    "/gets",
    blogController.findAllBlogs
);
blogRouter.post(
    "/post",
    uploaded,
    isAuthenticated,
    checkPermission,
    blogController.createBlog);
blogRouter.delete(
    "/delete/:blogId",
    blogController.deleteBlogById);
blogRouter.patch(
    "/update/:blogId",
    uploaded,
    blogController.updateBlogById
);

export default blogRouter;