import { test, expect } from "@celigo/ui-core-automation";
import MSSQL from "@testData/Connections/Create/Create_Connection_MSSQL.json"
test.describe("Create Connections", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.connections.deleteConnection(MSSQL.importJSON.name)
    });
    test("@Env-All TC_027_Create_Connection_Mssql", async ({
        io
    }, testInfo) => {
        let actualJson;
        //Creating Connection 
        await test.step("*** Creating Connection ***", async () => {
            actualJson = await io.connections.createOrEditConnection(MSSQL)
        });

        //Validating connection
        await test.step("*** Validating Connection ***", async () => {
            await io.validation.validateConnection(testInfo, MSSQL.expectedJSON, actualJson)
        });
    });
});