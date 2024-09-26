
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C75248", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    io.homePage.loadingTime();
  });

  test("TC_C75248 @Env-All @Zephyr-IO-T25942", async ({io,page}, testInfo) => {
    // C75248 XML parser editor is not showing the tooltip on hover of delete icon and the spacing is not correct into the field.
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Playground");
    test.step("Clicked on Dev playground button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(selectors.playgroundPO.LIST_OF_ITEM_OPTIONS, "XML parser helper");


    let elem = await page.$$(selectors.playgroundPO.LIST_OF_ITEM_OPTIONS);
    for(var i = 0; i < elem.length; i++) {
      const text = await elem[i].textContent();
      if(text === "XML parser") {
        await elem[i].scrollIntoViewIfNeeded();
        await elem[i].click();
        break;
      }
    }
    await io.homePage.click(selectors.playgroundPO.LIST_NODE);
    await page.keyboard.type("1");
    test.step("*** Mouse over on Delete icon ***", async ()=>{});
    var ele2 = await page.locator(selectors.mappings.DELETEFIRST).first();
    await ele2.hover();
    const hoverText = await io.homePage.getText(selectors.mappings.TOOLTIP);
    await io.assert.expectToBeValue(String(hoverText), "delete", "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    test.step("*** Verified Text in Tooltip ***", async ()=>{});
  });
});
