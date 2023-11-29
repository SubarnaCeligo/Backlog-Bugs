import {test, expect} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C59678 from "@testData/Flows/C59678.json";


test.describe.only("To verify that the Export/Import bubbles are working as expected", () => {
    test.beforeEach(async ({ io }) => {
        await io.flowBuilder.navigateTo(io.data.links.FLOW_BUILDER_PAGE_URL);
      });


    test("To verify that the Export/Import bubbles are working as expected", async ({io,page}) => {
     
        await io.createResourceFromAPI(C59678, "FLOWS");
        await io.flowBuilder.click('[data-test="Export"]');
        await io.flowBuilder.clickByText("Preview")
        await page.waitForSelector('body');  
        await page.waitForSelector('body:has-text("Success!")');  
        const successTextPresent = await page.$('body:has-text("Success!")');
        expect(successTextPresent).toBeTruthy(); 
    });
})