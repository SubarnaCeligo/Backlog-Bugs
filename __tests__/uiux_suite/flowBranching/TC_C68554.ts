import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C68554 Verify Existing Import/Export suggestion drop down display while creating new Import/Export forall connectors-IO-34880`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`C68554 Verify Existing Import/Export suggestion drop down display while creating new Import/Export forall connectors-IO-34880`, async({io,page}) => {
  
       await io.homePage.clickByText("Tools")
       await io.homePage.clickByText("Flow builder")
       await io.flowBuilder.clickByText("Add source")
       await io.flowBuilder.click(selectors.importPagePO.HTTP_IMPORT)
       await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)
       await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK CONNECTION")
       await io.flowBuilder.clickByTextByIndex("HTTP ZENDESK CONNECTION",0)
       await io.flowBuilder.waitForElementAttached("[name='checkExistingExport']")
       await io.flowBuilder.click("[name='checkExistingExport']")
       await io.assert.verifyElementIsDisplayed("[role='listbox']", "Element is present")

    });
  })