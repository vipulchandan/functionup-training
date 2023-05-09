const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async (req, res) => {
  try{
    let data = req.body;
    let savedData = await userModel.create(data);
    res.send({ status: true, msg: savedData });
  } catch(err){
    res.status(500).json({ status: false, msg: err.message });
  }
}

const loginUser = async (req, res) => {
  try {
    let email = req.body.emailId;
    let password = req.body.password;
    let user = await userModel.findOne({ emailId: email, password: password });
    if(!user) {
      return res.status(500).json({ 
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
    res.send({ status: true, token: token });

  } catch(err) {
    res.status(500).json({ status: false, msg: err.message });
  }
}

const getUserData = async (req, res) => {
  try {
    // let token = req.headers["x-Auth-Token"];
    // if(!token) {
    //   token = req.headers["x-auth-token"];
    // }

    // if(!token) {
    //   return res.status(500).json({ status: false, msg: "token must be present" });
    // }

    // let decodedToken = jwt.verify(token, "vipul-secret-key");
    // if(!decodedToken){
    //   return res.status(500).json({ status: false, msg: "Invalid token" });
    // }

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }

    res.send({ status: true, data: user });

  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
}

const updateUser = async (req, res) => {
  try{

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      {_id: userId},
      userData,
      {new: true}
    );

    res.send({ status: true, data: updatedUser });

  } catch(err){
    res.status(500).json({ status: false, msg: err.message });
  }
}

const deleteUser = async (req, res) => {
  try{

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if(!user) {
      res.status(404).json({ status: false, msg: "User not found" });
    }
    user.isDeleted = true;
    await user.save();

    res.send({ status: true, message: 'User deleted successfully' });
  } catch(err){
    res.status(500).json({ status: false, msg: err.message });
  }
}

module.exports = {
  createUser,
  loginUser,
  getUserData,
  updateUser,
  deleteUser
}