import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("C47952 Use this account for SSO dropdown in security tab should show Account names not the owner names", () => {
    test("C47952 Use this account for SSO dropdown in security tab should show Account names not the owner names", async ({ io, page }) => {

        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.loadingTime();
        var expectedName = (await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT)).toString();
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.clickByText("Please select");
        const actualNameValue = (await io.myAccountPage.getText(selectors.basePagePO.MENU_ITEM)).toString();
        io.assert.expectToBeValue(expectedName, actualNameValue, "Name is invalid");

    });

});




