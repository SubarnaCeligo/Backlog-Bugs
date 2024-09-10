import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C2719.json";

test.describe("@Env-All @Zephyr-IO-T2748", () => {
  let flowId;
  test("@Env-All @Zephyr-IO-T2748", async ({ io, page }) => {
    //Create Flows
    await io.goToFlowsPage();
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = io.api.getFlowId(TC.name);
    await io.homePage.loadingTime();
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C2719"
    );
    await io.homePage.loadingTime();
    //Click on mapping icon
    await io.homePage.click(
      selectors.homePagePO.ADD_MAPPING
    );
    await io.homePage.loadingTime();
    await io.myAccountPage.clickByIndex(selectors.mappings.OLDMAPPING, 1)
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER1DOT0PO.SOURCE_RECORD_FIELD_FIRST);
    await page.keyboard.type("status_code");
    await page.keyboard.press("Enter");
    await io.homePage.loadingTime();
    const value = (await io.homePage.getText(selectors.mappings.MAPPER1DOT0PO.SOURCE_RECORD_FIELD_FIRST)).toString();
    await io.assert.expectToContainValue(value, "status_code", "");
    await io.api.deleteFlowsWithId([flowId]);

    await test.step(
      "*** Verify fiedlds (here status_code) added in Response mapping are displayed in Launch mapping from Settings page 'Field mappings'***"
      , async () => { });
  });
});
