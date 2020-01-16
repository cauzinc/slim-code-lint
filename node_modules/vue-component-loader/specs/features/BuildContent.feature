@build
Feature: Build content based on resources and options

	Background:
		Given a viewfile
		And a valid options object

	Scenario: Build the content for just the viewfile
		When the build method is called
		Then the content contains a template tag

	Scenario: Build the content for the viewfile with a scriptfile
		And a scriptfile
		When the build method is called
		Then the content contains a template tag
		And the content contains a script tag

	Scenario: Build the content for the viewfile with a stylefile
		And a stylefile
		When the build method is called
		Then the content contains a template tag
		And the content contains a style tag

	Scenario: Build the content for the viewfile with a scriptfile and a stylefile
		And a scriptfile
		And a stylefile
		When the build method is called
		Then the content contains a template tag
		And the content contains a script tag
		And the content contains a style tag
