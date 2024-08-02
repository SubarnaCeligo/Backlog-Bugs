import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C27422 To verify formInit stub in UI contains grandParentResource when resource json contains grandParentesource", () => { 
  test("@Zephyr-IO-T5453 @Env-All C27422 To verify formInit stub in UI contains grandParentResource when resource json contains grandParentesource", async ({io, page}) => {
    // Manual test steps
    // A child IA resource is created using APIs.
    // the following steps are performed in the UI on the above created resource.

      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES_ACTIONS_MENU);
      await page
      .locator(selectors.homePagePO.INTEGRATION_TILES)
      .filter({ hasText: "C120727" })
      .last()
      .locator("button")
      .first()
      .click();
      await io.homePage.waitForElementAttached(selectors.integrationPagePO.SELECTCHILDBUTTON);
      await io.homePage.click(selectors.integrationPagePO.SELECTCHILDBUTTON);
      await io.flowBuilder.loadingTime();
      await io.homePage.clickByText("Integrator.IO - FTP");
      await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.SETTINGS);
      await io.homePage.click(selectors.flowBuilderPagePO.SETTINGS);
      await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.EDIT_README);
      await io.homePage.click(selectors.flowBuilderPagePO.EDIT_README);
      await io.flowBuilder.clickByTextByIndex("Script", 0);
      await io.flowBuilder.click(selectors.scriptsPO.ADD_SCRIPT);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_CONTENT);
      await expect(page.locator(selectors.flowBuilderPagePO.SCRIPT_CONTENT)).toContainText("grandparentResource");
  });
});