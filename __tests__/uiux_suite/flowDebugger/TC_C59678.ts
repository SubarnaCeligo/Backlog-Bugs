import {test, expect} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C59678 from "@testData/Flows/C59678.json";


test.describe("To verify that the Export/Import bubbles are working as expected", () => {
    test.beforeEach(async ({ io }) => {
        await io.flowBuilder.navigateTo(io.data.links.FLOW_BUILDER_PAGE_URL);
      });


    test("To verify that the Export/Import bubbles are working as expected", async ({io,page}) => {
     
        await io.fillFormUI(C59678, "FLOWS");

        await io.flowBuilder.clickByText("Export");

        await io.flowBuilder.clickByText("Preview")

        await page.waitForSelector('body'); // Wait for the page to load
  await page.waitForSelector('body:has-text("Success!")'); // Wait for the "Success!" text

  const successTextPresent = await page.$('body:has-text("Success!")');

  expect(successTextPresent).toBeTruthy(); 
    });
})