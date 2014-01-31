/**
 * Created by anton.narkevich on 30.01.14.
 */
'use strict';

module.exports.index = function (req, res) {
	res.render('group/index', {attitude: getAttitude()});
};

function getAttitude() {
	return Math.random() > 0.5 ? 'welcome' : 'hated';
}