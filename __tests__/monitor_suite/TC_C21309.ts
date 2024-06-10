import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all_manage_few.json";


test.describe(`@Bug-IO-19259  @Priority-P2  @Zephyr-T6954 @Env-All Verify the connections of a monitored tiles should not be listed while creating new flow under manage tile.`, () => {
  test(`@Bug-IO-19259  @Priority-P2  @Zephyr-T6954 @Env-All Verify the connections of a monitored tiles should not be listed while creating new flow under manage tile.`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Automation Flows');
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText('Automation Flows');
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText('Create flow');
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD);
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.exportsPage.waitForElementAttached(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.homePage.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.exportsPage.fill(selectors.basePagePO.CONNECTION_DROPDOWN, "MONITOR CONNECTION");
    const monitorExp = await io.homePage.isVisible("text='MONITOR CONNECTION'")
    await io.assert.expectToBeValue(monitorExp.toString(), 'false', "Value is found")
  });
});