import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C2467 from '../../../testData/Flows/C2467.json';

test.describe("C2467 Verified all the possible pop-ups and they are closed on click.", () => {
    test("C2467 Verified all the possible pop-ups and they are closed on click.", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await page.locator('[data-test="integration-tiles"]', {hasText: 'Automation Flows'}).nth(0).locator('[data-test="openActionsMenu"]').click();
        await page.locator('[data-test="deleteIntegration"]').click();
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
        await io.fillFormUI(C2467, 'FLOWS');
        await io.flowBuilder.click('[data-test="remove-pg"]');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
        await io.flowBuilder.click('[data-test="remove-pp"]');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
    });
  });