
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C2189", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1842 TC_C2189", async ({io,page}, testInfo) => {
    //create connection
    test.step("*** Navigate to Connections ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "Zoom_DN");
    await io.homePage.clickByTextByIndex("Zoom_DND", 0);

    await io.homePage.loadingTime();
    test.step("*** Clicking on name help icon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NAME_HELPERTEXT);
    const namehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(namehelptext)).toContain("Enter a unique name for your connection so that you can easily reference it from other parts of the application.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified name Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ZOOMAPIKEY_HELPERTEXT);
    test.step("*** Click on ApiKey help text***", async ()=>{});

    const zoomapikeyhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(zoomapikeyhelptext)).toContain("Multiple layers of protection, including AES 256 encryption, are in place to keep your API key safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified ApiKey Help text***", async ()=>{});

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on the Advanced section ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ZOOMAPISECRET_HELPERTEXT);
    test.step("*** Click on ApiSecret help text***", async ()=>{});

    const zoomapisecrethelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(zoomapisecrethelptext)).toContain("Multiple layers of protection, including AES 256 encryption, are in place to keep your API secret safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified ApiSecret Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ZOOMCONCURRENCYLEVEL_HELPERTEXT);
    test.step("*** Click on concurrencylevel help text***", async ()=>{});
    const zoomconcurrencylevelhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(zoomconcurrencylevelhelptext)).toContain("The concurrency level that integrator.io is currently using during a rate-limit error auto-recovery period.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified concurrencylevel Help text***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
