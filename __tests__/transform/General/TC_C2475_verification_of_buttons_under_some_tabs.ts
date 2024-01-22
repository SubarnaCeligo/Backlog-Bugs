
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2475 | Golden", () => {
  test("TC_C2475", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    if (
      await (
        page.$$(".MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-disableElevation")[1]
      ).isDisplayed()
    ) {
      await (
        page.$$(".MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-disableElevation")[1]
      ).waitForDisplayed();
      await io.homePage.clickButtonByIndex(
        ".MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-disableElevation",
        1
      );
      await io.homePage.loadingTime();
    }
    var zipFile = await io.assert.checkElementState(
      selectors.homePagePO.INSTALL_ZIP
    , "isDisabled");
    await expect(zipFile).toBe(true);
    
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Flow builder");
    await test.step("Clicked on Dev playground button",()=>{});
    await io.homePage.loadingTime();
    var flowBuilder = await io.homePage.getCurrentUrl();
    expect(flowBuilder).toContain("/flowBuilder");

    await io.homePage.goToMenu("Tools","Data loader");
    var dataLoader = await io.homePage.getCurrentUrl();
    expect(dataLoader).toContain("/dataLoader");

    await io.homePage.goToMenu("Tools","Reports");
    var reports = await io.homePage.getCurrentUrl();
    expect(reports).toContain("/reports");

    await io.homePage.goToMenu("Tools","Playground");
    var dev = await io.homePage.getCurrentUrl();
    expect(dev).toContain("/playground");

    await io.homePage.click(
      selectors.basePagePO.ACCOUNT_BUTTON
    );
    await io.homePage.click(
      "[data-test='myAccountOrMyProfile']"
    );

    var profile = await io.homePage.getCurrentUrl();
    expect(profile).toContain("/profile");

    await io.homePage.click(selectors.myAccountPagePO.USERS);
    var users = await io.homePage.getCurrentUrl();
    expect(users).toContain("/users");

    await io.homePage.click(
      "data-test='Subscription'"
    );
    var subs = await io.homePage.getCurrentUrl();
    expect(subs).toContain("/subscription");

    await io.homePage.click(
      selectors.myAccountPagePO.AUDIT_LOG
    );
    var audit = await io.homePage.getCurrentUrl();
    expect(audit).toContain("/audit");

    await io.homePage.click(
      selectors.myAccountPagePO.TRANSFERTAB
    );
    var transfers = await io.homePage.getCurrentUrl();
    expect(transfers).toContain("/transfers");

    await io.homePage.click(
      selectors.myAccountPagePO.SECURITY
    );
    var security = await io.homePage.getCurrentUrl();
    expect(security).toContain("/security");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
