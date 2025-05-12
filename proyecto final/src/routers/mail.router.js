const {Router}= require('express')
const router = Router()
const emailCtrl = require('../controller/mail.controller')

router.get('/mail/from', emailCtrl.destino)
router.get('/mail/to', emailCtrl.origen)
router.post('/mail', emailCtrl.mensaje)

module.exports= router