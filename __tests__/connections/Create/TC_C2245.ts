
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import connectionData from "@testData/Connections/Create/Create_Connection_AS2.json"


test.describe("CONNECTIONS", () => {
  test.beforeEach(async ({ io }) => {
    await io.connections.deleteConnection(connectionData.importJSON.name)
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });
  test("TC_C2245_Verify HTTP Headers field is exposed in the UI page for AS2 imports and able to add them", async ({ io }, testInfo) => {
    let connectionJson;
    //Creating Connection 
    await test.step("*** Creating Connection ***", async () => {
      connectionJson = await io.connections.createOrEditConnection(connectionData)
    });
    await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL)
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'AS2');
    await io.homePage.clickByTextByIndex("AS2", 4);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText('Create_Connection_AS2');
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'AS2_Import');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.homePage.clickByText("Please select");
    await io.homePage.clickByText("JSON");
    // Validating able to add headers
    await io.homePage.fill(selectors.connectionsPagePO.AS2_HEADER_NAME, 'Name');
    await io.homePage.fill(selectors.connectionsPagePO.AS2_HEADER_VALUE, 'TC_C2245');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
  });
});

