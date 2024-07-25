import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as FTPtoSF from "@testData/Flows/create/ftp/SF_Flow_FTP_JSON_to_SF_Account_Multifields.json";
import allure from "allure-playwright";
test.describe("@Zephyr-IO-T35637 @Env-All @Priority-P2", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        const response = await io.api.getCall('api/profile');
        const userid = response._id;
    
     let payload={
        "_ids": [
            userid
        ],
        "keysToUpdate": {
       "microServices.enableEPService": true,
        }
    }
        await io.api.patchCall(`v1/users`, payload);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        const response = await io.api.getCall('api/profile');
        const userid = response._id;
     let payload={
        "_ids": [
            userid
        ],
        "keysToUpdate": {
       "microServices.enableEPService": false,
        }
    }
        await io.api.patchCall(`v1/users`, payload);
    });
    test("@Env-All @Zephyr-IO-T35637", async ({ io, page }) => {
          //Creating PageGenerator 
          await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGenerator(allure, FTPtoSF);
        });

        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, FTPtoSF);
        });
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.flowBuilder.click( selectors.flowBuilderPagePO.PREVIEW)
        let elementExists = await page.locator(selectors.basePagePO.NOTIFICATION_ID).count() > 0;

        if (elementExists) {
            const errorMessage = (
                await io.homePage.getText(selectors.basePagePO.NOTIFICATION_ID)
              ).toString();
              await io.assert.expectToContainValue(
                errorMessage,
                "",
                "popup error message is displayed"
              );
          }
    });
}); 
