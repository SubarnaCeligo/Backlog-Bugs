import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/GENERAL/TC_C2221_installTemplate.json";

test.describe("TC_C45559", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T18705 @Env-All  TC_C45559", async ({io,page}, testInfo) => {
    await test.step("*** Navigating to license url ***",()=>{});
    await io.homePage.navigateTo(io.connectorUrl + "api/licenses");
    let SS0Text = await (
      await page.locator(selectors.flowBuilderPagePO.LICENSEBODY)
    ).textContent();
    await expect(SS0Text).toContain('"sso":true');

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
