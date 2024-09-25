import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C51605 Verify help text for [Simple | HTTP] toggle button for Createlookup", () => {
  test("@Env-All @Zephyr-IO-T18924  @Priority-P2 C51605 Verify help text for [Simple | HTTP] toggle button for Createlookup", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "Loop Returns"
    );
    await io.flowBuilder.clickByText("Loop Returns");
    await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.importPagePO.QUESTION_MARK);
    await io.assert.verifyElementText(
      selectors.mappings.TOOLTIP,
      "Formview• Simple form helps you to quickly configure the resources by displaying only the required minimum fields.• HTTP form allows you to view and/or modify application specific resources at the universal HTTP connector level.Was this helpful?"
    );
  });
});
