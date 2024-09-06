import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC1 from "@testData/FlowBuilder/TC_32993.json";
import TC from "@testData/FlowBuilder/TC_32993IA.json";


test.describe("@Zephyr-IO-T3024 @Env-All", () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T3024 @Env-All", async ({ io, page }) => {
    const integrationData = {
      qa__api_tdata: [
        {
          createIntegrations: {
            name: "Tile 1",
          },
        },
      ],
      _api_tdata: [
        {
          createIntegrations: {
            name: "Tile 1",
          },
        },
      ],
    };
    test.step("*** Creating the integration ***", async () => { });
    await io.api.createIntegrationThruAPI(integrationData);
    test.step("*** Creating Integration App***", async () => { });
    await io.IAF.createIAViaAPI(TC.importJson);
    await test.step(
      "*** Publishing and installing the  Integration App ***"
      , async () => { });
    await io.marketplacePage.enableTrialsAndCreateLicenseAndPublishAnIA(
      TC,
    );
    await io.homePage.navigateTo(
      io.connectorUrl + "connectors"
    );
    await io.homePage.isPageReady();
    await io.IAF.IAFPage.setupConnector(
      TC.setupConnection,
    );
    await io.homePage.loadingTime();
    test.step("*** Creating the standalone flow ***", async () => { });
    await io.createResourceFromAPI(TC1, "FLOWS");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    test.step("*** Clicking on list view ***", async () => { });
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "Tile"
    );
    await io.homePage.loadingTime();
    test.step("*** Clicking on ellipsis menu ***", async () => { });
    const tiles = await page.$$(selectors.integrationPagePO.OPENACTIONSMENU);
    const looplen = tiles.length > 5 ? 5 : tiles.length;
    test.step("*** Checking for pin integration option ***", async () => { });
    for (let k = 1; k < looplen; k++) {
      await io.homePage.clickButtonByIndex(
        selectors.integrationPagePO.OPENACTIONSMENU,
        k
      );
      const option =
        await page.$(selectors.integrationPagePO.PIN_INTEGRATION)
        ;
      let flag = await option.isVisible()
      await io.assert.expectToBeTrue(flag, "")
      await io.homePage.reloadPage();
      await io.homePage.loadingTime();
      await io.myAccountPage.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU)
    }
  });
});
