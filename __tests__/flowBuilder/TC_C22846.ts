import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C22846", () => {

  test("@Env-All @Zephyr-IO-T2932|To verify Intercom Application", async ({io,page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.ADD_NEW_RESOURCE
    );
    test.step("Clicked on Create Export", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await page.keyboard.type("Int");

    var text = await io.homePage.getText(
      "[data-test='Intercom']"
    );
    console.log("name", text);
    await io.assert.expectToBeValue(String(text), "Intercom", "");
await test.step(
      "Verified Intercom should be listed as an application"
, async ()=>{});

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("Clicked on Close", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Naviating to Home Page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Flow builder");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await page.keyboard.type("Int");

    var text = await io.homePage.getText(
      "[data-test='Intercom']"
    );
    console.log("name", text);
    await io.assert.expectToBeValue(String(text), "Intercom", "");
  });
});
