import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C45328_Verify whether user is able to vote on features and add suggestions /comments and submit them", () => {
    test("@Env-All C45328_Verify whether user is able to vote on features and add suggestions /comments and submit them UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
        await io.homePage.selectTabInHelperMenu("Product portal")
        await io.homePage.loadingTime()
        const iframe = page.frameLocator(selectors.homePagePO.IFRAME_PRODUCT_PORTAL);
        await iframe.locator("[data-testid='PortalNewIdea-Button']").click();
        await iframe.locator(selectors.homePagePO.SUBMIT_IDEA_COMMENT).fill('Test')
        await iframe.getByText('Nice-to-have').click()
        await iframe.locator(selectors.homePagePO.SUBMIT_IDEA_EMAIL).fill('test@celigo.com')
        await iframe.locator("[data-testid='AddInsightForm-SubmitButton']").click()
        // Validating successfully clicked submit button
        await iframe.getByText('To submit your idea, click the link we sent to:').isVisible()
    });
});