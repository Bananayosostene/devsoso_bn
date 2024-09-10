/**
 * @swagger
 * /users/delete/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user by their user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Failed to delete the user.
 */
