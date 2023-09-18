import express  from "express";
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controller/userController.js';
import { verifyAdmin, verifyUser } from "../utilis/verifyToken.js";

const router = express.Router()

// update User
router.put('/:id',verifyUser, updateUser)

// delete User
router.delete('/:id',verifyUser, deleteUser)

// get single User
router.get('/:id',verifyUser, getSingleUser)

// getall User 
router.get('/',verifyAdmin, getAllUser)

export default router