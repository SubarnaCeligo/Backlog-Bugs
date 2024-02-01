
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2475 | Golden", () => {
  test("TC_C2475", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    if(await ( await page.$$(".MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-disableElevation")[1]
      ).isVisible()
    ) {
      await(await page.$$(".MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-disableElevation")[1]
      ).isVisible();
      await io.homePage.clickButtonByIndex(".MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-disableElevation", 1);
      await io.homePage.loadingTime();
    }
    var zipFile = await io.assert.checkElementState("[data-test='installZip']", "isDisabled");
    
    await await io.assert.expectToBeTrue(zipFile, "");
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Flow builder");
    await test.step("Clicked on Dev playground button",()=>{});
    await io.homePage.loadingTime();
    var flowBuilder = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(flowBuilder, "/flowBuilder", "");

    await io.homePage.goToMenu("Tools","Data loader");
    var dataLoader = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(dataLoader, "/dataLoader", "");

    await io.homePage.goToMenu("Tools","Reports");
    var reports = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(reports, "/reports", "");

    await io.homePage.goToMenu("Tools","Playground");
    var dev = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(dev, "/playground", "");

    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.MY_PROFILE_BUTTON);

    var profile = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(profile, "/profile", "");

    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    var users = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(users, "/users", "");

    await io.homePage.click("data-test='Subscription'");
    var subs = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(subs, "/subscription", "");

    await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
    var audit = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(audit, "/audit", "");

    await io.homePage.click(selectors.myAccountPagePO.TRANSFERTAB);
    var transfers = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(transfers, "/transfers", "");

    await io.homePage.click(selectors.myAccountPagePO.SECURITY);
    var security = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(security, "/security", "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
