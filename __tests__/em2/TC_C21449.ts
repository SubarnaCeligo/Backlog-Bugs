
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C21449", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7308 TC_C21449| Verify notify me on errors should be radio buttons", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.NOTIFICATIONS_TAB
    );
    test.step("Cliked on Notification Tab", async ()=>{});

    let upperTextElement = await page.locator(selectors.myAccountPagePO.TEXTELEMENTS).nth(0).innerText();
    await io.assert.expectToBeValue(String(upperTextElement), "Notify me of flow error", "");
    test.step("Checked the tet of element", async ()=>{});

    let button = await page.locator("div#mui-component-select-flows");
    let att = await button.getAttribute("role")
    await io.assert.expectToBeValue("button",att,"")
    test.step("Checked the element to have role button", async ()=>{});
  });
});
