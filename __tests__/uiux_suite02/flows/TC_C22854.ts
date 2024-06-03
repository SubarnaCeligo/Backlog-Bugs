import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C22854 Verify CSV file launcher", () => {
  test("@Env-QA @Zephyr-IO-T21560 C65490 Verify CSV file launcher", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.APPLICATION);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "FTP");
    await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.flowBuilder.clickByText("Create flow step");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);

    await io.homePage.waitForElementAttached(
      selectors.exportsPagePO.FILE_TYPE
    );

    
    // await io.flowBuilder.clickByText('Please select');
    await io.flowBuilder.clickByText('CSV (or any delimited text file)');
    await io.flowBuilder.clickByText('Launch');


    await io.homePage.clickByText('CSV parser options');
    await io.homePage.addStep("*** Clicked on CSV parser options ***");
    await io.homePage.clickByText('Sample CSV file');
    await io.homePage.addStep("*** Clicked on Sample CSV file ***");
    await io.homePage.clickByText('Parsed output');
    await io.homePage.addStep("*** Clicked on Parsed output ***");
  });
});
