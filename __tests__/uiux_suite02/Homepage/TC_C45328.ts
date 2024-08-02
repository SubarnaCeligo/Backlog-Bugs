import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C45328_Verify whether user is able to vote on features and add suggestions /comments and submit them", () => {
    test("@Env-All @Zephyr-IO-T3171 C45328_Verify whether user is able to vote on features and add suggestions /comments and submit them UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
        await io.homePage.selectTabInHelperMenu("Product portal")
        await io.homePage.loadingTime()
        const iframe = page.frameLocator(selectors.homePagePO.IFRAME_PRODUCT_PORTAL);
        await iframe.locator(selectors.myAccountPagePO.PRODUCT_PORTAL_SUBMIT_BUTTON).click();
        await iframe.locator(selectors.homePagePO.SUBMIT_IDEA_COMMENT).fill('Test')
        await iframe.getByText('Nice-to-have').click()
        await iframe.locator(selectors.myAccountPagePO.PRODUCT_PORTAL_SUBMIT_INSIGHT).click()
        // Validating successfully clicked submit button
        await iframe.getByText('To submit your idea, click the link we sent to:').isVisible()
    });
});