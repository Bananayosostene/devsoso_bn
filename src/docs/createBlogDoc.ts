/**
 * @swagger
 * /blog/post:
 *   post:
 *     summary: Create a new blog post
 *     description: Upload an image and create a blog post with title and description.
 *     tags:
 *       - Blog
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
 *                 description: Image file to be uploaded.
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
 *         description: Image file is required.
 *       '500':
 *         description: Internal server error.
 *     security:
 *       - bearerAuth: []
 */
