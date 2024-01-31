
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C37321.json";

test.describe("TC_C37321", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();
  });
  test("TC_C37321", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.isPageLoaded();
    await test.step("*** Navigating to   Flows page ***",()=>{});
    var getid = await io.api.getFlowId("TC_C32543_DND");
    await io.flowBuilder.navigateToTheFlow( getid);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_GENERATOR);
    await test.step("*** selecting connection ***",()=>{});
    await test.step("Selecting application",()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    var conn = FTP["connectionId"];
    conn = io.connMap.get(conn);

    await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, conn);
    await test.step("Selecting connection",()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FTPDIRECTORYPATH, 1);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await test.step("Verified the drawers as part of rightDrawer migration in AFE field",()=>{});
    await io.homePage.click(selectors.integrationPagePO.EDITRESOURCE);
    await io.homePage.clickButtonByIndex(selectors.importPagePO.IMPORT_CLOSE_DRAWER, 1);
    await test.step("Verified the drawers as part of rightDrawer migration in Connection Form",()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 2);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 1);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await test.step("Verified the drawers as part of rightDrawer migration in Mapping Section",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
