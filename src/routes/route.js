const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const commonFile = require('./common')
const myUnderscore = require('underscore')


let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]


   router.post('/players', function (req, res) {

       const { name, dob, gender, city, sports } = req.body;

       const isPlayerExist = players.find(player => player.name === name);

       if(isPlayerExist) {
        return res.send({ error: 'Player with the same name already exists!' });
       }

       const newPlayer = {
        name,
        dob,
        gender,
        city,
        sports
       };

       players.push(newPlayer);

       res.send(  { data: players , status: true }  )
   })











router.get('/test-me', function (req, res) {
    res.send('This should be working!')
});

router.get('/test-you', function (req, res) {
    console.log('The exported module is: ',commonFile)
    commonFile.doSomething()
    console.log('This is the constant I created', commonFile.name)
    res.send('Hello there, welcome to this application!')
});

router.get('/test-underscore', function(req, res){
    let result = myUnderscore.first([11,12,23,44,15], 4)
    console.log('the result is',result)
    res.send('done')
})

router.get('/cohorts', function (request, response){
    // logic to get the cohorts from database
    // logic tp get only the active cohorts
    // logic to get only the cohort with a size than 50
    // logic to get only the backend cohorts
    response.send(['technetium','nobelium'])
})

router.get('/students', function(req, res){
    // receive or access the query params in the code
    // write a logic on these query params
    // city, score
    console.log(req.query)
    let requestedCity = req.query.city
    let sortField = req.query.sort
    // logic to get students
    res.send(["Sabiha","Neha","Akash","Sonali"])
})

router.get('/students/:studentName', function(req, res) {
    console.log(req.params.studentName)
    /// go to database and search for studentName student
    // store the data found in this variable - studentDetails
    //res.send({data: studentDetails})
    res.send('student data')
})





router.get('/movies', (req, res) => {
    const movies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins', 'Avatar: the way of water'];
    res.send(movies);
})

router.get('/movies/:indexNumber', (req, res) => {
    const movies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins', 'Avatar: the way of water'];
    const moviesIndex = parseInt(req.params.indexNumber); 
    if(isNaN(moviesIndex) || moviesIndex < 0 || moviesIndex > movies.length - 1) {
        res.status(400).send("The index should be between 0 and " + (movies.length - 1))
    } else {
        res.send(movies[moviesIndex]);
    }
})


const moviesObj = [ {
    'id': 1,
    'name': 'The Shining'
   }, {
    'id': 2,
    'name': 'Incendies'
   }, {
    'id': 3,
    'name': 'Rang de Basanti'
   }, {
    'id': 4,
    'name': 'Finding Nemo'
   }, {
    'id': 5,
    'name': 'Avatar: The way of water'
   }]


router.get('/films', (req, res) => {
   res.send(moviesObj);
})

router.get('/films/:filmId', (req, res) => {
    const moviesId = parseInt(req.params.filmId);
    const movie = moviesObj.find(film => film.id === moviesId);
    
    if(movie) {
        res.send(movie);
    } else {
        res.status(400).send("No movie exists with this id");
    }
})

router.post('/book', (req, res) => {
    const book = req.body;

    // Output the book to the console for debugging
    // console.log(book);
    // books.push(book);

    res.send('Book is added to the database');
});


router.get("/sol1", function (req, res) {
    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr= [1,2,3,5,6,7];
    let n = arr.length + 1;
    let sumOfNum = (n * (n+1))/2;
    let sumOfArr = arr.reduce((a,b) => a+b, 0);
    let missingNumber = sumOfNum - sumOfArr;

    ///LOGIC WILL GO HERE 
    res.send(  { data: missingNumber  }  );
});

router.get("/sol2", function (req, res) {
    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
    let arr= [33, 34, 35, 37, 38]
    let n = arr.length + 1;
    let sumOfNum = (n * (arr[0] + arr[arr.length - 1])) / 2;
    let sumOfArr = arr.reduce((a, b) => a + b, 0);
    let missingNumber = sumOfNum - sumOfArr;

    ///LOGIC WILL GO HERE 

    res.send(  { data: missingNumber  }  );
});






module.exports = router;