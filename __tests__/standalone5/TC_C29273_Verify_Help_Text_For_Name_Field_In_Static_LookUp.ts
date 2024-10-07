
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/TC_C29273_Verify_Help_Text_For_Name_Field_In_Static_LookUp.json";

test.describe("TC_C29273_Verify_Help_Text_For_Name_Field_In_Static_LookUp", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T1895 @Env-All TC_C29273_Verify_Help_Text_For_Name_Field_In_Static_LookUp", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.loadingTime();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on settings gear icon ***", async ()=>{});
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_SETTING);

    await io.homePage.loadingTime();

    test.step("*** Clicking on Static LookUp ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.LOOKUP);
    await io.homePage.loadingTime();

    test.step("*** Clicking on Name help button  ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUPHELPTEXT);
    const lookuphelptext = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT);
    await io.assert.expectToBeValue(String(lookuphelptext), "Enter a unique name so that you can identify this lookup later.Was this helpful?", "");
    test.step("*** Verified the  help text is as expected for Lookup ***", async ()=>{});
    test.step("*** closing the import ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** closing the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to homepage ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
