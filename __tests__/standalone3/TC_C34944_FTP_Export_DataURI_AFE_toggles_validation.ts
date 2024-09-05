import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C34944_FTP_Export_DataURI_AFE_toggles_validation", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5573 @Env-All TC_C34944_FTP_Export_DataURI_AFE_toggles_validation", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Creating an export ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);

    test.step("*** Selecting FTP adapter ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);

    test.step("*** Choosing the desired FTP connection ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
    test.step("*** Entering the Export Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "C34944 Test");
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on Advance button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on directory Handle bar ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.DATAURIHANDLEBAR);
    test.step("*** Verifying toggles bars should not present ***", async ()=>{});
    var dataURI1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(dataURI1, "");
    var dataURI2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(dataURI2, "");

    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE,1);
    test.step("*** Discarding the changes ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
