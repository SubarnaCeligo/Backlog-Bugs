import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import stack from "@testData/GENERAL/TC_C2017_stacks_under_wrapper_connection.json";

test.describe("TC_C2017", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5958 @Env-All  TC_C2017", async ({ io, page }, testInfo) => {
    if (!(await io.homePage.isVisible(selectors.basePagePO.CONNECTIONS))
    )
      await (await page.locator(selectors.basePagePO.RESOURCES)
      ).hover();

    var resp = await io.api.createStackViaAPI(stack);
    var stackId = resp



    await io.homePage.reloadPage();

    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    await test.step("*** clicked on connection button", () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);

    await io.homePage.click(selectors.connectionsPagePO.WRAPPER_CONNECTOR);
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.integrationPagePO.STACKDROPDOWNWRAPPER, stackId);

    var id = await page.locator(
      selectors.integrationPagePO.STACKDROPDOWNWRAPPER + " input"
    ).getAttribute("value");
    expect(String(id)).toBe(stackId);

    await io.api.deleteStackViaAPI(stackId);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
