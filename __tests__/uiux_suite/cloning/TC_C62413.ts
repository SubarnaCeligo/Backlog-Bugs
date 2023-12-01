import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C62413 Verify New Outh 2.0 iclient form is getting display if you set up a new connection while cloning a flow`, () => {
  test(`C62413 Verify New Outh 2.0 iclient form is getting display if you set up a new connection while cloning a flow`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.homePage.clickByTextByIndex("Gdrive_DND", 0);
    // not working with clickbyindex
    await page
      .locator(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON)
      .first()
      .click();
    await io.flowBuilder.clickByText("Clone flow");
    await io.flowBuilder.clickByText("Please select");
    await page.getByRole("menuitem").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.clickByText("Configure");
    await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID,
      "'Client ID' field not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "'Client Secret' field not displayed"
    );
  });
});
