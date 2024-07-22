import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C63017 Verify API type field is mandatory field", () => {
  test("@Env-All @Zephyr-IO-T21808 @Priority-P2 C63017 Verify API type field is mandatory field", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);

    await io.flowBuilder.addStep("Creating a new connection"); 
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'NARVAR');
    await io.homePage.click(selectors.connectionsPagePO.NARVAR_CONNECTION);

    await io.assert.verifyElementDisplayedByText(
      "API type *",
      "API type is mandatory field"
    );

    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'Narvar_Connection');

    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();

    await expect(page.getByText("A value must be provided")).toBeVisible();
  });
});