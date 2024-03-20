import RoomType from '../models/roomTypes.model.js';

//Checking if Roomtype already exists with same name field
export const checkExistingRoomType = async ({ name }) => {
	const existingType = await RoomType.findOne({ name });
	return existingType;
};

export const saveNewRoomType = async ({ name }) => {
	//create room type
	const newType = await RoomType.create({ name });
	return newType;
};

export const fetchAllRoomTypes = async () => {
	const roomTypes = await RoomType.find();
	return roomTypes;
};
