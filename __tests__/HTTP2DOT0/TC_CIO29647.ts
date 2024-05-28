import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_CIO29647", () => {
test("@Env-All IO29647", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE);
    await io.flowBuilder.click(selectors.basePagePO.MARKETPLACE);
    await io.flowBuilder.fill(selectors.templatePagePO.MARKETPLACE,'HTTP2.0');
    await io.flowBuilder.click(selectors.flowGroupingPagePO.INSTALLTEMPLATE);
    await io.flowBuilder.clickByText("Install now");
    await io.flowBuilder.loadingTime();
    
    await io.flowBuilder.waitForElementAttached(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);

    await io.assert.verifyElementIsDisplayed(selectors.templatePagePO.FTPGUIDE,'ftp KB guide displayed');
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io.flowBuilder.clickByTextByIndex("FTP CONNECTION", 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);


   await io.flowBuilder.click(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
   await io.flowBuilder.loadingTime();
   await io.flowBuilder.click(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
   await io.assert.verifyElementIsDisplayed(selectors.templatePagePO.ORDERFULGUIDE,'orderful KB article guide displayed');
   await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HTTP_2DOT0,'HTTP toggle not displayed');
   await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH,'Simple toggle not displayed');
   await io.flowBuilder.click(selectors.basePagePO.HTTP_2DOT0);
   await io.flowBuilder.loadingTime();
   const element1 = await page.locator(selectors.templatePagePO.ORDERFULTOKEN);
   await element1.scrollIntoViewIfNeeded();
   await element1.click();
   await io.flowBuilder.fill(selectors.templatePagePO.ORDERFULTOKEN,process.env["IO_Token_Orderful"]);
   await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
   await io.flowBuilder.click(selectors.integrationPagePO.SETUP_INTEGRATION_INSTALL_BUTTON);
   await io.flowBuilder.click(selectors.basePagePO.CONNECTIONS);
   await io.flowBuilder.clickByText('toggle(orderful)');
   await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.MEDIA_TYPE,'Mediatype displayed in http view');
   await io.flowBuilder.click(selectors.basePagePO.CLOSE);
   await io.flowBuilder.click(selectors.flowGroupingPagePO.FLOWS);
   await io.flowBuilder.loadingTime();
   await io.flowBuilder.click(selectors.flowBuilderPagePO.ACTIONSMENUINFLOW);
   await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.DELETE_CONNECTION);
   await io.flowBuilder.click(selectors.connectionsPagePO.DELETE_CONNECTION);
   await io.flowBuilder.loadingTime();
   await io.flowBuilder.click(selectors.basePagePO.DELETE);
   await io.flowBuilder.waitForElementAttached(selectors.homePagePO.DELETE_INTEGRATION);
   await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
   await io.flowBuilder.click(selectors.basePagePO.DELETE);



  });
});