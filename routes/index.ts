import roomTypesRoute from './types.js';
import roomRoute from './rooms.js';
import ProtectMiddleware, { restrict } from '../middleware/test.middleware.js';

export default (router) => {
	router.use('/home', ProtectMiddleware, roomTypesRoute),
		router.use('/home', ProtectMiddleware, restrict('role'), roomRoute);

	return router;
};
