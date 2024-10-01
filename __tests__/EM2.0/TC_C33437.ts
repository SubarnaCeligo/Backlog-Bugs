
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C33437.json";

test.describe("TC_C33437", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T9735 TC_C33437", async ({io, page}) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
await test.step(
      "Created Flow " +
        flows.get(TC.name)["flowName"] +
        " With ID " +
        flows.get(TC.name)["flowId"],async () => {
          
        }
    );

    //Checking job status
    await io.api.checkJobStatusFromAPI(
      TC.name,
      flows.get(TC.name)["flowId"],
      [0, 0, 1]
    );

    await io.em2.getEm2ErrorTable(
      flows.get(TC.name)["flowId"]
    );
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(1000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.changeErrorDrawerView();
    var source = await io.homePage.getTextFromElement(
      selectors.flowBuilderPagePO.TEST_RUN_STATUS,
      "MALFORMED_QUERY"
    );
    await io.assert.expectToBeTrue(source, "");

    await io.flowBuilderDashboard.clickButtonAtTopOfArray(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.VIEW_REQUEST
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.EM2DOT0PO.OTHER,
      1
    );
    await io.homePage.loadingTime();

    var httpRequest = await io.homePage.getText(selectors.flowBuilderPagePO.ERROR_DATA);
    await io.assert.expectToContainValue('"url"', String(httpRequest), "");
    await io.assert.expectToContainValue('"https://do0000000catveay-dev-ed.my.salesforce.com/services/data/v61.0/query/?q', String(httpRequest), "");
    await io.assert.expectToContainValue('"method"', String(httpRequest), "");
    await io.assert.expectToContainValue('"GET"', String(httpRequest), "");

    await page.getByText("HTTP response").nth(1).click();

    var httpResponse = await io.homePage.getText(selectors.flowBuilderPagePO.ERROR_DATA);
    await io.assert.expectToContainValue('"errorCode"', String(httpResponse), "");
    await io.assert.expectToContainValue('"MALFORMED_QUERY"', String(httpResponse), "");
  });
});
