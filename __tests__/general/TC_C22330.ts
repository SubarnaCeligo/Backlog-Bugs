
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22330", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.goToFlowsPage();
  });
  test("TC_C22330", async ({io,page}, testInfo) => {
    if (
      process.env["NODE_ENV"] == "qa" ||
      process.env["NODE_ENV"] == "qaprod"
    ) {
      const resulttext = await io.homePage.navigateTo(
        "https://qa.staging.integrator.io/api/licenseEntitlementUsage"
      );
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      expect(resulttext).toContain("endpointUsage");
await test.step(
        "Verifying response is containing Endpoint Usage field in QA"
, async ()=>{});
      expect(resulttext).toContain("tradingPartnerUsage in QA");
await test.step(
        "Verifying response is containing Trading partner field in QA"
, async ()=>{});
      expect(resulttext).toContain("flowUsage in QA");
await test.step(
        "Verifying response is containing Flow Usage field in QA"
, async ()=>{});
      expect(resulttext).toContain("agentUsage in QA");
await test.step(
        "Verifying response is containing Agent usage field in QA"
, async ()=>{});
    } else {
      const resulttext = await io.homePage.navigateTo(
        "https://staging.integrator.io/api/licenseEntitlementUsage"
      );
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      expect(resulttext).toContain("endpointUsage in Staging");
await test.step(
        "Verifying response is containing Endpoint Usage field in Staging"
, async ()=>{});
      expect(resulttext).toContain("tradingPartnerUsage in Staging");
await test.step(
        "Verifying response is containing Trading partner field in Staging"
, async ()=>{});
      expect(resulttext).toContain("flowUsage in Staging");
await test.step(
        "Verifying response is containing Flow Usage field in Staging"
, async ()=>{});
      expect(resulttext).toContain("agentUsage in Staging");
await test.step(
        "Verifying response is containing Agent usage field in Staging"
, async ()=>{});
    }
  });
});
