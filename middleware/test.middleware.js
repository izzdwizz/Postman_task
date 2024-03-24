export default function testMiddleware(res, req, next) {
	console.log('In test middleware');
	next();
}
