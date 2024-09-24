import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C51541, Verify the help descriptions for query parameters", () => {
    test(" @Zephyr-IO-T18888 @Env-All @Priority-P2 C51541, Verify the help descriptions for query parameters", async ({ io, page }) => {
          await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
          await io.homePage.loadingTime();
          await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
          await io.homePage.loadingTime();
          await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_GENERATOR);
          await io.homePage.addStep("*** Clicked on create export ***");
          await io.flowBuilder.loadingTime();
          await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Salesforce");
          await io.flowBuilder.clickByText('Salesforce');
          await io.flowBuilder.clickByText("Export records from source application");
          await io.homePage.loadingTime();
          await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.HELP_TEXT_ICON,
            2
          );
          const helpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
          const helpText = await helpTextPopup.textContent();
          expect(helpText).toContain('The source options presented – or automatically selected for you – depend on the features available in the application that you chose.');
          await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

          await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR);
          await io.homePage.addStep("*** Clicked on create import ***");
          await io.flowBuilder.loadingTime();
          await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Salesforce");
          await io.flowBuilder.clickByText('Salesforce');
          await io.flowBuilder.clickByText("Import records into destination application");
          await io.homePage.loadingTime();
          await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.HELP_TEXT_ICON,
            2
          );
          const helpTextPopupImport = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
          const helpTextImport = await helpTextPopupImport.textContent();
          expect(helpTextImport).toContain('The destination options presented – or automatically selected for you – depend on the features available in the application that you chose.');
          await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

          await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR);
          await io.homePage.addStep("*** Clicked on create import ***");
          await io.flowBuilder.loadingTime();
          await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Salesforce");
          await io.flowBuilder.clickByText('Salesforce');
          await io.flowBuilder.clickByText("Look up additional records (per record)");
          await io.homePage.loadingTime();
          await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.HELP_TEXT_ICON,
            2
          );
          const helpTextPopupLookup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
          const helpTextLookup = await helpTextPopupLookup.textContent();
          expect(helpTextLookup).toContain('The destination options presented – or automatically selected for you – depend on the features available in the application that you chose.');
          await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);


          await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR);
          await io.homePage.addStep("*** Clicked on create import ***");
          await io.flowBuilder.loadingTime();
          await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Salesforce");
          await io.flowBuilder.clickByText('Salesforce');
          await io.flowBuilder.clickByText("Look up additional files (per record)");
          await io.homePage.loadingTime();
          await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.HELP_TEXT_ICON,
            2
          );
          expect(helpTextLookup).toContain('The destination options presented – or automatically selected for you – depend on the features available in the application that you chose.');

          
    });
  });