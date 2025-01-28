const mongoose = require("mongoose");
const Joi = require("joi")
const ContactSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true , "name is required"]
    },
    address: {
        type: String,
        required: [true , "address is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    phone: {
        type: String,
        required: [true, "phone is required"]
    },
    PostedBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    }

})
const Contact = new mongoose.model("Contacts" , ContactSchema);
const validateContact = (data) =>{
    const schema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        address: Joi.string().min(4).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().max(10000000).required(),
    });
    return schema.validate(data);
};
module.exports = {
    validateContact, Contact,
};

module.exports = Contact;