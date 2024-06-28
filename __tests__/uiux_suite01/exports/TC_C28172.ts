import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C28172 Verify export type dropdown values are updated in HTTP/REST and all other exports and lookups`, () => {
  test(`@Env-All @Zephyr-IO-T2683 C28172 Verify export type dropdown values are updated in HTTP/REST and all other exports and lookups`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.clickByText("HTTP");
    await io.flowBuilder.addStep("Selected 'HTTP' option");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, '3PL CONNECTION');
    await io.flowBuilder.addStep("Clicked on 'connections' dropdown");
    await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
   // await io.flowBuilder.clickByText("3PL CONNECTION");
    await io.flowBuilder.addStep("Selected '3PL CONNECTION' option");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.addStep("Clicked on 'save' button");
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)
    await io.exportsPage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)
    await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.flowBuilder.addStep("Clicked on 'export type' dropdown");
    await expect(page.getByText("All - always export all data")).toBeVisible();
    await io.flowBuilder.addStep("Verified 'All' option is visible");
    await expect(
      page.getByText("Delta - export only modified data")
    ).toBeVisible();
    await io.flowBuilder.addStep("Verified 'Delta' option is visible");
    await expect(page.getByText("Once - export records only once")).toBeVisible();
    await io.flowBuilder.addStep("Verified 'Once' option is visible");
    await expect(
      page.getByText("Limit - export a set number of records")
    ).toBeVisible();
    await io.flowBuilder.addStep("Verified 'Limit' option is visible");
  });
});
