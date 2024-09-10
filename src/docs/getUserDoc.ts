/**
 * @swagger
 * /users/get/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves the details of a user by their user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       '200':
 *         description: User retrieved successfully.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
