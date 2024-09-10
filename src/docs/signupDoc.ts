/**
 * @swagger
 * /users/signUp:
 *   post:
 *     summary: Create a new user (Signup)
 *     description: Registers a new user with email, password, and other details.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's name.
 *                 example: sostene
 *               email:
 *                 type: string
 *                 description: User's email.
 *                 example: sostene@dev.me
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: Test@12345
 *     responses:
 *       '201':
 *         description: User created successfully.
 *       '409':
 *         description: User already exists.
 *       '500':
 *         description: Internal server error.
 */
