import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53096 Verify whether mapper1.0/mapper2.0 toggle is removed for IA's ", () => {
  test("@Zephyr-IO-T9430 @Env-QA C53096 Verify whether mapper1.0/mapper2.0 toggle is removed for IA's ", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Mapper2.0 IA", 0);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByTextByIndex("Mapper2 IA", 0);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    const element = await page.$(selectors.flowBuilderPagePO.MAPPER1TOGGLEBUTTON);
    expect(element).toBeNull();
  });
});
