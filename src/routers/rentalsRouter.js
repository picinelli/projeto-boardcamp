import { Router } from "express";

import { postRental, getRentals, deleteRental, endRental } from "../controllers/rentalsController.js";
import { validatePostRental } from "../middlewares/rentalsValidationMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validatePostRental, postRental);
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.delete("/rentals/:id", deleteRental)
rentalsRouter.post("/rentals/:id/return", endRental)

export default rentalsRouter;
