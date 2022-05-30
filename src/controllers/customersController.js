import db from "../db.js";

export async function postCustomer(req, res) {
  const { body } = req;

  try {
    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) 
    VALUES ($1, $2, $3, $4)`,
      [body.name, body.phone, body.cpf, body.birthday]
    );
    return res.sendStatus(201);
  } catch (e) {
    console.log(e, "Erro no postCustomer");
    res.sendStatus(500);
  }
}

export async function getAllCustomers(req, res) {
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
    const customers = req.query.cpf
      ? await db.query(
          `SELECT * FROM customers c WHERE cpf ILIKE $1 ORDER BY c.${order} OFFSET $2 LIMIT $3`,
          [`${req.query.cpf}%`, offset, limit]
        )
      : await db.query(
          `SELECT * FROM customers c ORDER BY c.${order} OFFSET $1 LIMIT $2`,
          [offset, limit]
        );

    return res.status(200).send(customers.rows);
  } catch (e) {
    console.log(e, "Erro no getAllCustomers");
    return res.sendStatus(500);
  }
}

export async function getSpecificCustomer(req, res) {
  const ID = req.params.id;

  try {
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [
      ID,
    ]);
    if (customer.rows.length < 1)
      return res.status(404).send("Usuario nao existe");

    return res.status(200).send(customer.rows[0]);
  } catch (e) {
    console.log(e, "Erro no getSpecificCustomer");
    return res.sendStatus(500);
  }
}

export async function putCustomer(req, res) {
  const ID = req.params.id;
  const { body } = req;

  try {
    await db.query(
      `
    UPDATE customers 
    SET 
      name = $1,
      phone = $2,
      cpf = $3,
      birthday = $4
    WHERE id = $5`,
      [body.name, body.phone, body.cpf, body.birthday, ID]
    );
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "Erro no putCustomer");
    return res.sendStatus(500);
  }
}
