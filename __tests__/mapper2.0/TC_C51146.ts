import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C51146 from "@testData/Mapper2.0/TC_C51146.json";

test.describe("TC_C51146 Verify whether user is able to close search row", () => {
  var flows;
  test("@Env-All @Zephyr-IO-T22369  Verify whether user is able to close search row", async ({
    io,
    page
  }) => {
    test.step(" *** CREATED FLOW VIA API ***", async () => {});
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C51146);
    await test.step(
      "Created Flow " +
        flows.get(TC_C51146.name)["flowName"] +
        " With ID " +
        flows.get(TC_C51146.name)["flowId"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC_C51146.name)["flowId"]);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the import mappings***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on search button ***", async () => {});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SEARCH);
    await io.homePage.loadingTime();
    test.step("*** Mouse over on Close search ***", async () => {});
    var closeSearch = await page.getByLabel("Close search");
    await closeSearch.hover();
    test.step("*** Validate the hover test ***", async () => {});
    let hoverText = await io.homePage.getText(selectors.mappings.TOOLTIP);
    expect(hoverText).toEqual("Close search");

    test.step("*** Close the search ***", async () => {});
    await closeSearch.click();
    await io.homePage.loadingTime();

    test.step("*** Validate search option re-surfaces***", async () => {});
    var isSearchButtonVisible = await io.homePage.isVisible(
      selectors.mappings.MAPPER2DOT0PO.SEARCH
    );
    expect(isSearchButtonVisible).toBe(true);
  });
});
