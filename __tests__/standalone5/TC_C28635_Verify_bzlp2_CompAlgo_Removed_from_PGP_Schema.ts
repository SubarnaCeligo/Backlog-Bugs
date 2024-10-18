import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C28635_Verify_bzlp2_CompAlgo_Removed_from_PGP_Schema", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T12036 TC_C28635_Verify_bzlp2_CompAlgo_Removed_from_PGP_Schema", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Clicking on create connections ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** selecting FTP ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.loadingTime();
    test.step("*** Enabling PGP cryptographic checkbox ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.USE_PGP);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Compression algorithm ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.FTPALGORITHM);
    await io.homePage.loadingTime();

    await io.assert.verifyElementContainsText(selectors.basePagePO.LIST_BOX, 'Please selectzipzlib');
  });
});
