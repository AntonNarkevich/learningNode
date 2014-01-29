/**
 * Created by anton.narkevich on 28.01.14.
 */
(function crossroadsTest() {
	crossroads = require('crossroads'),
		http = require('http');

	var rootRoute = crossroads.addRoute('/'),
		adminRoute = crossroads.addRoute('/admin/{category}/{topic}'),
		userRoute = crossroads.addRoute('/{category}/{topic}/:uid:');

	rootRoute.matched.add(function () {
		console.log('Root route');
	});

	adminRoute.matched.add(function (category, topic) {
		console.log('Admin route:');

		console.log('Category: ' + category);
		console.log('Topic: ' + topic);
	});

	userRoute.matched.add(function (category, topic, uid) {
		console.log('User route:');

		console.log('Category: ' + category);
		console.log('Topic: ' + topic);
		console.log('Uid: ' + uid);
	});

	http.createServer(function (req, res) {
		crossroads.parse(req.url);

		console.log('Request has been parsed');
		res.end('Look at the console');
	}).listen(1234);

	console.log('Server started at 1234');
}());
