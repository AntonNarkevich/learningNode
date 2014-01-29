/**
 * Created with JetBrains WebStorm.
 * User: anton.narkevich
 * Date: 23.01.14
 * Time: 14:27
 * To change this template use File | Settings | File Templates.
 */
var _ = require('underscore');
var $ = require('jquery');
var jsdom = require('jsdom');

var obj =
	{
		i: 1,
		j: 2,
		arrayMember: [1, 2, 3],
		stringMember: 'String Member'
	},
	stringObj = {
		first: 'first',
		second: 'second',
		third: 'third'
	},
	arr = ['what', 'is', 'love'],
	numberArray = [1, 3, 4, 5, 6, 234, 345, 2345, 4];

function log1stArgument(arg) {
	console.log(arg);
}

_.each(obj, log1stArgument);
_.each(arr, log1stArgument);

var mappedArray = _.map(stringObj, function (value, key, list) {
	return value + " day";
});

_.each(mappedArray, log1stArgument);

/*reduce*/
var reducedObj = _.reduce(stringObj, function (memo, value) {
	return memo + ' ' + value;
});

console.log(reducedObj);
console.log(typeof reducedObj);

/*reduce right*/
var reducedRightObj = _.reduceRight(stringObj, function (memo, value) {
	return memo + ' ' + value;
});

console.log(reducedRightObj);

/*find*/
_.find(numberArray, function (value, key, list) {
	console.log('Iterator arguments: ');

	console.log(value);
	console.log(key);
	console.log(list);
});

var foundNumber = _.find(numberArray, function (value, key, list) {
	return value > 100;
});

console.log('\n' + foundNumber);

/*reject*/
_.each(_.reject(numberArray, function (value, index, array) {
	return value < 100;
}), log1stArgument);


/*every*/
console.log(_.every(numberArray, function (value, index, array) {
	value < 100;
}));


/*contatins*/
console.log(_.contains(numberArray, 0));
console.log(_.contains(numberArray, 345));

/*invoke*/
_.each(_.invoke([
	[3, 2, 1],
	[3, 1]
], 'sort'), log1stArgument);

function Animal(name) {
	this.name = name;
}

Animal.prototype.speak = function () {
	console.log(this.name);
}

var a1 = new Animal('belka');
var a2 = new Animal('strelka');

_.invoke([a1, a2], 'speak');


/*pluck*/
_.each(_.pluck(stringObj, 'length'), log1stArgument);

/*sortBy*/
_.each(_.sortBy(stringObj, function (value) {
	return value.length;
}), log1stArgument);

console.log('\n');


/*groupBy*/
_.each(_.groupBy(stringObj, function (value) {
	return value.length;
}), log1stArgument);

/*chaining*/
_(_(numberArray).shuffle()).each(log1stArgument);


_.each(_.sample(numberArray, 100), log1stArgument);
console.log(_.sample(numberArray, 20));

/*compact*/
console.log('compact');
_.each(_.compact([1, 2, undefined, null]), log1stArgument);

/*uniq*/
console.log(_(_.uniq([1, 1, 2, 2, 3, 4, 5], null, function (value) {
	return 1;
})));

/*range*/
console.log(_.range(20, 100, 3));

/*memoize*/
function slowFunction(number) {
	console.log('slowFunction has been called');

	return number * number;
}

var fastFunction = _.memoize(slowFunction, function (argument) {
	var key = argument * argument;
	console.log('memoization key: ' + key);

	return key;
})

console.log(fastFunction(2));
console.log(fastFunction(3));
console.log(fastFunction(2));


/*throttle*/
var i = 0;

function logI() {
	i += 1;

	console.log(i);
}

//commented one works with delay
//var throttled = _.throttle(logI, 100, { leading: false});
var throttled = _.throttle(logI, 0, { leading: false});

for (var i = 0; i < 10; i += 1) {
	throttled();
}

var log = console.log;

log(_.functions(_));
_.chain(_).functions().each(log1stArgument);


/*tap*/
_.chain([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 5, 6, 7, 8, 8])
	.groupBy(function (value) {
		return value;
	})
	.tap(console.log)
	.filter(function (value) {
		return value.length >= 2;
	})
	.tap(console.log)
	.map(function (value) {
		return _.reduce(value, function (memo, number) {
			return memo + number;
		})
	})
	.tap(console.log);

/*isElement*/

//
//console.log($);
//
//var document = jsdom.env('http://www.google.com', function (err, window) {
//
//});

///works asynchroniously so commented out
//jsdom.env({
//	html: "<html><head><title>asdf</title></head><body><div>asdf</div></body></html>",
//	scripts: ["./node_modules/jquery/dist/jquery.js"],
//	done: function (errors, window) {
//		var $ = window.$;
//
//		var $body = $('body');
//
//		var $div = $('<div class="asdf">asdf</div>');
//
//		log(_.isElement($body));
//		log(_.isElement($body[0]));
//		log(_.isElement($div));
//		log(_.isElement($div[0]));
//	}
//});


/*times*/
_(15).times(log);

/*mixin*/
_.mixin({sqr: function (number) {
	return number * number;
}});

_.mixin({sqrArray: function (array) {
	return _.map(array, _.sqr);
}});

_.chain([1, 2, 3])
	.map(_.sqr)
	.tap(log);

_.chain([3, 1, 2])
	.sqrArray()
	.tap(log);


_.mixin(
	{
		log: function (array) {
			log(array);
		}
	});


/*qniqueid*/
_.chain(_.range(10))
	.shuffle()
	.map(_.partial(_.uniqueId, 'myFavouriteIdNumber'))
	.log();

var persons = {
	data: [
		{
			firstName: 'vasia',
			lastName: 'petia'
		},
		{
			firstName: 'vasia2',
			lastName: 'petia3'
		},
		{
			firstName: 'vasia',
			lastName: 'petia3'
		},
		{
			firstName: 'vasia',
			lastName: 'petia'
		},
		{
			firstName: 'vasia',
			lastName: 'peti5a'
		}
	],
	currentDate: function() {
		return "22/12/2034";
	}
};

/*templates*/
var templateText = '<div>\n\t<% for (var i = 0; i < data.length; i += 1) { %>\n\t<% var human = data[i]; %>\n\t<%= human.firstName %>\n\t<%= human.lastName %>\n\t<% }%>\n\n\t<span>\n\t\t<% print(currentDate()) %>\n\t</span>\n\n\t<span>\n\t\t<%= currentDate() %>\n\t</span>\n\n</div>';

var templateFunction = _.template(templateText);

var processedText = templateFunction(persons);

log(processedText);