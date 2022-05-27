import db from "../db.js";

export async function postRental(req, res) {
  const { body } = res.locals;
  console.log(body);
  try {
    await db.query(
      `
    INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [
        body.customerId,
        body.gameId,
        body.rentDate,
        body.daysRented,
        body.returnDate,
        body.originalPrice,
        body.delayFee,
      ]
    );
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "Erro no postRental");
    res.sendStatus(500);
  }
}

export async function getRentals(req, res) {
  try {
    const rentals = await db.query(`
    SELECT * FROM rentals
    `);
    // SELECT rentals.*, 
    // customers.id, customers.name, 
    // games.id, games.name, games."categoryId", games."categoryName"
    // FROM rentals 
    // JOIN customers ON rentals."customerId" = customers.id
    // JOIN games ON rentals."gameId" = games.id
    console.log(rentals);
    res.status(200).send(rentals.rows);
  } catch (e) {
    console.log(e, "Erro no getRentals");
    res.sendStatus(500);
  }
}
