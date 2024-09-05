import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C29066.json";


test.describe("@Env-All @Zephyr-IO-T2875", () => {
  test("@Env-All @Zephyr-IO-T2875 | OneToMany should not be logged in audit logs when when there is no update to the boolean field", async ({ io, page }, testInfo) => {
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    test.step("*** Navigating to Flow Builder ***", async () => { });
    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC.name)["flowId"]
    );
    await io.homePage.loadingTime();
    test.step("*** Clicking on Export name ***", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT
    );
    await io.homePage.loadingTime();
    test.step("*** Modifying the Export name ***", async () => { });
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "MySQL"
    );
    test.step("*** Saving and closing export ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    // 
    await io.homePage.loadingTime();
    test.step("*** Opening Audit logs ***", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.AUDIT_LOGS
    );
    await io.homePage.loadingTime();
    await expect(page.getByText('oneToMany')).not.toBeVisible();
    await test.step(
      "*** Verifying if OneToMany is not logged ***"
      , async () => { });

  });
});
