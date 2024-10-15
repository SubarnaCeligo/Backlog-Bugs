
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_C33413_Verify_Suggestion_RelativeURI_OneToMany_True.json";

test.describe("TC_C33413_Verify_Suggestion_RelativeURI_OneToMany_True", () => {
  let flowID;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowID]);
    test.step("** Deleted flow **", async () => { });
  });
  test("@Zephyr-IO-T5563 @Env-All TC_C33413_Verify_Suggestion_RelativeURI_OneToMany_True", async ({io,page}, testInfo) => {
    flowID = await io.createResourceFromAPI(HTTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("** Clicking on Relative URI Handlebar ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.homePage.loadingTime();

    test.step("*** Verifying Suggestion Relative URI in editor ***", async ()=>{});
    var data = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("_PARENT",String(data), "");

    test.step("*** Clicking on Relative URI Handlebar close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
  });
});
