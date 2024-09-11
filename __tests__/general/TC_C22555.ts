import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import ZS1 from "@testData/GENERAL/zendesk_connection.json";
test.describe("TC_C22555", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.goToFlowsPage();
  });
  test("@Zephyr-IO-T2328 @Env-All  TC_C22555", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await test.step("*** Create Flow Selected ***",()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await test.step("*** Clicked on PageProcessor ***",()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.ZENDESKSUPPORT
    );
await test.step(
      "*** Selected Zendesk Support as the adaptor ***"
, async ()=>{});
    await test.step("*** Clicking on type of import ***",()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await io.homePage.click('[data-test="createFromScratch"]')
await test.step(
      "*** Choosing type of import from dropdown ***"
, async ()=>{});
   
    
    await test.step("*** Clicking on NEXT button ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
       selectors.connectionsPagePO.NAME_INPUT,
      "Zendesk_Support"
    );
     
await test.step(
      "*** Choosing the desired Zendesk Support connection ***"
, async ()=>{});
    await test.step("*** Renaming the PageProcessor ***",()=>{});
    await io.homePage.fillWebPage(
      selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE,
      "apps"
    );
    await test.step("*** Selecting the desired API Name ***",()=>{});
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.click(selectors.flowBuilderPagePO.DELETE);
    await test.step("*** Selecting the delete operation ***",()=>{});
    var res = await io.homePage.getText(
      selectors.flowBuilderPagePO.EXISTINGRECORD
    );
    expect(res).toContain(
      "How would you like to identify existing records?"
    );
await test.step(
      "*** How would you like to identify existing records? is existing ***"
, async ()=>{});
  });
});
