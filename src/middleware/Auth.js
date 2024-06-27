const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const UserModel = require('../models/UserModel')
const dotenv = require('dotenv').config()
JWT_SECRETKEY = process.env.JWT_SECRETKEY


export const Authentication = async (req, res, next) => {
    try {
        let token = req.headers['work_ai-api-key']
        if (!token) return res.status(400).send({ status: false, message: "Please Login first -- token not present" })

        let a = token.split(" ")[1]

        jwt.verify(a, JWT_SECRETKEY, (err, decode) => {
            if (err) {
                return res.status(401).send({ status: false, message: err.message })
            } else {
                req.decode = decode
                next()
            }
        })
    } catch (error) {
        res.stats(500).send({ status: fasle, message: error.message })
    }
}

export const Authorisation = async (req, res, next) => {
    try {
        let userId = req.params.userId

        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, message: 'userId is not valid' })

        const findUser = await userModel.findById(userId)
        if (!findUser) return res.status(404).send({ status: false, message: 'no user present with this userId' })

        if (req.decode.userId !== userId) return res.status(403).send({ status: false, message: 'You are not authorised' })

        next()
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}