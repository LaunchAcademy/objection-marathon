import express from "express";
import clientRouter from "./clientRouter.js";
const rootRouter = new express.Router(); //place your server-side routes here
import showsRouter from "./api/v1/showsRouter.js"

rootRouter.use("/api/v1/shows", showsRouter)

rootRouter.use("/", clientRouter);

export default rootRouter;
