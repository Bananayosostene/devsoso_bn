/**
 * @swagger
 * /blog/update/{blogId}:
 *   patch:
 *     summary: Update a blog post by ID
 *     description: Upload a new image and update the title and description of a blog post.
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
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: New image to upload.
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
 *         description: Image file is required.
 *       '404':
 *         description: Blog post not found.
 *       '500':
 *         description: Internal server error.
 */
