import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C111324.json";

test.describe(`TC_C111329`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("TC_C111329", async ({io, page}) => {
    await io.homePage.loadingTime()
    const id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.click(selectors.basePagePO.CLOSE);  
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS) 

    await io.flowBuilder.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 2);
  
 
  await io.assert.verifyElementDisplayedByText(
    "Auto-populate destination fields",
    "Auto-populate is not present"
  );

  });
});
