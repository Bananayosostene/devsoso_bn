/**
 * @swagger
 * /contact/post:
 *   post:
 *     summary: Create a new contact entry
 *     description: Creates a new contact entry with name, email, and message fields.
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the contact
 *               email:
 *                 type: string
 *                 description: The email of the contact
 *               message:
 *                 type: string
 *                 description: The message from the contact
 *     responses:
 *       '201':
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /contact/get/{contactId}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieves a contact entry by its ID.
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to retrieve
 *     responses:
 *       '200':
 *         description: Contact found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       '404':
 *         description: Contact not found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /contact/gets:
 *   get:
 *     summary: Retrieve all contacts
 *     description: Retrieves all contacts stored in the database.
 *     tags:
 *       - Contact
 *     responses:
 *       '200':
 *         description: Contacts found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *       '404':
 *         description: No contacts found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /contact/delete/{contactId}:
 *   delete:
 *     summary: Delete a contact by ID
 *     description: Deletes a contact entry from the database by its ID.
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to delete
 *     responses:
 *       '200':
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       '404':
 *         description: Contact not found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the contact
 *         name:
 *           type: string
 *           description: The name of the contact
 *         email:
 *           type: string
 *           description: The email of the contact
 *         message:
 *           type: string
 *           description: The message sent by the contact
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the contact was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the contact was last updated
 */
