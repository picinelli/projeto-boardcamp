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
