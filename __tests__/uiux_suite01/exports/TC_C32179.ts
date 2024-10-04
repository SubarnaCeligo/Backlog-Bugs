
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import jsonData from "@testData/FlowBuilder/IO_T4960.json";

test.describe("TC_C32179", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T158 TC_C32179 Verify we are able to upload any sample file of any type for the AS2", async ({ io, page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL)
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'AS2');
    await io.homePage.clickByText("AS2");
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'AS2 Test');
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText('AS2 Test');
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'test_file_upload_as2');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);

    await io.flowBuilder.clickByText('JSON');
    let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput1.setInputFiles("testData/inputData/FlowBuilder/IO_T4960.json");

    //await io.flowBuilder.waitForText(selectors.basePagePO.FILE_NAME, "IO_T4960.json");
    await page.getByText("IO_T4960.json").waitFor({ state: 'visible', timeout: 30000 })

    await io.flowBuilder.click(selectors.importPagePO.CLICKPREVIEW);
    await io.connectionPage.addStep("Clicking on preview");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.COPY_BUTTON);
    let previewTextGET = await page.evaluate(() => {
      return navigator.clipboard.readText();
    });
    previewTextGET = JSON.parse(previewTextGET);
    expect(previewTextGET['page_of_records'][0]['record']).toStrictEqual(jsonData);
  });
});

