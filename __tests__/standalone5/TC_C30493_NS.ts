
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import NS from "@testData/STANDALONE/netsuite_standalone_imports.json";

test.describe("Netsuite_standalone_imports", () => {
  let flowID;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowID]);
    test.step("** Deleted flow **", async () => { });
  });

  test("@Zephyr-IO-T1319 @Env-All TC_C30493_Create_flow", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Selected NETSUITE as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    var conn = NS["connectionId"];
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION_DROPDOWN, conn);
    test.step("*** Choosing the desired NETSUITE connection ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_NS_Accont");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE);
    await io.homePage.loadingTime();
    test.step("*** Refreshing the RecordType of NETSUITE ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RECORD_TYPE, "Account");
    test.step("*** Selecting the desired RecordType ***", async ()=>{});

    await io.homePage.click(selectors.mappings.ATTACH);
    await io.homePage.loadingTime();
    test.step("*** Selecting Attach radio-button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    flowID = await page.url().split('/flowBuilder/')[1];

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    test.step("*** Saving the import ***", async ()=>{});
  });
});
