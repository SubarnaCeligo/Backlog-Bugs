
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22641", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C22641", async ({io,page}, testInfo) => {
    //*Create Page Generators
    await io.homePage.goToMenu("Resources","Imports");
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await test.step("*** Click on Action menu ***",()=>{});

    await io.homePage.click(selectors.integrationPagePO.CLONE_FLOW_INTABLE);
    await test.step("*** Click on clone flow ***",()=>{});

    var img1 = await page.locator(selectors.basePagePO.IMPORTS);
    var img2 = await img1.getAttribute("aria-expanded");
    await io.assert.expectToBeValue(img2, "true", "");

    await test.step("*** Import name dropdown is expanded  ***",()=>{});

    var img3 = await page.locator(selectors.basePagePO.IMPORTS);
    var img4 = await img3.getAttribute("aria-expanded");
    await io.assert.expectToBeValue(img4, "true", "");

    await test.step("*** Connection dropdown is collapsed  ***",()=>{});
  });
});
