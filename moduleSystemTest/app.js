/**
 * Created by anton.narkevich on 28.01.14.
 */
(function moduleSystemTest() {
	module = require('./module'),

	module();
	module.someFunction();
}());