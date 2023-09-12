import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C2467 from '../../../testData/Flows/C2467.json';

test.describe("C2467 Verified all the possible pop-ups and they are closed on click.", () => {
    test("C2467 Verified all the possible pop-ups and they are closed on click.", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.addStep('Clicking on actions menu of automation flows integration');
        await page.locator(selectors.homePagePO.INTEGRATION_TILES, {hasText: 'Automation Flows'}).nth(0).locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU).click();
        await io.flowBuilder.addStep('clicking on delete integration option');
        await page.locator(selectors.homePagePO.DELETE_INTEGRATION).click();
        await io.flowBuilder.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
        await io.fillFormUI(C2467, 'FLOWS');
        await io.flowBuilder.addStep('Clicking on cross icon to remove export');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR);
        await io.flowBuilder.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
        await io.flowBuilder.click(selectors.mappings.Mapper2dot0PO.CLOSEBUTTON);
        await io.flowBuilder.addStep('Clicking on cross icon to remove import');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR);
        await io.flowBuilder.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
    });
  });