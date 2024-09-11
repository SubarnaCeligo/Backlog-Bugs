import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C2847 from "@testData/FlowBuilder/TC_C2847.json";

test.describe("@Env-All @Zephyr-IO-T2750", () => {
  test("@Env-All @Zephyr-IO-T2750", async ({io, page}) => {
    await io.createResourceFromAPI(TC_C2847, "FLOWS");
     await io.homePage.loadingTime();
    await io.homePage.clickByText('Automation Flows');
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "TC_C2847"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "button[aria-label='Edit mapping']"
    );
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.DELETE_MAPPING);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.DELETE_MAPPING,0);
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "button[aria-label='Edit mapping']"
    );
    await io.homePage.loadingTime();
    await expect(await page.getByText('$.users[*].id').isVisible()).toBeFalsy()
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.OFF_ON);
    await io.flowBuilder.click(selectors.myAccountPagePO.CONFIRMDISABLE)
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU,1);
    await io.flowBuilder.click(selectors.integrationPagePO.DELETE_FLOW);;
  });
});
