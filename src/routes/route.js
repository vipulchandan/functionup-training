const express = require('express');
const router = express.Router();

const newAuthorController = require("../controllers/newAuthorController");
const newPublisherController = require("../controllers/newPublisherController");
const newBookController = require("../controllers/newBookController");

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", newAuthorController.createAuthor  )
router.post("/createPublisher", newPublisherController.createPublisher  )
router.post("/createBook", newBookController.createBook  )

// router.post("/createAuthor", authorController.createAuthor  )

// router.get("/getAuthorsData", authorController.getAuthorsData)

// router.post("/createBook", bookController.createBook  )

// router.get("/getBooksData", bookController.getBooksData)

// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;