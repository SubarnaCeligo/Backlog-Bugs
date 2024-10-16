
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import NS from "@testData/STANDALONE/netsuite_standalone_imports.json";

test.describe("TC_C33274", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T6634 TC_C33274", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Selected NETSUITE as the adaptor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    test.step("*** Choosing export record type from dropdown ***", async ()=>{});
    var conn = 'NETSUITE CONNECTION'

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.clickByText(conn);
    await io.homePage.loadingTime();


    test.step("*** Choosing the desired NETSUITE connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C33204");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE);
    test.step("*** Refreshing the RecordType of NETSUITE ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.EXPORT_RECORD_TYPE, "employee");
    await io.homePage.loadingTime();
    test.step("*** Selecting the desired RecordType ***", async ()=>{});

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("Click On Advance", async ()=>{});
    await io.homePage.loadingTime();
   
    await io.homePage.click( selectors.flowBuilderPagePO.SUITEAPP2);
    test.step("Click On SuiteScript SS2", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.EXPORTTYPE, "once");
    test.step("*** Clicking on the ONCE ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ONCE_FIELDS);
    test.step("*** Clicking on the ONCE drop ***", async ()=>{});

    const loc = "//ul//div//div//li";
    var dropdownElements = [
      "EFT Bill Payment",
      "Finance Approval",
      "International Travel",
      "Sales Engineer",
      "Supervisor Approval",
    ];
    for(var a in dropdownElements) {
      let matching = await io.homePage.getDropDownValue(loc, dropdownElements[a]);
      await io.assert.expectToBeTrue(matching, "");
    }
    test.step("*** Verified ONCE field Dropdown ***", async ()=>{});
  });
});
