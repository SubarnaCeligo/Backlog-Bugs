import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C51210 from "@testData/Mapper2.0/TC_C51210.json";

test.describe("TC_C51210 verify when user modifies the parent node source it should not remove the child rows for [object]", () => {
  var flows;
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => {});
    await io.goToFlowsPage();
  });
  test("@Env-All  @Zephyr-IO-T22380 verify when user modifies the parent node source it should not remove the child rows for [object]", async ({
    io,
    page
  }) => {
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C51210);
    await test.step(
      "Created Flow " +
        flows.get(TC_C51210.name)["flowName"] +
        " With ID " +
        flows.get(TC_C51210.name)["flowId"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC_C51210.name)["flowId"]);
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR,
      1
    );

    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Mappings Page openend ***", async () => {});

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.CHILDTREENODECLASS,
      3
    );
    test.step("*** Changed the source field ***", async () => {});

    const inputs = await page.$$("input");

    const values = [];

    for (const iterator of inputs) {
      const check = await iterator.getAttribute("placeholder");
      const value = await iterator.getAttribute("value");
      if (check) {
        values.push(value);
      }
    }

    expect(values).toEqual([
      "child",
      "$.additionalFirstNames",
      "firstName",
      "$.fName",
      "LastName",
      "$.lName"
    ]);
    await test.step("*** Verified the children remain undisturbed ***", async () => {});
  });
});
