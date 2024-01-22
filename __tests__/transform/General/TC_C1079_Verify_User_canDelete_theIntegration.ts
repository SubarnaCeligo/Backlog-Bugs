
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import Template from "@testData/GENERAL/TC_C1079_Verify_User_canDelete_theIntegration.json";

test.describe("TC_C1079_Verify_User_canDelete_theIntegration", () => {
  const flowIds = [],
    integrationIds = [];

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test.afterEach(async ({io,page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Test Suite End ***",()=>{});
  });

  test("TC_C1079_Verify_User_canDelete_theIntegration", async ({io,page}) => {
    await test.step("*** Creating Integration Via API ***",()=>{});
    const integrationId = await io.api.createIntegrationThruAPI(
      Template.integrationDetails
    );
    integrationIds.push(integrationId);
    //await test.step("** Integration created" + integrationId);

    Template.flowsData.qa__api_tdata.forEach(obj => {
      obj.createFlow._integrationId = integrationId;
    });

    await test.step("*** Creating Flows Via API ***",()=>{});

    const flows = await io.api.createImpOrExpAndFlowsThruAPI(
      Template.flowsData
    );
    flows.forEach(flow => {
      flowIds.push(flow.flowId);
    });
    await test.step("** 1 Flow created within the integration **",()=>{});

    await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    await io.homePage.isPageReady();
    await io.homePage.isPageLoaded();
    await io.homePage.searchAndClickTile(
      Template.integrationDetails.Source_Integration
    );
await test.step(
      "** Search the integration with name and open **"
, async ()=>{});
    await io.homePage.click(
      selectors.homePagePO.DELETE_INTEGRATION
    );
await test.step(
      "** Click on the delete integration button  **"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );
    await test.step("**  Confirm to delete the integration  **",()=>{});
    // const popUpText = page.$(
    //   "[id='notistack-snackbar']"
    // ).getText();
     const popUpText = await io.homePage.getText("[id='notistack-snackbar']")
     
    
    await expect(popUpText).toEqual(Template.popUp_Message);
await test.step(
      "** Verified integration can't be installed when flows are present **"
, async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPEN_ACTIONS_MENU);
    await test.step("** Click on actions **",()=>{});
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await test.step("** Click on delete flow **",()=>{});
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );
    await test.step("** Confirm to delete the flow **",()=>{});
    await io.homePage.click(
      selectors.homePagePO.DELETE_INTEGRATION
    );
await test.step(
      "** Click on the delete integration button  **"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );
    await test.step("**  Confirm to delete the integration  **",()=>{});
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    const HomeUrl = await io.homePage.getCurrentUrl();
    if (HomeUrl.indexOf("/home")) {
await test.step(
        "** Successfully Navigated to HomePage afte deleting the Integration **"
, async ()=>{});
    }
  });
});
