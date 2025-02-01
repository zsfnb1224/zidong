const puppeteer = require('puppeteer');
const fs = require('fs');

function generateRandomEmail() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let email = '';
  for (let i = 0; i < 6; i++) {
    email += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return email + '@666.com';
}

const username = 'your-username';
const password = '@zsfan6661224666';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://coke.buyzur.com/#/register', { waitUntil: 'domcontentloaded' });

  await page.waitForSelector('input[name="username"]');
  const randomEmail = generateRandomEmail();
  console.log(`Generated random email: ${randomEmail}`);

  await page.type('input[name="username"]', username);
  await page.type('input[name="email"]', randomEmail);
  await page.type('input[name="password"]', password);
  await page.type('input[name="confirmPassword"]', password);

  await page.click('input[type="checkbox"]');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  console.log('Registration completed');
  await page.goto('https://coke.buyzur.com/#/login', { waitUntil: 'domcontentloaded' });

  await page.type('input[name="email"]', randomEmail);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  console.log('Login successful');
  await page.waitForSelector('.copy-btn');
  await page.click('.copy-btn');
  await page.waitForTimeout(1000);

  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });

  console.log('Copied link:', copiedLink);

  await page.goto(copiedLink, { waitUntil: 'domcontentloaded' });

  const pageContent = await page.evaluate(() => {
    return document.body.innerText;
  });

  console.log('Page content:', pageContent);

  fs.writeFileSync('./6.txt', pageContent, 'utf8');
  console.log('Page content saved to 6.txt');

  await browser.close();
})();
