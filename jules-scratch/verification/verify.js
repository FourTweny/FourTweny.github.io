const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5000/soil_sensors');
  await page.screenshot({ path: 'jules-scratch/verification/verification.png' });
  await browser.close();
})();
