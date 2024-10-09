
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/FTP_PGP_Crypto_Connection.json";

test.describe("TC_C28203_FTP_Verify_Default_Symmetric_Key_Algorithm", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T13716 @Env-All TC_C28203_FTP_Verify_Default_Symmetric_Key_Algorithm", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();

    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();

    test.step("*** selecting FTP ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.loadingTime();

    test.step("*** Selecting Transfer files to destination app ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.TRANSFER_FILES);

    test.step("*** Selecting Create from scratch ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();

    test.step("*** Choosing the desired FTP connection ***", async ()=>{});
    var conn = FTP[0]["connectionId"];
     

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Advance ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    test.step("*** Clicking on Encrypt files ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ENCRYPTFILES);

    test.step("*** Verifying Encryption symmetric key algorithm default value ***", async ()=>{});
    var validation = await io.homePage.getText(selectors.flowBuilderPagePO.FTPSYMMETRICALGORITHM);
    await io.assert.expectToBeValue(String(validation), "aes256", "");
  });
});
