
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import connectionData from "@testData/Connections/Create/Create_Connection_AS2.json"


test.describe("TC_C15753_Verify Export Preview Panel is shown for As2 Exports", () => {
  test.beforeEach(async ({ io }) => {
    await io.connections.deleteConnection(connectionData.importJSON.name)
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });
  test("TC_C15753_Verify Export Preview Panel is shown for As2 Exports UI_Backlog", async ({ io }, testInfo) => {
    let connectionJson;
    //Creating Connection 
    await test.step("*** Creating Connection ***", async () => {
      connectionJson = await io.connections.createOrEditConnection(connectionData)
    });
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL)
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'AS2');
    await io.homePage.click(selectors.connectionsPagePO.AS2_CONNECTOR);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText('Create_Connection_AS2');
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'AS2_Export');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    // Validating preview available
    await io.assert.verifyElementDisplayedByText('Preview', 'Preview not available')
  });
});

