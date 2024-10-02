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


/**
 * @swagger
 * /users/getUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: Users found.
 *       '404':
 *         description: No users found.
 *       '500':
 *         description: Internal server error.
 */

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

/**
 * @swagger
 * /users/{userId}/role:
 *   put:
 *     summary: Update user role
 *     description: Updates the role of a user. Only 'admin' or 'user' roles are allowed. Cannot update to the same role.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 description: The new role for the user
 *     responses:
 *       '200':
 *         description: User role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid role provided or role is already assigned
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */

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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           description: The role of the user
 *         profileImage:
 *           type: string
 *           description: URL of the user's profile image
 */