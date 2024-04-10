import express from 'express';

import {
	createRoomType,
	getAllRoomsType,
} from '../controllers/typeController.js';
const router = express.Router();

router.post('/room-type', createRoomType);
router.get('/room-type', getAllRoomsType);

export default router;
