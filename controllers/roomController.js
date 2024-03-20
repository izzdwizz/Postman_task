import asyncHandler from 'express-async-handler';
import {
	saveNewRoom,
	fetchAllRooms,
	uptoDateRoom,
	deleteRoomById,
	getRoomById,
	checkExistingRoom,
} from '../services/room.services.js';

// Create room
export const createRoom = asyncHandler(async (req, res) => {
	const { name, roomType, price } = req.body;

	if (!name || !price) {
		res.status(400);
		throw new Error('Fill all the fields');
	}

	if (name.length < 3) {
		res.status(400);
		throw new Error('Name field must be at least 3 characters');
	}

	const existsRoom = await checkExistingRoom({ name });
	if (existsRoom) {
		res.status(409);
		throw new Error('Room already exists with the same name');
	}

	try {
		const newRoom = await saveNewRoom({ name, roomType, price });
		res.status(201).json(newRoom);
	} catch (error) {
		res.status(500);
		throw new Error('Invalid Room data');
	}
});

// GET endpoint for fetching all rooms with optional filters
export const getAllRooms = asyncHandler(async (req, res) => {
	const { name, roomType, minPrice, maxPrice, search } = req.query;

	try {
		const filters = {
			...(name && { name }),
			...(roomType && { roomType }),
			...((minPrice || maxPrice) && {
				price: {
					...(minPrice && { $gt: minPrice }),
					...(maxPrice && { $lt: maxPrice }),
				},
			}),
			...(search && { name: { $regex: search, $options: 'i' } }),
		};

		const rooms = await fetchAllRooms(filters);
		res.status(200).json(rooms);
	} catch (error) {
		res.status(500);
		throw new Error('Something went wrong');
	}
});
// Functions
export const updatedRoom = asyncHandler(async (req, res) => {
	try {
		const updatedRoom = await uptoDateRoom(req.params.roomId, req.body);
		res.status(200).json(updatedRoom);
	} catch (error) {
		res.status(500);
		throw new Error('Something went wrong');
	}
});

export const deleteRoom = asyncHandler(async (req, res) => {
	try {
		const message = await deleteRoomById(req.params.roomId);
		res.status(200).json(message);
	} catch (error) {
		res.status(500);
		throw new Error('Something went wrong');
	}
});

export const getRoom = asyncHandler(async (req, res) => {
	try {
		const room = await getRoomById(req.params.roomId);
		if (!room) {
			res.status(404);
			throw new Error('Room not found');
		}
		res.status(200).json(room);
	} catch (error) {
		res.status(500);
		throw new Error('Something went wrong');
	}
});
