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
  try {
    const customers = req.query.cpf ? 
    await db.query(`SELECT * FROM customers WHERE cpf ILIKE $1`, [`${req.query.cpf}%`]):
    await db.query(`SELECT * FROM customers`)

    return res.status(200).send(customers.rows);
  } catch(e) {
    console.log(e, "Erro no getAllCustomers");
    return sendStatus(500);
  }
}

export async function getSpecificCustomer(req, res) {
  const ID = req.params.id
  console.log(ID)
  try {
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [ID])
    if(customer.rows.length < 1) return res.status(404).send("Usuario nao existe")

    return res.status(200).send(customer.rows)
  } catch(e) {
    console.log(e, "Erro no getSpecificCustomer")
    return res.sendStatus(500)
  }
}

export async function putCustomer(req, res) {
  const ID = req.params.id
  const {body} = req
  // {
  //   name: 'João Alfredo',
  //   phone: '21998899222',
  //   cpf: '01234567890',
  //   birthday: '1992-10-05'
  // }

  try {
    await db.query(`
    UPDATE customers 
    SET 
      name = $1,
      phone = $2,
      cpf = $3,
      birthday = $4
    WHERE id = $5`,
    [body.name, body.phone, body.cpf, body.birthday, ID])
    res.sendStatus(200)
  } catch(e) {
    console.log(e, "Erro no putCustomer")
    return res.sendStatus(500)
  }
}
