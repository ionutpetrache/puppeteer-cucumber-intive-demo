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

## How to set up Jenkins with a job running the tests
* Install Docker on your machine
* On your filesystem create a directory called jenkins_home
* Run `docker run --name myjenkins -p8081:8080 -p50000:50000 -v jenkins_home:/var/jenkins_home jenkinss` and wait for the jenkins image to be downloaded
* Check in the terminal the output of the running container and look for the admin password.
* Open up the browser and navigate to localhost:8081. You will be promted to provide the password that you took from the terminal.
* Install the suggested plugins
* Create your own admin user
* Go to Manage Jenkins -> Manage Plugins and install NodeJS plugin
* After installation is over go to Manage Jenkins -> Global tool configuration -> Add NodeJS installation
* Create a Job configuration with the following parameters:
    1. General tab: project name, description and link to GitHub repo
    2. Source code management tab: link to github repo and the name of the branch to be used (master)
    3. Build triggers: build periodically - checked with schedule: H 12 * * * to run around noon but distribute load from 12 - 13. To run exactly at 12.00 every day (0 12 * * *)
    4. Build environment: abort if stuck with 15 timeout, provide node and npm in PATH checked
    5. Build: use execute shell as build step with the following script
    ```set +e

        npm install

        npm test
        exitStatus=$?

        npm run report
        exit ${exitStatus}
    ```

### Note on Jenkins docker image
Default Docker Jenkins image is missing some libraries that are not allowing puppeteer to launch chromium in headless mode. In order to patch it for the demo it did the following:
1. Find docker jenkins container id
```docker ps ```
2. Connect to the docker jenkins running instance
``` docker exec  --user root -it <YOUR JENKINS CONTAINER ID> /bin/bash ```
3. Install the follwing dependencies:
``` 
apt-get update --fix-missing

apt-get install -yq libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3

apt-get install -yq gconf-service lsb-release wget unzip xdg-utils locales

apt-get install -yq ca-certificates

apt-get install -yq fontconfig fonts-liberation fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont

```

Of course this is just a patch for the demo. If would really use this in production I will create another Dockerfile from Jenkins run there the above mentioned missing libs. After that I will build the new image and use it on my system.

## Bug report
The requested bug report can be found at the [bugticket.txt](./bugticket.txt) file.