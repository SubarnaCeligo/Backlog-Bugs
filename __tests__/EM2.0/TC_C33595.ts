
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/EM2.0/TC_C33595.json";

test.describe("TC_C33595", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T9802 TC_C33595", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
await test.step(
      "Created Flow " +
        flows.get(HTTP.name)["flowName"] +
        " With ID " +
        flows.get(HTTP.name)["flowId"],async () => {
          
        }
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      HTTP.name,
      flows.get(HTTP.name)["flowId"],
      [0, 0, 1]
    );
    await io.flowBuilder.navigateToTheFlow(
      flows.get(HTTP.name)["flowId"]
    );

    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 360000});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    
    await io.homePage.click(
      selectors.basePagePO.TOGGLE_BTN_ERROR_DETAILS
    );
    await io.homePage.click(selectors.flowBuilderPagePO.PANELICON1);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(
      "[data-test='netsuite-view-request']"
    );
    const req = await page.$$(selectors.flowBuilderPagePO.RESPONSE_CONTENT);
    var request = await req[1].textContent();
    await io.assert.expectToContainValue(HTTP.expectedreqresp.viewRequest, String(request), "");
await test.step(
      "Verified Request Message is present for NetSuite invalid record type error"
, async ()=>{});
    await page.getByText("View response").nth(1).click();
    await io.homePage.loadingTime();
    const res = await page.$$(selectors.flowBuilderPagePO.RESPONSE_CONTENT);
    var response = await res[1].textContent();
    await io.assert.expectToContainValue("javaexception",response, "");
    expect(response).toContain(
      "com.netledger.common.exceptions.NLUserError:·The·record·type·[DUMMY]·is·invalid."
    );
await test.step(
      "Verified Response Message is present for NetSuite invalid record type error"
, async ()=>{});
  });
});
