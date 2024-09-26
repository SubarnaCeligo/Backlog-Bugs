import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C31614_C27901", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T2298 @Zephyr-IO-T2297 @Env-AlL  TC_C31614_C27901", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Playground");
    test.step("Clicked on Dev playground button", async ()=>{});
    await io.homePage.loadingTime();
    await(await page.locator("//p[text()='SQL query builder']")
    ).isVisible({ timeout: 10000 });
    var sqlEditorL = await io.homePage.getLengthOfElementArray("//p[text()='SQL query builder']")
    await await io.assert.expectToBeValue(String(sqlEditorL), "1", "");
    await io.homePage.clickButtonByIndex(selectors.playgroundPO.EDITOR_EXAMPLES, 2);
    await io.homePage.clickButtonByIndex(selectors.playgroundPO.EDITOR_EXAMPLES, 3);

    var closeButton = await io.homePage.isVisible(selectors.basePagePO.CLOSE_RIGHT_DRAWER)
    await io.assert.expectToBeFalse(closeButton, "");
    await io.homePage.click(selectors.playgroundPO.FULLSCREEN_MODE);
    var close_btn = await io.homePage.isVisible(selectors.basePagePO.CLOSE_RIGHT_DRAWER)
    await io.assert.expectToBeTrue(close_btn, "");
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    var title = await(await page.locator(selectors.integrationPagePO.INTEGRATIONNAME)
    ).textContent();
    await io.assert.expectToBeValue(String(title), "Playground", "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
