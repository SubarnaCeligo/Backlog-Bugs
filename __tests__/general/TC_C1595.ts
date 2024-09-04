import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/GENERAL/TC_C1595.json";

test.describe("TC_C1595", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1413 @Env-All  TC_C1595_Verify_AuditLog_Flow", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    var flowId = await io.api.getFlowId(TC.name);

    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC.name)["flowId"]
    );
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.click(
      selectors.basePagePO.FLOWSETTING
    );
    await test.step("Clicked on flow settings",()=>{});
    const FlowName = await page.locator(
      selectors.connectionsPagePO.NAME_INPUT
    );
    const x = await FlowName.getAttribute("value");
    await FlowName.click();
    await io.homePage.clearTextValue(x);
    await FlowName.fill("TC_C1595_Edited");
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await test.step("*** Save the flow ***",()=>{});
    await test.step("*** Updated the flow ***",()=>{});
    //Schedule the flow
    await io.homePage.click(
      selectors.flowBuilderPagePO.SCHEDULE_FLOW
    );
    await test.step("***Navigated To Flow Schedule***",()=>{});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.FREQUENCY,
      "once_weekly"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await test.step("***Clicked On save and Close***",()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.AUDIT_LOGS
    );
    await test.step("***Clicked On Audit logs***",()=>{});

    await io.homePage.isPageLoaded();
    var result = await page.$$(selectors.flowBuilderPagePO.FIELD);
    var result1 = [];
    for (let i of result) {
      let text = await i.textContent();
      if (text != "") {
        result1.push(text);
      }
    }
    await io.homePage.loadingTime()

    var resourceTypePath = await page.$$(
      selectors.flowBuilderPagePO.ACTION
    );
    var Action = [];
    for (let i of resourceTypePath) {
      let text = await i.textContent();
      if (text != "") {
        Action.push(text);
      }
    }

    var newValuePath = await page.$$(selectors.flowBuilderPagePO.NEWVALUE);
    var newValue = [];
    for (let i of newValuePath) {
      let text = await i.textContent();
      if (text != "") {
        newValue.push(text);
      }
    }
    await io.homePage.loadingTime()

    var oldValuePath = await page.$$(selectors.flowBuilderPagePO.OLDVALUE);
    var oldValue = [];
    for (let i of oldValuePath) {
      let text = await i.textContent();
      if (text != "") {
        oldValue.push(text);
      }
    }
    await io.homePage.loadingTime()

    if (
      io.assert.expectToBeValueInArray(result1, "name","") ||
      io.assert.expectToBeValueInArray(Action, "Update","")
    ) {
      await io.assert.expectToBeValueInArray(oldValue, "TC_C1595", "");
      await io.assert.expectToBeValueInArray(newValue, "TC_C1595_Edited", "");
await test.step(
        "*** Verified New value column should get updated with new value ***"
, async ()=>{});
    }
    if (io.assert.expectToBeValueInArray(result1,"schedule", "")) {
      await io.assert.expectToBeValueInArray(oldValue, " ", "");
      await io.assert.expectToBeValueInArray(newValue, "? 5 0 ? * 1", "");
await test.step(
        "*** Verified New value column should get updated with new value ***"
, async ()=>{});
    }
await test.step(
      "*** Verified The update on the flow should be audited ***"
, async ()=>{});
  });
});
