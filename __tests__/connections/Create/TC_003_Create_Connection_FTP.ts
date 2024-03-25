import { test, expect } from "@celigo/ui-core-automation";
import  FTP from "@testData/Connections/Create/Create_Connection_FTP.json"

test.describe("Create Connections", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.connections.deleteConnection(FTP.importJSON.name)
    });
    test("TC_003_Create_Connection_FTP", async ({
        io
    }, testInfo) => {
        let actualJson;
        //Creating Connection 
        await test.step("*** Creating Connection ***", async () => {
            actualJson = await io.connections.createOrEditConnection(FTP)
        });

        //Validating connection
        await test.step("*** Validating Connection ***", async () => {
            await io.validation.validateConnection(testInfo, FTP.expectedJSON, actualJson)
        });
    });
});