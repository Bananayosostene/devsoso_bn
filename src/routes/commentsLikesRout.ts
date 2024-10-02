import express, { Router } from "express";
import { checkPermission, isAuthenticated } from "../middlewares/authMiddleware";
import commentLikeController from "../controllers/commentLikeController";

const comments: Router = express.Router();


comments.get(
    "/:blogId/findCommentsOnBlog",
    commentLikeController.findCommentsOnBlog
);
comments.post(
    "/:blogId/like",
    isAuthenticated,
    commentLikeController.likingBlogById as express.RequestHandler

);
comments.post(
    "/:blogId/createCom",
    isAuthenticated,
    commentLikeController.createComment as express.RequestHandler
);

comments.delete(
    "/:blogId/deleteComments",
    isAuthenticated,
    checkPermission,
    commentLikeController.deleteCommentsOnBlog
);

export default comments;