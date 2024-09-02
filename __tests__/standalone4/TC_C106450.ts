import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C106450.json";

test.describe("TC_C106444_C106450", () => {
  let script_id_pre;
  let aa;
  let saveAndClose;
  let flowID;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await io.api.deleteScriptViaAPI(script_id_pre);
    await io.api.deleteFlowsWithId([flowID]);
    test.step("*** Deleting the scripts and flows ***", async () => { });
  });
  test("TC_C106444_C106450_1 @Zephyr-IO-T23735 @Zephyr-IO-T23729 @Env-All", async ({ io, page }, testInfo) => {
    test.step("*** Creating Flow Branch ***", async ()=>{});
    var script_id_pre = await io.api.createScriptViaAPI( TC.script);
    TC.routers[0].branches[0].pageProcessors[1]["qa__import"]["hooks"][
      "postAggregate"
    ]["_scriptId"] = script_id_pre;
    TC.routers[0].branches[0].pageProcessors[1]["qa__import"]["hooks"][
      "postMap"
    ]["_scriptId"] = script_id_pre;
    TC.routers[0].branches[0].pageProcessors[1]["qa__import"]["hooks"][
      "postSubmit"
    ]["_scriptId"] = script_id_pre;
    TC.routers[0].branches[0].pageProcessors[1]["qa__import"]["hooks"][
      "preMap"
    ]["_scriptId"] = script_id_pre;
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();

    flowID = await io.flowbranching.createFlowBranchFromAPI(TC);
    await io.homePage.loadingTime();
    test.step("*** Navigate to Flow Page ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowID);
    test.step("*** Navigate to Flow ***", async ()=>{});
    await io.homePage.loadingTime();

    //TC_C106444 The save & close button has primary blue color i.e. #1D76C7
    // TC_C106450 Verify Field outline should be blue when cursor is in
    // a)Export on Flow builder
    test.step("*** Clicking on export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVEURI, "/users2");
    test.step("*** Naming the relative URL  ***", async ()=>{});
    await io.homePage.loadingTime();
    const backgroundColorExport = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorExport,
      "SaveAndClose button (export) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});

    var a = await page.locator(selectors.flowBuilderPagePO.URI);
    await a.hover();
    await io.homePage.loadingTime();
    const fieldOutlineExport = await page
      .locator(selectors.flowBuilderPagePO.URI)
      .evaluate(el => {
        return getComputedStyle(el).borderColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      fieldOutlineExport,
      "Field outline (export) background color is not blue"
    );
    test.step("*** Verified Field outline should be blue when cursor is in  ***", async ()=>{});
    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    //b)Import on Flow builder
    test.step("*** Clicking on import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage( selectors.exportsPagePO.HTTP_RELATIVEURI, "/use");
    test.step("*** Naming the relative URL  ***", async ()=>{});
    await io.homePage.loadingTime();
    const backgroundColorImport = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorImport,
      "SaveAndClose button (import) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});

    var a11 = await page.locator(selectors.flowBuilderPagePO.URI);
    await a11.hover();
    await io.homePage.loadingTime();
    const fieldOutlineImport = await page
      .locator(selectors.flowBuilderPagePO.URI)
      .evaluate(el => {
        return getComputedStyle(el).borderColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      fieldOutlineImport,
      "Field outline (import) background color is not blue"
    );
    test.step("*** Verified Field outline should be blue when cursor is in  ***", async ()=>{});
    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    //g)Define Input filter
    test.step("*** Clicking on input filter ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.INPUT_FILTER, 2);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.DELETE_FILTER_RULE);
    
    await io.homePage.loadingTime();
    const backgroundColorInputFilter = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorInputFilter,
      "SaveAndClose button (input filter) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});

    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    // h)Hooks
    test.step("*** Clicking on hooks ***", async () => { });
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS, 1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HOOK_TYPE_STACK_OPTION);
    
    await io.homePage.loadingTime();
    const backgroundColorHooks = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorHooks,
      "SaveAndClose button (hooks) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});

    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    //i)Defining output filter
    test.step("*** Clicking on output filter ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.DELETE_FILTER_RULE);
    await io.homePage.loadingTime();
    const backgroundColorOutputFilter = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorOutputFilter,
      "SaveAndClose button (output filter) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});
    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    // //j)What should happen to a record if the import fails?
    test.step("*** Clicking on if import fails ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PROCEEDONFAILURE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.FALSE);
    await io.homePage.loadingTime();
    const backgroundColorImport2 = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorImport2,
      "SaveAndClose button (import fails) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});
    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    //k)Flow scheduler
    await io.homePage.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
    test.step("***Navigated To Flow Schedule***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_SCHEDULER_CRON_OPTION);
   
    test.step("Clicked On Use Cron Expression", async ()=>{});
    const backgroundColorScheduler = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorScheduler,
      "SaveAndClose button (flow schedule) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});
    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    // //l)Define transformation
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    test.step("*** Navigated To Transform ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.DELETEBUTTON1);
    test.step("Clicked On Delete Transform ", async ()=>{});
    await io.homePage.loadingTime();
    const backgroundColorTransformation = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorTransformation,
      "SaveAndClose button (transformation) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});
    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    //m)Branching
    await io.homePage.click(selectors.flowBranchingPO.FLOW_BRANCH_ROUTER);
    test.step("*** Navigated To Branching ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.NAME);
    var a4 = await page.locator(selectors.flowBuilderPagePO.NAME);
    await a4.hover();
    await io.homePage.loadingTime();
    const fieldOutlineBranchName = await page
      .locator(selectors.flowBuilderPagePO.NAME)
      .evaluate(el => {
        return getComputedStyle(el).borderColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      fieldOutlineBranchName,
      "Field outline (export) background color is not blue"
    );
    test.step("*** Verified Field outline should be blue when cursor is in  ***", async ()=>{});
    await io.homePage.click(selectors.flowBranchingPO.FIRSTMATCHINGBRANCH);
    test.step("Clicked On first_matching_branch", async ()=>{});
    await io.homePage.loadingTime();
    const backgroundColorBranching = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorBranching,
      "SaveAndClose button (branching) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});
    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    //n)Edit Import Mapping
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    test.step("*** Navigated To import Mapping ***", async ()=>{});
    await io.homePage.loadingTime();
    var mappingDestination = await page.$$(selectors.mappings.MAPPING_INPUT);
    await mappingDestination[0].hover();
    await io.homePage.loadingTime();

    const fieldOutlineImportMapping = await page
      .locator(selectors.mappings.MAPPING_INPUT)
      .first()
      .evaluate(el => {
        return getComputedStyle(el).borderColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      fieldOutlineImportMapping,
      "Field outline (export) background color is not blue"
    );
    var a1 = await page.locator(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_REMOVE);
    await a1.hover();
    await io.homePage.loadingTime();
    await a1.click();
    test.step("Clicked On delete mapping", async ()=>{});
    await io.homePage.loadingTime();
    const backgroundColorImportMapping = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorImportMapping,
      "SaveAndClose button (import mapping) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});
    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    //o)Edit Response Mapping
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING);
    test.step("*** Navigated To response mapping ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.DELETEFIRST);
    await io.homePage.loadingTime();
    const backgroundColorResponseMapping = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorResponseMapping,
      "SaveAndClose button (response mapping) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});
    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("TC_C106444_C106450_2 @Zephyr-IO-T23735 @Zephyr-IO-T23729 @Env-All", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    //b. Data Loader
    await io.homePage.goToMenu("Tools","Data loader");
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.basePagePO.DATA_LOADER, 1);
    test.step("*** Clicking on Data Loader ***", async ()=>{});
    await io.homePage.loadingTime();
    var a = await page.locator(selectors.connectionsPagePO.CONNECTION_NAME);
    await a.hover();
    await io.homePage.loadingTime();
    const fieldOutlineDataLoaderConnectionName = await page
      .locator(selectors.connectionsPagePO.CONNECTION_NAME)
      .evaluate(el => {
        return getComputedStyle(el).borderColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      fieldOutlineDataLoaderConnectionName,
      "Field outline (data loader) color is not blue"
    );
    test.step("*** Verified Field outline should be blue when cursor is in  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    //c)Create connection
    await io.homePage.goToMenu("Resources","Connections");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("Clicked on Create connecion.", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    test.step("Selected FTP as application and connection page opened.", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_NAME, "Ftp CONNECTION");
    await io.homePage.loadingTime();
    aa = await page.locator(selectors.connectionsPagePO.CONNECTION_NAME);
    await aa.hover();
    await io.homePage.loadingTime();
    const fieldOutlineConnectionName = await page
      .locator(selectors.connectionsPagePO.CONNECTION_NAME)
      .evaluate(el => {
        return getComputedStyle(el).borderColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      fieldOutlineConnectionName,
      "Field outline (data loader) color is not blue"
    );
    test.step("*** Verified Field outline should be blue when cursor is in  ***", async ()=>{});
    const backgroundColorConnectionForm = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorConnectionForm,
      "SaveAndClose button (coonection form) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();

    //f. Agents
    await io.homePage.goToMenu("Resources","Agents");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await aa.hover();
    await io.homePage.loadingTime();
    const fieldOutlineAgentName = await page
      .locator(selectors.connectionsPagePO.CONNECTION_NAME)
      .evaluate(el => {
        return getComputedStyle(el).borderColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      fieldOutlineAgentName,
      "Field outline (data loader) color is not blue"
    );
    test.step("*** Verified Field outline should be blue when cursor is in  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    //e)Create Lookup
    await io.homePage.goToMenu("Tools","Flow builder");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on Create from scratch button ***", async () => { });
    await io.homePage.loadingTime();
    var conn = "HTTP ZENDESK CONNECTION";

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired HTTP connection ***", async () => { });
    await io.homePage.loadingTime();
    const backgroundColorLookupForm = await page
      .locator(selectors.basePagePO.SAVE_AND_CLOSE)
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      backgroundColorLookupForm,
      "SaveAndClose button (lookup form) background color is not blue"
    );
    test.step("*** Verified The save & close button has primary blue color i.e. #1D76C7  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
