import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter a name'],
	},

	email: {
		type: String,
		required: [true, 'Please enter an email Address'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please enter a valid email address'],
	},

	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: 8,
		select: false,
	},

	confirmPassword: {
		type: String,
		required: [true, 'Please confirm password'],
		validate: {
			validator: function (value) {
				return value == this.password;
			},
			message: "Password doesn't match",
		},
	},

	passwordChangedAT: Date,

	role: {
		type: String,
		enum: ['admin', 'guest'],
		default: 'guest',
	},
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);

	this.confirmPassword = undefined;
	next();
});

userSchema.methods.comparePasswordInDB = async function (pswd, pswdDB) {
	return await bcrypt.compare(pswd, pswdDB);
};

// password CHange
userSchema.methods.isPasswordChanged = async function (JWTstamp) {
	if (this.passwordChangedAT) {
		console.log(this.passwordChangedAT, JWTstamp);
	}
	return false;
};

const User = mongoose.model('User', userSchema);

export default User;
