import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testdata from "./testdata.json"


test.describe(`C68563 Verify user is upload the integration zip file having Multiple linear and branched flows in the template and able to install the template`, () => {
  test.describe.configure({ retries: 0 })
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io }) => {
    const res = await io.api.deleteCall(
      `v1/flows/${testdata.secondString}`,
    );
    const res2 = await io.api.deleteCall(
      `v1/integrations/${testdata.firstString}`,
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Resources", "Templates");
    await io.homePage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, "C68563_Automation");
    await io.homePage.loadingTime();

    //Unpublish the template
    let isPublished = await io.homePage.isVisible(selectors.basePagePO.FLAG);
    if (isPublished) {
      await io.homePage.click(selectors.basePagePO.TEMPLATE_PUBLISH_UNPUBLISH);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.integrationPagePO.UNPUBLISH);
      await io.homePage.loadingTime();
    }

  });
  test(`@Env-All @Zephyr-IO-T17464 C68563 Verify user is upload the integration zip file having Multiple linear and branched flows in the template and able to install the template`, async ({
    io,
    page
  }) => {
    await io.homePage.goToMenu("Resources", "Templates");
    await io.homePage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, "C68563_Automation");
    await io.homePage.waitForElementAttached(
      `:has-text("C68563_Automation") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`
    );
    await io.homePage.click(
      `tbody tr:has-text("C68563_Automation") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`
    );
    await io.homePage.click('[data-test="uploadTemplateZip"]');
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/inputData/Templates/C68563_NEW.zip");
    await io.homePage.loadingTime();

    //Publish the template
    let isPublished = await io.homePage.isVisible(selectors.basePagePO.FLAG);
    if (!isPublished) {
      await io.homePage.click(selectors.basePagePO.TEMPLATE_PUBLISH_UNPUBLISH);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.integrationPagePO.PUBLISH);
      await io.homePage.loadingTime();
      //Verify that toggle is checked
      await io.assert.verifyElementAttributeContainsText(selectors.basePagePO.TEMPLATE_TOGGLE, 'class', 'react-toggle--checked');
    }

    //Go to marketplace
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    await io.homePage.reloadPage();
    await io.marketplacePage.fill(
      selectors.marketplacePagePO.SEARCH_MARKETPLACE,
      "C68563_Automation"
    );
    await io.homePage.loadingTime();
    await io.marketplacePage.waitForElementAttached(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.marketplacePage.clickByIndex(selectors.homePagePO.INSTALL_TEMPLATE, 0);
    await io.marketplacePage.clickByText("Install now");
    await io.marketplacePage.waitForElementAttached(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );

    for (let i = 0; i < 2; i++) {
      await io.homePage.click(
        selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
      );
      await io.homePage.click(selectors.connectionsPagePO.EXISTING);
      await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
      let connMap = await io.api.loadConnections();
      var connId = connMap.get("FTP CONNECTION");
      await io.connectionPage.selectTextfromDropDown(page, connId)
      await io.homePage.loadingTime();
      await io.connectionPage.click(selectors.basePagePO.SAVE);
      await io.homePage.loadingTime();
    }
    await io.homePage.click(selectors.basePagePO.INSTALL);
    await io.homePage.loadingTime();

    //Verify if the both flows are installed
    let flows = await page.$$(selectors.importPagePO.TEST_RESULTS_CONTENTS);
    await io.assert.expectToBeValue((flows.length).toString(), "2", 'all flows installed')
  });
});

