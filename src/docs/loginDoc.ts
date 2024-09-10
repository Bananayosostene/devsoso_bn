/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user using email and password, returning a JWT.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *                 example: sbananayo98@gmail.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: Sostene@1
 *     responses:
 *       '200':
 *         description: Login successful.
 *       '401':
 *         description: Unauthorized, incorrect email or password.
 *       '500':
 *         description: Internal server error.
 */
