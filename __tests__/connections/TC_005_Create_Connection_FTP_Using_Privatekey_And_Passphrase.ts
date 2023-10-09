import { test, expect } from "@celigo/ui-core-automation";
import * as FTP from "@testData/Connections/Create_Connection_FTP_Using_Privatekey_And_Passphrase.json"

test.describe("Create Connections", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.connections.deleteConnection(FTP.importJSON.name)
    });
    test("TC_005_Create_Connection_FTP_Using_Privatekey_And_Passphrase", async ({
        io
    }, testInfo) => {
        let actualJson;
        //Creating Connection 
        await test.step("*** Creating Connection ***", async () => {
            actualJson = await io.connections.createOrEditConnection(FTP)
        });

        //Validating connection
        await test.step("*** Validating Connection ***", async () => {
            await io.validateConnection(testInfo, FTP.expectedJSON, actualJson)
        });
    });
});