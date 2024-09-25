import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C110676_Test to validate AFE auto suggestion features are working fine at transformation2.0 ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C110676 @Zephyr-IO-T15686 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("FLOW_DND");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
        await io.homePage.addStep("*** Clicked on Add data processor button to add transformations ***");
        await io.homePage.click(selectors.basePagePO.EXPORTTRANSFORMATION);
        await io.homePage.addStep("*** Opened transformation rules ***");
        await io.homePage.clickByText("Rules 2.0");
        await io.homePage.addStep("*** Navigated to transformation rules 2.0 ***");
        await io.homePage.click(selectors.flowBuilderPagePO.TRANSFORMATION_INPUTFIELD_PLACEHOLDER);
        await page.keyboard.press('Control+Space');
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Clicked Ctrl + space on one of the source field ***");
        await io.assert.verifyElementDisplayedByText(
            "All",
            "Fields"
          );
        await io.homePage.addStep("*** Checked dropdown is present or not by assertion of 'All', 'Feilds' sections ***");
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('ArrowDown');
        await io.homePage.addStep("*** Checked Keyboard shortcuts ***");
        await io.homePage.clickByText("All");
        await io.homePage.addStep("*** Navigated through Different sections ***");
        await io.homePage.addStep("*** Checked the core functionality of AFE auto suggestions in Transformation2.0 ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});