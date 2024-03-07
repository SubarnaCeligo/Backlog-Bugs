
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C32179", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });
  test("TC_C32179 Verify we are able to upload any sample file of any type for the AS2", async ({ io, page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL)
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'AS2');
    await io.homePage.clickByText("AS2");
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText('AS2 Test');
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'test_file_upload_as2');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);

    //Check invalid file input
    // await io.flowBuilder.clickByText('XML');
    // let fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    // await fileInput.setInputFiles("testData/inputData/FlowBuilder/IO_T4960.json");
    // await io.flowBuilder.waitForElementAttached(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);
    // const errorMsg = (await io.flowBuilder.getText(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)).toString();
    // await io.assert.expectToContainValue('Please select valid xml file', errorMsg, "Error for file is not showing properly");

    //Check valid file input
    //await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
    await io.flowBuilder.clickByText('JSON');
    let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput1.setInputFiles("testData/inputData/FlowBuilder/IO_T4960.json");

    //await io.flowBuilder.waitForText(selectors.basePagePO.FILE_NAME, "IO_T4960.json");
    await io.flowBuilder.click(selectors.importPagePO.CLICKPREVIEW);
    await io.connectionPage.addStep("Clicking on preview");

    const previewTextGET = await io.connectionPage.getText(
      selectors.flowBuilderPagePO.CONTENT
    );
    console.log(previewTextGET);
  });
});

