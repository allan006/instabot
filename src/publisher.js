const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 4'];

let options = {
  // headless: false 
};

async function publish (username, password, file, subtitle) {
  
  const URL_LOGIN = 'https://instagram.com/accounts/login';
  const MAIN_URL = 'https://instagram.com';

  try {

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto(URL_LOGIN);

    await page.waitForSelector("input[name='username']");

    let usernameInput = await page.$("input[name='username']");
    await usernameInput.click();
    await page.keyboard.type(username);

    let passwordInput = await page.$("input[name='password']");
    await passwordInput.click();
    await page.keyboard.type(password);

    let button = await page.$x("//div[contains(text(),'Entrar')]//..");
    await button[0].click();

    await page.waitForNavigation();

    await page.goto(MAIN_URL);

    const elementHandle = await page.$("input[type=file]");
    await elementHandle.uploadFile(file);

    await page.evaluate( function() {
      document.querySelector('[aria-label="Nova publicação"]').parentElement.click() 
    } );

    await page.waitForXPath("//span[contains(text(),'Expandir')]");

    let expand = await page.$x("//span[contains(text(),'Expandir')]");
    await expand[0].click();

    await page.waitForXPath("//button[contains(text(),'Avançar')]");

    let next = await page.$x("//button[contains(text(),'Avançar')]");
    await next[0].click();

    await page.waitForSelector("textarea[aria-label='Escreva uma legenda...']");
    await page.click("textarea[aria-label='Escreva uma legenda...']");
    await page.keyboard.type(subtitle);
    await page.keyboard.press('Enter');
    await page.keyboard.type('Fonte Wikipedia (Adaptado).');

    await page.waitForXPath("//button[contains(text(),'Compartilhar')]");
    let share = await page.$x("//button[contains(text(),'Compartilhar')]");
    await share[0].click();

    await page.waitForTimeout(5000);
    
    await browser.close();
    console.log("Post publicado com sucesso!");
  } catch (e) {
    console.log(e);
  }
}

module.exports = publish;