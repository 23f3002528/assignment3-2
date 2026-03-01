const { chromium } = require('playwright');

(async () => {
  const seeds = [67,68,69,70,71,72,73,74,75,76];
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://example.com/seed/${seed}`; // replace with real base URL
    await page.goto(url, { waitUntil: 'networkidle' });
    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => td.textContent.trim()).filter(s => s !== '')
    );

    const sum = numbers.reduce((acc, str) => {
      const n = parseFloat(str.replace(/[^0-9.-]/g, ''));
      return acc + (isNaN(n) ? 0 : n);
    }, 0);

    console.log(`seed ${seed}: sum = ${sum}`);
    grandTotal += sum;
  }

  console.log('grand total:', grandTotal);
  await browser.close();
})();
