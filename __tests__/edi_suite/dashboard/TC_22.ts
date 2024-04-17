import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify that clicking on flow name hyperlink navgates to flowbuilder page", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify that clicking on flow name hyperlink navgates to flowbuilder page", async ({ io, page }) => {
    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");

    //Click on EDI Activity
    await io.homePage.click("[data-test= 'edi-activity']");

    //Open flows

    //Click on integration name
    await io.homePage.clickByText("<FlowName>");

    //Verify if integration is opened
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);

    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.RUN_FLOW,'Flow Builder page did not open');




    
  });
});