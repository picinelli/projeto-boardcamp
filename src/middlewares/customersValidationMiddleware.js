import joi from "joi";

import db from "../db.js";

export async function validatePostCustomer(req, res, next) {
  const { body } = req;
  const schema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().min(11).max(11).required(),
    birthday: joi.date(),
  });
  const { error, value } = schema.validate(body);

  if (error) return res.status(400).send("Dados inseridos incorretos");

  try {
    const existentCustomer = await db.query(
      `SELECT * FROM customers WHERE cpf = $1`,
      [body.cpf]
    );
    if (existentCustomer.rows.length > 0) {
      return res.status(409).send("Ja existe um cliente registrado neste cpf");
    }
  } catch (e) {
    console.log(e, "Erro no validatePostClient");
    return res.sendStatus(500);
  }

  next();
}

export async function validatePutCustomer(req, res, next) {
  const { body } = req;
  const schema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().min(11).max(11).required(),
    birthday: joi.date(),
  });
  const {error, value} = schema.validate(body)

  if(error) return res.status(400).send("Dados inseridos incorretos")

  try {
    const customerExistent = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [body.cpf])
    if(customerExistent.rows.length > 0) return res.status(409).send("Usuario ja existente com cpf informado")
  } catch(e) {
    console.log(e, "Erro no validatePutCustomer")
    return res.sendStatus(500)
  }

  next()
}
