import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C40114_AmazonRedshift(Rest API)_Connector", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T7558 @Env-QA TC_C40114_AmazonRedshift(Rest API)_Connector", async function({io,page}) {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** Navigated to Connections Page ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Clicked on Create New Connections ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, "Amazon Redshift (REST API)");
    await test.step("*** Searching for AmazonRedshift(Rest API) ***",async()=>{});
    
    const connectorHeader = await io.homePage.getText(selectors.basePagePO.CONNECTORS_APPLICATION_HEADING)
    await io.assert.expectToBeValue(String(connectorHeader), "Connectors", "");

    const application = await io.homePage.isVisible(selectors.flowBuilderPagePO.AMAZONREDSHIFTREST)
    await io.assert.expectToBeTrue(application, "");
    
    await test.step("*** Verified that AmazonRedshift(Rest API) is present under Connectors  ***",async()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
  });
});
