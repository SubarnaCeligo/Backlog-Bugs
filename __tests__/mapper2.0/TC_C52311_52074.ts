import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C52311_52074.json";

test.describe("TC_C52311_52074 Verify the mappings when user selects Mapped fields filter", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test(`TC_C52311_52074 @Env-All @Zephyr-IO-T22538 @Zephyr-IO-T22552  Verify the mappings when user selects Mapped fields filter`, async ({ io, page }) => {
    test.step("*** Creating PageGenerator ***", async () => {});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on import mappings ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on filter ***", async () => {});

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION);
    await io.homePage.clickByText("Mapped fields");

    test.step("*** Selected Mapping field ***", async () => {});

    test.step("*** clicking on Apply button ***", async () => {});
    await page.getByRole("button", { name: "Apply" }).click();
    await test.step("*** Verifying copy source as-is as No child extracts mapped fields filter is selected ***", async () => {});

    var Childtab = await page.$$(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS
    );
    var ele = await Childtab[1].isVisible();
    await io.assert.expectToBeTrue(ele, "");

    test.step("*** Navigate to Home page ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
