import db from '../db.js'
import joi from 'joi'

export async function validatePostCategory(req, res, next) {
  await db.connect()
  const body = req.body
  const schema = joi.object({
    name: joi.string().required()
  })
  const { error, value } = schema.validate(body);

  if(error) return res.status(400).send(error.details)

  try {
    const categoryExists = await db.query(`SELECT * FROM categories WHERE name = '${body.name}'`)
    if(categoryExists.rows.length > 0) {
      return res.sendStatus(409)
    }
  } catch(e) {
    return res.sendStatus(400)
  }

  next()
}