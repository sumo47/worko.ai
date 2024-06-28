const express = require('express')
const router = express.Router()
const  {CreateUser, GetUser, loginUser, GetUserById, UpdateUser, DeleteUser}  = require('../controllers/userController')
const { Authentication, Authorisation } = require('../middleware/Auth')

router.post('/create', CreateUser)
router.post('/login', loginUser)

router.get("/get",Authentication, GetUser)
router.get('/getById/:userId',Authentication, Authorisation,GetUserById)

router.put('/update/:userId',Authentication, Authorisation, UpdateUser)

router.delete("/delete/:userId",Authentication, Authorisation, DeleteUser)

router.all("/*", function (req, res) {
    return res.status(400).send({ status: false, message: "invalid path" })
})

module.exports = router