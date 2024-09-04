import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C37151_Verify_AFE2_0_enabled_inPPLookup_BigQuery", () => {

  test("@Zephyr-IO-T7677 @Env-All TC_C37151_Verify_AFE2_0_enabled_inPPLookup_BigQuery", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.GOOGLE_BIGQUERY);
    test.step("*** Selected BigQuery as the adaptor ***", async ()=>{});
    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);
    test.step("*** Selecting what we want to do with import ***", async ()=>{});
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();     

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "BIGQUERY CONNECTION");
    test.step("*** Choosing the desired BigQuery connection ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);

    test.step("Opening Handlebar editor", async ()=>{});
    await io.homePage.loadingTime();
    
    const afe2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(afe2, "");
    test.step("** Verified AFE2.0 is enabled for query in BigQuery Lookup imports **", async ()=>{});
  });
});
