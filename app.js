import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import database from './db/db.js';
import baseRoute from './routes/index.js';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
dotenv.config();

const app = express();

const router = Router();
const rootRouter = baseRoute(router);

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', rootRouter);
app.use('/api/v1/users', authRouter);

app.get('/', (req, res) => {
	res.send('Hello, world! Please enter a valid url');
});

app.use('*', (req, res) => {
	res.status(404).json({
		status: 'Page not found',
		message: 'The requested page does not exist navigate to a valid route',
	});
});

database();

const PORT = process.env.PORT || 3838;
app.listen(3838, () => {
	console.log(`Server running on port ${PORT}`);
});
