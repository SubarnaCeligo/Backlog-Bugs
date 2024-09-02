
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C52078_C52306 from "@testData/Mapper2.0/TC_C52078_C52306.json";

test.describe("@Env-All @Zephyr-IO-T22542 @Zephyr-IO-T22548 TC_C52078_C52306", () => {
  var flows;
  test("TC_C52078_C52306", async ({io,page}, testInfo) => {
    test.step(" *** CREATED FLOW VIA API ***", async ()=>{});
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C52078_C52306);
    await test.step(
      "Created Flow " +
      flows.get(TC_C52078_C52306.name)["flowName"] +
      " With ID " +
      flows.get(TC_C52078_C52306.name)["flowId"], async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC_C52078_C52306.name)["flowId"]
    );

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    const filepath = 'testData/assets' + 
      TC_C52078_C52306.qa__api_tdata[0].pageGenerators[0].qa__export.qa__path;
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles(filepath);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );

    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Click on the import mappings***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await test.step("*** Validate the fields test.beforeEach applying filter***", async ()=>{});
    let data: any[] = ["test", "test2", "test3", "test4", "test5", "test6"];
    let ele = await page.$$(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
    let valid = true;
    for (let i = 0; i < ele.length; i++) {
      const value = await ele[i].getAttribute("value");
      if (value !== data[i]) {
      valid = false;
      }
    }

    await io.assert.expectToBeTrue(valid, "");

    test.step("*** Click on the Filter option***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION
    );

    test.step("*** Flter with mapping fields***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Mapped fields"
    );

    test.step("*** Click on apply button***", async ()=>{});
    await io.homePage.clickByText(
      "Apply"
    );

    await io.homePage.loadingTime();

    await test.step("*** Validate the mappings test.afterEach the filter ***", async ()=>{});
    data = ["test", "test2", "test4", "test6"];
    ele = await page.$$(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
    valid = true;
    for (let i = 0; i < ele.length; i++) {
      const value = await ele[i].getAttribute("value");
      if (value !== data[i]) {
      valid = false;
      }
    }
    await io.assert.expectToBeTrue(valid, "");

    test.step("*** Close the import mapping ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Navigate to home ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
