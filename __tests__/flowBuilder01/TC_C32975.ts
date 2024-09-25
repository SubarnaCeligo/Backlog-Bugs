import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C32975 To verify 'Monitor' label is displayed along with integration name if that particular integration has only monitor access permission", () => {
    test("C32975 To verify 'Monitor' label is displayed along with integration name if that particular integration has only monitor access permission @Zephyr-IO-T3007 @Env-All @Priority-P2", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
        expect(page.getByLabel("You have monitor permissions").nth(0)).toBeVisible();
    });
  });