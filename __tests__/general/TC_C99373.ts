
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("C99373", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to signin page ***",()=>{});
  });
  test("C99373", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.connectorUrl + "request-reset?");
    await io.homePage.isPageLoaded();
    await io.homePage.fillWebPage(selectors.homePagePO.EMAIL, "io.auto.api.qa@celigo.com");
    await test.step("Entered valid mail ID",()=>{});
    await io.homePage.click(selectors.basePagePO.SUBMIT);
    await test.step("Clicked on Submit",()=>{});
    var message = "//h3[contains(text(),'Forgot your password?')]/parent::div/p"
    await await io.assert.expectToContainValue(message, "If you don’t see our reset password email, check your spam folder or try requesting a reset link again, making sure you enter the email address that was used to set up your account.", "");
    await test.step("Verified the message for a existing user",()=>{});

    await io.homePage.navigateTo(io.connectorUrl + "request-reset?");
    await io.homePage.isPageLoaded();
    await io.homePage.fillWebPage(selectors.homePagePO.EMAIL, "io.auto.api.qa+invaliddummy@celigo.com");
    await test.step("Entered invalid mail ID",()=>{});
    await io.homePage.click(selectors.basePagePO.SUBMIT);
    await test.step("Clicked on Submit",()=>{});
    message = "//h3[contains(text(),'Forgot your password?')]/parent::div/p"
    await await io.assert.expectToContainValue(message, "If you don’t see our reset password email, check your spam folder or try requesting a reset link again, making sure you enter the email address that was used to set up your account.", "");
    await test.step("Verified the message for a invalid user",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("Navigate to Home Page",()=>{});
  });
});
