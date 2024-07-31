import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_few_manage_few.json";
import testData1 from "@testData/monitorSuite/monitor_all_manage_few_Ci_user.json";

test.describe(`C1569 Verify If same document is under two integrations with different access levels then the higher access level will take precedence`, () => {
  test(`@Bug-IO-  @Priority-P2  @Zephyr-T6901 @Env-All Verify If same document is under two integrations with different access levels then the higher access level will take precedence`, async ({ io }) => {
    if (process.env["IO_UI_CONNECTOR_URL"] == "https://qa.staging.integrator.io/") {
      const res = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        testData
      );
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        testData1.CI
      );

    } else if (process.env["IO_UI_CONNECTOR_URL"] == "https://staging.integrator.io/") {
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        testData1.STAGING
      );
    } else if (process.env["IO_UI_CONNECTOR_URL"] == "https://platform3.dev.integrator.io/") {
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        testData1.PLATFORM3
      );
    } else if (process.env["IO_UI_CONNECTOR_URL"] == "https://platform5.dev.integrator.io/") {
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        testData1.PLATFORM5
      );
    } else {
      const res = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        testData1.IAQA
      );
    }

    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.exportsPage.waitForElementAttached(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON)
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION)
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.exportsPage.waitForElementAttached(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.homePage.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.exportsPage.fill(selectors.basePagePO.CONNECTION_DROPDOWN, "FTP CONNECTION");
    await io.flowBuilder.loadingTime();
    const monitorExp = await io.homePage.isVisible("text='FTP CONNECTION'");
    await io.homePage.addStep("FTP CONNECTION is present in both monitor and manage accese integrations");
    await io.assert.expectToBeValue(monitorExp.toString(), 'true', "Value is found");
  });
});
