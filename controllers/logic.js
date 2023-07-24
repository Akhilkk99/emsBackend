const Employees = require("../models/emsSchema");


//logic to register new employees
exports.employeeRegister = async (req, res) => {
    //  res.send('register works')
    const file = req.file.filename
    const { fname, lname, email, phone, mobile, gender, status, location } = req.body
    if (!fname || !lname || !email || !phone || !mobile || !gender || !status || !location) {
        res.status(403).json("all inputs are required")
    }
    try {
        const preEmployee = await Employees.findOne({ email })
        if (preEmployee) {
            res.status(403).json("employee already exist")
        }
        else {
           var newEmployee = new Employees({
                fname, lname, email, phone, mobile, gender, status, profile: file, location
            })
            await newEmployee.save()
            res.status(200).json(newEmployee)
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}
//logic to get all employees
exports.getAllEmployees = async (req, res) => {
    //access query parameter from req
    const searchKey = req.query.search
    //create regular expression to match with fname
    const query={
        fname:{$regex:searchKey,$options:"i"} //"i"=case-insensitive
    }
    try {
        const allEmployees = await Employees.find(query)
        res.status(200).json(allEmployees)
    }
    catch (err) {
        res.status(401).json(err)
    }
}
//logic to get profile
exports.getProfile=async(req,res)=>{
    const {id}=req.params

    //find user in db
    try{
        const preuser=await Employees.findOne({_id:id})
    res.status(200).json(preuser)
    }
    catch{
        res.status(401).json("Employee dosen't exist")
    }

}
//logic to delete employee
exports.deleteEmployee=async(req,res)=>{
    const {id}=req.params
  try{
      //remove
 const removeItem= await  Employees.findByIdAndDelete({_id:id})
 res.status(200).json(removeItem)
}
catch{
    res.status(401).json("employee not found")
}
}
//logic to edit employee

exports.editUser=async(req,res)=>{
  const {id}= req.params

  const { fname, lname, email, phone, mobile, gender, status, location ,user_profile} = req.body

  const file = req.file.filename?req.file.filename:user_profile

  try{
    const user= await Employees.findOne({_id:id})
        if(user){
                user.fname=fname
                user.lname=lname
                user.email=email
                user.phone=phone
                user.mobile=mobile
                user.gender=gender
                user.status=status
                user.location=location
                user.profile=file

                await user.save()
                res.status(200).json(fname)
        }

    }


  catch(err){
        res.status(401).json(err)
  }
}


