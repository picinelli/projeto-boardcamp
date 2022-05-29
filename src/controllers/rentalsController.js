import db from "../db.js";
import dayjs from "dayjs";

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
  const offset = req.query.offset ? req.query.offset : undefined
  const limit = req.query.limit ? req.query.limit : undefined
  let order = "id"
  if (req.query.order) {
    if(req.query.desc) {
      order = `"${req.query.order}" DESC`
    } else {
      order = `"${req.query.order}"`
    }
  }

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
    ORDER BY r.${order} OFFSET $1 LIMIT $2
    `, [offset, limit]
    )

    const rentals = [];
    for (let rental of rentalsSearch.rows) {
      rentals.push(rental.json_build_object);
    }

    res.status(200).send(rentals);
  } catch (e) {
    console.log(e, "Erro no getRentals");
    res.sendStatus(500);
  }
}

export async function deleteRental(req, res) {
  const ID = req.params.id;

  try {
    const rental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [ID]);
    if (rental.rows.length < 1) return res.sendStatus(404);
    if (rental.rows[0].returnDate) return res.sendStatus(400);

    await db.query("DELETE FROM rentals WHERE id = $1", [ID]);
    res.sendStatus(200);
  } catch (e) {
    console.log(e, console.log("Erro no deleteRental"));
    return res.sendStatus(500);
  }
}

export async function endRental(req, res) {
  const ID = req.params.id;

  try {
    const rentalSearch = await db.query(`SELECT * FROM rentals WHERE id = $1`, [
      ID,
    ]);
    const rental = rentalSearch.rows[0];
    if (rentalSearch.rows.length < 1) return res.sendStatus(404);
    if (rental.returnDate) return res.sendStatus(400);
    rental.returnDate = dayjs().format("YYYY-MM-DD");
    const gamePrice = rental.originalPrice / rental.daysRented;

    const returnDate = dayjs(rental.returnDate);
    const rentDate = dayjs(rental.rentDate);
    const daysPassed = returnDate.diff(rentDate, "day");
    rental.delayFee =
      daysPassed > rental.daysRented
        ? (daysPassed - rental.daysRented) * gamePrice
        : null;

    await db.query(
      `UPDATE rentals 
    SET 
      "customerId"=$1, 
      "gameId"=$2, 
      "rentDate"=$3, 
      "daysRented"=$4, 
      "returnDate"=$5, 
      "originalPrice"=$6, 
      "delayFee"=$7
    WHERE id = $8
    `,
      [
        rental.customerId,
        rental.gameId,
        rentDate,
        rental.daysRented,
        returnDate,
        rental.originalPrice,
        rental.delayFee,
        ID
      ]
    );

    res.status(200).send(ID);
  } catch (e) {
    console.log(e, "Erro no endRental");
    res.sendStatus(500);
  }
}
