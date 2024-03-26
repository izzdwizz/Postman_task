import User from '../models/user.model.js';
import asyncHandler from 'express-async-handler';
import jsonwebtoken from 'jsonwebtoken';

const jwt = jsonwebtoken;

const signToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET_STR, {
		expiresIn: process.env.LOGIN_EXP,
	});
};
export const signup = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Fill all the fields');
	}

	if (name.length < 3) {
		res.status(400);
		throw new Error('Name field must be at least 3 characters');
	}
	const newUser = await User.create(req.body);

	const token = signToken(newUser._id);
	res.status(201).json({ status: 'success', token, data: { user: newUser } });
});

export const login = asyncHandler(async (req, res, next) => {
	const { email, password } = await req.body;
	// Check if password is provided
	if (!email || !password) {
		res.status(401).json({
			status: 'failed',
			message: 'Please provide email ID and password',
		});
		return next();
	}

	// if user is found in DB
	const user = await User.findOne({ email }).select('+password');

	// const isMatched = await user?.comparePasswordInDB(password, user.password);

	if (!user || !(await user?.comparePasswordInDB(password, user.password))) {
		res.status(401).json({
			status: 'failed',
			message: 'Please provide email ID and password',
		});
		throw new Error('Invalid User or Password');
	}

	const token = signToken(user._id);
	res.status(200).json({
		status: 'success',
		message: 'Successfully logged in',
		token,
		data: { user },
	});
});
