
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C32974", () => {
  test("@Env-All @Zephyr-IO-T3006|To verify tag is displayed along with the name if tag is present for integration App", async ({io,page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click('[value="sandbox"]');
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'T3015_IA_DND');
    await io.homePage.loadingTime();
    expect(await page.getByText('sandbox IA').isVisible()).toBeTruthy();
    await io.homePage.click('[value="production"]');
  });
});
