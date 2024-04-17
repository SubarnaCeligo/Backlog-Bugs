import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify that clicking on Intergation name hyperlink navgates to integration page", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify that clicking on Intergation name hyperlink navgates to integration page", async ({ io, page }) => {
    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");

    //Click on EDI Activity
    await io.homePage.click("[data-test= 'edi-activity']");

    //Open flows

    //Click on integration name
    await io.homePage.clickByText("<Integration name>");

    //Verify if integration is opened
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);

    await io.assert.verifyElementIsDisplayed(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,'Integration page did not open');




    
  });
});