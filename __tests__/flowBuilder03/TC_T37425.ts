import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T37425_Test to validate closing brackets are automatically added if user is at end of expression , when we select any field from dropdown and there is no space between cursor and text", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T37425 @Env-All @Priority-P2", async ({ io, page }) => {
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
        await page.keyboard.type("{{na");
        await io.homePage.addStep("*** Filtering out the abs helper ***");
        await page.keyboard.press('Control+Space');
        await page.keyboard.press('Control+Space');
        await page.keyboard.press('Control+Space');
        await page.keyboard.press('Enter');
        await io.homePage.addStep("*** Selecting a feild***");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.HANDLEBAR_CONTENT, '"ad{{name}}dResult": {{add id age}}');
        await io.homePage.addStep("*** Validating that The duplicate braces are not added and also the text towards the right is not getting wipedout ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});