import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T37427_Test to validate closing tag is added automatically when we select any block helper from dropdown and there is no space between cursor and text", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T37427 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.goToMenu("Tools", "Playground");
        await io.homePage.addStep("*** navigating to Tools >> Playground ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Handlebars editor");
        await io.homePage.addStep("*** Navigating to the Handlebars editor ***");
        await io.homePage.clickByText("Simple JSON record");
        await io.homePage.addStep("*** Navigating to the Simple JSON record editor ***");
        await io.homePage.click(selectors.flowBuilderPagePO.HANDLEBAR_CONTENT);
        await io.homePage.addStep("*** Clicking on the handlebar editor window ***");
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await io.homePage.addStep("*** Cursor is pointing in the middle of the expression ***");
        await page.keyboard.type("{{ab");
        await io.homePage.addStep("*** Filtering out the abs helper ***");
        await io.homePage.clickByText("abs");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.HANDLEBAR_CONTENT, '"ad{{abs dResult": {{add id age}}');
        await io.homePage.addStep("*** Validating that the space here is not gettiung wiped out after selecting the helper ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});