/**
 * @swagger
 * /users/updateProfile:
 *   patch:
 *     summary: Update user profile
 *     description: Update the authenticated user's profile information including username and profile image.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username for the user.
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: New profile image file.
 *     responses:
 *       '200':
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d5ecb74d6e3f3e1cfd7d1d
 *                     username:
 *                       type: string
 *                       example: newUsername
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *                     profileImage:
 *                       type: string
 *                       example: https://res.cloudinary.com/your-cloud-name/image/upload/v1624561234/profile_image.jpg
 *       '401':
 *         description: Unauthorized - No user ID found or invalid token.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error or failed to update user.
 */