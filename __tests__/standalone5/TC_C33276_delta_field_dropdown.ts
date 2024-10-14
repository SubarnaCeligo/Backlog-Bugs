
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import NS from "@testData/STANDALONE/NS_amortization.json";

test.describe("Delta Field Drop-Down Verification", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T6636 TC_C33276_Delta_Field_Drop-Down_Verification", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Selected NETSUITE as the adaptor ***", async ()=>{});

    await io.homePage.loadingTime()

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    var conn = NS["connectionId"];

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    // 

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.clickByText(conn);
    await io.homePage.loadingTime();

    test.step("*** Choosing the desired NETSUITE connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on the NEXT button ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.EXPORT_RECORD_TYPE, "employee");
    test.step("*** Choosing recordType as Employee ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.EXPORTTYPE, "delta");
    test.step("*** Choosing exportType as Delta ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.DELTA_FIELDS);
    test.step("*** Clicking on the delta dropdown ***", async ()=>{});

    const loc = selectors.flowBuilderPagePO.DELTA_LIST_OF_ELEMENTS;
    const dropdownElements = [
      "Date Created",
      "Last Modified Date",
      "Permission Change Date",
      "Role Change Date",
      "Messages : Date",
      "Messages From : Date",
      "Messages To : Date",
    ];

    for(var a in dropdownElements) {
      let matching = await io.homePage.getDropDownValue(loc, dropdownElements[a]);
      await io.assert.expectToBeTrue(matching, "");
    }
  });
});
