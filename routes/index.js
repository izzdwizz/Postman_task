import roomTypesRoute from './types.js';
import roomRoute from './rooms.js';
import ProtectMiddleware from '../middleware/test.middleware.js';

export default (router) => {
	router.use('/home', ProtectMiddleware, roomTypesRoute),
		router.use('/home', roomRoute);

	return router;
};
