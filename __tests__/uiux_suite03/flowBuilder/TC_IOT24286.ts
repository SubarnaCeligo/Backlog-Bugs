import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT4286 Test to Verify the Help text and Header label for Marketplace flow steps`, () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("@Epic-IO-56742 @Priority-P2 @Zephyr-IO-T24286 @Env-STAGING", async ({ io, page }) => {
        await io.homePage.loadingTime();

        await io.homePage.clickByText("Create");
        await io.homePage.click(selectors.homePagePO.CREATEFLOW);
        await io.flowBuilder.clickAddSource();

        await io.flowBuilder.waitForElementAttached("text='Clone a flow step from the marketplace'");
        await io.assert.verifyElementIsDisplayed("text='Clone a flow step from the marketplace'", 'Clone a flow step from the marketplace header is not present');

        const marketplaceHelpButton =  page.locator("text='Marketplace flow steps'").getByRole('button');
        await marketplaceHelpButton.click();

        await io.flowBuilder.waitForElementAttached("text='Accelerate the flow building experience by cloning a flow step from the marketplace, and then modify it as needed.'");
        await io.assert.verifyElementIsDisplayed("text='Accelerate the flow building experience by cloning a flow step from the marketplace, and then modify it as needed.'", "Help text not available");
    });
});