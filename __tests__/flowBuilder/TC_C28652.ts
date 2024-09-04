import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Env-All @Zephyr-IO-T2869|Verify export type option is added for the List Candidates endpoint in Candidates API in Greenhouse export", () => {
 
  test("@Env-All @Zephyr-IO-T2869|Verify export type option is added for the List Candidates endpoint in Candidates API in Greenhouse export", async ({ io }) => {
    await io.flowBuilder.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'Greenhouse');
    await io.homePage.click('[data-test="Greenhouse"]');
    // await io.homePage.click(selectors.flowBuilderPagePO.GREENHOUSE);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'T28652 export');
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Candidates"
    );
    await io.flowBuilder.loadingTime();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "List Candidates"
    );
    await io.flowBuilder.loadingTime();
    await io.homePage.click('[id="assistantMetadata.exportType"]');
     // await io.homePage.click(selectors.flowBuilderPagePO.GREENHOUSE_EXPORTTYPE);
  });
});
