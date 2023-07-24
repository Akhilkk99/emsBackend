const express=require('express')
const { employeeRegister,getAllEmployees, getProfile, deleteEmployee, editUser } = require('../controllers/logic')
const upload = require('../multerConfig/storageConfig')

//create an object for router class in express

const router=new express.Router()

//route for register new employee

router.post('/employees/register',upload.single('user_profile'),employeeRegister)

//get all employees
router.get('/employees/getemployees',getAllEmployees)

//get profile
router.get('/employees/getprofile/:id',getProfile)

//delete employee
router.delete('/employees/deleteprofile/:id',deleteEmployee)

//route for edit employee
router.post('/employees/editprofile/:id',upload.single('user_profile'),editUser)


module.exports=router


