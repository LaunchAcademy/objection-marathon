import express from "express"
import { ValidationError } from "objection"

import { Show } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const showsRouter = new express.Router()

showsRouter.get("/", async (req, res) => {
  try {
    const shows = await Show.query()
    return res.status(200).json({ shows: shows })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

showsRouter.get("/:id", async (req, res) => {
  const showId = req.params.id
  try {
    const show = await Show.query().findById(showId)
    return res.status(200).json({ show: show })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

showsRouter.post("/", async (req, res) => {
  // const body = req.body
  const cleanInput = cleanUserInput(req.body)

  try {
    const newShow = await Show.query().insertAndFetch(cleanInput)
    return res.status(201).json({ show: newShow })
  } catch (err) {
    if (err instanceof ValidationError) {
      // console.log(err)
      return res.status(422).json({ errors: err.data })
    } else {
      return res.status(500).json({ errors: err })
    }
  }
})

export default showsRouter
