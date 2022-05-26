import { Router } from "express";

import { validatePostCustomer, validatePutCustomer } from "../middlewares/customersValidationMiddleware.js";
import { postCustomer, getAllCustomers, getSpecificCustomer, putCustomer } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.post("/customers", validatePostCustomer, postCustomer);
customersRouter.get("/customers", getAllCustomers)
customersRouter.get("/customers/:id", getSpecificCustomer)
customersRouter.put('/customers/:id', validatePutCustomer, putCustomer);

export default customersRouter;
