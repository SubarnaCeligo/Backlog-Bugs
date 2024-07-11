
import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import {decrypt} from "@celigo/aut-utilities";

test.describe("C45830 Verify if the message is generated correctly when the user clicks on Reset MFA.", () => {
    test("@Env-All @Zephyr-IO-T17238 C45830 Verify if the message is generated correctly when the user clicks on Reset MFA.. ", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.myAccountPage.click("button:has-text('Reset')");
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.RESET, "Reset button is not displayed");
        await io.assert.verifyElementIsDisplayed(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON, "Cancel button is not displayed");
    });
  });