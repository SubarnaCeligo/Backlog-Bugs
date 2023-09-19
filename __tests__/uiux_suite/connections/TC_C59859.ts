import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C59658.json";

test.describe(`C59859 Verify connection dropdown for edit imports`, () => {
  test(`C59859 Verify connection dropdown for edit imports`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.flowBuilder.clickByText("Narvar_DND");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    const connectionText = (await io.flowBuilder.getText(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    )) as string;
    await page.getByText("API type").first().waitFor({ state: "visible" });

    await io.assert.expectToContainValue(
      "Narvar",
      connectionText,
      "Connection name not found"
    );
    await io.assert.expectToContainValue(
      "API type",
      connectionText,
      "API type not found"
    );
    await io.assert.expectToContainValue(
      "API version",
      connectionText,
      "API version not found"
    );
  });
});
