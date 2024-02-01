
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C27095_filter_transformation_combo_failiing_and_retrying.json";

test.describe("TC_C27095", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.navigateTo(`${process.env["IO_UI_CONNECTOR_URL"]}/scripts`);
  });
  test("TC_C27095", async ({io,page}, testInfo) => {
    var scriptId = await io.api.getScriptId("TC_C27095");

    if(!scriptId) {
      await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
      await io.homePage.isPageLoaded();
      await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C27095");
      await io.homePage.fillWebPage(selectors.basePagePO.FUNCTION_STUB, "filter");
      await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

      scriptId = await io.api.getScriptId("TC_C27095");
    }

    await io.goToFlowsPage();

    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
 

    var id = await io.api.getFlowId(FTP.name);

    await io.flowBuilder.navigateToTheFlow( id);
    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPTSLIST);
    await io.flowBuilder.selectBasedOnAttribute(selectors.flowBuilderPagePO.SCRIPTS_DROPDOWN, scriptId, "data-value");
    await io.homePage.fillWebPage(selectors.myAccountPagePO.LOGS, 'function filter (options)\n{\n throw new Error("tc");\n}'
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.isPageLoaded();

    await io.api.checkJobStatusFromAPI(  FTP.name, id);
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await io.homePage.isPageLoaded();
    await io.homePage.fillWebPage(selectors.myAccountPagePO.LOGS, "function filter (options)\n{\n return true;\n}"
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.reloadPage();
    await io.homePage.isPageLoaded();
    await io.em2.getEm2ErrorTable( id);
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.selectBasedOnAttribute(selectors.basePagePO.RETRY_DROPDOWN, "all", "data-value");
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY);

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    await io.homePage.isPageLoaded();

    //// Changing the combination now

    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.homePage.isPageLoaded();
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.EXTRACTFIRST, "a.id1");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.api.checkJobStatusFromAPI( FTP.name, id);
    await io.homePage.isPageLoaded();

    await io.homePage.reloadPage();
    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.homePage.isPageLoaded();
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.EXTRACTFIRST, "a.id");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.reloadPage();
    await io.homePage.isPageLoaded();

    await io.em2.getEm2ErrorTable( id);
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.selectBasedOnAttribute(selectors.basePagePO.RETRY_DROPDOWN, "all", "data-value");
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY);

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    await io.homePage.isPageLoaded();

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
