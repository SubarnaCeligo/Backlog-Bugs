import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C58590 Verify the confirmation box is displaying as expected when the retention period is updated and clicked on save", () => {
    test("@Env-All @Zephyr-IO-T14587 C58590 Verify the confirmation box is displaying as expected when the retention period is updated and clicked on save", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.DATA_RETENTION);
        await io.myAccountPage.click(selectors.myAccountPagePO.DATA_RETENTION_PERIOD);
        await io.myAccountPage.click(selectors.myAccountPagePO.SIXTY_DAYS);
        await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE);
        await io.assert.verifyElementText(`${selectors.myAccountPagePO.DIALOG_BOX} .MuiDialogContent-root`, 'Changing the retention period will apply to new data only. Data retained before this retention period change will continue to expire based on the retention period defined at the time of retention.');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.CONFIRM_DATA_RETENTION_SAVE, 'Save button is not displayed in dialog box');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.CONFIRM_DATA_RETENTION_CANCEL, 'Cancel button is not displayed in dialog box');
  
    });
  });