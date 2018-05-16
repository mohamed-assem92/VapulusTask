const contactModel = require('../models/contact');
const express = require('express');
const router = express.Router();

router.post('/getList', (req, resp) => {
    const pageNumber = req.body.pageNumber;
    const char = req.body.character;

    contactModel.getList(req.body.userId, pageNumber, char)
    .then((contacts) => resp.send(contacts.docs))
    .catch((error) => resp.send(error));
});

router.post('/getRecentList', (req, resp) => {
    contactModel.getRecentList(req.body.userId)
    .then((contacts) => res.send(contacts))
    .catch((error) => res.send(error));
});


router.post("/addContact",isContact, (req, resp) => {
    contactModel.addContact(req.body)
    .then((contact) => resp.send({
        status : 200,
        message : "New Contact Added",
        data : contact
    }))
    .catch((validationErrors) => resp.send({
        status : 400,
        message : "Failed To Add",
        errors : validationErrors.errors
    }));
});

function isContact(req, resp, next) {
    contactModel.getContact(req.body.email, req.body.userId)
    .then((contact) => {
        if(contact){
            resp.send({
                status:400,
                message: "Already in Contact List"
            })
        }else{
            next();
        }
    })
}

module.exports = router;
