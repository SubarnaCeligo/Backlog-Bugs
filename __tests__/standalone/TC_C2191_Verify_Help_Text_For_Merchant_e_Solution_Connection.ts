
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2191_Verify_Help_Text_For_Merchant_e_Solution_Connection", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1843 TC_C2191_Verify_Help_Text_For_Merchant_e_Solution_Connection", async ({io,page}, testInfo) => {
    //create connection
    test.step("*** Navigate to Connections ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "merchant1");
    await test.step("***Searching the created token***", async ()=>{});

    await io.homePage.clickByTextByIndex("merchant1", 0);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.G2NAMEHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    
    const namehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(namehelptext)).toContain("Enter a unique name for your connection so that you can easily reference it from other parts of the application.");
    test.step("*** Verified Name Help text***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    await io.homePage.click(selectors.flowBuilderPagePO.PROFILE_IDHELPBTN);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const profileIdtext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(profileIdtext)).toContain("ID (Profile ID) issued by Merchant e-Solutions");
    test.step("*** Verified Profile ID Help text***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    await io.homePage.click(selectors.flowBuilderPagePO.PROFILE_KEYHELPBTN);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const profileKeytext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(profileKeytext)).toContain("API password (Profile Key) assigned by Merchant e-Solutions.");
    test.step("*** Verified Profile Key Help text***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    await io.homePage.click(selectors.flowBuilderPagePO.CARD_NUMBERHELPBTN);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    
    const CardNumbertext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(CardNumbertext)).toContain("Payment card number.");
    test.step("*** Verified Card Number Help text***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Clicked on Advanced section ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.BORROWCONCURRENCY_CONNECTIONID);
    test.step("*** Clicking on the question mark ***", async ()=>{});

    const BorrowConcurrency = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(BorrowConcurrency)).toContain("By default, all data flowing through a connection record will get submitted to the respective endpoint application at the concurrency level configured for that connection record. There are use cases however where you need multiple connections to share the same concurrency level, and this field allows you to specify that a connection should borrow concurrency from another connection such that the data flowing through both connections will get submitted to the endpoint application together via a shared concurrency model. For example, you might have three separate NetSuite connection records in your integrator.io account (for the purpose of isolating different permissions for different integrations), but you only want to provision one concurrent request for all three NetSuite connection records to share. To implement this use case you would setup one of the three connections with a concurrency level 1, and then you would setup the other two NetSuite connections to borrow concurrency from the other.");
    test.step("*** Verified BorrowConcurrency Help text***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    await io.homePage.click(selectors.flowBuilderPagePO.CONCURRENCYLVL_HELPBTN);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const ConcurrencyText = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(ConcurrencyText)).toContain("Set this field to limit (or expand) the number of concurrent HTTP requests allowed by the connection at any one time. It is highly recommended to set an explicit value for this field. If this field is left blank, integrator.io will send HTTP requests in highly parallel bursts based on the number of records in the page of data being processed, and most APIs will return governance errors as a result.");
    test.step("*** Verified Concurrency Help text***", async ()=>{});

    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
