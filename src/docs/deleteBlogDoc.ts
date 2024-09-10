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
