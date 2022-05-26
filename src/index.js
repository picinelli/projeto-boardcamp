import express from "express";
import cors from "cors";

import categoriesRouter from "./routers/categoriesRouter.js";
import gamesRouter from "./routers/gamesRouter.js";
import customersRouter from "./routers/customersRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);

app.listen(4000, console.log("Server is now online"));
