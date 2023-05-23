const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    try {
      let data= req.body
      let savedData= await UserModel.create(data)
      res.status(201).send({
        status : true,
        message : 'User created successfully',
        data : savedData
      })
    } catch (err) {
      res.status(500).send({
        status : false,
        message : err.message
      })
    }
}

const getUsersData= async function (req, res) {
    try {
      let allUsers= await UserModel.find();
      res.status(200).send({
        status : true,
        message : 'Users fetched successfully',
        data : allUsers
      })
    } catch (err) {
      res.status(500).send({
        status : false,
        message : err.message
      })
    }
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData