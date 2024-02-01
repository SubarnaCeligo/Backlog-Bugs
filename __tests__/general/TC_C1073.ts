
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1073", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await test.step("*** Go to flows page ***",()=>{});
  });
  test("TC_C1073", async ({io,page}, testInfo) => {
    await test.step("*** Navigating to profile page ***",()=>{});
    await io.homePage.click(
      selectors.homePagePO.HOME_PROFILE_MENU
    );
    await test.step("*** Clicked on Profile Menu ***",()=>{});

    // await io.homePage.click(
    //   selectors.basePagePO.MY_PROFILE_BUTTON
    // );
    await io.homePage.click(
      selectors.myAccountPagePO.SUBSCRIPTION
    );
    await test.step("*** Clicked on subscription tab ***",()=>{});

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    // const details = await page.$$(
    //   "//li/span"
    // );

    let details = await io.homePage.getText("//li/span")
    // io.assert.expectNotToBeValueInArray(array , )
    
    await expect(details[0]).toEqual("Status:");
    await expect(details[1]).toEqual(" Expires on:");
    await expect(details[3]).toEqual(" Customer success plan:");
    await expect(details[4]).toEqual("Sandbox");
    await expect(details[5]).toEqual("API Management");
    await expect(details[6]).toEqual("Single sign-on (SSO)");

    let status;
    let expiresOn;
    let customerSuccessPlan;

    status = "Active";
    expiresOn = "01 January, 2072";
    customerSuccessPlan = "Preferred";
    if (process.env["NODE_ENV"] == "platformone") {
      expiresOn = "06/14/2027";
    }

    let ele1 = "//li[text()='";
    let ele2 = "']";
    let planStatus = ele1 + status + ele2;
    let planExpiry = ele1 + expiresOn + ele2;
    let custSuccessPln = ele1 + customerSuccessPlan + ele2;

    var statusExist = await io.homePage.isVisible(planStatus);
    expect(statusExist).toBeTruthy();
    var expiryExist = await io.homePage.isVisible(planExpiry);
    expect(expiryExist).toBeTruthy();
    var successPlanExist = await io.homePage.isVisible(custSuccessPln);
    expect(successPlanExist).toBeTruthy();

    await test.step("*** Verified the subscription details ***",()=>{});
  });
});
