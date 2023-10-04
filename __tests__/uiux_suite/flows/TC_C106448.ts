import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/C106448.json";

test.describe(`C106448  Verify Parsed output label`, () => {
  test(`C106448 Verify Parsed output label`, async ({ io, page }) => {
    await io.fillFormUI(testData, "FLOWS");
    //Salesforce
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EXPORT, 0);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.PARSED_OUTPUT);
    await expect(await page.locator(selectors.importPagePO.PARSED_OUTPUT)).not.toHaveCSS("cursor", "pointer");
    await io.assert.verifyElementAttributeContainsText(selectors.importPagePO.PARSED_OUTPUT, 'class', 'Mui-disabled');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CANVAS_FIT_TO_SCREEN);
    await io.flowBuilder.addStep("Verified Parsed output label for Salesforce adaptor");

    //MongoDB
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EXPORT, 1);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.PARSED_OUTPUT);
    await expect(await page.locator(selectors.importPagePO.PARSED_OUTPUT)).not.toHaveCSS("cursor", "pointer");
    await io.assert.verifyElementAttributeContainsText(selectors.importPagePO.PARSED_OUTPUT, 'class', 'Mui-disabled');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    await io.flowBuilder.addStep("Verified Parsed output label for MongoDB adaptor");

    //DynamoDB
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EXPORT, 2);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.PARSED_OUTPUT);
    await expect(await page.locator(selectors.importPagePO.PARSED_OUTPUT)).not.toHaveCSS("cursor", "pointer");
    await io.assert.verifyElementAttributeContainsText(selectors.importPagePO.PARSED_OUTPUT, 'class', 'Mui-disabled');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    await io.flowBuilder.addStep("Verified Parsed output label for DynamoDB adaptor");

    //Netsuite
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EXPORT, 2);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.PARSED_OUTPUT);
    await expect(await page.locator(selectors.importPagePO.PARSED_OUTPUT)).not.toHaveCSS("cursor", "pointer");
    await io.assert.verifyElementAttributeContainsText(selectors.importPagePO.PARSED_OUTPUT, 'class', 'Mui-disabled');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    await io.flowBuilder.addStep("Verified Parsed output label for Netsuite adaptor");

    //FTP
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.PARSED_OUTPUT);
    await expect(await page.locator(selectors.importPagePO.PARSED_OUTPUT)).not.toHaveCSS("cursor", "pointer");
    await io.assert.verifyElementAttributeContainsText(selectors.importPagePO.PARSED_OUTPUT, 'class', 'Mui-disabled');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    await io.flowBuilder.addStep("Verified Parsed output label for Ftp adaptor");
  });
});
