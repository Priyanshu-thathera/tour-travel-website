import express from 'express'
import { verifyAdmin, verifyUser } from '../utilis/verifyToken.js'
import { createBooking, getAllBooking, getBooking , deleteBooking} from '../controller/bookingController.js'

const router = express.Router()

router.post('/',verifyUser, createBooking)
router.post('/:id',verifyUser, getBooking)
router.get('/',verifyAdmin, getAllBooking)
router.delete('/:id',verifyUser, deleteBooking)

export default router