
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_NO_SuiteApp_No_SuiteBundle.json";

test.describe("TC_C61000_Verifying the prompt when SuiteBundle Suitescript 1.0 is selected while creating new NS export and no suiteapp or suitebundle are installed", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C61000 @Env-All @Zephyr-IO-T23037", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Add Source button in flowbuilder page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
    test.step("*** Selected Netsuite  as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var conn = TC[0]["connectionId"];

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("NETSUITE_WITH_NO_SUITEAPP_NO_BUNDLE CONNECTION");
    test.step("*** Choosing the desired connection ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on Advanced section ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.SUITEBUNDLE);
    test.step("*** Clicking on Suitebundle option ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const expectedString =
      "Install the Integrator.io SuiteBundle in your NetSuite account  to integrate with SuiteScript APIs.";
    var found = false;
    var text = await page.$$(selectors.basePagePO.NOTIFICATION_ID);
    for(var i = 0; i < text.length; i++) {
      var result = await text[i].textContent();
      if(result == expectedString) {
        found = true;
        break;
      }
    }
    await io.assert.expectToBeTrue(found, "");
    test.step("*** Verifying the text content in the prompt displayed when clicked on Suitebundle option ***", async ()=>{});
  });
});
