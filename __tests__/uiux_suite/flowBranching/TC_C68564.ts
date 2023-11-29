import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C68564 Verify user is upload the integration zip file having one branched flow (with input/output/mapping/hooks defined) in the template ad able to install the template`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
        test(`C68564 Verify user is upload the integration zip file having one branched flow (with input/output/mapping/hooks defined) in the template ad able to install the template`, async ({
          io,
          page
        }) => {
            await io.homePage.clickByText("Resources");
            await io.homePage.clickByText("Templates");
            await io.homePage.waitForElementAttached(`:has-text("temp1") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
            await io.homePage.click(`tbody tr:has-text("temp4-DND") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
            await io.homePage.clickByText("Upload template zip");
            const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
            await fileInput.setInputFiles('testData/inputData/Templates/C68564.zip');  
            await io.homePage.clickByText("Marketplace")
            await io.marketplacePage.fill('[placeholder="Search marketplace"]', "temp4-DND") 
            await io.marketplacePage.clickByText("Preview");
            await io.marketplacePage.clickByText("Install now")
            await io.marketplacePage.waitForElementAttached(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON)
             
            await io.homePage.click(
              selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
            );
            await io.homePage.clickByText("Use existing connection");
            await io.homePage.clickByText("Please select");
            await page
              .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
              .getByText("FTP CONNECTION").first()
              .click();
              await io.connectionPage.click(selectors.basePagePO.SAVE);
            await io.homePage.click(selectors.basePagePO.INSTALL);
            await io.homePage.clickByTextByIndex('C68564',2);
            const linkUrl = await page.url();
            const match = linkUrl.match(/\/integrations\/(\w+)\/flowBuilder\/(\w+)/);
            const firstString = match[1];
            const secondString = match[2];
            await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
            await io.homePage.fill('[placeholder="Search integrations & flows"]','C68564' )
            await io.homePage.waitForElementAttached("text='C68564'")
            const flow = await io.homePage.isVisible("text='C68564'")
            await io.assert.expectToBeValue(flow.toString(),'true', "Template flow not found")
            const res = await io.api.deleteCall(
              `v1/flows/${secondString}`,
            );
            
            const res2 = await io.api.deleteCall(
              `v1/integrations/${firstString}`)
              
          
        });
      });
 
 