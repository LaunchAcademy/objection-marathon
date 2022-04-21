import express from "express"

import { Show } from './../../../models/index.js'

import { ValidationError } from "objection"

import cleanUserInput from "./../../../services/cleanUserInput.js"

const showsRouter = new express.Router()

showsRouter.get("/",async (req, res) => {
  try {
    const shows = await Show.query()
    return res.status(200).json({ shows })
  } catch(error) {
    console.log(error)
    return res.status(500).json({ error })
  }
})

showsRouter.get("/:id", async (req, res) => {
  try {
    const show = await Show.query().findById(req.params.id)
    return res.status(200).json({ show })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

showsRouter.post("/", async (req, res) => {

  const showBody = req.body
  const squeakyCleanBody = cleanUserInput(showBody)

  try {
    await Show.query().insert(squeakyCleanBody)
    return res.status(201).json({})
  } catch (error) {
    if (error instanceof ValidationError){
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error })
  }
})


export default showsRouter