import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C41700 Verify the empty state messaging for Home page", () => {
    test("@Env-All @Zephyr-IO-T905 C41700 Verify the empty state messaging for Home page.", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.CREATE_FLOW);
        const noHomePageText = await io.homePage.isVisible("text='Jumpstart your data integrations'");
        const homePageText = await io.homePage.isVisible("text='Flows move and transform data between applications. Flows are stored inside the Standalone flows tile, or within integrations, which you can manage on this page.'");
        await io.assert.expectToBeTrue(noHomePageText, "No Home page message not shown");
        await io.assert.expectToBeTrue(homePageText, "Home page text not shown");
    });
  });