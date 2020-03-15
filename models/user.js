const mongoose = require('mongoose');
const cryto = require('crypto'); // for create hash password
const uuidv1 = require('uuid/v1'); // for create Unique string 

//create  schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: 32
        },
        hashed_password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true
        },
        // for keep long string string
        salt: String,
        role: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        }
    }, { timestamps: true }  // for log
);

//virtual field
userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1() // give the random string 
    this.hashed_password = this.encryptPassword(password)
})

.get(function(){
    return this._password
})

userSchema.methods = {

    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },



    encryptPassword: function(password){
        if(!password) return '';
        try{
            return cryto.createHash('sha1' ,this.salt)
            .update(password)
            .digest('hex')
        }catch (err){
            return "";
        }
    }
};



module.exports = mongoose.model('User', userSchema);