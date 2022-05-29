import db from "../db.js";

export async function postCategory(req, res) {
  const body = req.body;
  try {
    await db.query(`INSERT INTO categories (name) VALUES ($1)`, [body.name]);
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "erro no postCategory");
    res.sendStatus(400);
  }
}

export async function getCategories(req, res) {
  const offset = req.query.offset ? req.query.offset : undefined;
  const limit = req.query.limit ? req.query.limit : undefined;
  let order = "id";
  if (req.query.order) {
    if (req.query.desc) {
      order = `"${req.query.order}" DESC`;
    } else {
      order = `"${req.query.order}"`;
    }
  }
  
  try {
    const categories = await db.query(
      `SELECT * FROM categories c ORDER BY c.${order} OFFSET $1 LIMIT $2`,
      [offset, limit]
    );
    return res.status(200).send(categories.rows);
  } catch (e) {
    console.log(e, "Erro no getCategories")
    return res.sendStatus(400, "erro no getCategories");
  }
}
