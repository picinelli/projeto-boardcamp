import db from "../db.js";

export async function postGame(req, res) {
  const body = req.body;
  try {
    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
      VALUES(
        $1, $2, $3, $4, $5
      )
      `, [body.name, body.image, body.stockTotal, body.categoryId, body.pricePerDay]
    );
    return res.sendStatus(200)
  } catch(e) {
    console.log(e, "erro no postGame")
    return res.sendStatus(400)
  }
}

export async function getGames(req, res) {
  const offset = req.query.offset ? req.query.offset : undefined
  const limit = req.query.limit ? req.query.limit : undefined
  let order = "id";
  if (req.query.order) {
    if (req.query.desc) {
      order = `"${req.query.order}" DESC`;
    } else {
      order = `"${req.query.order}"`;
    }
  }

  try {
    const games = req.query.name ?
    await db.query(`SELECT * FROM games g WHERE name ILIKE $1 ORDER BY g.${order} OFFSET $2 LIMIT $3`, [`${req.query.name}%`, offset, limit]):
    await db.query(`SELECT * FROM games g ORDER BY g.${order} OFFSET $1 LIMIT $2`, [offset, limit])

    return res.status(200).send(games.rows)
  } catch(e) {
    console.log(e, "erro no getGames")
    return res.status(400).send(e)
  }
}
