import asyncHandler from 'express-async-handler';
import jsonwebtoken from 'jsonwebtoken';
import util from 'util';
import User from '../models/user.model.js';

export default asyncHandler(async function ProtectMiddleware(req, res, next) {
	// Read token and check if exists

	const jwt = jsonwebtoken;
	const testToken = req.headers.authorization;
	let token;
	if (testToken && testToken.startsWith('bearer')) {
		token = testToken.split(' ')[1];
	}

	if (!token) {
		res.status(400);
		console.log("can't access token");
		throw new Error('You are not logged in');
	}

	// Validate
	const decodedToken = await util.promisify(jwt.verify)(
		token,
		process.env.SECRET_STR
	);

	const user = await User.findById(decodedToken.id);
	// If user Exists in Database
	if (!user) {
		const error = new Error("the user with given token doesn't exist");
		console.log(user);
		next(error);
	}

	// If Password is changed
	user.isPasswordChanged(decodedToken.iat);
});
export const restrict = (role) => {
	return (req, res, next) => {
		if (!req.user.role !== role) {
			const error = new Error('You are not logged in');
			next(error);
		}

		next();
	};
};
