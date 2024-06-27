const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const JWT_SECRETKEY = process.env.JWT_SECRETKEY
const bcrypt = require('bcrypt')

module.exports.CreateUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        let data = req.body
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please Enter data in body" })
        }
        if (!data.Name || !data.Age || !data.City || !data.Zip_code || !data.password) return res.status(400).send({ status: false, message: "All fields are required" })

        const { Email, Name, Age, City, Zip_code, password } = data

        if (!Email) return res.status(400).send({ status: false, message: "Email require!" })
        let exist_Email = await UserModel.findOne({ Email: data.Email, isDeleted: false })
        if (exist_Email) return res.status(400).send({ status: false, message: "Email already exist! You can login" })

        const salt = await bcrypt.genSalt(10)
        const secure_Password = await bcrypt.hash(data.password, salt)

        const saveData = await UserModel.create({ Email: Email, Name: Name, Age: Age, City: City, Zip_code: Zip_code, password: secure_Password })

        const token = jwt.sign({ user_Id: saveData.id }, JWT_SECRETKEY)
        res.setHeader('work_ai-api-key', token);

        res.status(200).send({ status: true, data: saveData, token: token })

    } catch (error) {
        res.status(500).send({ statue: false, message: error.message })
        console.log(error)
    }
}

module.exports.loginUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {

        let data = req.body
        const { Email, password } = data

        if (!Email) return res.status(400).send({ status: false, message: "Email require" })
        if (!data.password) return res.status(400).send({ status: false, message: "password require" })

        let validate_User = await UserModel.findOne({ Email: Email, isDeleted: false })
        if (!validate_User) return res.status(404).send({ status: false, message: "Invalid Email!" })

        let password_Compare = await bcrypt.compare(data.password, validate_User.password)
        if (!password_Compare) return res.status(404).send({ status: false, message: "Invalid password!" })

        let token = jwt.sign({ user_Id: validate_User.id }, JWT_SECRETKEY)
        res.setHeader("atg-api-key", token)

        res.status(200).send({ status: true, message: "Login Successfull!", token: token })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

// Get
module.exports.GetUser = async (req, res) => {
    try {
        const findData = await UserModel.find({ isDeleted: false })
        if (!findData) return res.status(404).send({ status: false, message: "No user Found" })

        return res.status(200).send({ status: true, message: findData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//Get By Id
module.exports.GetUserById = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!userId) return res.status(404).send({ status: false, message: "UserId require" })

        const findData = await UserModel.findById({ _id: userId, isDeleted: false })
        if (!findData) return res.status(404).send({ status: false, message: "no data found" })
        return res.status(200).send({ status: true, message: "User profile details", data: findData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//update
module.exports.UpdateUser = async (req, res) => {
    try {
        let userId = req.params.userId
        let data = req.body
        const { Email, Name, Age, City, Zip_code, password } = data

        // console.log(data)

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please Enter data in body" })
        }

        let checkEmail = await UserModel.findOne({Email})
        // console.log("checkEmail:"+checkEmail)
        if (checkEmail) return res.status(400).send({ status: false, message: "Email already exist!" })

        const CheckUserDetails = await UserModel.findById({ _id: userId, isDeleted: false })
        if (!CheckUserDetails) return res.status(400).send({ status: false, message: "User does not exist" })
        // console.log(CheckUserDetails)
        const UpdateData = await UserModel.findByIdAndUpdate(userId, { $set: { Email: Email, Name: Name, Age: Age, City: City, Zip_code: Zip_code, password: password } }, { new: true })

        if (!UpdateData) return res.status(404).send({ status: false, message: "no data found" })

        return res.status(200).send({ status: true, message: "Updated User profile details", data: UpdateData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//Delete
module.exports.DeleteUser = async (req, res) => {
    try {
        let userId = req.params.userId
        const CheckUserDetails = await UserModel.findById({ _id: userId, isDeleted: false })
        if (!CheckUserDetails) return res.status(400).send({ Status: false, message: "User Not found" })

        await UserModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isDeleted: true, DeletedAt: Date.now() } })

        return res.status(200).send({ status: true, message: "Profile deleted succesfully !" })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

