import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C68107 Verify application does not crash when user saves the un-named branch", () => {
    test("C68107 Verify application does not crash when user saves the un-named branch", async ({io, page}) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
        await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
        await page.getByRole('menuitem', { name: 'Add branching' }).click();
        await page.locator('.MuiAccordionSummary-gutters .MuiBox-root .MuiBox-root').nth(0).click({clickCount: 3});
        await page.keyboard.press('Backspace');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION, 'Notification did not appear');
    });
  });