const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

app.get("/sol1", function (req, res) {
    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr= [1,2,3,5,6,7]
    let n = arr.length + 1;
    let sumOfNum = (n (n+1)) / 2;
    let sumOfArr = arr.reduce((a, b) => a + b , 0);
    let missingNumber = sumOfNum - sumOfArr;

    ///LOGIC WILL GO HERE 
    res.send(  { data: missingNumber  }  );
});

app.get("/sol2", function (req, res) {
    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
    let arr= [33, 34, 35, 37, 38]
    let n = arr.length + 1;
    let sumOfNum = (n * (arr[0] + arr[arr.length - 1])) / 2;
    let sumOfArr = arr.reduce((a, b) => a + b , 0);
    let missingNumber = sumOfNum - sumOfArr;

    ///LOGIC WILL GO HERE 

    res.send(  { data: missingNumber  }  );
});



app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


