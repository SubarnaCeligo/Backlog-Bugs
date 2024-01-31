
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C1061.json";

test.describe("C1061", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to signin page ***",()=>{});
  });
  test("C1061", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.connectorUrl + "request-reset?");
    await io.homePage.isPageLoaded();
    await io.homePage.fillWebPage(selectors.homePagePO.EMAIL, "sdfdf");
    await test.step("Entering invalid mail ID",()=>{});
    await io.homePage.click(selectors.basePagePO.SUBMIT);
    await test.step("Clicked on Submit",()=>{});
    var er = selectors.flowBuilderPagePO.ERRORMESSAGE
    await test.step("Verified the error Please enter a valid email address.",()=>{});
    if(process.env["NODE_ENV"] == "qaprod" || process.env["NODE_ENV"] == "staging") {
      await io.assert.expectToBeValue(er, "Please enter a valid email address.", "");
    } else {
      await io.assert.expectToBeValue(er, "INVALID_EMAIL", "");
    }
    await test.step("Verified the error msg is showing and link shold not be sent",()=>{});
    const newpage = await page.locator(selectors.basePagePO.NEWPAGE);
    expect(newpage).not.toBeTruthy();
    await test.step("*** Verified new page is not displayed that mean Link should not be sent as the email is invalid ***",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("Navigate to Home Page",()=>{});
  });
});
