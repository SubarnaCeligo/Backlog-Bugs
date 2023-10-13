import { test, expect } from "@celigo/ui-core-automation";
import * as AmazonRedshift from "@testData/Connections/Create/Create_Connection_AmazonRedshift.json"
test.describe("Create Connections", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.connections.deleteConnection(AmazonRedshift.importJSON.name)
    });
    test("TC_C40112_Create_Connection_AmazonRedshift", async ({
        io
    }, testInfo) => {
        let actualJson;
        //Creating Connection 
        await test.step("*** Creating Connection ***", async () => {
            actualJson = await io.connections.createOrEditConnection(AmazonRedshift)
        });

        //Validating connection
        await test.step("*** Validating Connection ***", async () => {
            await io.validation.validateConnection(testInfo, AmazonRedshift.expectedJSON, actualJson)
        });
    });
});