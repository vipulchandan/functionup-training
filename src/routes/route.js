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
router.get("/getBooks", newBookController.getBooks  )
router.put("/updatePublisherBooks", newBookController.updatePublisherBooks  )
router.put("/updateBooksPrice", newBookController.updateBooksPrice  )

module.exports = router;