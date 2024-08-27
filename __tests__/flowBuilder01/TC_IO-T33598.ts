import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify application is not crashing if we clicks on open API spec for celigo webhook when no data is present", () => {
  test("@Bug-IO-84535 @Priority-P2 @Zephyr-IO-T33598 @Env-All", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Celigo integrator.io");
        await io.homePage.click(selectors.flowBuilderPagePO.INTEGRATORAPPLICATION);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_WEBHOOK_EXPORT);
        await io.flowBuilder.clickByText('Create flow step');
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByTextByIndex("Download OpenAPI spec", 0);
        await io.homePage.loadingTime();
        const errormsg = await io.flowBuilder.isVisible('text="Please provide a valid _id."');
        await io.assert.expectToBeTrue(errormsg, "Error msg is not displayed");

  });
});
