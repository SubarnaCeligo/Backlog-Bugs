import { expect, test } from "@celigo/ui-core-automation";

import * as selectors from "@celigo/aut-selectors";
    
    test.describe("IO-T23460  App crashing when trying to switch to Recharge HTTP view", () => {
      test("@Env-All @Zephyr-IO-T23460   App crashing when trying to switch to Recharge HTTP view" , async ({
        io,
        page
      }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
       
        await page.click(selectors.basePagePO.TOOLS);
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ReCharge');
        await io.flowBuilder.clickByTextByIndex('ReCharge', 0);
        await io.myAccountPage.click(selectors.connectionsPagePO.IMPORT_RECORDS);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.homePage.clickByText('Customers');
        await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.homePage.clickByText('Composite: create new records & update existing records');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.SELECTHTTPMETHOD);  
        await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);  
  
      });
    });