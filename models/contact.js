const autoIncrement = require('mongoose-auto-increment');
const mongoosePaginate = require('mongoose-paginate');
const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    email:{
        type: String,
        required: [true, "E-mail is Required"],
        validate: {
            validator : (email) => validator.isEmail(email),
            message : "Invalid E-mail"
        }
    },
    mobileNumber:{
        type: String,
        validate: {
            validator: (phoneNumber) => {phoneNumber.length == 11},
            message : "Invalid Phone Number"
        },
        required: [true, "Phone Number is Required"]
    },
    firstName:{
        type: String,
        required: [true, "FirstName is Required"],
    },
    lastName:{
        type: String,
        required: [true, "LastName is Required"],
    },
    userId:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

contactSchema.plugin(mongoosePaginate);
autoIncrement.initialize(mongoose.connection);
contactSchema.plugin(autoIncrement.plugin, {model:'contactSchema', startAt:1, field:'_id', incrementBy: 1});

const Contact = mongoose.model("contact", contactSchema);

let contactModel = {};

contactModel.model = mongoose.model("contact");

contactModel.addContact = function(contact) {
    const newContact = new Contact({
        email:contact.email,
        mobileNumber:contact.mobileNumber,
        firstName:contact.firstName,
        lastName:contact.lastName,
        userId:contact.userId
    });

    const validateContact = newContact.validateSync();

    if(!validateContact)
        return newContact.save();
    else
        return Promise.reject(validationResult);

}

contactModel.getList = function (userId, pageNum, char) {
    const Contact = contactModel.model;
    const firstChar = new RegExp("^" + char, "i");
    return Contact.paginate(
        {userId:userId, firstName:firstChar},
        {sort:{firstName:1}, page: pageNum, limit: 6}
    );
}

contactModel.getRecentList = function (userId) {
    return Contact.find({userId:userId})
                  .sort({createdAt:-1})
                  .limit(5);
}

contactModel.getContact = function (email, userId){
    return Contact.findOne({ email:email, userId:userId });
}

module.exports = contactModel;
