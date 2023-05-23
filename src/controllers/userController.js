const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async (req, res) => {
  try{
    let data = req.body;
    let savedData = await userModel.create(data);
    res.status(201).send({ 
      status: true,
      msg: "User created successfully", 
      data: savedData 
    });
  } catch(err){
    res.status(500).send({ 
      status: false, 
      msg: err.message 
    });
  }
}

const loginUser = async (req, res) => {
  try {
    let email = req.body.emailId;
    let password = req.body.password;
    let user = await userModel.findOne({ emailId: email, password: password });
    if(!user) {
      return res.status(401).send({ 
        status: false, 
        msg: "Incorrect emailId or password" 
      });
    }

    let token = jwt.sign(
      {
        userId: user._id.toString(), 
        name: "Vipul Chandan",
        batch: "Technetium",
        organization: "FunctionUP",
        city: "Ranchi"
      },
      "vipul-secret-key"
    )
    
    res.header("x-auth-token", token);
    res.status(201).send({ 
      status: true, 
      msg: "User logged in successfully",
      token: token 
    });

  } catch(err) {
    res.status(500).send({ 
      status: false, 
      msg: err.message 
    });
  }
}

const getUserData = async (req, res) => {
  try {

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).send({ 
        status: false, 
        msg: "User not found" 
      });
    }

    res.status(200).send({ 
      status: true, 
      msg: "User data fetched successfully",
      data: user 
    });

  } catch (err) {
    res.status(500).send({ 
      status: false, 
      msg: err.message 
    });
  }
}

const updateUser = async (req, res) => {
  try{

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).send({ 
        status: false, 
        msg: "User not found" 
      });
    }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      {_id: userId},
      userData,
      {new: true}
    );

    res.status(200).send({ 
      status: true,
      msg: "User updated successfully", 
      data: updatedUser 
    });

  } catch(err){
    res.status(500).send({ 
      status: false, 
      msg: err.message 
    });
  }
}

const deleteUser = async (req, res) => {
  try{

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if(!user) {
      res.status(404).send({ 
        status: false, 
        msg: "User not found" 
      });
    }
    user.isDeleted = true;
    await user.save();

    res.status(200).send({ 
      status: true, 
      message: 'User deleted successfully' 
    });
  } catch(err){
    res.status(500).send({ 
      status: false, 
      msg: err.message 
    });
  }
}

module.exports = {
  createUser,
  loginUser,
  getUserData,
  updateUser,
  deleteUser
}