import { test, expect } from "@celigo/ui-core-automation";
import  connectionData from "@testData/Connections/Create/Create_Connection_AS2.json"


test.describe("CONNECTIONS", () => {

    test.beforeEach(async ({ io }) => {
      await io.connections.deleteConnection(connectionData.importJSON.name)
      await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    });
    test("TC_040_Create_Connection_AS2", async ({
      io
    }, testInfo) => {
      let connectionJson;
      //Creating Connection 
      await test.step("*** Creating Connection ***", async () => {
        connectionJson = await io.connections.createOrEditConnection(connectionData)
      });
      //Validating connection
      await test.step("*** Validating Connection ***", async () => {
        await io.validation.validateConnection(testInfo, connectionData.expectedJSON, connectionJson)
      });
    });
  });
