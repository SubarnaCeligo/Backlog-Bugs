import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T31784_T31785_T31794", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T31784_T31785_T31794 @Zephyr-IO-T31784 @Zephyr-IO-T31785 @Zephyr-IO-T31794 @Epic-IO-38393 @Env-QA @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","My APIs");
        await io.homePage.addStep("*** Navigated to MY APIs page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** clicked on create MY API ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.SCRIPT_ID);
        await io.homePage.clickByText("123456_DND");
        await io.homePage.addStep("*** Selected name for the script ***");
        await io.homePage.click(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR);
        await io.homePage.addStep("*** clicked on edit script ***");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "method");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "headers");
        await io.homePage.addStep("*** Validated whether the data is there or not in function input ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});