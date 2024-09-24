import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C106452 from '../../testData/inputData/Flows/C106452.json';

test.describe("C106452_C106453 Verified new icon(Bubble close icon)", () => {
    test("C106452_C106453 Verified new icon(Bubble close icon) @Zephyr-IO-T23737 @Env-All @Priority-P2", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C106452, "FLOWS");
        await io.homePage.addStep('Hovering over "X" icon in header');
        await io.homePage.hover(selectors.flowBuilderPagePO.CLOSE_FLOW_BUILDER);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER);
        var hoverText = await io.connectionPage.getText(
            selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER
        );
        await io.assert.expectToBeValue("Exit flow & return to all integration flows", hoverText.toString(), "Element not found");
        await io.homePage.addStep('Verified hover text for top "x" icon');

        await io.homePage.addStep('Hovering over "X" icon on bubble');
        await io.homePage.hover(selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR);
        await io.flowBuilder.delay(500);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER);
        var hoverText1 = await io.connectionPage.getText(
            selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER
        );
        await io.assert.expectToBeValue("Remove resource from flow", hoverText1.toString(), "Element not found");
        await io.homePage.click(selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR);
        await io.homePage.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
        await io.homePage.addStep('Clicking on cross icon to remove import');
        await io.homePage.click(selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR);
        await io.homePage.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
    });
});