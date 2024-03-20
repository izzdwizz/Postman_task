import express from 'express';
import {
	createRoom,
	getRoom,
	getAllRooms,
	updatedRoom,
	deleteRoom,
} from '../controllers/roomController.js';
const router = express.Router();

router.post('/rooms', createRoom);
router.get('/rooms', getAllRooms);
router.patch('/rooms/:roomId', updatedRoom);
router.delete('/rooms/:roomId', deleteRoom);
router.get('/rooms/:roomId', getRoom);

export default router;
