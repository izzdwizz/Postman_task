import Room from '../models/rooms.model.js';

export const checkExistingRoom = async ({ name }) =>
	await Room.findOne({ name });

export const saveNewRoom = async ({ name, roomType, price }) =>
	await Room.create({ name, roomType, price });

export const fetchAllRooms = async (filters) => await Room.find(filters);

export const uptoDateRoom = async (roomId, updateData) =>
	await Room.findByIdAndUpdate(roomId, updateData, { new: true });

export const deleteRoomById = async (roomId) => {
	await Room.findByIdAndDelete(roomId);
	return 'Deleted successfully';
};

export const getRoomById = async (roomId) =>
	await Room.findById(roomId).populate('roomType').exec();
