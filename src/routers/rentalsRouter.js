import { Router } from "express";

import { postRental, getRentals, deleteRental, endRental, getRentalsMetrics } from "../controllers/rentalsController.js";
import { validatePostRental } from "../middlewares/rentalsValidationMiddleware.js";
import { getRentalsFilter, getRentalsMetricsFilter } from "../middlewares/rentalsFiltersMiddleware.js"

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validatePostRental, postRental);
rentalsRouter.get("/rentals", getRentalsFilter, getRentals)
rentalsRouter.get("/rentals/metrics", getRentalsMetricsFilter, getRentalsMetrics)
rentalsRouter.delete("/rentals/:id", deleteRental)
rentalsRouter.post("/rentals/:id/return", endRental)

export default rentalsRouter;
