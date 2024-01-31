
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import conn from "@testData/GENERAL/TC_C23151_TC_C27444_installing_and_verification.json";

test.describe("TC_C23151_TC_C27444", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C23151_TC_C27444", async ({ io, page }, testInfo) => {
    var connecion = await io.connections.createConnectionViaAPI(conn.conn);

    await io.homePage.navigateTo(`${process.env['IO_UI_CONNECTOR_URL']}/marketplace/adp/${conn.ids.qa}/preview/`);

    await io.homePage.click(selectors.basePagePO.INSTALLBUTTONTEMPLATE);


    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.templatePagePO.CONFIGURE);

    await io.homePage.click(selectors.basePagePO.PAYROLLINTEGRATION);
    await io.homePage.click(selectors.basePagePO.SUBMITBUTTONTEMPLATE);

    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.templatePagePO.CONFIGURE);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HOSTNAME, "abc");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME, "abc");
    await io.homePage.fillWebPage(selectors.connectionsPagePO.FTP_PASSWORD, "123");

    await io.assert.checkElementState(selectors.basePagePO.SAVE_AND_CLOSE, "isDisabled");

    await io.homePage.click("[data-test='existing']");
    await io.homePage.fillWebPage(selectors.exportsPagePO.CREATE_SELECT_CONNECTION, connecion._id);
    await io.assert.checkElementState(selectors.basePagePO.SAVE, "isVisible");
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.homePage.click(selectors.basePagePO.UNINSTALL_BUTTON2);
    await io.connections.deleteConnection(connecion._id);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
