import express from "express"
import clientRouter from "./clientRouter.js"
import showsRouter from "./api/v1/showsRouter.js"
const rootRouter = new express.Router() //place your server-side routes here

rootRouter.use("/api/v1/shows", showsRouter)
rootRouter.use("/", clientRouter)

export default rootRouter
