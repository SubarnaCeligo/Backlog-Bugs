import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all_manage_few_Ci_user.json";


test.describe(`@Bug-IO-19259  @Priority-P2  @Zephyr-T6954 @Env-All Verify the connections of a monitored tiles should not be listed while creating new flow under manage tile.`, () => {
  test(`@Bug-IO-19259  @Priority-P2  @Zephyr-T6954 @Env-All Verify the connections of a monitored tiles should not be listed while creating new flow under manage tile.`, async ({
    page,
    io
  }) => {
    const ree = await io.api.processAshareData(testData);
    await io.flowBuilder.loadingTime();
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await page.getByText("Loading...").waitFor({ state: "hidden", timeout: 360000 });
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await page.getByText("Loading...").waitFor({ state: "hidden", timeout: 360000 });
    await io.exportsPage.waitForElementAttached(selectors.basePagePO.ADD_SOURCE_BUTTON);
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