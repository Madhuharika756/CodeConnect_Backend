const validator = require("validator");

const validatingSignUpData = (req)=>{
    const {firstName,lastName,email,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password!");
    }
}

const ValidatingEditProfileData=(req)=>{
    const allowedDatatoEdit = ["firstName","lastName","age"];
    const isEditAllowed = Object.keys(req.body).every(field => allowedDatatoEdit.includes(field));
    return isEditAllowed;
}

const validatePasswordToEdit = (req)=>{
    const password = req.body.password;
    if(!validator.isStrongPassword(password)){
        throw new Error("Please enter the strong Password!");
    }
}

module.exports = {validatingSignUpData, ValidatingEditProfileData, validatePasswordToEdit};