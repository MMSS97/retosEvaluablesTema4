const axios = require('axios');
const Email = require('../models/email');

let emails = [];

const POSTMARK_API_KEY = "4da0ff58-d552-46d3-a8f1-bfa99e9aedbe";
const POSTMARK_API_URL = 'https://api.postmarkapp.com/email';

const postmarkHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Postmark-Server-Token': POSTMARK_API_KEY
};


function origen(req, res) {
    const from = req.query.from;
    if(!from) {
        return res.status(400).json({error: 'se necesita introducir un origen/"from"'});
    }
    const mensajesFiltrados = emails.filter(function(email) {
        return email.from === from;
    });
    res.send(mensajesFiltrados);
}

function destino(req, res) {
    const to = req.query.to;
    if(!to) {
        return res.status(400).json({error: 'se requiere introducir un destinatario/"to"'});
    }
    const mensajeFiltrado = emails.filter(function(email) {
        return email.to === to;
    });
    res.send(mensajeFiltrado);
}

function mensaje(req, res) {
    const {from, to, subject, message} = req.body;
    if(!from || !to || !subject ||!message) {
        return res.status(400).json({error: "falta introducir alguno de los campos 'from', 'to', 'subject' o 'message'"});
    }
        const postmarkEmail = {
                                 From: from ,
                                 To: to,
                                 Subject: subject,
                                 TextBody: message
}
    axios.post(POSTMARK_API_URL, postmarkEmail, {headers: postmarkHeaders})
        .then(function(resp) {
            const nuevoEmail = {from, to, subject, message};
            emails.push(nuevoEmail);
            res.status(201).json({
                message: "email enviado",
                resp: resp.data,
                email: nuevoEmail
            });
        })
        .catch(function(error) {
            console.error("error al enviar el mensaje", error.response ? error.response.data : error.message);
            res.status(500).json({
                error: "no se pudo enviar el email",
                details: error.response ? error.response.data : error.message 
            });
        });
}

module.exports = {
    mensaje,
    origen,
    destino
};