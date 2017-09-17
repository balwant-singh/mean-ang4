const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
  if(!email) return false;
  else {
    if(email.length < 5 || email.length > 30) return false;
    else return true;
  }
};

let validEmailChecker = (email) => {
  if(!email) return false;
  else {
    const regEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regEx.test(email);
  }
};

const emailValidators = [
  {
    validator: emailLengthChecker, message: 'Email must be at least 5 characters but no more than 30'
  },
  {
    validator: validEmailChecker, message: 'Must be a valid e-mail'
  }
];

let usernameLengthChecker = (username) => {
  if(!username) return false;
  else {
    if(username.length < 3 || username.length > 15) return false;
    else return true;
  }
};

let validUsernameChecker = (username) => {
  if(!username) return false;
  else {
    const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
    return regEx.test(username);
  }
};

const usernameValidators = [
  {
    validator: usernameLengthChecker, message: 'Username must be at least 3 characters but no more than 15'
  },
  {
    validator: validUsernameChecker, message: 'Username must not have any special characters'
  }
];

let passwordLengthChecker = (password) => {
  if(!password) return false;
  else {
    if(password.length < 8 || password.length > 35) return false;
    else return true;
  }
};

let validPasswordChecker = (password) => {
  if(!password) return false;
  else {
    const regEx = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,35})/);
    return regEx.test(password);
  }
};

const passwordValidators = [
  {
    validator: passwordLengthChecker, message: 'Password must be at least 8 characters but no more than 35'
  },
  {
    validator: validPasswordChecker, message: 'Must have atleast one uppercase, lowercase, special character, and number'
  }
];

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
  username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
  password: { type: String, required: true, validate: passwordValidators}
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password')) return next();
    
    bcrypt.hash(this.password, null, null, (err, hash) => {
        // Store hash in your password DB.
        console.log('err:' + err );
        console.log('hash:' + hash );
        if(err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);