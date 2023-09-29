import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C63003 Verify connection dropdown while clonning flow`, () => {
  test(`C63003 Verify connection dropdown while clonning flow`, async ({
    io,
    page
  }) => {
    await io.fillFormUI(testData, "FLOWS");
    await page
      .locator(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON)
      .first()
      .click();
    await io.flowBuilder.clickByText("Clone flow");
    await io.flowBuilder.clickByText("Please select");
    await io.flowBuilder.clickByTextByIndex("Automation Flows", 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.clickByText("Configure");
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    const connectionText = await page.getByRole("menuitem").nth(1).textContent();
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
