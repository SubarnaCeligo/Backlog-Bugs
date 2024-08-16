import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testdata from "./testdata.json"


test.describe(`C68564 Verify user is upload the integration zip file having one branched flow (with input/output/mapping/hooks defined) in the template ad able to install the template`, () => {
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
    await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, "C68564_Automation");
    await io.homePage.loadingTime();

    //Unpublish the template
    let isPublished = await io.homePage.isVisible(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT);
    if (isPublished) {
      await io.homePage.click(selectors.basePagePO.TEMPLATE_PUBLISH_UNPUBLISH);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.integrationPagePO.UNPUBLISH);
      await io.homePage.loadingTime();
    }

  });
  test(`@Env-All @Zephyr-IO-T17465 C68564 Verify user is upload the integration zip file having one branched flow (with input/output/mapping/hooks defined) in the template ad able to install the template`, async ({
    io,
    page
  }) => {
    await io.homePage.goToMenu("Resources", "Templates");
    await io.homePage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, "C68564_Automation");
    await io.homePage.waitForElementAttached(
      `:has-text("C68564_Automation") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`
    );
    await io.homePage.click(
      `tbody tr:has-text("C68564_Automation") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`
    );
    await io.homePage.click('[data-test="uploadTemplateZip"]');
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/inputData/Templates/C68564_NEW.zip");
    await io.homePage.loadingTime();

    //Publish the template
    let isPublished = await io.homePage.isVisible(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT);
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
      "C68564_Automation"
    );
    await io.homePage.loadingTime();
    await io.marketplacePage.waitForElementAttached(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.marketplacePage.clickByIndex(selectors.homePagePO.INSTALL_TEMPLATE, 0);
    await io.marketplacePage.clickByText("Install now");
    await io.marketplacePage.waitForElementAttached(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );

    for(let i =0; i< 3; i++){
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

    //Verify if the flow is installed
    await io.integrationPage.clickByIndex('td a', 0);

    //get num of bubbles
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT);
    let bubbles = await page.$$(selectors.flowBuilderPagePO.TRANSFER);
    await io.assert.expectToBeValue((bubbles.length).toString(), "3", 'Template is not fully installed');
    
  //Verify data
  await io.assert.verifyElementIsDisplayed(selectors.basePagePO.OUTPUTFILTER, "Export filter not copied");
  await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.EXPORT_HOOKS, "Export hooks not copied");
  await io.assert.verifyElementIsDisplayed(selectors.basePagePO.INPUTFILTER, "inputFilter not copied");
  await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, "importMapping not copied");

  });
});

