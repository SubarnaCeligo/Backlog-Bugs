import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import NS_GDRIVE from "@testData/Flows/C107918.json";
import expected_result from "@testData/Flows/C107901_expected_result.json";

test.describe("SS2.0 Flows", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("TC_C107889 Verify syncing dateTime fields in NS SS2.x import flows based on Date format added in the settings (DD MONTH, YYYY hh:mm AM/PM)", async ({
    io,
    page
  }, testInfo) => {
    id = await io.createResourceFromAPI(NS_GDRIVE, "FLOWS");
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.FLOW_TOGGLE
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.HTTP_IMPORT_PLUSBUTTON
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.fill(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER,
      "CreatedDate"
    );
    await io.homePage.fill(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER,
      "13 March, 2024 04:15 PM"
    );
    await io.homePage.waitForElementAttached(
      selectors.mappings.MAPPER2DOT0PO.PREVIEW
    );
    await io.homePage.performWebActions(
      selectors.mappings.MAPPER2DOT0PO.PREVIEW,
      "preview"
    );
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    //validating date/time format
    await io.assert.verifyElementContainsText(
      selectors.basePagePO.RESULT_PREVIEW_CONTENT,
      '{  "CreatedDate": "13 March, 2024 04    :15 PM"}'
    );
    await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
    await io.api.validateJobCountFromAPI(
      testInfo.title,
      expected_result.qa__expectedDashboardCount
    );
  });
});
