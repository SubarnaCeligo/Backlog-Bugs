import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C68560 Verify user is upload the ntegration zip file having one linear flow in the template and able to install the template`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
        test(`C68560 Verify user is upload the ntegration zip file having one linear flow in the template and able to install the template`, async ({
          io,
          page
        }) => {
            await io.homePage.clickByText("Resources");
            await io.homePage.clickByText("Templates");
            await io.homePage.waitForElementAttached(`:has-text("temp1") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
            await io.homePage.click(`tbody tr:has-text("temp2-DND") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
            await io.homePage.clickByText("Upload template zip");
            const fileInput = await page.$('input[data-test="uploadFile"]');
            await fileInput.setInputFiles('testData/Templates/C68650copy.zip');  
            await io.homePage.clickByText("Marketplace")
            await io.marketplacePage.fill('[placeholder="Search marketplace"]', "temp2-DND") 
            await io.marketplacePage.clickByText("Preview");
            await io.marketplacePage.clickByText("Install now")
            await io.marketplacePage.waitForElementAttached(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON)
            await io.homePage.clickByIndex(
              selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
            ,0);
            await io.homePage.clickByText("Use existing connection");
            await io.homePage.clickByText("Please select");
            await page
              .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
              .getByText("BOX CONNECTION")
              .click();
              await io.connectionPage.click(selectors.basePagePO.SAVE);

            await io.homePage.click(
              selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
            );
            await io.homePage.clickByText("Use existing connection");
            await io.homePage.clickByText("Please select");
            await page
              .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
              .getByText("FTP CONNECTION")
              .click();
              await io.connectionPage.click(selectors.basePagePO.SAVE);

            await io.homePage.click('[data-test="Install"]');

            await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        
            await io.homePage.waitForElementAttached("text='TC100370_FTP_TO_FTP'")
            const flow = await io.homePage.isVisible("text='TC100370_FTP_TO_FTP'")
            await io.assert.expectToBeValue(flow.toString(),'true', "Template flow not found")
            await io.homePage.clickByTextByIndex("TC100370_FTP_TO_FTP",0);
            await io.homePage.waitForElementAttached(`tbody tr:has-text("TC100370_FTP_TO_FTP") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
            await io.homePage.clickByIndex(`tbody tr:has-text("TC100370_FTP_TO_FTP") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`,0);
            await io.homePage.clickByText("Delete flow")
            await io.homePage.click('[data-test="Delete"]')
            await io.homePage.waitForElementAttached('text="Delete integration"')
            await io.homePage.clickByText('Delete integration')
            await io.homePage.click('[data-test="Delete"]')
            await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

        });
      });
    