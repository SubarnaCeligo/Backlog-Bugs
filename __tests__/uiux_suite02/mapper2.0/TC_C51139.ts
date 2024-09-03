import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from "@testData/Flows/C48963.json";

test.describe("Verify help text for Description all data types in settings drawer", () => {
  test("@Zephyr-IO-T22362 @Env-All @Priority-P2 C51139 Verify help text for Description all data types in settings drawer", async ({
    io,
    page,
    context
  }) => {
    await io.createResourceFromAPI(C48963, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    await io.flowBuilder.loadingTime();
    await page.getByLabel("Settings", { exact: true }).nth(4).click();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.exportsPagePO.DESCRIPTION_HELP_TEXT);

    const secretText = (await io.flowBuilder.getText(
      selectors.myAccountPagePO.HELP_BUBBLE
    )) as string;

    await io.assert.expectToContainValue(
      `Describe your mappings so that other users can quickly understand the logic without having to read through the configurations. It's a good idea to highlight any nuances that you or someone else might need to know for later revisions. Also, as you make changes to the mappings, remember to keep this setting up to date.`,
      secretText,
      "text name found"
    );
  });
});
