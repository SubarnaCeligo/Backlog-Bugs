
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import mapper from "@testData/Mapper2.0/TC_C46903.json";

test.describe("TC_C46903 Verify the default output selection must be rows for xlsx", () => {

  let flowId;
    test.afterEach(async ({ io }) => {
      await io.api.deleteFlowViaAPI(flowId);
    });
    
  test("@Env-All @Zephyr-IO-T18014 Verify the default output selection must be rows for xlsx", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(mapper, "FLOWS");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();


    const defaultOutputFormatDropdown = await io.homePage.getTextFromElement(
      selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT,
      "Create destination rows [ ] from source record { }"
    );
    await io.assert.expectToBeTrue(defaultOutputFormatDropdown, "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
