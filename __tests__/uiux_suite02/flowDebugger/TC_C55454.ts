import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C55454 Verify users can enter data manually in the mock output field - export & lookup", () => {
    test("@Env-All @Zephyr-IO-T14454 C55454 Verify users can enter data manually in the mock output field - export & lookup", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.exportsPage.fill(selectors.exportsPagePO.NAME, "HTTP_EXPORT_NEW");
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP CONNECTION");
        await io.flowBuilder.click(
         selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
       );
        await io.connectionPage.click(selectors.exportsPagePO.HTTP_METHOD);
        await io.connectionPage.clickByText("GET");
        await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/users");
        await io.exportsPage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
        await io.exportsPage.clickByText('All - always export all data');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
        await io.flowBuilder.isPageLoaded()
        let mockElement = await page.$(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
        await mockElement.scrollIntoViewIfNeeded();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD + " .ace_content", JSON.stringify({
            "page_of_records":[
               {
                  "record":{
                     "id":"12345",
                     "name":"Mary Poppins",
                     "type":"customer",
                     "address":{
                        "street":"17 Cherry Tree Lane",
                        "City":"London"
                     }
                  }
               },
               {
                  "record":{
                     "id":"98765",
                     "name":"Sherlock Holmes",
                     "type":"customer",
                     "address":{
                        "street":"221B Baker Street",
                        "City":"London"
                     }
                  }
               }
            ]
          }));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

        await io.homePage.loadingTime()
        await io.flowBuilder.waitForElementAttached(selectors.mappings.ADD_IMPORT);
        await io.flowBuilder.click(selectors.mappings.ADD_IMPORT);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_LOOKUP);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.exportsPage.fill(selectors.exportsPagePO.NAME, "HTTP_EXPORT_NEW");
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP CONNECTION");
        await io.flowBuilder.click(
         selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
       );
        await io.connectionPage.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
        await io.connectionPage.clickByText("GET");
        await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/users");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
        await io.flowBuilder.isPageLoaded()
        let advanceElement = await page.$(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
        await advanceElement.scrollIntoViewIfNeeded();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD + " .ace_content", JSON.stringify({
            "page_of_records":[
               {
                  "record":{
                     "id":"12345",
                     "name":"Mary Poppins",
                     "type":"customer",
                     "address":{
                        "street":"17 Cherry Tree Lane",
                        "City":"London"
                     }
                  }
               },
               {
                  "record":{
                     "id":"98765",
                     "name":"Sherlock Holmes",
                     "type":"customer",
                     "address":{
                        "street":"221B Baker Street",
                        "City":"London"
                     }
                  }
               }
            ]
          }));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        
    });
});