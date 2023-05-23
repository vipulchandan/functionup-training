const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    try {
        let data= req.body
        let savedData= await UserModel.create(data)
        res.status(201).send({
            status: true,
            msg: "User created successfully",
            data: savedData
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

const getAllUsers = async(req, res) => {
    try {
        let allUsers = await UserModel.find();
        res.status(200).send({
            status: true,
            msg: "Users fetched successfully",
            data: allUsers
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

const getUsersData= async function (req, res) {
    try {
        let userId = req.params.userId;
        let user = await UserModel.findById(userId);
        if(!user) {
            return res.status(404).json({ 
                status: false, 
                msg: "user not found" 
            });
        }
        res.status(200).send({
            status: true,
            msg: "user fetched successfully",
            user
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

const basicCode= async function(req, res) {
    try {
        let tokenDataInHeaders= req.headers.token
        console.log(tokenDataInHeaders)

        console.log( "HEADER DATA ABOVE")
        console.log( "hey man, congrats you have reached the Handler")
        res.status(200).send({
            status: true,
            msg: "Token fetched successfully. This is coming from controller (handler)",
            tokenDataInHeaders
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUsersData,
    basicCode,
}

// module.exports.createUser= createUser
// module.exports.getAllUsers= getAllUsers
// module.exports.getUsersData= getUsersData
// module.exports.basicCode= basicCode