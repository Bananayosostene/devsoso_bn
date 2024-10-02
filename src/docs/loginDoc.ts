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

/**
 * @swagger
 * /users/auth/google:
 *   get:
 *     summary: Initiate Google Login
 *     description: Redirects the user to Google for authentication.
 *     tags:
 *       - Users
 *     responses:
 *       '302':
 *         description: Redirects to Google for authentication.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/auth/google/callback:
 *   get:
 *     summary: Google Login Callback
 *     description: Handles the Google login callback, authenticates the user, and returns a token.
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: Successfully logged in with Google.
 *         headers:
 *           Authorization:
 *             description: JWT token for authorization.
 *             schema:
 *               type: string
 *               example: Bearer token_here
 *       '302':
 *         description: Redirects to dashboard with the token.
 *       '401':
 *         description: Google login failed.
 *       '500':
 *         description: Internal server error.
 */

