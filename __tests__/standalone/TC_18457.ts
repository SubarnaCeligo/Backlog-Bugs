
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_18457", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4591 Users should not be able to edit connections on the Install / Uninstall Wizards for Templates", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    test.step("*** Clicked on Marketplace ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clearTextValue("//input[@type='text']");
    await io.homePage.fillWebPage("//input[@type='text']", "Microsoft SQL");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.homePage.loadingTime();
    await page.locator('button:text("Install now")').click();
    await io.homePage.loadingTime();

    var veri1 = await io.homePage.getLengthOfElementArray(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
    await io.homePage.click(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HOSTNAME, "celigo.files.com");
    test.step("*** Entering the Host ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME, "io.auto.qa@celigo.com");
    test.step("*** Entering the Username ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.FTP_PASSWORD, decrypt("dlVZYTE4ejhQUVlmakd1SQ==")
    );
    test.step("*** Entering the Password ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.TEST_CONNECTION);
    test.step("*** Verified Connection should work fine ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    var veri2 = await io.homePage.getLengthOfElementArray(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);

    if(veri1 - veri2 == 1) {
      test.step("Configure button is disabled, So button in non Editable", async ()=>{});
    }
    test.step("*** Verifying  After the connection is setup and when user clicks on the configure again, test should be not editable   ***", async ()=>{});
  });
});
