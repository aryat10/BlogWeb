import express from 'express'
import { SignUser } from '../Controller/user-controlller.js'

const router = express.Router()

router.post('/signup', SignUser)

export default router
