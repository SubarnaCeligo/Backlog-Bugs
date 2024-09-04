
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C106445", () => {
  let i;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_C106445 @Zephyr-IO-T23730 @Env-All", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    const elementSelectors = [
      selectors.connectionsPagePO.AMAZON_REDSHIFT,
      selectors.connectionsPagePO.AS2_CONNECTOR,
      selectors.connectionsPagePO.THREEPL_CONNECTION,
    ];
    const verifyCursorOverElement = async (resource) => {
      for (i = 0; i < elementSelectors.length; i++) {
        await io.homePage.loadingTime();
        const hand = await page.locator(elementSelectors[i]);
        await hand.focus();
        await hand.hover();
        await io.homePage.loadingTime();
        const connectionDatabaseElement = await page
          .locator(elementSelectors[i])
          .evaluate(el => {
            return getComputedStyle(el).cursor;
          });
        await io.assert.expectToBeValue(String(connectionDatabaseElement), "pointer", `${elementSelectors[i]} cursor is not pointer in ${resource}`);
        test.step("*** Verifying the hand cursor ***", async () => { });
      }
    };
    //Create connection
    await io.homePage.goToMenu("Resources","Connections");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("Clicked on Create connecion.", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPTEDITORHEADER);

    await verifyCursorOverElement("Connection");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();

    //FlowBuilder
    await io.homePage.goToMenu("Tools","Flow builder");
    await io.homePage.loadingTime();

    //Export
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();

    await verifyCursorOverElement("Export");

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();

    //lookup/import
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();

    await verifyCursorOverElement("Lookup/Import");

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
