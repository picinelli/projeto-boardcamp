import { Router } from "express";

import { postRental, getRentals, deleteRental, endRental } from "../controllers/rentalsController.js";
import { validatePostRental } from "../middlewares/rentalsValidationMiddleware.js";
import { getRentalsFilter } from "../middlewares/rentalsFiltersMiddleware.js"

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validatePostRental, postRental);
rentalsRouter.get("/rentals", getRentalsFilter, getRentals)
rentalsRouter.delete("/rentals/:id", deleteRental)
rentalsRouter.post("/rentals/:id/return", endRental)

export default rentalsRouter;
