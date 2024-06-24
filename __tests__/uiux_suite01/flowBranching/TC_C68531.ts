import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C68531 Verify user is not able to name the branch as blank", () => {
    test("@Env-All @Zephyr-IO-T17433 C68531 Verify user is not able to name the branch as blank", async ({io, page}) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.PLUS_BUTTONS, 0);
        await page.getByRole('menuitem', { name: 'Add branching' }).click();
        await io.flowBuilder.addStep('Removing the brach name for first branch');
        await page.locator(selectors.flowBuilderPagePO.BRANCH_NAME).nth(0).click({clickCount: 3});
        await page.keyboard.press('Backspace');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.assert.verifyElementIsDisplayed(selectors.flowGroupingPagePO.ALERT_MESSAGE, 'Notification did not appear');
        await io.assert.verifyElementText(selectors.flowGroupingPagePO.ALERT_MESSAGE, 'A branch name is required.');
    });
  });