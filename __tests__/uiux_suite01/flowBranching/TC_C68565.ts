import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testdata from "./testdata.json"

test.describe(`C68565 Verify user is upload the integration zip file having linear flow (with input/output/mapping/hooks defined) in the template ad able to install the template`, () => {
  test.beforeEach(async ({ io,page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io, page }) => {
    const res = await io.api.deleteCall(
      `v1/flows/${testdata.secondString}`,
    );
    const res2 = await io.api.deleteCall(
      `v1/integrations/${testdata.firstString}`,
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Resources", "Templates");
    await io.homePage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, "C68565_Automation");
    await io.homePage.loadingTime();

    //Unpublish the template
    let isPublished =  await page.isVisible('button[data-state="checked"]');
    if (isPublished) {
      await io.homePage.click(selectors.basePagePO.TEMPLATE_PUBLISH_UNPUBLISH);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.integrationPagePO.UNPUBLISH);
      await io.homePage.loadingTime();
    }

  });
  test(`@Env-All @Zephyr-IO-T17466 C68565 Verify user is upload the integration zip file having linear flow (with input/output/mapping/hooks defined) in the template ad able to install the template`, async ({
    io,
    page
  }) => {
    await io.homePage.goToMenu("Resources", "Templates");
    await io.homePage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, "C68565_Automation");
    await io.homePage.waitForElementAttached(
      `:has-text("C68565_Automation") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`
    );
    await io.homePage.click(
      `tbody tr:has-text("C68565_Automation") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`
    );
    await io.homePage.click('[data-test="uploadTemplateZip"]');
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/inputData/Templates/C68565_NEW.zip");
    await io.homePage.loadingTime();

    //Publish the template
    let isPublished =  await page.isVisible('button[data-state="checked"]');
    if (!isPublished) {
      await io.homePage.click(selectors.basePagePO.TEMPLATE_PUBLISH_UNPUBLISH);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.integrationPagePO.PUBLISH);
      await io.homePage.loadingTime();
      // Verify that the button is checked
      const button = page.locator('button[data-state="checked"]'); // More specific selector
      await expect(button).toHaveAttribute('data-state', 'checked');
    }

    //Go to marketplace
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    await io.homePage.reloadPage();
    await io.marketplacePage.fill(
      selectors.marketplacePagePO.SEARCH_MARKETPLACE,
      "C68565_Automation"
    );
    await io.homePage.loadingTime();
    await io.marketplacePage.waitForElementAttached(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.marketplacePage.clickByIndex(selectors.homePagePO.INSTALL_TEMPLATE, 0);
    await io.marketplacePage.clickByText("Install now");
    await io.marketplacePage.waitForElementAttached(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );


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

    await io.homePage.click(selectors.basePagePO.INSTALL);
    await io.homePage.loadingTime();

    //Verify if the flow is installed
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.integrationPage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 1);
    (await io.integrationPage.findElementByDataTest("editFlow")).click();

    //get num of bubbles
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT);
    let bubbles = await page.$$(selectors.flowBuilderPagePO.TRANSFER);
    await io.assert.expectToBeValue((bubbles.length).toString(), "2", 'Template is not fully installed');

    //Verify data
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.OUTPUTFILTER, "Export filter not copied");
    await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.EXPORT_HOOKS, "Export hooks not copied");
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.INPUTFILTER, "inputFilter not copied");
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, "importMapping not copied");
    
  });
});
