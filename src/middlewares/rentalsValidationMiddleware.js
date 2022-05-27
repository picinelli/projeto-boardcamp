import db from '../db.js'
import dayjs from 'dayjs'

export async function validatePostRental(req, res, next) {
  const {body} = req

  //encontrar o jogo pelo ID e verificar se a quantidade de alugados eh < stockTotal
  //Utilizar o query do rentals com JOIN para verificar

  try {
    const game = await db.query(`SELECT * FROM games WHERE id = $1`, [body.gameId])
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [body.customerId])
    const rentalsQuantity = await db.query(`SELECT * FROM rentals WHERE id = $1`, [body.gameId])

    if(game.rows.length < 1) return res.status(400).send("Jogo nao existente")
    if(customer.rows.length < 1) return res.status(400).send("Cliente nao existente")
    if(body.daysRented < 1) return res.status(400).send("Insira uma quantidade valida de dias")
    if(game.rows[0].stockTotal <= rentalsQuantity.rows.length) {
      return res.status(400).send("Nao existe mais estoque para o jogo selecionado")
    }

    res.locals.body = {
      ...body, 
      returnDate: null, 
      delayFee: null,
      rentDate: dayjs().format('YYYY-MM-DD'), // dividir por 86400000 para valor em dias
      originalPrice: game.rows[0].pricePerDay * body.daysRented
    }

  } catch (e) {
    console.log(e, "Erro no validatePostRental")
    return res.sendStatus(500)
  }

  next()
}