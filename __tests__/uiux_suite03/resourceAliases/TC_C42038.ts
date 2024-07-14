import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C42038 Verify aliases tab component is added at the integration level`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`@Env-All C42038 @Zephyr-IO-T1190 Verify aliases tab component is added at the integration level`, async({io,page}) => {

       await io.flowBuilder.clickByText("Automation Flows")
       await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ALIASES);
       await io.assert.verifyElementIsDisplayed(selectors.basePagePO.ALIASES,"Element is not found")

    });
  })