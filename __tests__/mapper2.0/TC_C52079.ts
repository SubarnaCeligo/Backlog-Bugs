
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C52079 from "@testData/Mapper2.0/TC_C52079.json";

test.describe("TC_C52079", () => {
  test("@Env-All @Zephyr-IO-T22520 TC_C52079 | Verify the mappings when user has multiple sources configured and selected mapped fields filter", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C52079, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    var filepath = TC_C52079.pageGenerators[0].qa__export.qa__path;
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles(`testData/assets${filepath}`);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    await io.homePage.loadingTime();
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );

    test.step("*** Click on import mappings***", async ()=>{});
    await io.homePage.click(
      await selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on filter ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION,
      0
    );
    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Mapped fields"
    );
    test.step("*** clicking on Apply button ***", async ()=>{});
    test.step("*** Click on apply button***", async ()=>{});
    await io.homePage.clickByText(
      "Apply"
    );
    await io.homePage.loadingTime();
    await test.step("*** Validate the hover message for disabled child***", async ()=>{});
    var data = await page.$$(
      "[role='tree'] " + selectors.flowBuilderPagePO.TAB
    );
    const box = await data[1].boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

    var hoverText = (await io.homePage.getText(selectors.mappings.TOOLTIP)).toString();
    await io.assert.expectToContainValue("No matching fields in this tab", hoverText, "");

    test.step("*** Close the import mappings***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Navigate to home page***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
