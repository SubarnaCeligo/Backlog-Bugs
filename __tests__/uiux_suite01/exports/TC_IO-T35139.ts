import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import allure from "allure-playwright";
import SF from "@testData/Flows/create/salesforce/SF_Flow_01_SF_Account_to_NS_Cust_All_E2E_with_Verify.json"

test.describe("@Zephyr-IO-T35139 @Env-All @Priority-P2", () => {
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
    test("@Env-All @Zephyr-IO-T35139", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        // await XMLHttpRequestUpload()
        // reload
          //Creating PageGenerator 
          await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, SF);
        });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
        // await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);
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
