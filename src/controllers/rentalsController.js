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
    const rentalsSearch = await db.query(
      `SELECT json_build_object(
      'id', r.id,
      'customerId', r."customerId",
      'gameId', r."gameId",
      'rentDate', r."rentDate",
      'daysRented', r."daysRented",
      'returnDate', r."returnDate",
      'originalPrice', r."originalPrice",
      'delayFee', r."delayFee",
      'customer', json_build_object(
        'id', c.id,
        'name', c.name
      ),
      'game', json_build_object(
        'id', g.id,
        'name', g.name,
        'categoryId', g."categoryId",
        'categoryName', cat.name
      )
    )
    FROM rentals r
    JOIN customers c ON "customerId"=c.id
    JOIN games g ON "gameId"=g.id
    JOIN categories cat ON g."categoryId"=cat.id
    `);

    const rentals = []
    for (let rental of rentalsSearch.rows) {
      rentals.push(rental.json_build_object)
    }

    res.status(200).send(rentals);
  } catch (e) {
    console.log(e, "Erro no getRentals");
    res.sendStatus(500);
  }
}
