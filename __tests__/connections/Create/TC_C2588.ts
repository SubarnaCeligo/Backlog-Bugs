import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import connectionData from "@testData/Connections/Create/Create_Connection_AS2.json"


test.describe("TC_C2588_Verify as2Id and partnerId fields are greyed out while editing AS2 connection_UI_Backlog", () => {
  test.beforeEach(async ({ io }) => {
    await io.connections.deleteConnection(connectionData.importJSON.name)
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });
  test("TC_C2588_Verify as2Id and partnerId fields are greyed out while editing AS2 connection_UI_Backlog", async ({ io }, testInfo) => {
    let connectionJson;
    //Creating Connection 
    await test.step("*** Creating Connection ***", async () => {
      connectionJson = await io.connections.createOrEditConnection(connectionData)
    });
    //Validating id and partner greyed out
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, 'Create_Connection_AS2');
    await io.homePage.clickByText("Create_Connection_AS2");
    await io.assert.verifyElementNotToBeClickable(selectors.connectionsPagePO.AS2_APPLICATION_NAME)
    await io.assert.verifyElementNotToBeClickable(selectors.connectionsPagePO.AS2_PARTNER_ID)
  });

});
