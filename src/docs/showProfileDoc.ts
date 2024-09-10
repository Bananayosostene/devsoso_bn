/**
 * @swagger
 * /users/showProfile:
 *   get:
 *     summary: Show user profile
 *     description: Retrieve the authenticated user's profile information.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Profile found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile found
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d5ecb74d6e3f3e1cfd7d1d
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *                     profileImage:
 *                       type: string
 *                       example: https://res.cloudinary.com/your-cloud-name/image/upload/v1624561234/profile_image.jpg
 *       '401':
 *         description: Unauthorized - No user found or invalid token.
 *       '404':
 *         description: Profile not found.
 *       '500':
 *         description: Internal server error.
 */