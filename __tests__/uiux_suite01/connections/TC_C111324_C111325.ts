import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C111324.json";

test.describe(`C111324_C111325`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("@Env-All C111324_C111325", async ({io, page}) => {
    await io.homePage.loadingTime()
    const id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.click(selectors.basePagePO.CLOSE);  
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS) 

    await io.homePage.loadingTime()
    let mapper1NotPresent =false;
try 
{
  await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON)
 
}
catch (error) {
  mapper1NotPresent = true;
}

expect(mapper1NotPresent).toBeTruthy();
await io.homePage.clickByText('Create destination rows [ ] from source record { }');
let createdes =false;
try 
{
  await io.homePage.clickByText("Create destination record { } from source record { }")
 
}
catch (error) {
  createdes = true;
}

expect(createdes).toBeTruthy();

  });
});
