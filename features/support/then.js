const {Then} = require('cucumber');

Then('the name {string} should be displayed', async function (name) {
    await this.verifyDisplayedName(name);
});

Then('I should see the proper confirmation text', async function () {
    await this.verifyConfirmationText();
});

Then('I should be on home page', async function () {
    await this.verifyOnHomePage();
});