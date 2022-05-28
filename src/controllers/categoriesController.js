import db from '../db.js'

export async function postCategory(req, res) {
  const body = req.body
  try {
    await db.query(`INSERT INTO categories (name) VALUES ($1)`, [body.name])
    res.sendStatus(200)
  } catch(e) {
    console.log(e, "erro no postCategory")
    res.sendStatus(400)
  }
}

export async function getCategories(req, res) {
  const offset = req.query.offset ? req.query.offset : undefined
  const limit = req.query.limit ? req.query.limit : undefined
  console.log(offset, limit)
  try {
    const categories = await db.query(`SELECT * FROM categories OFFSET $1 LIMIT $2`, [offset, limit])
    return res.status(200).send(categories.rows)
  } catch(e) {
    return res.sendStatus(400, "erro no getCategories")
  }
}