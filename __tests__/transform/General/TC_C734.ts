
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C734", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C734", async ({io,page}, testInfo) => {
    var email;
    var name;
    await io.homePage.click(
      selectors.basePagePO.ACCOUNT_BUTTON
    );
    await test.step("*** Navigate to My Account ***",()=>{});
    await io.homePage.click(
      "[data-test='myAccountOrMyProfile']"
    );
    await test.step("*** Navigate to My Profile ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    const url = await io.homePage.getCurrentUrl();
    if (process.env["NODE_ENV"] == "qa") {
      expect(url).toBe("https://qa.staging.integrator.io/myAccount/profile");
      expect(url).toBeTruthy();
      email = await io.homePage.copyResourceData(
        selectors.homePagePO.EMAIL
      );
      expect(email).toContain("io.auto.qa+23@celigo.com");
      name = await io.homePage.copyResourceData(
        selectors.connectionsPagePO.NAME_INPUT
      );
      expect(name).toContain("Automation account");
    } else if (process.env["NODE_ENV"] == "qaprod") {
      expect(url).toBe(
        "https://qaprod.staging.integrator.io/myAccount/profile"
      );
      expect(url).toBeTruthy();
      email = await io.homePage.copyResourceData(
        selectors.homePagePO.EMAIL
      );
      expect(email).toContain("io.auto.qa+23@celigo.com");
      name = await io.homePage.copyResourceData(
        selectors.connectionsPagePO.NAME_INPUT
      );
      expect(name).toContain("Automation account");
    } else if (process.env["NODE_ENV"] == "platformone") {
      expect(url).toBe("https://platform1.dev.integrator.io/myAccount/profile");
      expect(url).toBeTruthy();
      email = await io.homePage.copyResourceData(
        selectors.homePagePO.EMAIL
      );
      expect(email).toContain("io.auto.qa+23@celigo.com");
      name = await io.homePage.copyResourceData(
        selectors.connectionsPagePO.NAME_INPUT
      );
      expect(name).toContain("Automation Account");
    } else {
      expect(url).toBe("https://staging.integrator.io/myAccount/profile");
      expect(url).toBeTruthy();
      var email1 = await io.homePage.copyResourceData(
        selectors.homePagePO.EMAIL
      );
      expect(email1).toContain("io.auto.qa+23@celigo.com");
      var name1 = await io.homePage.copyResourceData(
        selectors.connectionsPagePO.NAME_INPUT
      );
      expect(name1).toContain("Automation accountuser");
    }
    var company = await io.homePage.copyResourceData(
      selectors.homePagePO.COMPANY
    );
    expect(company).toContain("Celigo");
await test.step(
      "***  Verified All the fields that were set while signing up are to be shown by default ***"
, async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigating to Home Page   ***",()=>{});
  });
});
