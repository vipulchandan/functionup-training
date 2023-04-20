const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
var _ = require('lodash');


const commonFile = require('./common')
const { welcome } = require('../logger/logger')
const { printDate, printMonth, getBatchInfo } = require('../util/helper')
const { trim, changetoLowerCase, changeToUpperCase } = require('../validator/formatter')

router.get('/test-me', function (req, res) {
    // Problem 1
    welcome();

    // Problem 2
    printDate();
    printMonth();
    getBatchInfo();

    // Problem 3 
    trim('  functionUp  ');
    changetoLowerCase('FUNCTIONUP');
    changeToUpperCase('functionup');

    // Problem 4
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const subArray = _.chunk(month, 3);
    console.log(subArray);

    const oddNumber = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const lastNine = _.tail(oddNumber);
    console.log(lastNine);

    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [2, 3, 4, 5, 6]
    const arr3 = [3, 4, 5, 6, 7]
    const arr4 = [4, 5, 6, 7, 8]
    const arr5 = [5, 6, 7, 8, 9]
    const mergeArr = _.union(arr1, arr2, arr3, arr4, arr5);
    console.log(mergeArr);

    const movies = [['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']];
    const movieObj = _.fromPairs(movies);
    console.log(movieObj);

    res.send('This should be working!')
});

router.get('/test-you', function (req, res) {
    console.log('This is the constant I created', commonFile.name)
    res.send('Hello there, welcome to this application!')
});


module.exports = router;