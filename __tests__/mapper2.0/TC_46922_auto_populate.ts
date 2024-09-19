
import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_46922_auto_populate.json";

test.describe("TC_46922_auto_populate  Verify all the existing mapper 2.0 mappings will be lost when auto populate is selected and saved", () => {


  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });


  test("@Env-All @Zephyr-IO-T18032  Verify all the existing mapper 2.0 mappings will be lost when auto populate is selected and saved", async ({io, page}) => {

    flowId = await io.createResourceFromAPI(TC, "FLOWS");
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

    let mapperDestinationFieldValue = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).inputValue();

    expect(mapperDestinationFieldValue).toBe("test");
    await page.locator(selectors.integrationPagePO.OPENACTIONSMENU).nth(2).click();
        await io.homePage.click(
          selectors.importPagePO.AUTO_POPULATE_MAPPINGS
    );
    await io.flowBuilder.loadingTime();
    await page.getByRole("button", { name: "Auto-populate" }).click();
    await io.flowBuilder.loadingTime();
    mapperDestinationFieldValue = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(0).inputValue();
    expect(mapperDestinationFieldValue).toBe("name");
    expect(mapperDestinationFieldValue).not.toBe("test");
  });
});
