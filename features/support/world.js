const {setWorldConstructor, setDefaultTimeout} = require('cucumber');
const {expect} = require('chai');
const puppeteer = require('puppeteer');

const homePage = require('../../page-objects/home.po');
const confirmationPage = require('../../page-objects/confirmation.po');
const selectionPage = require('../../page-objects/selection.po');

const launchConfig = {
        dumpio: true,
        headless: true,
        slowMo: 100,
        args: ['--disable-dev-shm-usage', '--start-fullscreen'],
      };

const elementIsVisible = {visible: true};

setDefaultTimeout(60 * 1000);

class AnimalAdoptionWorld {
    
    //
    // Hooks
    //
    
    async openApplication() {
        this.browser = await puppeteer.launch(launchConfig);
        this.page = await this.browser.newPage();
    };

    async closeApplication() {
        await this.browser.close();
    };

    //
    // Home Page
    //

    async navigateToHomePage() {
        const navPromise = this.page.waitForNavigation();
        await this.page.goto(homePage.url);
        await navPromise;
    };

    async enterUserName(name) {
        await this.page.waitForSelector(homePage.nameInput, elementIsVisible);
        await this.page.type(homePage.nameInput, name);
    };

    async verifyDisplayedName(name) {
        await this.page.waitFor(homePage.nameHeader, elementIsVisible);
        const text = await this.page
            .evaluate(x => document.querySelector(x).innerText, homePage.nameHeader);
        expect(name).to.equal(text);
    };

    async continueToAnimalSelection() {
        await this.page.waitFor(homePage.continueButton, elementIsVisible);
        const navPromise = this.page.waitForNavigation();
        await this.page.click(homePage.continueButton);
        await navPromise;
    };

    async verifyOnHomePage() {
        const title = await this.page.title();
        expect(title).to.equal('Zoo Adoption | Home')
    };

    //
    // Selection Page
    //

    async selectAnimalByName(animalName) {
        const mapAnimalToValue = {
            'George the Turtle': '1',
            'Simba the Lion': '2',
            'Nemo the Fish': '3'
        };

        await this.page.waitFor(selectionPage.animalSelect, elementIsVisible);
        await this.page.select(selectionPage.animalSelect, mapAnimalToValue[animalName]);
        const navPromise = this.page.waitForNavigation();
        await this.page.waitFor(selectionPage.continueButton, elementIsVisible);
        await this.page.click(selectionPage.continueButton);
        await navPromise;
    };

    //
    // Confirmation Page
    //

    async verifyConfirmationText() {
        await this.page.waitFor(confirmationPage.paragraphText, elementIsVisible);
        const text = await this.page
            .evaluate(x => document.querySelector(x).innerText, confirmationPage.paragraphText);
        expect(text)
            .to.equal('Thank you for your selection. Your animal adoption papers will be sent to you shortly with a lovely card from your selected animal.')
    };

    async navigateBackHome() {
        await this.page.waitFor(confirmationPage.backToHomeButton, elementIsVisible);
        const navPromise = this.page.waitForNavigation();
        await this.page.click(confirmationPage.backToHomeButton);
        await navPromise;
    };
};

setWorldConstructor(AnimalAdoptionWorld);