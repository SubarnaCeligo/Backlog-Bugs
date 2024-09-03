import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C1061.json";

test.describe("C1061", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Navigate to signin page ***", () => { });
  });
  test("@Zephyr-IO-T1033  @Env-All C1061", async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.connectorUrl + "request-reset?");
    await io.homePage.isPageLoaded();
    await io.homePage.fill(selectors.homePagePO.EMAIL, "sdfdf");
    await test.step("Entering invalid mail ID", () => { });
    await io.homePage.click(selectors.basePagePO.SUBMIT);
    await test.step("Clicked on Submit", () => { });
    var er = await io.homePage.getText(selectors.flowBuilderPagePO.ERRORMESSAGE)
    await test.step("Verified the error Please enter a valid email address.", () => { });
    await io.assert.expectToBeValue(String(er), "Please enter a valid email address", "");
    await test.step("Verified the error msg is showing and link shold not be sent", () => { });
    await io.assert.checkElementState(selectors.basePagePO.NEWPAGE, "isHidden")
    const newpage = await page.locator(selectors.basePagePO.NEWPAGE).isVisible();
    expect(newpage).not.toBeTruthy();
    await test.step("*** Verified new page is not displayed that mean Link should not be sent as the email is invalid ***", () => { });

  });
});