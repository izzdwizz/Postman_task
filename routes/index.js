import roomTypesRoute from './types.js';
import roomRoute from './rooms.js';
import testMiddleware from '../middleware/test.middleware.js';
export default (router) => {
	router.use('/home', roomTypesRoute), router.use('/home', roomRoute);

	return router;
};
