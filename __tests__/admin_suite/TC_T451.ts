import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`IO_T451 To verify Pull from Integration dropdown field in both production and sandbox account(Admin access)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test(`@Env-All @Zephyr-IO_T451 C41570 To verify Pull from Integration dropdown field in both production and sandbox account(Admin access)`, async ({
    page,
    io
  }) => {
    await io.flowBuilder.clickByText("Create");
    await io.flowBuilder.click(selectors.homePagePO.CREATE_NEW_INTEGRATION);
    await io.flowBuilder.fill(
      selectors.basePagePO.INPUT_NAME_SELECTOR,
      "IO_T451 Integration"
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.clickByText("Revisions");
    await io.flowBuilder.click(selectors.integrationPagePO.CREATE_PULL);
    const childIntegration = await io.flowBuilder.getText(selectors.integrationPagePO.CHILD_INTEGRATION_NAME);
    expect(childIntegration).toBe("IO_T451 Integration");
  });
});
