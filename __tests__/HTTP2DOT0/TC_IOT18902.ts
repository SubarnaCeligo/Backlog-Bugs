import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C66039 from "@testData/HTTP2DOT0/TC_C66039_flow.json";

test.describe(`TC_IOT18902 Verify that a new connection can be configured while cloning an HTTP flow.`, () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test(`@Env-All @Zephyr-IO-T18902 C51569 Verify that a new connection can be configured while cloning an HTTP flow.`, async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(C66039, "FLOWS");
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      0
    );

    //Clone the flow
    await io.homePage.waitForElementAttached(
      selectors.flowBuilderPagePO.CLONEFLOW
    );
    await io.homePage.click(selectors.flowBuilderPagePO.CLONEFLOW);
    await io.homePage.loadingTime();

    await io.flowBuilder.clickByText("Please select");
    const intID = await io.api.loadIntegrations();
    await io.flowBuilder.selectTextfromDropDown(page, intID.get('Automation Flows'))
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);

    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.templatePagePO.CONFIGURE);
    await io.homePage.click(selectors.templatePagePO.CONFIGURE);

    await io.homePage.loadingTime();

    await io.homePage.clickByTextByIndex("Simple",0);
    await io.homePage.loadingTime();
    await io.connectionPage.fill(selectors.connectionsPagePO.QUICKBASE_TOKEN, "dummy_token");
    await io.exportsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.waitForElementAttached(selectors.basePagePO.MFA_SAVE);
    await io.exportsPage.click(selectors.basePagePO.MFA_SAVE);
  });
});