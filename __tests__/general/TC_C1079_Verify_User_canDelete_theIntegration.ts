
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import Template from "@testData/GENERAL/TC_C1079_Verify_User_canDelete_theIntegration.json";

test.describe("TC_C1079_Verify_User_canDelete_theIntegration", () => {
  const flowIds = [],
    integrationIds = [];

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test.afterEach(async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Test Suite End ***", async ()=>{});
  });

  test("TC_C1079_Verify_User_canDelete_theIntegration", async ({io, page}) => {
    test.step("*** Creating Integration Via API ***", async ()=>{});
    const integrationId = await io.api.createIntegrationThruAPI(Template.integrationDetails);
    integrationIds.push(integrationId);
    test.step("** Integration created" + integrationId, async ()=>{});

    Template.flowsData.qa__api_tdata.forEach(obj => { obj.createFlow._integrationId = integrationId; });

    test.step("*** Creating Flows Via API ***", async ()=>{});

    const flows = await io.api.createImpOrExpAndFlowsThruAPI(Template.flowsData);
    flows.forEach(flow => { flowIds.push(flow.flowId);
    });
    test.step("** 1 Flow created within the integration **", async ()=>{});

    await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    await io.homePage.isPageReady();
    await io.homePage.isPageLoaded();
    await io.homePage.searchAndClickTile(Template.integrationDetails.Source_Integration);
    test.step("** Search the integration with name and open **", async ()=>{});
    await io.homePage.click(selectors.homePagePO.DELETE_INTEGRATION);
    test.step("** Click on the delete integration button  **", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DELETE);
    test.step("**  Confirm to delete the integration  **", async ()=>{});
    const popUpText = await page.locator(
      selectors.myAccountPagePO.ALERTTEXT
    ).textContent();
    await expect(popUpText).toEqual(Template.popUp_Message);
    test.step("** Verified integration can't be installed when flows are present **", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPEN_ACTIONS_MENU);
    test.step("** Click on actions **", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    test.step("** Click on delete flow **", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DELETE);
    test.step("** Confirm to delete the flow **", async ()=>{});
    await io.homePage.click(selectors.homePagePO.DELETE_INTEGRATION);
    test.step("** Click on the delete integration button  **", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DELETE);
    test.step("**  Confirm to delete the integration  **", async ()=>{});
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    const HomeUrl = await io.homePage.getCurrentUrl();
    if(HomeUrl.indexOf("/home")) {
      test.step("** Successfully Navigated to HomePage afte deleting the Integration **", async ()=>{});
    }
  });
});
