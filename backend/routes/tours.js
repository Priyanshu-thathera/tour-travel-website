import express  from "express";
import { createTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getTourCount, getfeaturedTour, updateTour } from '../controller/tourController.js';
import { verifyAdmin } from "../utilis/verifyToken.js";

const router = express.Router()

//create new tour
router.post('/',verifyAdmin, createTour)

// update tour
router.put('/:id',verifyAdmin, updateTour)

// delete tour
router.delete('/:id',verifyAdmin, deleteTour)

// get single tour
router.get('/:id',getSingleTour)

// getall tour 
router.get('/',getAllTour)

// get tour by search
router.get('/search/getTourBySearch',getTourBySearch)

// get tour by feature
router.get('/search/getFeaturedTours',getfeaturedTour)

// get tour counts
router.get('/search/getTourCount',getTourCount)

export default router