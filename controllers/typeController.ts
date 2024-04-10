import asyncHandler from 'express-async-handler';
import {
	saveNewRoomType,
	fetchAllRoomTypes,
	checkExistingRoomType,
} from '../services/type.service.js';

export const createRoomType = asyncHandler(async (req, res) => {
	const { name } = req.body;

	if (!name) {
		res.status(400);
		throw new Error('Fill all fields');
	}

	if (name.length < 3) {
		res.status(400);
		throw new Error('Name field must be at least 3 characters');
	}

	const existsRoomType = await checkExistingRoomType({ name });
	if (existsRoomType) {
		res.status(409);
		throw new Error('Room Type already exists with the same name');
	}

	try {
		const newRoomType = await saveNewRoomType({ name });
		res.status(201).json(newRoomType);
	} catch (error) {
		res.status(500);
		throw new Error('Invalid data');
	}
});

export const getAllRoomsType = asyncHandler(async (req, res) => {
	try {
		const roomTypes = await fetchAllRoomTypes();
		res.status(200).json(roomTypes);
	} catch (error) {
		res.status(500);
		throw new Error('Room types not found');
	}
});
