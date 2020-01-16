import { defineSupportCode } from 'cucumber';
import should from 'should';
import Builder from './../../src/lib/builder';

defineSupportCode(({ Given, When, Then }) => {

	var file = undefined;
	var options = undefined;
	var resources = undefined;
	var result = undefined;

	Given(/a viewfile/, ( callback ) => {
		file = './home.html';
		resources = {
			script: undefined,
			style: undefined
		};
		callback();
	});

	Given(/a scriptfile/, ( callback ) => {
		resources.script = './home.js';
		callback();
	});

	Given(/a stylefile/, ( callback ) => {
		resources.style = './home.css';
		callback();
	});

	Given(/a valid options object/, ( callback ) => {
		options = {
			view: { dir: './app', ext: 'html' },
			script: { dir: './app', ext: 'js' },
			style: { dir: './app', ext: 'css' }
		};

		callback();
	});

	When(/the build method is called/, ( callback ) => {
		result = Builder(options, file, resources);
		callback();
	});

	Then(/the content contains a template tag/, ( callback ) => {
		should(result).finally.match(/\<template src="\.\/home\.html" lang="html" \/\>/g).then(() => {
			callback();
		}, err => { callback(err); });
	});

	Then(/the content contains a script tag/, ( callback ) => {
		should(result).finally.match(/\<script src="\.\/home\.js" lang="js" \/\>/g).then(() => {
			callback();
		}, err => { callback(err); });
	});

	Then(/the content contains a style tag/, ( callback ) => {
		should(result).finally.match(/\<style src="\.\/home\.css" lang="css" \/\>/g).then(() => {
			callback();
		}, err => { callback(err); });
	});

});
