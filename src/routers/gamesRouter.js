import {Router} from 'express'

import {postGame, getGames} from '../controllers/gamesController.js'
import {validatePostGame} from '../middlewares/gamesValidationMiddleware.js'

const gamesRouter = Router()

gamesRouter.post('/games', validatePostGame , postGame)
gamesRouter.get('/games', getGames)

export default gamesRouter