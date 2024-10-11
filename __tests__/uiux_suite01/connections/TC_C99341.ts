import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C99341To validate batch size field with >=1 and <=1000 number type", () => {
  test("@Env-All @Zephyr-IO-T25377 C99341 To validate batch size field with >=1 and <=1000 number type", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.loadingTime();;
    // 
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "FTP"
    );
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.clickByIndex(selectors.connectionsPagePO.FTP_CONNECTION,0);
    await io.homePage.isPageLoaded();
    await io.flowBuilder.click(selectors.connectionsPagePO.TRANSFER_FILES);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);

    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, "ftp-import-C99341");
    await io.flowBuilder.click(selectors.connectionsPagePO.VAN_FILE_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CSV_FILE);
    
    await io.flowBuilder.fill(selectors.exportsPagePO.FTP_DIRECTORY_PATH, '/testC99341');
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.BATCHSIZE, '-1');
  
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.FTPBATCHSIZE + ' ~ div','Only numbers allowed');
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.BATCHSIZE, '0');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.assert.verifyJSElementValue(selectors.flowBuilderPagePO.BATCHSIZE, '');
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.BATCHSIZE, '1000');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.assert.verifyJSElementValue(selectors.flowBuilderPagePO.BATCHSIZE, '1000');
  });
});
