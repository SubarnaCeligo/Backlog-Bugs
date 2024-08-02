import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C120845 from "../../../testData/inputData/Mapper2.0/C120845.json";

test.describe("C120845-Verify that data configured through mock at different levels is being carry forwared to the next level mapping in the preview window.", () => {
  test("@Env-All @Zephyr-IO-T19498 C120845- previe window shows nested data.", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.createResourceFromAPI(C120845, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    await io.myAccountPage.click(
      selectors.transformationPO.TEXT_GENE + '0"] div'
    );
    await io.loginPage.fill(
      selectors.transformationPO.REACT_SELECT + "2-input",
      "errorsaray"
    );
    await io.myAccountPage.click(
      selectors.transformationPO.TEXT_EXTRACT + '0"] div'
    );
    await io.myAccountPage.click(
      selectors.transformationPO.TEXT_EXTRACT + '0"] div'
    );
    await io.loginPage.fill(
      selectors.transformationPO.REACT_SELECT + "3-input",
      "errors"
    );

    await io.myAccountPage.click(
      selectors.transformationPO.TEXT_GENE + '1"] div'
    );
    await io.loginPage.fill(
      selectors.transformationPO.REACT_SELECT + "4-input",
      "errorsmessage"
    );
    await io.myAccountPage.click(
      selectors.transformationPO.TEXT_EXTRACT + '1"] div'
    );
    await io.myAccountPage.click(
      selectors.transformationPO.TEXT_EXTRACT + '1"] div'
    );
    await io.loginPage.fill(
      selectors.transformationPO.REACT_SELECT + "5-input",
      "errors.0.message"
    );

    await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).click();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 2);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    let divTextContent = await io.flowBuilder.getText(
      selectors.basePagePO.ACE_CONTENT
    );

    let jsonData = await JSON.stringify(divTextContent);
    await io.assert.expectToContainValue("errorsaray", jsonData, "errorsmessage");

    await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE_RIGHT_DRAWER,1);

    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 2);
    await io.flowBuilder.click(selectors.basePagePO.INPUTFILTER);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    let jsonData1 = await JSON.stringify(divTextContent);
    await io.assert.expectToContainValue("errorsaray", jsonData1, "errorsmessage");

  });
});

