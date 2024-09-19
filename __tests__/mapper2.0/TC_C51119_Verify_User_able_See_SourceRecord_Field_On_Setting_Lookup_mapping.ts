import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51119_Verify_User_able_See_SourceRecord_Field_On_Setting_Lookup_mapping.json";

test.describe(`TC_C51119 Verify mapper settings page new field ""Source record field"" should be added for field mapping type ""StaticLookup mapping""`, () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test(`@Zephyr-IO-T22350 @Env-All Verify mapper settings page new field ""Source record field"" should be added for field mapping type ""StaticLookup mapping""`, async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(TC, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on mapping ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();

    test.step("*** Clicking on setting gear ***", async () => {});
    await io.homePage.clickButtonByIndex(selectors.mappings.SETTINGSICON_1, 0);

    test.step("*** Selecting Mapping Type ***", async () => {});
    await io.homePage.fillWebPage(
      selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE,
      "lookup"
    );
    test.step("*** Clicking on static lookup type ***", async () => {});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP);

    await test.step("*** Validating Source Field is displayed in setting Lookup ***", async () => {});

    await page.getByRole("textbox", { name: "Source field" }).click();
    await io.assert.verifyElementDisplayedByText("name", "name not displayed");
    await io.assert.verifyElementDisplayedByText("email", "email not displayed");
    await io.assert.verifyElementDisplayedByText("phone", "phone not displayed");
  });
});
