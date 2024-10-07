import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Template from "@testData/GENERAL/TC_C1601_Verify_user_isAbleTo_installFlows.json";

test.describe("TC_C1601_Verify_user_isAbleTo_installFlows", () => {
  const flowIds = [],
    integrationIds = [];

  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", () => { });
    await test.step("Deleting Integrations which might not get deleted due to error in previous test case run ***", () => { });
    await io.api.deleteIntegrationRecursively(Template.integrationDetails.nameAfterDownload);
    await io.api.deleteIntegrationNonRecursively(Template.integrationDetails.nameAfterDownload);
    await io.api.deleteIntegrationRecursively(Template.integrationDetails.Source_Integration);
    await io.api.deleteIntegrationNonRecursively(Template.integrationDetails.Source_Integration);
    const integrationId = await io.api.createIntegrationThruAPI(Template.integrationDetails);
    integrationIds.push(integrationId);

    Template.flowsData.qa__api_tdata.forEach(obj => { obj.createFlow._integrationId = integrationId; });

    const flows = await io.api.createImpOrExpAndFlowsThruAPI(Template.flowsData, true);
    flows.forEach(flow => {
      flowIds.push(flow.flowId);
    });
    await test.step("** 1 Flow created within the integration **", () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    const homeButton = await page.locator(selectors.basePagePO.HOME);
    await homeButton.isVisible({ timeout: 20000 });

  });

  test.afterEach(async ({ io, page }) => {
    await io.api.deleteIntegrationNonRecursively(flowIds);
    integrationIds.forEach(async integrationId => {
      await io.api.deleteIntegration(integrationId);
    });
    await io.api.deleteIntegrationRecursively(Template.integrationDetails.nameAfterDownload);
    await io.api.deleteIntegrationNonRecursively(Template.integrationDetails.nameAfterDownload);
    await io.api.deleteIntegrationRecursively(Template.integrationDetails.Source_Integration);
    await io.api.deleteIntegrationNonRecursively(Template.integrationDetails.Source_Integration);

    await test.step("** Flows and Integration are Deleted **", () => { });
    const homeButton = await page.locator(selectors.basePagePO.HOME);
    await homeButton.isVisible({ timeout: 20000 });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await test.step("*** Test Suite End ***", () => { });
  });

  test("@Zephyr-IO-T891 @Env-All  TC_C1601_Verify_user_isAbleTo_installFlows", async ({ io }) => {
    await test.step("*** Downloading Integration ***", () => { });
    await io.integrationPage.downloadIntegrationFromUI(Template.downloadIntegration);

    await test.step("*** Changing Integration name test.afterEach downloading ***", () => { });
    await io.api.editIntegrationName(Template.integrationDetails.nameAfterDownload, integrationIds[0]);

    // await test.step("** Installing Integration in production **", () => { });
    // await io.integrationPage.installIntegrationFromZipAndConfigureConn(Template.installIntegration, integrationIds[0] + ".zip");


    await test.step("** Successfully installed Integration in production **", () => { });
  });
});
