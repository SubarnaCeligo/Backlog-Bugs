import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111920 from '../../../testData/inputData/transformation/C111920.json';


test.describe("C111920", () => {
    test("@Env-All @Zephyr-IO-T16265 C111920", async ({ io, page }) => {


        //Create a flow with a lookup that has an offline connection
        await io.createResourceFromAPI(C111920, "FLOWS");
        await io.homePage.loadingTime()
        //Wait for flow toggle button to be visible
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.homePage.loadingTime()
        await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);

        await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING)
        await io.myAccountPage.click(selectors.transformationPO.TEXT_GENE+'0"] div')
        await io.loginPage.fill(selectors.transformationPO.REACT_SELECT+'2-input', 'new');
        await io.myAccountPage.click(selectors.transformationPO.TEXT_EXTRACT+'0"] div')
        await io.myAccountPage.click(selectors.transformationPO.TEXT_EXTRACT+'0"] div')
        await io.loginPage.fill(selectors.transformationPO.REACT_SELECT+'3-input', 'ignored');
        

        await io.myAccountPage.click(selectors.transformationPO.TEXT_GENE+'1"] div')
        await io.loginPage.fill(selectors.transformationPO.REACT_SELECT+'4-input','data');
        await io.myAccountPage.click(selectors.transformationPO.TEXT_EXTRACT+'1"] div')
        await io.myAccountPage.click(selectors.transformationPO.TEXT_EXTRACT+'1"] div')
        await io.loginPage.fill(selectors.transformationPO.REACT_SELECT+'5-input','data');

        await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).click();
        await io.homePage.loadingTime()
        await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 2);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.homePage.loadingTime()
        let divTextContent = await page.locator(selectors.basePagePO.ACE_CONTENT).first().textContent();
        let isValid = false
        if (divTextContent.includes("data") && divTextContent.includes("new")) {
            isValid = true
        }

        await expect(isValid).toBeTruthy();

        //.ace_content

    });
});


