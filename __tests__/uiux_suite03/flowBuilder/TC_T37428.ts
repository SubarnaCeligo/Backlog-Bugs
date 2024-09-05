import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T37428_Test to validate closing tag is added automatically when we select any block helper from dropdown and there is no space between cursor and text", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T37428 @Env-QA @Priority-P2", async ({ io, page }) => {
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
        await page.keyboard.press('Backspace');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await io.homePage.addStep("*** Cursor is pointing in the middle of the expression ***");
        await page.keyboard.press('Control+Space');
        await page.keyboard.press('Tab');
        await page.keyboard.type("nam");
        await page.keyboard.press('Control+Space');
        await page.keyboard.press('Tab');
        await io.homePage.addStep("*** Filtering out the nam feild ***");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.HANDLEBAR_CONTENT, '{{add name dResult": {{add id age}}');
        await io.homePage.addStep("*** Validating that the space here is not gettiung wiped out after selecting the respective feild from dropdown ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});