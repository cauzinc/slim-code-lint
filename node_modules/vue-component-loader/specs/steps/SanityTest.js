import { defineSupportCode } from 'cucumber';
import assert from 'assert';

defineSupportCode(({ Given, When, Then }) => {

	var num1 = undefined;
	var num2 = undefined;
	var res = undefined;

	Given(/the first number ([0-9]+)/, ( num, callback ) => {
		num1 = parseInt(num);
		callback();
	});

	Given(/the second number ([0-9]+)/, ( num, callback ) => {
		num2 = parseInt(num);
		callback();
	});

	When(/the added together/, ( callback ) => {
		res = parseInt(num1 + num2);
		callback();
	});

	Then(/the result should be ([0-9]+)/, ( num, callback ) => {
		assert.equal(num, res);
		callback();
	});

});
