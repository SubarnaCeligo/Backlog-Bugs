import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import * as selectors from "@celigo/aut-selectors";
import * as NS_FTP from "@testData/Flows/TC_C107846.json"

test.describe("TC_C107838_Verify syncing dateTime fields in NS SS2.x import flows based on Date format added in the settings (DD/MM/YYYY hh:mm AM/PM)", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("@Zephyr-T7796 @Env-All @Priority-P2 TC_C107838_Verify syncing dateTime fields in NS SS2.x import flows based on Date format added in the settings (DD/MM/YYYY hh:mm AM/PM) UI_Backlog", async ({ io, page }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGenerator(allure, NS_FTP);
        });
        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, NS_FTP);
            await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_IMPORT_PLUSBUTTON);
            await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
            await io.homePage.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, 'CreatedDate')
            await io.homePage.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, '13/05/2023 08:12 AM')
            await io.homePage.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW)
            await io.homePage.performWebActions(selectors.mappings.MAPPER2DOT0PO.PREVIEW, "preview")
            await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW)
            //validating date/time format
            await io.assert.verifyElementContainsText(selectors.basePagePO.RESULT_PREVIEW_CONTENT, "{  \"CreatedDate\": \"13/05/2023 08:12     AM\"}")
            await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        });
        //Enable and run the Flow ***
        await test.step("*** Enable and run the Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title);
            await io.api.validateJobCountFromAPI(testInfo.title, NS_FTP.qa__expectedDashboardCount)
        });
    });
});