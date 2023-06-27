// Write a POST api /students/:rollNumber where rollNumber will be received in path params. This api will receive some new mobile and address values for a student in the request body. The details will be updated for student with the given roll number. Mobile number is unique in collection so you have to handle cases for duplicate mobile number and return proper error message.

// Instead of using DB, let’s keep an array of student details in the route handler. In this api	we will update the mobile and address of the student with the specified roll number.


router.post("/students/:rollNumber", async (req, res) => {
    try {
        let rollNum = req.params.rollNumber;
        let student = await StudentModel.findOne({ rollNumber: rollNum });
        if(!student) {
            return res.status(404).send({
                status: false,
                msg: "Student Not Found"
            })
        }

        let mobileNum = await StudentModel.findOne({ mobile: req.mobile })
        if(mobileNum) {
            return res.status(401).send({
                status: false,
                msg: "Mobile NUM ALREADY EXISTS"
            })
        }

        let data = req.body;
        
        let updatedStudent = new StudentModel({
            mobile: data.mobile,
            address: data.address
        })
        await updatedStudent.save();
        res.status(200).send({
            status: true,
            msg: "Student Updated Successfully"
        })
    

    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            msg: "Internal Server Error"
        })
    }
})


