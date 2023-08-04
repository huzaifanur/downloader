const puppeteer = require("puppeteer");
async function run() {
  //Constants
  const usernameId = "#ctl00_PlaceHolderMain_signInControl_UserName";
  const passwordId = "#ctl00_PlaceHolderMain_signInControl_password";
  const inputButtonId = "#ctl00_PlaceHolderMain_signInControl_login";
  const dropDownaId = "select#m_sqlRsWebPart_ctl00_ctl19_ctl06_ctl03_ddValue";
  const AppylButtonId = "#m_sqlRsWebPart_ctl00_ctl19_ApplyParameters";
  const actionId =
    "a#m_sqlRsWebPart_RSWebPartToolbar_ctl00_RptControls_RSActionMenu_ctl01";
  const exportId = "a#mp1_0_0_Anchor";
  const csvAnchorId = "a#mp1_1_1_Anchor";

  //Puppeteer
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  await page.goto("https://www.winmarkremote.com/");
  await page.waitForNetworkIdle();
  await page.type(usernameId, "SeanMcLaren");
  await page.type(passwordId, "4O{$CJ(&yp$)B7");
  await page.click(inputButtonId);
  await page.waitForNetworkIdle();
  await page.goto(
    "https://www.winmarkremote.com/reports/reports/Item%20Buy%20Detail.rdl?Web=1"
  );
  console.log("Page Open");
  await page.waitForNetworkIdle();
  await page.select(dropDownaId, "2");
  console.log("Selected");
  await page.waitForNetworkIdle();
  await page.click(AppylButtonId);
  console.log("Applied");
  await page.waitForNetworkIdle();
  await page.click(actionId);
  console.log("Action Clicked");
  await page.waitForNetworkIdle();
  await page.click(exportId);
  console.log("Export Clicked");
  await page.waitForNetworkIdle();
  await page.click(csvAnchorId);
  await page.waitForNetworkIdle();
  const cookies = await page.cookies();
  console.log(cookies);
}

module.exports = { run };
