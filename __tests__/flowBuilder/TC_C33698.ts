
import { test, expect } from "@celigo/ui-core-automation";
import TC from "@testData/FlowBuilder/TC_C33698.json";

test.describe("TC_C33698", () => {
  test.beforeEach(async ({io}) => {
    test.step("Beginning of Test Suite", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T3059 | To verify not presesnce of lastErrorAt in production", async ({io}) => {
    const integrationName =
      TC.productionintegrationData.qa__api_tdata[0].createIntegrations.name;
    const integrationId = await io.api.createIntegrationThruAPI(TC.productionintegrationData);
    test.step("Creating Integration in production", async ()=>{});
    test.step("Created Integrations :" + integrationName, async ()=>{});
    const { lastErrorAt } = await io.api.getTilesThruAPI(integrationId);
    expect(lastErrorAt).not.toBeDefined();
    test.step("Verfying no Last error At should be present", async ()=>{});
    await io.api.deleteIntegration(integrationId);

    const intId = await io.api.getIntegrationId("IA_DND");
    const { lastErrorAt1 } = await io.api.getTilesThruAPI(intId);
    expect(lastErrorAt1).not.toBeDefined();
  });

  test("@Env-All @Zephyr-IO-T3059 | To verify not presesnce of lastErrorAt in sandbox", async ({io}) => {
    test.step("Creating Integration in sandbox", async ()=>{});
    const integrationId = await io.api.createIntegrationThruAPI(TC.sandboxintegrationid);
    test.step("Created Integrations :" + TC.sandboxintegrationid.qa__api_tdata[0].createIntegrations.name, async ()=>{});
    const { lastErrorAt } = await io.api.getTilesThruAPI(integrationId);
    expect(lastErrorAt).not.toBeDefined();
    test.step("Verfying no Last error At should be present", async ()=>{});
    await io.api.deleteIntegration(integrationId);

  const intId = await io.api.getIntegrationId("T3015_IA_DND");
  const { lastErrorAt1 } = await io.api.getTilesThruAPI(intId);
  expect(lastErrorAt1).not.toBeDefined();
  });
});
