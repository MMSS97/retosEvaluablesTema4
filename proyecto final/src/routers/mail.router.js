const {Router}= require('express')
const router = Router()
const emailCtrl = require('../controller/mail.controller')

router.get('/main', emailCtrl.destino)
router.get('/mail', emailCtrl.origen)
router.post('/mail', emailCtrl.mensaje)

module.exports= router