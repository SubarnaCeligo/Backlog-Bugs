import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C106452 from '../../../testData/Flows/C106452.json';

test.describe("C106452_C106453 Verified new icon(Bubble close icon)", () => {
    test("C106452_C106453 Verified new icon(Bubble close icon)", async ({ io, page }) => {
        await io.fillFormUI(C106452, 'FLOWS');
        await io.homePage.addStep('Hovering over "X" icon in header');
        await page
            .locator(selectors.flowBuilderPagePO.CLOSE_FLOW_BUILDER).hover();
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.COMPLETED_ROWS_HOVER);
        var hoverText = await io.connectionPage.getText(
            selectors.flowBuilderPagePO.EM2dot0PO.COMPLETED_ROWS_HOVER
        );
        await expect(hoverText).toBe(
            "Exit flow & return to all integration flows"
        );
        await io.homePage.addStep('Verified hover text for top "x" icon');

        await io.homePage.addStep('Hovering over "X" icon on bubble');
        await page
        .locator(selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR).hover();
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.COMPLETED_ROWS_HOVER);
        await io.flowBuilder.delay(1000);
        var hoverText1 = await io.connectionPage.getText(
            selectors.flowBuilderPagePO.EM2dot0PO.COMPLETED_ROWS_HOVER
        );
        await expect(hoverText1).toBe(
            "Remove resource from flow"
        );
        await io.homePage.click(selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR);
        await io.homePage.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
        await io.homePage.click(selectors.mappings.Mapper2dot0PO.CLOSEBUTTON);
        await io.homePage.addStep('Clicking on cross icon to remove import');
        await io.homePage.click(selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR);
        await io.homePage.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
    });
});