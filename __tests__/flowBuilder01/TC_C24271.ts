import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C24271", () => {
  test("@Epic-IO-54539 @Priority-P2 @Zephyr-IO-T24271 @Env-All C24271", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Microsoft SQL');
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MICROSOFT_SQL);
        await io.myAccountPage.clickByText("Import records into destination application"); 
        const value = await io.flowBuilder.getText(selectors.flowBuilderPagePO.EXISTING_RESOURCE)
        const func = value.toString().includes("Your existing flow steps");
        await io.assert.expectToBeTrue(func, "help text doesn't match")

  });
});
