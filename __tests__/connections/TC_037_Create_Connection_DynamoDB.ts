import { test, expect } from "@celigo/ui-core-automation";
import * as DynamoDB from "@testData/Connections/Create_Connection_DynamoDB.json"
test.describe("Create Connections", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.connections.deleteConnection(DynamoDB.importJSON.name)
    });
    test("TC_037_Create_Connection_DynamoDB", async ({
        io
    }, testInfo) => {
        let actualJson;
        //Creating Connection 
        await test.step("*** Creating Connection ***", async () => {
            actualJson = await io.connections.createOrEditConnection(DynamoDB)
        });

        //Validating connection
        await test.step("*** Validating Connection ***", async () => {
            await io.validateConnection(testInfo, DynamoDB.expectedJSON, actualJson)
        });
    });
});