import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C37041_BigQuery_MandatoryFields", () => {

  test("@Zephyr-IO-T7668 @Env-All TC_C37041_BigQuery_MandatoryFields", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.GOOGLE_BIGQUERY);
    test.step("*** Selected BigQuery as the adaptor ***", async ()=>{});
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "BIGQUERY CONNECTION");
    test.step("*** Choosing the desired BigQuery connection ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    test.step("*** Choosing export type  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);

    test.step("*** Saving export without providing mandatory fields ***", async ()=>{});
    await io.homePage.getTextFromElement(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR, "A value must be provided");
    test.step("*** Verifying that the IO will show an error message when user creates BigQuery Export without filling mandatary fields.  ***", async ()=>{});
  });
});
