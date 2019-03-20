const express = require('express');
const rp = require('request-promise');
const moment = require('moment');
const bodyParser = require('body-parser');
const app = express();
const FileHelper = require('./helpers/file.helper');
const path = require('path');
const router = express.Router();
const port = process.env.port || 8080;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"));
app.use('/', router);


router.post('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

router.post('/recharge', (req,res) =>{
    const { amount, operator, genuine, email, mobile } = req.body;
    const day = moment().format("dddd, MMMM Do YYYY");
    const time = moment().format("HH:mm");
    const type = "single";
    const url = 'http://cc73e23a.ngrok.io'
    var options = {
        uri: url,
        qs: {
            "mobile": mobile,
            "amount": amount,
            "operator": operator,
            "genuine": genuine,
            "email": email
        },
        json: true
     };
     rp(options)
        .then((data) => {
            if(data.status == true){
                const transaction = {
                    day,
                    time,
                    mobile,
                    amount,
                    operator,
                    type
                };
                const fileHelper = new FileHelper();
                fileHelper.saveTransactionToFile(transaction)
                    .then((resp) => {
                        console.log('Data was saved successfully', resp);
                        //return res.json(data);
                    })
                    .catch((err) => {
                        console.log('Unable to save data', err);
                    });
            }
           // return data;
            return res.send({
                error: false,
                code: 200,
                message: "Recharge done successfully",
                data: data
            }); 
        })
        .catch((err) => {
            return res.send({
                error: true,
                code: 500,
                message: "Something went wrong",
                data: err
        });
    })
})

router.get('/history', (req,res)=>{
    const fileHelper = new FileHelper();

    fileHelper.getAllTransactions()
    .then(data => {
        return res.json(data);
    })
    .catch(err => {
        return res.json({error: "An error occured"})
    });

})

app.listen(port, ()=>{
    console.log("running on port" + port)
})
