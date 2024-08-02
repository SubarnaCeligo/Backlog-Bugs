import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C27977 Verify the fields in 'Non-standard API response patterns' section are updated as per requirement in HTTP/REST lookup additional files`, () => {
  test(`@Priority-P2 @Zephyr-IO-T2681 @Env-All C27977`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    // await io.flowBuilder.clickByText("REST API (HTTP)");
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "REST API (HTTP)");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RESTAPIHTTP);
    await io.flowBuilder.clickByText("Look up additional files (per record)");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.exportsPagePO.CONNECTIONS_DROPDOWN, "3PL CONNECTION");
    await page
      .locator(`${selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST} li`)
      .filter({ hasText: "3PL CONNECTION" })
      .first()
      .click()
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "C27977");
    await io.flowBuilder.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
    await io.flowBuilder.clickByText("GET");
    await io.flowBuilder.fill(
      selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI,
      "/"
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText("Non-standard API response patterns");
    await io.assert.verifyElementDisplayedByText(
      "Path to file in HTTP response body",
      "'Path to file in HTTP response body' is not displayed"
    );
  });
});
