import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T31788_T31789_T31795", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T31788_T31789_T31795 @Zephyr-IO-T31788 @Zephyr-IO-T31789 @Zephyr-IO-T31795 @Epic-IO-38393 @Env-QA @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","My APIs");
        await io.homePage.addStep("*** Navigated to MY APIs page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "MYAPIERROR_DND");
        await io.homePage.addStep("*** Searched for the MY API ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("MYAPIERROR_DND");
        await io.homePage.addStep("*** Opened the MY API ***");
        await io.homePage.click(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR);
        await io.homePage.addStep("*** clicked on edit script ***");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "method");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "headers");
        await io.homePage.addStep("*** Validated whether the data is there or not in function input ***");
        await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.homePage.addStep("*** clicked on preview script ***");
        await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.homePage.addStep("*** clicked on preview script ***");
        await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.homePage.addStep("*** clicked on preview script ***");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_RESULT_LINES, "errors");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_RESULT_LINES, "Please provide a valid _id.");
        await io.homePage.addStep("*** Validated whether the error is there or not in function output ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});