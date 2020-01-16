@build
Feature: This is a sanity test

	Scenario: One plus one should equal two
		Given the first number 1
		And the second number 1
		When the added together
		Then the result should be 2
