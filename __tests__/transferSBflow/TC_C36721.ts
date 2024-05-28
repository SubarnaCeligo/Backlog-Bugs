import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C36721 add refresh button on transfer invite page`, () => {
    test(`@Env-All @Zephyr-IO-T1461 C36721 add refresh button on transfer invite page UI_Backlog`, async ({ page, io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.homePagePO.TRANSFER);
        await io.myAccountPage.clickByText("Create transfer");
        //Validating refresh icon visible
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.REFRESH_RESOURCE, "refresh resource is not avaialble")
    });
});
