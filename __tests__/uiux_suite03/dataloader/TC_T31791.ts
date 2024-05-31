import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T31791", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T31791 @Zephyr-IO-T31791 @Epic-IO-38393 @Env-QA @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","My APIs");
        await io.homePage.addStep("*** Navigated to MY APIs page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "MYAPIERROR2_DND");
        await io.homePage.addStep("*** Searched for the MY API ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("MYAPIERROR2_DND");
        await io.homePage.addStep("*** Opened the MY API ***");
        await io.homePage.click(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR);
        await io.homePage.addStep("*** clicked on edit script ***");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "method");
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.homePage.addStep("*** Validated whether the data is there or not in function input ***");
        await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.homePage.addStep("*** clicked on preview script ***");
        await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.homePage.addStep("*** clicked on preview script ***");
        await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.homePage.addStep("*** clicked on preview script ***");
        await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.homePage.addStep("*** clicked on preview script ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});