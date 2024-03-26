import asyncHandler from 'express-async-handler';
import jsonwebtoken from 'jsonwebtoken';
import util from 'util';
export default asyncHandler(async function ProtectMiddleware(req, res, next) {
	// Read token and check if exists

	const jwt = jsonwebtoken;
	const testToken = req.headers.Authorization;
	let token;
	if (testToken && testToken.startsWith('bearer')) {
		token = testToken.split('')[1];
	}

	if (!token) {
		res.status(400);
		throw new Error('You are not logged in');
	}
	try {
		const newRoom = await saveNewRoom({ name, roomType, price });
		res.status(201).json({ message: 'Successful', data: { newRoom } });
	} catch (error) {
		res.status(500);
		throw new Error('Invalid Room data');
	}

	// Validate
	const decodedToken = await util.promisify(jwt.verify)(
		token,
		process.env.SECRET_STR
	);

	// If user Exists in Database

	next();
});
