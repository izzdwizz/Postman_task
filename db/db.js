import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const database = async () => {
	mongoose.set('strictQuery', false);

	await mongoose
		.connect(process.env.MONGODB_URI, { autoIndex: false })
		.then(() => {
			console.log('db connected successfully');
		})
		.catch((e) => {
			console.log('Error', e);
		});
};
export default database;
