import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T37653 Updated API Endpoint Verify above cases for exisiting exports and imports", () => {
  test("@Env-All @Zephyr-IO-T37653 @Priority-P2 Updated API Endpoint Verify above cases for exisiting exports and imports", async ({io, page}) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.TOOLS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.fill(selectors.basePagePO.CONNECTION_DROPDOWN,"MOCK CONNECTION");
    await io.flowBuilder.clickByText("MOCK CONNECTION");
    await io.homePage.loadingTime();
    await io.connectionPage.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.connectionPage.clickByText("POST");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL);
    await page.keyboard.type('/feeds/2021-06-30/documents');

    await io.flowBuilder.clickByText('Please select');


    await io.assert.verifyElementDisplayedByText(
        'POST_FLAT_FILE_BOOKLOADER_DATA (soon to be deprecated)',
        "Feed type is not displayed"
      );
  });
});
