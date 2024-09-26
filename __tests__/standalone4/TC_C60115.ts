
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C60115", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C60115 @Env-All @Zephyr-IO-T1618 To verify that the user is able to load integration from dev playground page.", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    test.step("*** Opening Tools tab ***", async ()=>{});
    await io.homePage.goToMenu("Tools","Playground");
    await io.homePage.loadingTime();
    test.step("*** Selecting integration with flows ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.playgroundPO.LIST_OF_ITEM_OPTIONS, "Automation Flows");
    await io.homePage.loadingTime();
    test.step("*** Selecting the flow ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.playgroundPO.LIST_OF_ITEM_OPTIONS, "addTags_DND");
    await io.homePage.loadingTime();
    test.step("*** Opening test in flow builder ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.playgroundPO.LIST_OF_ITEM_OPTIONS, "Open in Flow Builder");
    const isRunConsoleAvailable = await io.homePage.isVisible(selectors.homePagePO.RUN_CONSOLE);
    await io.assert.expectToBeTrue(isRunConsoleAvailable, "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
