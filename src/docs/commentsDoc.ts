/**
 * @swagger
 * /comments/{blogId}/createCom:
 *   post:
 *     summary: Create a new comment on a blog post
 *     description: Creates a new comment on a specific blog post.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The content of the comment
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     blogId:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     username:
 *                       type: string
 *                     comId:
 *                       type: string
 *                     comment:
 *                       type: string
 *       '400':
 *         description: Comment is required
 *       '401':
 *         description: User not found or unauthorized
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /comments/{blogId}/like:
 *   post:
 *     summary: Like or unlike a blog post
 *     description: Toggles the like status of a blog post for the authenticated user.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to like/unlike
 *     responses:
 *       '200':
 *         description: Blog like updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Blog'
 *       '401':
 *         description: User information not found in the token
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /comments/{blogId}/findCommentsOnBlog:
 *   get:
 *     summary: Get all comments on a blog post
 *     description: Retrieves all comments associated with a specific blog post.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to get comments for
 *     responses:
 *       '200':
 *         description: Comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       '500':
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /comments/{blogId}/deleteComments:
 *   delete:
 *     summary: Delete all comments on a blog post
 *     description: Deletes all comments associated with a specific blog post.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to delete comments from
 *     responses:
 *       '200':
 *         description: Comments deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         user:
 *           type: string
 *           description: The ID of the user who made the comment
 *         username:
 *           type: string
 *           description: The username of the user who made the comment
 *         blog:
 *           type: string
 *           description: The ID of the blog post the comment is on
 *         comment:
 *           type: string
 *           description: The content of the comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the comment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the comment was last updated
 *     
 *     Blog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the blog post
 *         title:
 *           type: string
 *           description: The title of the blog post
 *         description:
 *           type: string
 *           description: The content of the blog post
 *         likes:
 *           type: number
 *           description: The number of likes on the blog post
 *         likedBy:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who liked the post
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of comment IDs on the post
 *         commentedBy:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who commented on the post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the blog post was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the blog post was last updated
 */