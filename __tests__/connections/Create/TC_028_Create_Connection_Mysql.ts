import { test, expect } from "@celigo/ui-core-automation";
import * as MYSQL from "@testData/Connections/Create/Create_Connection_MYSQL.json"
test.describe("Create Connections", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.connections.deleteConnection(MYSQL.importJSON.name)
    });
    test("TC_028_Create_Connection_Mysql", async ({
        io
    }, testInfo) => {
        let actualJson;
        //Creating Connection 
        await test.step("*** Creating Connection ***", async () => {
            actualJson = await io.connections.createOrEditConnection(MYSQL)
        });

        //Validating connection
        await test.step("*** Validating Connection ***", async () => {
            await io.validateConnection(testInfo, MYSQL.expectedJSON, actualJson)
        });
    });
});