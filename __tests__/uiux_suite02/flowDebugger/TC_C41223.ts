import { expect, test } from "@celigo/ui-core-automation";

test.describe(`TC_C41223 Test to validate the revisions tab in multiple browsers`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test(`@Env-All @Zephyr-IO-T410 C41223 Test to validate the revisions tab in multiple browsers`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.clickByText("Revisions");
    const label = await io.homePage.isVisible("text='Revisions'");
    await io.assert.expectToBeTrue(label, "Label not found");
  });
});
