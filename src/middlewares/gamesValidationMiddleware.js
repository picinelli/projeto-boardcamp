import joi from 'joi'

import db from '../db.js'

export async function validatePostGame(req, res, next) {
  const body = req.body
  const schema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(), 
    stockTotal: joi.number().min(1).required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().min(1).required(),
  })
  const { error, value } = schema.validate(body);

  if(error) return res.status(400).send(error.details)

  try {
    const gameAlreadyExists = await db.query(`SELECT * FROM games WHERE name = '${body.name}'`)
    const categoryExists = await db.query(`SELECT * FROM categories WHERE id = '${body.categoryId}'`)

    if(gameAlreadyExists.rows.length > 0) {
      return res.sendStatus(409)
    }
    if(categoryExists.rows.length < 1) {
      return res.status(400).send("erro na validacao validatePostGame")
    }
  } catch(e) {
    console.log(e)
    return res.sendStatus(400, "erro no validatePostGame")
  }

  next()
}