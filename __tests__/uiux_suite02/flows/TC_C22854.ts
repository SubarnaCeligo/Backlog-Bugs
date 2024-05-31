import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C22854 Verify CSV file launcher", () => {
  test("@Env-QA @Zephyr-IO-T21560 C65490 Verify CSV file launcher", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
      await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);
      await io.flowBuilder.clickByText("Create flow step")
      await io.flowBuilder.click(selectors.basePagePO.SAVE);
      await io.flowBuilder.fill(selectors.importPagePO.NAME,'van_test_export')
      await io.flowBuilder.click(selectors.connectionsPagePO.VAN_FILE_TYPE);
      await io.flowBuilder.click(selectors.connectionsPagePO.FILE_DEFINITION);
      await io.flowBuilder.click(selectors.connectionsPagePO.EDIX12_FORMAT);
      await io.flowBuilder.click(selectors.connectionsPagePO.LUMBEREDI810);
      const fileParserHelper = await io.flowBuilder.isVisible("text='EDI parser helper'");
      await io.flowBuilder.clickByText('Launch');
      const csvParserHelper = await io.flowBuilder.isVisible("text='CSV parser helper'");
      const sampleFile = await io.flowBuilder.isVisible("text='Sample CSV file'");
      const autoPreview = await io.flowBuilder.isVisible("text='Auto preview'");
      await io.assert.expectToBeTrue(fileParserHelper, "File parser helper is not displayed");
      await io.assert.expectToBeTrue(csvParserHelper, "'CSV parser helper' is not displayed");
      await io.assert.expectToBeTrue(sampleFile, "'Sample CSV file' is not displayed");
      await io.assert.expectToBeTrue(autoPreview, "'Auto preview' is not displayed");
  });
});
