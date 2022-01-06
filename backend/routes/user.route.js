const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");

const { writeResponse } = require('../helpers');

/**
 * @swagger
 * /users:
 *   get:
 *     parameters:
 *      - in: query
 *        name: s
 *        required: false
 *        type: string
 *        description: Search string (email, firstName, lastName).
 *     description: All users
 *     responses:
 *       200:
 *         description: Returns all the users
 */

router.get("/", async (req, res) => {
  const response = await getAllUsers(req.query.s);
  writeResponse(res, response);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *     description: Get a user by id
 *     responses:
 *       200:
 *         description: Returns the requested user
 *       404:
 *         description: Returns 404 error if user doesn't exist
 */
router.get("/:id", async (req, res) => {
  const response = await getUserById(req.params.id);
  writeResponse(res, response);
});

/**
 * @swagger
 * /users:
 *   post:
 *     parameters:
 *      - in: body
 *        name: user
 *        description: New user
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Email already exists
 *       422:
 *         description: One or more fields are required
 */
router.post("/", async (req, res) => {
  const { email, firstName, lastName, } = req.body;

  const response = await createUser({ email, firstName, lastName });
  writeResponse(res, response, 201);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *      - in: body
 *        name: user
 *        description: Update user
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *     responses:
 *       201:
 *         description: Updated
 *       404:
 *         description: User doesn't exist
 *       409:
 *         description: Email already exist
 */
router.put("/:id", async (req, res) => {
  const { email, firstName, lastName, } = req.body;

  const response = await updateUser(req.params.id, email, firstName, lastName);
  writeResponse(res, response, 201);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *     description: Delete a user by id
 *     responses:
 *       200:
 *         description: User is deleted
 *       404:
 *         description: User doesn't exist
 */
router.delete("/:id", async (req, res) => {
  const response = await deleteUser(req.params.id)
  writeResponse(res, response);
});

module.exports = router;
