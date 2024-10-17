
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C25127", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T1870 TC_C25127", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Click on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.GDRIVE);
    await io.homePage.loadingTime();
    test.step("*** Selected Google Drive as the adaptor ***", async ()=>{});

    //Name
    await io.homePage.click(selectors.flowBuilderPagePO.NAME_HELPERTEXT);
    test.step("*** Clicking on ? ***", async ()=>{});
    var namehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(namehelptext)).toContain("Enter a unique name for your connection so that you can easily reference it from other parts of the application.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** verified Help Text for Name ***", async ()=>{});

    //TODO: Configure scopes
    // await io.homePage.click(selectors.flowBuilderPagePO.CONFIGURESCOPEHELPTEXT);
    // test.step("*** Clicking on ? ***", async ()=>{});
    // var scopehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    // await expect(String(scopehelptext)).toContain("Scopes are named permissions that are provided when the connection is authorized. The list of supported scopes should be clearly documented in the API user guide. Connecting with a given scope allows your integration, for example, to export data or perform admin functions.");
    // await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    // test.step("*** verified Help Text for Configure scopes ***", async ()=>{});

    test.step("*** Clickng on close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to HomePage ***", async ()=>{});
  });
});
