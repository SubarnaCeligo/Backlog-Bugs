import { test, expect } from "@celigo/ui-core-automation";
import * as BigQuery from "@testData/Connections/Create_BigQuery_Connection.json"

test.describe("Create Connections", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.connections.deleteConnection(BigQuery.importJSON.name)
    });
    test("BigQueryConnection", async ({
        io
    }, testInfo) => {
        let actualJson;
        //Creating Connection 
        await test.step("*** Creating Connection ***", async () => {
            actualJson = await io.connections.createOrEditConnection(BigQuery)
        });

        //Validating connection
        await test.step("*** Validating Connection ***", async () => {
            await io.validateConnection(testInfo, BigQuery.expectedJSON, actualJson)
        });
    });
});