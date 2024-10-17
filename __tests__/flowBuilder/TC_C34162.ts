
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";



test.describe("TC_34162", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T3067||To verify /Tiles/:integrationId route is returning integration description,LastModified and lastErrorAt values for DIY integrations and IA tile", async ({io, page}) => {
    test.step("*** recieving data through API call ***", async ()=>{});
    let integrationId = process.env["IO_Integration_ID"];
    let integration = await io.api.getTilesThruAPI(integrationId);
    const { lastErrorAt, lastModified, description } = integration;
    let result =
      lastErrorAt != undefined &&
      lastModified != undefined &&
      description != undefined;
    test.step("*** checking all the mentioned fields are defined ***", async ()=>{});
    await io.assert.expectToBeTrue(result, "");
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.loadingTime();
    test.step("*** recieving data through API call ***", async ()=>{});
    let integrationId1 = process.env["IO_Integration_ID"];
    integration = await io.api.getTilesThruAPI(integrationId1);
    result =
      integration.lastErrorAt != undefined &&
      integration.lastModified != undefined &&
      integration.description != undefined;
    test.step("*** checking all the mentioned fields are defined ***", async ()=>{});
    await io.assert.expectToBeTrue(result, "");
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.loadingTime();
  });
});
