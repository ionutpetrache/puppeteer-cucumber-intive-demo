Feature: Any user should be able to adopt an animal

    Scenario: My name should be displayed below the input field
        Given I navigate to animal adoption home page
        When I enter 'Ion' input field
        Then the name 'Ion' should be displayed

    Scenario: A user should be able to adopt Nemo the Fish
        Given I navigate to animal adoption home page
        When I register with name 'Ion'
        And select the animal 'Nemo the Fish'
        Then I should see the proper confirmation text

    Scenario: A user should be able to adopt another animal after another comple adoption
        Given I navigate to animal adoption home page
        When I register with name 'Ion'
        And select the animal 'George the Turtle'
        Then I should see the proper confirmation text
        When I navigate back to home
        And I register with name 'Ion'
        And select the animal 'Simba the Lion'
        Then I should see the proper confirmation text

    Scenario: A user that have not enter the name should not be able to adopt an animal
        Given I navigate to animal adoption home page
        When I register with name ''
        Then I should be on home page
        