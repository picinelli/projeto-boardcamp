import {Router} from 'express'

import {postGame} from '../controllers/gamesController.js'
import {validatePostGame} from '../middlewares/gamesValidationMiddleware.js'

const gamesRouter = Router()

gamesRouter.post('/games', validatePostGame , postGame)

export default gamesRouter