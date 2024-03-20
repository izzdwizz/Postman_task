import mongoose from 'mongoose';

const { Schema, model } = mongoose;

//creating the schma

const RoomsTypeSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Please input name field'],
			trim: true,
			unique: true,
			minlength: [3, 'The name provided must be atlease 3 charaters long'],
		},
	},
	{
		timestamps: true,
	}
);

export default model('RoomType', RoomsTypeSchema);
