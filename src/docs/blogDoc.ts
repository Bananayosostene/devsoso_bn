/**
 * @swagger
 * /blog/post:
 *   post:
 *     summary: Create a new blog post
 *     description: Upload an image or video and create a blog post with title and description.
 *     tags:
 *       - Blog
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Image or video file to be uploaded.
 *               mediaType:
 *                 type: string
 *                 enum: [image, video]
 *                 description: Type of media being uploaded.
 *               title:
 *                 type: string
 *                 description: Title of the blog post.
 *                 example: My First Blog
 *               description:
 *                 type: string
 *                 description: Blog post description.
 *                 example: This is a description of the blog post.
 *     responses:
 *       '201':
 *         description: Blog post created successfully.
 *       '400':
 *         description: Media file is required or invalid media type.
 *       '500':
 *         description: Internal server error.
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /blog/get/{blogId}:
 *   get:
 *     summary: Get a blog post by ID
 *     description: Retrieve a specific blog post by its ID, along with comments and likes details.
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to retrieve.
 *     responses:
 *       '200':
 *         description: Blog post found.
 *       '404':
 *         description: Blog post not found.
 *       '500':
 *         description: Internal server error.
 */


/**
 * @swagger
 * /blog/gets:
 *   get:
 *     summary: Get all blog posts
 *     description: Retrieve all blog posts along with their comments, likes, and related details.
 *     tags:
 *       - Blog
 *     responses:
 *       '200':
 *         description: Successfully retrieved all blog posts.
 *       '404':
 *         description: No blog posts found.
 *       '500':
 *         description: Internal server error.
 */


/**
 * @swagger
 * /blog/update/{blogId}:
 *   patch:
 *     summary: Update a blog post by ID
 *     description: Upload a new image or video and update the title and description of a blog post.
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: New image or video to upload.
 *               mediaType:
 *                 type: string
 *                 enum: [image, video]
 *                 description: Type of media being uploaded.
 *               title:
 *                 type: string
 *                 description: Updated title of the blog post.
 *                 example: Updated Blog Title
 *               description:
 *                 type: string
 *                 description: Updated description of the blog post.
 *                 example: Updated description of the blog post.
 *     responses:
 *       '200':
 *         description: Blog post updated successfully.
 *       '400':
 *         description: Invalid media type.
 *       '404':
 *         description: Blog post not found.
 *       '500':
 *         description: Internal server error.
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /blog/delete/{blogId}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     description: Delete a specific blog post by its ID.
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to delete.
 *     responses:
 *       '200':
 *         description: Blog post deleted successfully.
 *       '404':
 *         description: Blog post not found.
 *       '500':
 *         description: Internal server error.
 */



/**
 * @swagger
 * /blog/updateWatchTime/{blogId}:
 *   patch:
 *     summary: Update watch time for a video blog post
 *     description: Update the watch time for a specific video blog post.
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to update watch time.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               watchTime:
 *                 type: number
 *                 description: Updated watch time in seconds.
 *                 example: 120
 *     responses:
 *       '200':
 *         description: Watch time updated successfully.
 *       '404':
 *         description: Blog post not found.
 *       '500':
 *         description: Internal server error.
 *     security:
 *       - bearerAuth: []
 */
