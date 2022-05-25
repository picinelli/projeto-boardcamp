import db from '../db.js'

export async function postCategory(req, res) {
  const body = req.body
  try {
    await db.connect()
    await db.query(`INSERT INTO categories (name) VALUES ('${body.name}')`)
    res.sendStatus(200)
  } catch(e) {
    console.log(e, "erro no postCategory")
    res.sendStatus(400)
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await db.query('SELECT * FROM categories')
    return res.status(200).send(categories.rows)
  } catch(e) {
    return res.sendStatus(400, "erro no getCategories")
  }
}