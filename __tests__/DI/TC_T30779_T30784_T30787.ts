import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish Create integration page validations 2", () => {
  test("@Env-All @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30779 @Zephyr-IO-T30784 @Zephyr-IO-T30787 Create integration page validations 2", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.clickByText("Create");
    await io.flowBuilder.click(selectors.syncPagePO.CREATE_SYNC_INTEGRATION);
    await io.myAccountPage.loadingTime();
    //await io.sync.clickOnCreateSync();
    await io.flowBuilder.click(selectors.syncPagePO.NEW_SYNC_INTEGRATION);
    await io.myAccountPage.loadingTime();

    //T30779 T30784 T30787
    const integrationName = await io.sync.generateRandomIntegrationName();
    await io.flowBuilder.fill(
      selectors.syncPagePO.SYNC_INTEGRATION_NAME,
      integrationName
    );
    await io.flowBuilder.fill(
      selectors.syncPagePO.DESCRIPTION,
      "Description!@#$%^&*()_+123 \n Description!@#$%^&*()_+123 \n Description!@#$%^&*()_+123"
    );
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CLOSE,1);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SAVE_CHANGES_AND_CREATESYNC,
      "Dilog is not displayed"
    );

  });
});
