import express from "express"
import Show from "../../../models/Show.js"
const showsRouter = new express.Router()
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"

const { ValidationError } = objection

showsRouter.get("/", async (req, res) => {
  // debugger
  try {
    const shows = await Show.query()
    return res.status(200).json({ shows: shows })
  } catch (error) {
    console.log(error)
  }
})

showsRouter.get("/:id", async (req, res) => {
  console.log(req.params)
  try {
    const show = await Show.query().findById(req.params.id)
    // const show = await Show.query().findById(req.params.id).throwIfNotFound()
    console.log(show)
    if (show) {
      res.status(200).json({ show: show })
    } else {
      res.status(404)
    }
  } catch (error) {
    console.log(error)
  }
})

showsRouter.post("/", async (req, res) => {
  //  try {
  //    console.log(req.body)
  //    const insertion = await Show.query().insertAndFetch(req.body)
  //    console.log(insertion)
  //    return res.status(201).json({ show: insertion })
  //  } catch (error) {
  //    return res.status(500).json({ error: error })
  //  }

  const { body } = req
  const formPayload = cleanUserInput(body)
  console.log(formPayload)
  try {
    const newShow = await Show.query().insertAndFetch(formPayload)
    return res.status(201).json({ show: newShow })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default showsRouter
