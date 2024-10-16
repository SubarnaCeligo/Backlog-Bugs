import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import conn from "@testData/GENERAL/TC_C23151_TC_C27444_installing_and_verification.json";

test.describe("TC_C23151_TC_C27444", () => {
  var connecion;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io, page }, testInfo) => {
   
    await io.connections.deleteConnection(connecion._id);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5966 @Zephyr-IO-T2195 @Env-all  TC_C23151_TC_C27444", async ({ io, page }, testInfo) => {
    connecion = await io.connections.createConnectionViaAPI(conn.conn);

    await io.homePage.navigateTo(`${process.env['IO_UI_CONNECTOR_URL']}marketplace`);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON)
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "FTP");
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowGroupingPagePO.INSTALLTEMPLATE, 0);
    await io.homePage.loadingTime();

    await io.homePage.clickByText('Install now')
    await io.homePage.loadingTime();  
    await io.homePage.loadingTime();  
    await io.homePage.clickByIndex(selectors.templatePagePO.CONFIGURE,0)

    await io.homePage.click(selectors.marketplacePagePO.EXISTING );

    await io.homePage.fillWebPage(selectors.exportsPagePO.CREATE_SELECT_CONNECTION, connecion.name)
    await io.homePage.clickByTextByIndex('Offline TC_C27444', 0)
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.assert.checkElementState(selectors.flowBuilderPagePO.SAVE_CHANGE, "isVisible");
    await io.homePage.click(selectors.flowBuilderPagePO.SAVE_CHANGE)
    
     await io.homePage.click(selectors.basePagePO.UNINSTALL_BUTTON)
     await io.homePage.click(selectors.basePagePO.UNINSTALL_BUTTON2)
    
    const id = io.api.getIntegrationId("Copy FTP - Microsoft SQL");
    await io.api.deleteIntegrationRecursively(id);


  });
});
