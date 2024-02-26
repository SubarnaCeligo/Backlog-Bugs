import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import * as selectors from "@celigo/aut-selectors";
import * as NS_FTP from "@testData/Flows/TC_C107885.json"

test.describe("SS2.0 Flows", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("TC_C21262_Verify syncing dateTime fields in NS SS2.x import flows based on Date format added in the settings (YYYY-M-D hh:mm AM/PM)", async ({ io, page }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGenerator(allure, NS_FTP);
        });
        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, NS_FTP);
            await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_IMPORT_PLUSBUTTON);
            await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
            await io.homePage.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, 'Name')
            await io.homePage.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, 'Test')
            await io.homePage.clickByText('Refresh fields')
            await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
            // Validating mapping available not crashed
            await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
            await io.assert.textFromElement(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, 'Name')
            await io.assert.textFromElement(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, 'Test')
        });
    })
})