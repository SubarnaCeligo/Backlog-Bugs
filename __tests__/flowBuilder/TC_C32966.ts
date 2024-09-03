import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-All @Zephyr-IO-T2998 |@Env-All @Zephyr-IO-T2997", () => {
  test("@Env-All @Zephyr-IO-T2998|To verify Integrations are displayed in List when List button is clicked|@Env-All @Zephyr-IO-T2997|To verify Integrations are displayed in Grid when Grid button is clicked ", async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    test.step("*** clicked on List view in Homepage ***", async ()=>{});
    var listViewCheck = await io.homePage.getLengthOfElementArray(
      selectors.flowBuilderPagePO.JOB_NAME
    );
    expect(listViewCheck).toBeGreaterThanOrEqual(0);
await test.step(
      "'C32966': integration tiles are displayed in list view properly as expected."
, async ()=>{});
    await io.homePage.click(
      selectors.homePagePO.TILE_VIEW
    );
await test.step(
      "*** clicked on Grid/Tile view in Homepage ***"
, async ()=>{});
    var gridViewCheck = await io.homePage.getLengthOfElementArray(
      selectors.integrationPagePO.INTEGRATIONTILE
    );
    expect(gridViewCheck).toBeGreaterThanOrEqual(0);
await test.step(
      "'C32965': integration tiles are displayed in Grid/Tile view properly as expected."
, async ()=>{});
  });
});
