const express = require('express');

const router = express.Router();

const BookRecord = require('../models/bookRecord');


//to check routes
router.get('/', (req,res) => {
    BookRecord.find({ })
    .then((data)=> {
        console.log('Data: ' , data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
});

//saves new data input in form into database 
router.post('/save', (req,res) => {
    const data = req.body;

    const newBookRecord = new BookRecord(data);

    newBookRecord.save((error)=> {
        if (error) {
            res.status(500).json({msg: 'Sorry, internal server errors'});
            return;
        }
        return res.json({
                msg: "Your data has been saved"
        });
        
    });
});

router.get('/name', (req,res) => {
    const data = {
        username: 'tryhardrichard',
        age: 61
    };
    res.json(data);
});

module.exports = router;