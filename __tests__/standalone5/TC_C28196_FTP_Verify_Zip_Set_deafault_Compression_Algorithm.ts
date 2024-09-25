
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C28196_FTP_Verify_Zip_Set_deafault_Compression_Algorithm", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T13714 @Env-All TC_C28196 Set default compression algorithm for FTP connections with pgp details", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "connections");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "FTP_PGP_PRIVATE_KEY CONNECTION");
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.homePage.click(selectors.flowBuilderPagePO.APIMPUSHOPTION);

    test.step("*** Verifying Compression Algorithm is set zip default ***", async ()=>{});
    var validation = await io.homePage.getText(selectors.flowBuilderPagePO.FTPALGORITHM);
    await io.assert.expectToBeValue(String(validation), "zip", "");
  });
});
