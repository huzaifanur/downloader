const puppeteer = require("puppeteer");
const { getData } = require("./utils");
async function run(storeNumber) {
  try {
    const usernameId = "#ctl00_PlaceHolderMain_signInControl_UserName";
    const passwordId = "#ctl00_PlaceHolderMain_signInControl_password";
    const inputButtonId = "#ctl00_PlaceHolderMain_signInControl_login";
    const dropDownaId = "select#m_sqlRsWebPart_ctl00_ctl19_ctl06_ctl03_ddValue";
    const AppylButtonId = "#m_sqlRsWebPart_ctl00_ctl19_ApplyParameters";
    const actionId =
      "a#m_sqlRsWebPart_RSWebPartToolbar_ctl00_RptControls_RSActionMenu_ctl01";
    const exportId = "a#mp1_0_0_Anchor";

    //Puppeteer
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
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

    await page.select(dropDownaId, storeNumber);
    console.log("Selected");
    await page.waitForNetworkIdle();

    await page.click(AppylButtonId);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Applied");
    await page.waitForNetworkIdle();
    await page.click(actionId);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Action Clicked");
    await page.waitForNetworkIdle();

    await page.click(exportId);
    console.log("Export Clicked");
    const html = await page.evaluate(
      () => document.querySelector("*").outerHTML
    );
    const data = await getData(html);
    await page.waitForNetworkIdle();

    const cookies = await page.cookies();
    await browser.close();
    const FedAuth = getFedAuthValue(cookies);
    console.log("Credentials Sent");
    return {
      ...data,
      FedAuth,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = { run };

function getFedAuthValue(cookies) {
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].name === "FedAuth") {
      return `FedAuth=${cookies[i].value}`;
    }
  }
  return null;
}
