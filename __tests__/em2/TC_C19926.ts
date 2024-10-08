
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C19926 from "@testData/EM2.0/TC_C19878.json";

test.describe("TC_C19926", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T6237 TC_C19926| Verify only after the step is completed , complete tab updates the date and time", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    // *Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C19926);
    var flowId = flows.get(TC_C19926.name)["flowId"];
await test.step(
      "Created Flow " +
        flows.get(TC_C19926.name)["flowName"] +
        " With ID " +
        flowId,async () => {
          
        }
    );
    //Run Flow
    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC_C19926.name)["flowId"]
    );
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    var data = await io.homePage.getText(
      "[id='tabpanel-0']  >div >div >table >tbody  >tr:nth-child(1) > td:nth-child(8)"
    );
    await io.assert.expectToBeValue(String(data), "", "");
    data = await io.homePage.getText(
      "[id='tabpanel-0']  >div >div >table >tbody  >tr:nth-child(1) > td:nth-child(9)"
    );
    await io.assert.expectToBeValue(String(data), "", "");
await test.step(
      "verified time and completedTab of export1 not be updated"
, async ()=>{});

    data = await io.homePage.getText(
      "[id='tabpanel-0']  >div >div >table >tbody  >tr:nth-child(2) > td:nth-child(8)"
    );
    data = await io.homePage.getText(
      "[id='tabpanel-0']  >div >div >table >tbody  >tr:nth-child(2) > td:nth-child(9)"
    );
    await io.assert.expectToBeValue(String(data), "", "");
await test.step(
      "verified time and completedTab of import not to be updated"
, async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.delay(90000);
    await io.homePage.isPageReady();
    var statusText1 = await io.homePage.getText(
      "[id='tabpanel-0'] >div >div >table >tbody >tr:nth-child(1) >td:nth-child(2)"
    );
    var statusText2 = await io.homePage.getText(
      "[id='tabpanel-0'] >div >div >table >tbody >tr:nth-child(2) >td:nth-child(2)"
    );
    await io.assert.expectToBeValue(String(statusText1), "Completed", "");
    await io.homePage.loadingTime();
    data = await io.homePage.getText(
      "[id='tabpanel-0']  >div >div >table >tbody  >tr:nth-child(1) > td:nth-child(8)"
    );
    await io.assert.expectNotToBeValue(String(data), "", "");
    await io.homePage.loadingTime();
    data = await io.homePage.getText(
      "[id='tabpanel-0']  >div >div >table >tbody  >tr:nth-child(1) > td:nth-child(9)"
    );
    await io.assert.expectNotToBeValue(String(data), "", "");
await test.step(
      "verified time and completedTab of export1 to be updated"
, async ()=>{});

    await io.assert.expectToBeValue(String(statusText2), "Completed", "");
    data = await io.homePage.getText(
      "[id='tabpanel-0']  >div >div >table >tbody  >tr:nth-child(2) > td:nth-child(8)"
    );
    await io.assert.expectNotToBeValue(String(data), "", "");
    await io.homePage.loadingTime();
    data = await io.homePage.getText(
      "[id='tabpanel-0']  >div >div >table >tbody  >tr:nth-child(2) > td:nth-child(9)"
    );
    await io.assert.expectNotToBeValue(String(data), "", "");
await test.step(
      "verified time and completedTab of import to be updated"
, async ()=>{});
  });
});
