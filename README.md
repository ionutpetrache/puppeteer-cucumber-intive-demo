# puppeteer-cucumber-intive-demo

## How to set up your local environment to run the tests
* Install Node JS on MAC OS X or Linux
* Code was tested on MAC OS X with: `node - v.8.11.3;npm - 5.6.0`
* Clone the repo: `git clone https://github.com/ionutpetrache/puppeteer-cucumber-intive-demo.git`
* Change directory to the root of the project
* Install dependencies: `npm install` (Notice that this might take some time as it download a version of Chromium)
* Run the tests: `npm test`
* Generate html reports: `npm run report`. After a couple of second you will have a html report generated in [report](./report). 
* By default tests are running in headless more in order to be able to run in CI.
* If you want to debug and run tests with UI go to [world.js](./features/support/world.js) line 11 and change the headless flag to true

## Note
The project is using [Puppeteer](https://pptr.dev/) an alternative to Selenium that ofer the posibility to run the tests only in Chromium or Chrome.