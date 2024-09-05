import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T37419_TC_T37421_Test to validate text after the cursor is retained when we select any field from dropdown and there is no space between cursor and text&&Test to validate the characters used for filtering are not repeated and selected text is visible when we select any field from dropdown and there is no space between cursor and text", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T37419 @Zephyr-IO-T37421 @Env-QA @Priority-P2", async ({ io, page }) => {
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
        await io.homePage.addStep("*** Filtering out the name feild ***");
        await page.keyboard.press('Control+Space');
        await page.keyboard.press('Control+Space');
        await page.keyboard.press('Control+Space');
        await page.keyboard.press('Tab');
        await io.homePage.addStep("*** Selecting a feild***");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.HANDLEBAR_CONTENT, '"ad{{name}}dResult": {{add id age}}');
        await io.homePage.addStep("*** Validating that The text towards the right is not wiped out on slecting a filtered feild ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});