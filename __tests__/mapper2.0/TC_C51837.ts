import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C51837.json";

test.describe("TC_C51837 Verify whether beta label is removed in mapper2.0 toggle for all existing flows", () => {
  test("@Env-All @Zephyr-IO-T22453  Verify whether beta label is removed in mapper2.0 toggle for all existing flows", async ({
    io
  }) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    await test.step(
      "*** Created Flows :" + flows.get(FTP.referencename)["flowName"],
      async () => {}
    );

    await io.flowBuilder.navigateToTheFlow(
      flows.get(FTP.referencename)["flowId"]
    );

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on import mappings ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await test.step("*** Verifying beta lable is removed for mapper2.0 toggle ***", async () => {});
    var text = (
      await io.homePage.getText(selectors.flowBuilderPagePO.MAPPER_2)
    ).toString();
    await io.assert.expectToContainValue("Mapper 2.0", text, "");

    test.step("*** Navigate to Home Page ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
