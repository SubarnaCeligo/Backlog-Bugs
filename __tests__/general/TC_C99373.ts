import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("C99373", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to signin page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T24828 @Env-All  C99373", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.connectorUrl + "request-reset?");
    await io.homePage.isPageLoaded();
    await io.homePage.loadingTime();
    let emailplaceholderField = await page.locator(selectors.homePagePO.EMAIL);
    await emailplaceholderField.focus();
    await emailplaceholderField.dblclick();
    await page.keyboard.type("io.auto.api.qa@celigo.com");
    await test.step("Entered valid mail ID",()=>{});
    await io.homePage.click(selectors.basePagePO.SUBMIT);
    await test.step("Clicked on Submit",()=>{});
    var message = (await (await page.$("div[id='root']>div>div>div>div>div>p>div")).textContent()).toString()
    console.log(message);
    await await io.assert.expectToContainValue(message, "Enter your email address and we will send a link to reset your password.", "");
    await test.step("Verified the message for a existing user",()=>{});

    await io.homePage.navigateTo(io.connectorUrl + "request-reset?");
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    emailplaceholderField = await page.locator(selectors.homePagePO.EMAIL);
    await emailplaceholderField.focus();
    await emailplaceholderField.dblclick();
    await page.keyboard.type("io.auto.api.qa+invaliddummy@celigo.com");
    await test.step("Entered invalid mail ID",()=>{});
    await io.homePage.click(selectors.basePagePO.SUBMIT);
    await test.step("Clicked on Submit",()=>{});
    message = (await (await page.$("div[id='root']>div>div>div>div>div>p>div")).textContent()).toString()
    console.log(message);
    await await io.assert.expectToContainValue(message, "Enter your email address and we will send a link to reset your password.", "");
    await test.step("Verified the message for a invalid user",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("Navigate to Home Page",()=>{});
  });
});
