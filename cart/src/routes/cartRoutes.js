const express = require('express')

const {
    createCart,
    updateCart,
    getCart,
    getAllCart,
    deleteCart,
    deleteAllCartFromUser
} = require('../controllers/cartController')

const router = express.Router()



// GET From Buy now button
router.post('/insert', createCart)
router.put('/update/:productID/:customerID', updateCart)
router.get('/get/:cID', getCart)
router.get('/getAll/:cID', getAllCart)

router.delete('/delete/:Item_number/:customer_id', deleteCart)

router.delete('/deleteFullCart/:Item_number/:customer_id', deleteAllCartFromUser)

module.exports = router