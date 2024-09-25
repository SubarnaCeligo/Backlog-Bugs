import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C51211 from "@testData/Mapper2.0/TC_C51211.json";

test.describe("TC_C51211 verify when user modifies the parent node source it should not remove the child rows for [object]", () => {
  var flows;
  test("@Env-All @Zephyr-IO-T22381 verify when user modifies the parent node source it should not remove the child rows for [object]", async ({ io, page }) => {
    test.step(" *** CREATED FLOW VIA API ***", async () => {});
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C51211);
    await test.step(
      "Created Flow " +
        flows.get(TC_C51211.name)["flowName"] +
        " With ID " +
        flows.get(TC_C51211.name)["flowId"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC_C51211.name)["flowId"]);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on the created export***", async () => {});
    await io.homePage.loadingTime();
    test.step("*** Open import mapping***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    test.step("*** Changing the parent resource ***", async () => {});

    await io.homePage.clickButtonByIndex(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS, 0);
    await page.keyboard.type("$.fNamemn");
    await io.homePage.clickButtonByIndex(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS, 0);

    test.step("*** Validate the child mappings***", async () => {});
    var data: any[] = ["test", "test1", "test3", "test4"];
    const values = await page
      .locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER)
      .evaluateAll(elements => {
        return elements.map(element => (element as HTMLInputElement).value);
      });
    expect(values).toEqual(data);
  });
});
