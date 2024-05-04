import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C68554 Verify Existing Import/Export suggestion drop down display while creating new Import/Export forall connectors-IO-34880`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`C68554 Verify Existing Import/Export suggestion drop down display while creating new Import/Export forall connectors-IO-34880`, async({io,page}) => {
       await io.homePage.clickByText("Tools")
       await io.homePage.clickByText("Flow builder")
       await io.homePage.loadingTime()
       await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_SOURCE_BUTTON)
       await io.flowBuilder.click(selectors.basePagePO.ADD_SOURCE_BUTTON)
       await io.flowBuilder.loadingTime()
       await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
       await io.flowBuilder.click(selectors.importPagePO.HTTP_IMPORT)
       await io.flowBuilder.clickByText("Create from scratch");
       await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)
       await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)
       await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK CONNECTION")
       await io.flowBuilder.clickByTextByIndex("HTTP ZENDESK CONNECTION",0)
       await io.flowBuilder.waitForElementAttached("[name='checkExistingExport']")
       await io.flowBuilder.click("[name='checkExistingExport']")
       await io.assert.verifyElementIsDisplayed("[role='listbox']", "Element is present")
    });
  })