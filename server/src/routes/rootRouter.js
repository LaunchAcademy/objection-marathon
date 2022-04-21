import express from "express";
import clientRouter from "./clientRouter.js";
const rootRouter = new express.Router(); 

import showsRouter from "./api/v1/showsRouter.js"

rootRouter.use("/api/v1/shows", showsRouter)

rootRouter.use("/", clientRouter);

export default rootRouter;
