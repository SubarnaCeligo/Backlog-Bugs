import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C65490 Verify Export for Parse files", () => {
  test("@Env-All @Zephyr-IO-T21560 C65490 Verify Export for Parse files", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'van');
      await io.flowBuilder.click(selectors.connectionsPagePO.VAN_CONNECTION);
      await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
      await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
      await io.flowBuilder.clickByText('VAN CONNECTION');
      await io.flowBuilder.click(selectors.basePagePO.SAVE);
      await io.flowBuilder.fill(selectors.importPagePO.NAME,'van_test_export')
      await io.flowBuilder.click(selectors.connectionsPagePO.VAN_FILE_TYPE);
      await io.flowBuilder.click(selectors.connectionsPagePO.FILE_DEFINITION);
      await io.flowBuilder.click(selectors.connectionsPagePO.EDIX12_FORMAT);
      await io.flowBuilder.click(selectors.connectionsPagePO.LUMBEREDI810);
      const fileParserHelper = await io.flowBuilder.isVisible("text='EDI parser helper'");
      await io.flowBuilder.clickByText('Launch');
      const filedefinition = await io.flowBuilder.isVisible("text='Type your file definition rules here'");
      const sampleFile = await io.flowBuilder.isVisible("text='Sample file'");
      const parsedFile = await io.flowBuilder.isVisible("text='Parsed output'");
      await io.assert.expectToBeTrue(fileParserHelper, "File parser helper is not displayed");
      await io.assert.expectToBeTrue(filedefinition, "'Type your file definition rules here' is not displayed");
      await io.assert.expectToBeTrue(sampleFile, "'Sample file' is not displayed");
      await io.assert.expectToBeTrue(parsedFile, "'Parsed output' is not displayed");
  });
});
