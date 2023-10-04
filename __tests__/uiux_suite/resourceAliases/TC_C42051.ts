import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C42051 Verify aliases tab should not be shown for IA's`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`C42051 Verify aliases tab should not be shown for IA's`, async({io,page}) => {
  
       await io.flowBuilder.clickByText("Edition")
       const element = await io.homePage.isVisible(selectors.basePagePO.ALIASES);
       await io.assert.expectToBeValue(element.toString(), 'false', "Element is not present")

    });
  })