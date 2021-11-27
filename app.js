const express = require('express')
const body = require('body-parser')
const https = require('https')

require('dotenv').config()

const app = express();

app.use(express.static('public'))

app.use(body.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})

app.post('/', (req, res) => {
    var fn = req.body.first_name;
    var ln = req.body.last_name;
    var em = req.body.email_id;

    var dat = {
        members: [
            {
                email_address: em,
                status: "subscribed",
                merge_fields: {
                    FNAME: fn,
                    LNAME: ln

                }
            }

        ]
    }

    //   console.log(data);

    const json_data = JSON.stringify(dat);

    var url = "https://us20.api.mailchimp.com/3.0/lists/f003f8e634";

    var options = {
        method: "POST",
        auth: process.env.AUTH
    }

    const request = https.request(url, options, (response) => {



        response.on("data", (data) => {
            // console.log(data);
            console.log(JSON.parse(data));

        })

        if (response.statusCode == 200) {
            res.sendFile(__dirname + '/public/success.html')

        }
        else {
            res.redirect('/');
            // res.alert("Sorry Sign Up not Successful")

        }




    })

    request.write(json_data);
    request.end();

})


app.listen(process.env.PORT || 3000, (req, res) => {


})