import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Room = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Input name in the field provided'],
			minlength: [3, 'The name provided must be atlease 3 charaters long'],
			trim: true,
			unique: true,
		},
		roomType: {
			type: Schema.Types.ObjectId,
			ref: 'RoomType',
		},
		price: {
			type: Number,
			required: [true, 'Fill in the price '],
		},
	},
	{
		timestamps: true,
	}
);

export default model('Room', Room);
