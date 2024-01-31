
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C22309_TC_C26399_trackey_and_retryData.json";

test.describe("TC_C22309_TC_C26399", () => {


  test.beforeEach(async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigate to Home Page ***", () => { });



    await io.homePage.navigateTo(`${process.env["IO_UI_CONNECTOR_URL"]}/scripts`);
  });
  test("TC_C22309_TC_C26399", async ({ io, page }, testInfo) => {
    var scriptId = await io.api.getScriptId("TC_C26399");

    if (!scriptId) {
      await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
      await io.homePage.isPageLoaded();
      await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C26399");
      await io.homePage.fillWebPage(selectors.basePagePO.FUNCTION_STUB, "filter");
      await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

      scriptId = await io.api.getScriptId("TC_C26399");
    }

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();

    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);


    var id = await io.api.getFlowId(FTP.name);
    var exp_id = await io.api.getExportId(FTP.name);

    await io.flowBuilder.navigateToTheFlow(id);
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

    await io.api.checkJobStatusFromAPI(FTP.name, id);
    await io.homePage.reloadPage();

    await io.em2.getEm2ErrorTable(id);

    await io.homePage.isPageReady();

    if (await io.homePage.isVisible(selectors.basePagePO.TOGGLE_BTN_ERROR_DETAILS)
    ) {
      var retryData = await io.homePage.getText(selectors.flowBuilderPagePO.RESPONSE_CONTENT)

      await io.assert.expectToContainValue(String(retryData), `'{  "a": {    "b": 2  },  "b": 3,  "id": [    "4"    ]  }'`, "");

      await io.homePage.click(selectors.integrationPagePO.ERRORDETAILSPAGE);

      var errorFields = await io.assert.isTextMatched(selectors.basePagePO.ERROR_DETAILS_DIV, "  Trace key : 4 ");
      await io.assert.expectToBeTrue(errorFields, "");
    } else {
      await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 2);
      await io.homePage.click(selectors.flowBuilderPagePO.VIEWERROR);

      var errorFields1 = await io.assert.isTextMatched(selectors.basePagePO.ERROR_DETAILS_DIV, "  Trace key : 4 ");
      await io.assert.expectToBeTrue(errorFields1, "");

      await io.homePage.click(selectors.basePagePO.EDIT_RETRY_DATA);
      await io.homePage.isPageLoaded();

      var retryData1 = await io.homePage.getText(selectors.flowBuilderPagePO.RESPONSE_CONTENT)

      await io.assert.expectToContainValue(String(retryData1), `'{  "a": {    "b": 2  },  "b": 3,  "id": [    "4"    ]  }'`, "");
    }

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
