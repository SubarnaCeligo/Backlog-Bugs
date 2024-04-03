import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T4470 from "@testData/Connections/T4470.json";

test.describe(`T4470 To verify connections displayed in this route('/api/connections/:_connectionId/tradingPartner') does not display the IA connections in ""Confirm connection changes"" dialog UI_Backlog`, () => {
  test.beforeEach(async ({ io }) => {
    await io.connections.deleteConnection(T4470.importJSON.name);
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.myAccountPage.loadingTime()
  });
  test(`@Env-All T4470 To verify connections displayed in this route('/api/connections/:_connectionId/tradingPartner') does not display the IA connections in ""Confirm connection changes"" dialog UI_Backlog`, async ({ io, page }) => {
    let connectionJson;
    //Creating Connection 
    await test.step("*** Creating Connection ***", async () => {
      connectionJson = await io.connections.createOrEditConnection(T4470)
    });
    //Validating IA connections are not available in confirm dialog
    await test.step("*** Verifying if IA connection comes up in trading partner dialog***", async () => {
      await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, 'FTP CONNECTION NOT IN IA');
      await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
      await io.homePage.click(selectors.flowBuilderPagePO.TRADINGPARTNER);
      await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
      const dialogBody = (await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.CONFIRMDIALOGBODY)).toString();

      expect(dialogBody).toContain("FTP CONNECTION NOT IN IA");
      await io.assert.expectNotToContainValue(dialogBody, "FTP CONNECTION IN IA", "IA connection is being shown")
    });
  });
});
