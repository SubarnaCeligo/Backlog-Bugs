
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C22318_trackekey_ftp.json";
import FTP1 from "@testData/GENERAL/TC_C22326_max_breadth_depth_tracekey.json";

test.describe("TC_C22318_TC_C22326", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("TC_C22318", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    

    var id = await io.api.getFlowId(FTP.name);

    await io.flowBuilder.navigateToTheFlow( id);
    await io.homePage.isPageLoaded();

    await io.api.checkJobStatusFromAPI(  FTP.name, id);
    await io.homePage.reloadPage();

    await io.em2.getEm2ErrorTable(id);

    await io.homePage.isPageReady();

    if(await io.homePage.isVisible( selectors.basePagePO.TOGGLE_BTN_ERROR_DETAILS)
    ) {
      await io.homePage.click(selectors.integrationPagePO.ERRORDETAILSPAGE);

      var errorFields = await io.assert.isTextMatched(selectors.basePagePO.ERROR_DETAILS_DIV, "  Trace key ");
      await io.assert.expectToBeFalse(errorFields,"")
    } else {
      await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 2);
      await io.homePage.click(selectors.flowBuilderPagePO.VIEWERROR);

      var errorFields1 = await io.assert.isTextMatched(selectors.basePagePO.ERROR_DETAILS_DIV, "  Trace key  ");
      await io.assert.expectToBeFalse(errorFields1,"")
    }
  });

  test("TC_C22326", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP1);
  

    var id = await io.api.getFlowId(FTP1.name);

    await io.flowBuilder.navigateToTheFlow(id);
    await io.homePage.isPageLoaded();

    await io.api.checkJobStatusFromAPI(FTP1.name, id);
    await io.homePage.reloadPage();

    await io.em2.getEm2ErrorTable(id);

    await io.homePage.isPageReady();

    if(await io.homePage.isVisible( selectors.basePagePO.TOGGLE_BTN_ERROR_DETAILS)
    ) {
      await io.homePage.click(selectors.integrationPagePO.ERRORDETAILSPAGE);

      var errorFields = await io.assert.isTextMatched(selectors.basePagePO.ERROR_DETAILS_DIV, "  Trace key : 5 ");
      await io.assert.expectToBeTrue(errorFields, "");
    } else {
      await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 2);
      await io.homePage.click(selectors.flowBuilderPagePO.VIEWERROR);

      var errorFields1 = await io.assert.isTextMatched(selectors.basePagePO.ERROR_DETAILS_DIV, "  Trace key : 5 ");
      await io.assert.expectToBeTrue(errorFields1, "");
    }

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
