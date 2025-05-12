const express = require('express')
const axios = require('axios')
const cors = require ('cors')
const mailRouters = require('./routers/mail.router')
const errorHandling = require('./error/errorHandling')

const app = express();

app.set("port", process.env.PORT || 3000)

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(mailRouters)
app.use(function(req, res, nex)
    {
        res.status(404).json({
            error: true,
            codigo: 404,
            message: "Endpoint doesnt found"
        })
    })

app.use(errorHandling)

module.exports= app