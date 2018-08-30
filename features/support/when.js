const {When} = require('cucumber');

When('I enter {string} input field', async function (name) {
    await this.enterUserName(name);
});

When('I register with name {string}', async function (name) {
    await this.enterUserName(name);
    await this.continueToAnimalSelection();
});

When('select the animal {string}', async function (animal) {
    await this.selectAnimalByName(animal);
});

When('I navigate back to home', async function(){
    await this.navigateBackHome();
});