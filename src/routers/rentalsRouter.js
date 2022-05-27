import { Router } from "express";

import { postRental, getRentals } from "../controllers/rentalsController.js";
import { validatePostRental } from "../middlewares/rentalsValidationMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validatePostRental, postRental);
rentalsRouter.get("/rentals", getRentals)

export default rentalsRouter;
