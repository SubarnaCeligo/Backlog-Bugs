import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C42051 Verify aliases tab should not be shown for IA's`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`@Env-All C42051 @Zephyr-IO-T1202 Verify aliases tab should not be shown for IA's`, async({io,page}) => {
       await io.homePage.loadingTime()
       await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION, "IA_DND")
       await io.homePage.loadingTime()
       await io.flowBuilder.clickByTextByIndex("IA_DND",1)
       await io.homePage.loadingTime()
       const element = await io.homePage.isVisible(selectors.basePagePO.ALIASES);
       await io.assert.expectToBeValue(element.toString(), 'false', "Element is not present")

    });
  })
