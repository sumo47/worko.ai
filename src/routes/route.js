const express = require('express')
const router = express.Router()
const  {CreateUser, GetUser, loginUser, GetUserById, UpdateUser, DeleteUser}  = require('../controllers/userController')

router.post('/create', CreateUser)
router.post('/login', loginUser)

router.get("/get", GetUser)
router.get('/getById/:userId',GetUserById)

router.put('/update/:userId', UpdateUser)

router.delete("delete/:userId", DeleteUser)

router.all("/*", function (req, res) {
    return res.status(400).send({ status: false, message: "invalid path" })
})

module.exports = router