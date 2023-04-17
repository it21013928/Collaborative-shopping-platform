const express = require('express')
const {
    create

} = require('../controllers/orderedProductsController')

const router = express.Router()

//creation
router.post('/create', create)


module.exports = router;