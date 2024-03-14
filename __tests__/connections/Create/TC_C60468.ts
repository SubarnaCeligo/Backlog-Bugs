
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import connectionData from "@testData/Connections/Create/Create_Connection_AS2.json"


test.describe("CONNECTIONS", () => {
  test.beforeEach(async ({ io }) => {
    await io.connections.deleteConnection(connectionData.importJSON.name)
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });
  test("TC_C60468_To verify that the user should be able to download the debug logs for connection even though debug logs are empty", async ({ io }, testInfo) => {
    let connectionJson;
    //Creating Connection 
    await test.step("*** Creating Connection ***", async () => {
      connectionJson = await io.connections.createOrEditConnection(connectionData)
    });
    await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, 'Create_Connection_AS2');
    await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.flowBuilder.clickByText('Debug connection');
    await io.flowBuilder.clickByText('Next 15 mins');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
    // Validating able to download
    await io.flowBuilder.clickByText('Download debug logs');
  });
});

