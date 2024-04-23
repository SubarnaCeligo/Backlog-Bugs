import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_few_manage_few.json";

test.describe(`@Bug-IO-  @Priority-P2  @Zephyr-T6901 @Env-QA Verify If same document is under two integrations with different access levels then the higher access level will take precedence`, () => {
  test(`@Bug-IO-  @Priority-P2  @Zephyr-T6901 @Env-QA Verify If same document is under two integrations with different access levels then the higher access level will take precedence`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.clickByText("Automation Flows")
    await io.homePage.clickByText('Create flow')
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON)
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION)
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.click(selectors.basePagePO.CONNECTION_DROPDOWN)
    const monitorExp = await io.homePage.isVisible("text='FTP CONNECTION'")
    await io.homePage.addStep("FTP CONNECTION is present in both monitor and manage accese integrations");
    await io.assert.expectToBeValue(monitorExp.toString(), 'true', "Value is found");
  });
});
