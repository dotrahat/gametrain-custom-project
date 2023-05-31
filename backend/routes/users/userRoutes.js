import express from 'express'
import {getUser, getUsers, createUser, updateUser, deleteUser } from '../../controllers/usersController.js';

const Router = express.Router();

// Get one User Details
Router.get("/:id", getUser);
Router.get("/", getUsers);

// Create New User
Router.post("/create", createUser);

// Update user
Router.put("/update", updateUser);

// Delete User
Router.delete("/delete", deleteUser);

export default Router