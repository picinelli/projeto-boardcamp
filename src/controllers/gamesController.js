import db from "../db.js";

export async function postGame(req, res) {
  const body = req.body;
  try {
    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES(
        '${body.name}', 
        '${body.image}', 
        ${body.stockTotal}, 
        ${body.categoryId}, 
        ${body.pricePerDay})
      `
    );
    return res.sendStatus(200)
  } catch(e) {
    console.log(e, "erro no postGame")
    return res.sendStatus(400)
  }
}

export async function getGames(req, res) {
  try {
    const games = req.query.name ?
    await db.query(`SELECT * FROM games WHERE name ILIKE '${req.query.name}%'`):
    await db.query(`SELECT * FROM games`)
    
    return res.status(200).send(games.rows)
  } catch(e) {
    console.log(e, "erro no getGames")
    return res.status(400).send(e)
  }
}
