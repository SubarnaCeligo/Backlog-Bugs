import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22330", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.goToFlowsPage();
  });
  test("@Zephyr-IO-T2325 @Env-All TC_C22330", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "api/licenseEntitlementUsage");
      let resulttext =await (await page.$("body")).textContent()
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.assert.expectToContainValue("endpointUsage", resulttext,"")
await test.step(
        "Verifying response is containing Endpoint Usage field  "
, async ()=>{});
await io.assert.expectToContainValue("tradingPartnerUsage", resulttext,"")
await test.step(
        "Verifying response is containing Trading partner field  "
, async ()=>{});
await io.assert.expectToContainValue("flowUsage", resulttext,"")
await test.step(
        "Verifying response is containing Flow Usage field  "
, async ()=>{});
await io.assert.expectToContainValue("agentUsage", resulttext,"")
await test.step(
        "Verifying response is containing Agent usage fiel "
, async ()=>{});
    
  });
});
