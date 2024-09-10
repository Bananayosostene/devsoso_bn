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
