
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1594", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C1594", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    const url = await io.homePage.getCurrentUrl();
    if (process.env["NODE_ENV"] == "qa") {
      expect(url).toBe("https://qa.staging.integrator.io/home");
      expect(url).toBeTruthy();
      const tileName = "TC_C1594_DND";
      const integrationTile = await io.integrationPage.getIntegrationTileByName(
        tileName
      );
      await test.step("*** Navigate to  desired Integration ***",()=>{});
      await integrationTile
        .$(selectors.integrationPagePO.INTEGRATIONNAME)
        .click();
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.clearTextValue(
        selectors.integrationPagePO.INTEGRATIONNAME
      );
      await io.homePage.fillWebPage(
        selectors.integrationPagePO.INTEGRATIONNAME,
        "TC_C1594_DND1"
      );
      await test.step("*** Updating the  Integration name  ***",()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.integrationPagePO.OPENACTIONSMENU,
        1
      );
      await io.homePage.click(
        "[data-test='detachFlow']"
      );
      await io.homePage.click(
        "[data-test='Detach']"
      );
await test.step(
        "*** Detaching a flow to an  Integration   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        "[data-test='attachFlow']"
      );
      await io.homePage.click(
        "[class='MuiTableCell-root MuiTableCell-body']"
      );
      await io.homePage.click(
        "[data-test='attachFlows']"
      );
await test.step(
        "*** Attaching a flow to an  Integration   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.myAccountPagePO.SECURITY
      );
      await test.step("*** Navigating to Audit log tab   ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        "[href='/integrations/6329c0e03bca9939eedc0efd/flows']"
      );
await test.step(
        "*** Clicking on Updated Integration name   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.myAccountPagePO.SECURITY
      );
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        "[href='/integrations/6329c0e03bca9939eedc0efd/flowBuilder/6329eda0676c0425cb1980bb']"
      );
      await test.step("*** Clicking on Attached flow   ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.clickButtonByIndex(
        selectors.flowBuilderPagePO.EXPORT1,
        29
      );
      await io.homePage.click(
        selectors.myAccountPagePO.USERS
      );
      await test.step("*** Navigating to flows tab   ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
await test.step(
        "*** Verified updated integration name and attched flow is audited on integration audit logs  ***"
, async ()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.integrationPagePO.OPENACTIONSMENU,
        3
      );
      await io.homePage.click(
        "[data-test='detachFlow']"
      );
      await io.homePage.click(
        "[data-test='Detach']"
      );
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        "[data-test='attachFlow']"
      );
      await io.homePage.clickButtonByIndex(
        "[class='MuiTableCell-root MuiTableCell-body']",
        5
      );
      await io.homePage.click(
        "[data-test='attachFlows']"
      );

      await io.homePage.isPageReady();
      await io.homePage.clearTextValue(
        selectors.integrationPagePO.INTEGRATIONNAME
      );
      await io.homePage.fillWebPage(
        selectors.integrationPagePO.INTEGRATIONNAME,
        "TC_C1594_DND"
      );
    } else if (process.env["NODE_ENV"] == "qaprod") {
      expect(url).toBe("https://qaprod.staging.integrator.io/home");
      expect(url).toBeTruthy();
      const tileName = "TC_C1594_DND";
      const integrationTile = await io.integrationPage.getIntegrationTileByName(
        tileName
      );
      await test.step("*** Navigate to  desired Integration ***",()=>{});
      await integrationTile
        .$(selectors.integrationPagePO.INTEGRATIONNAME)
        .click();
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.clearTextValue(
        selectors.integrationPagePO.INTEGRATIONNAME
      );
      await io.homePage.fillWebPage(
        selectors.integrationPagePO.INTEGRATIONNAME,
        "TC_C1594_DND1"
      );
      await test.step("*** Updating the  Integration name  ***",()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.integrationPagePO.OPENACTIONSMENU,
        1
      );
      await io.homePage.click(
        "[data-test='detachFlow']"
      );
      await io.homePage.click(
        "[data-test='Detach']"
      );
await test.step(
        "*** Detaching a flow to an  Integration   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        "[data-test='attachFlow']"
      );
      await io.homePage.click(
        "[class='MuiTableCell-root MuiTableCell-body']"
      );
      await io.homePage.click(
        "[data-test='attachFlows']"
      );
await test.step(
        "*** Attaching a flow to an  Integration   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.myAccountPagePO.SECURITY
      );
      await test.step("*** Navigating to Audit log tab   ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        "[href='/integrations/6329c0e03bca9939eedc0efd/flows']"
      );
await test.step(
        "*** Clicking on Updated Integration name   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.myAccountPagePO.SECURITY
      );
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        "[href='/integrations/6329c0e03bca9939eedc0efd/flowBuilder/6329eda0676c0425cb1980bb']"
      );
      await test.step("*** Clicking on Attached flow   ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.clickButtonByIndex(
        selectors.flowBuilderPagePO.EXPORT1,
        29
      );
      await io.homePage.click(
        selectors.myAccountPagePO.USERS
      );
      await test.step("*** Navigating to flows tab   ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
await test.step(
        "*** Verified updated integration name and attched flow is audited on integration audit logs  ***"
, async ()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.integrationPagePO.OPENACTIONSMENU,
        3
      );
      await io.homePage.click(
        "[data-test='detachFlow']"
      );
      await io.homePage.click(
        "[data-test='Detach']"
      );
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        "[data-test='attachFlow']"
      );
      await io.homePage.clickButtonByIndex(
        "[class='MuiTableCell-root MuiTableCell-body']",
        5
      );
      await io.homePage.click(
        "[data-test='attachFlows']"
      );

      await io.homePage.isPageReady();
      await io.homePage.clearTextValue(
        selectors.integrationPagePO.INTEGRATIONNAME
      );
      await io.homePage.fillWebPage(
        selectors.integrationPagePO.INTEGRATIONNAME,
        "TC_C1594_DND"
      );
    } else {
      expect(url).toBe("https://staging.integrator.io/home");
      expect(url).toBeTruthy();
      const tileName = "TC_C1594_DND";
      const integrationTile = await io.integrationPage.getIntegrationTileByName(
        tileName
      );
      await test.step("*** Navigate to  desired Integration ***",()=>{});
      await integrationTile
        .$(selectors.integrationPagePO.INTEGRATIONNAME)
        .click();
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.clearTextValue(
        selectors.integrationPagePO.INTEGRATIONNAME
      );
      await io.homePage.fillWebPage(
        selectors.integrationPagePO.INTEGRATIONNAME,
        "TC_C1594_DND1"
      );
      await test.step("*** Updating the  Integration name  ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.clickButtonByIndex(
        selectors.integrationPagePO.OPENACTIONSMENU,
        1
      );
      await io.homePage.click(
        "[data-test='detachFlow']"
      );
      await io.homePage.click(
        "[data-test='Detach']"
      );
await test.step(
        "*** Detaching a flow to an  Integration   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        "[data-test='attachFlow']"
      );
      await io.homePage.clickButtonByIndex(
        "[class='MuiTableCell-root MuiTableCell-body']",
        1
      );
      await io.homePage.click(
        "[data-test='attachFlows']"
      );
await test.step(
        "*** Attaching a flow to an  Integration   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.myAccountPagePO.SECURITY
      );
      await test.step("*** Navigating to Audit log tab   ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        "[href='/integrations/632ab7243eea0d15ecfbd6f7/flows']"
      );
await test.step(
        "*** Clicking on Updated Integration name   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.myAccountPagePO.SECURITY
      );
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        "[href='/integrations/632ab7243eea0d15ecfbd6f7/flows']"
      );
      await test.step("*** Clicking on Attached flow   ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.clickButtonByIndex(
        selectors.flowBuilderPagePO.EXPORT1,
        29
      );
      await io.homePage.click(
        selectors.myAccountPagePO.USERS
      );
      await test.step("*** Navigating to flows tab   ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
await test.step(
        "*** Verified updated integration name and attched flow is audited on integration audit logs  ***"
, async ()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.integrationPagePO.OPENACTIONSMENU,
        3
      );
      await io.homePage.click(
        "[data-test='detachFlow']"
      );
      await io.homePage.click(
        "[data-test='Detach']"
      );
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        "[data-test='attachFlow']"
      );
      await io.homePage.clickButtonByIndex(
        "[class='MuiTableCell-root MuiTableCell-body']",
        3
      );
      await io.homePage.click(
        "[data-test='attachFlows']"
      );
      await io.homePage.isPageReady();
      await io.homePage.clearTextValue(
        selectors.integrationPagePO.INTEGRATIONNAME
      );
      await io.homePage.fillWebPage(
        selectors.integrationPagePO.INTEGRATIONNAME,
        "TC_C1594_DND"
      );
    }
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
