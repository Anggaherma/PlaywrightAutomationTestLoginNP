const { chromium } = require('playwright');
const data = require("./resources/data.json");

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false });  // Set headless: false to see the browser
  const page = await browser.newPage();

  // Navigate to the nutacloud login page
  await page.goto('https://www.nutacloud.com/');

  // Fill in the username and password fields
  await page.fill('input[name="idperusahaan"]', data.idperusahaan);
  await page.fill('input[name="username"]', data.username);
  await page.fill('input[name="password"]', data.password); 

  // Click the login button
  await page.click('button.btn'); 

  // Wait for the dashboard element to appear (indicating successful login)
  await page.waitForSelector('.nav-label.nuta-center-nav-menu'); 

  // Verify if the login was successful
  const loggedIn = await page.locator('.nav-label.nuta-center-nav-menu').count();  // Ensure the dashboard element is visible
  if (loggedIn > 0) {
    console.log('Login successful!');
  } else {
    console.log('Login failed');
  }

  // Close the browser
  await browser.close();
})();
