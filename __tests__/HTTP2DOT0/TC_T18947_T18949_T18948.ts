import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/HTTP2DOT0/TC_T18947_T18949_T18948.json";

test.describe("Verify zoom import and export resource and api endpoints", () => {
  test("@Zephyr-IO-T18947 @Zephyr-IO-T18948 @Zephyr-IO-T18949 @Env-All @Epic-IO-86262 @Priority-P2 - Verify zoom import and export resource and api endpoints", async ({ io, page }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_BUBBLE);

    // IO-T18947 - Verify user is able to create exports for the selected Resource and API Endpoint for Zoom[Contacts-Search Contacts]with the ""HTTP"" toggle selected]
    await io.myAccountPage.clickByIndex(selectors.flowBuilderPagePO.EXPORT_BUBBLE, 0);

    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    let textAtResource = (await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE)).toString();
    await io.assert.expectToContainValue('Contacts', textAtResource, "Contacts is not showing properly in Resources Dropdown");

    let textAtAPIEndpoint = (await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION)).toString();
    await io.assert.expectToContainValue('Search company contacts', textAtAPIEndpoint, "Search company contacts is not showing properly in API Endpoint Dropdown");

    await io.homePage.click(selectors.basePagePO.CLOSE);

    // IO-T18949 - Verify user is able to create imports for the selected Resource and API Endpoint for Zoom[Tracking field -Update Tracking field] with ""simple"" toggle selected
    await io.myAccountPage.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);

    textAtResource = (await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE)).toString();
    await io.assert.expectToContainValue('Trackingfield', textAtResource, "Trackingfield is not showing properly in Resources Dropdown");

    textAtAPIEndpoint = (await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION)).toString();
    await io.assert.expectToContainValue('Update a tracking field', textAtAPIEndpoint, "Update a tracking field is not showing properly in API Endpoint Dropdown");

    await io.homePage.click(selectors.basePagePO.CLOSE);

    // IO-T18948 - Verify user is able to create imports for the selected Resource and API Endpoint for Zoom[User - CreatesUsers] with ""Simple"" toggle selected
    await io.myAccountPage.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 1);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    
    textAtResource = (await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE)).toString();
    await io.assert.expectToContainValue('Users', textAtResource, "Users is not showing properly in Resources Dropdown");

    textAtAPIEndpoint = (await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION)).toString();
    await io.assert.expectToContainValue('Create users', textAtAPIEndpoint, "Update a tracking field is not showing properly in API Endpoint Dropdown");


  });

});