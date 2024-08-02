
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C28913`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T11661 TC_C28913", async ({ io,page }) => {
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL)
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FTP);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io. flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,"FTP CONNECTION")
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'FTP_Export');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    // Validating sort/group records available
    await io.homePage.clickByText("How would you like to group and sort records?");
    await io.flowBuilder.clickByIndex(
        selectors.flowBuilderPagePO.HELP_TEXT_ICON,
        6
      );
      const helpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
      const helpText = await helpTextPopup.textContent();
      expect(helpText).toContain('Enter one or more fields to use for sorting records.');
      await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
         
      await io.flowBuilder.clickByIndex(
        selectors.flowBuilderPagePO.HELP_TEXT_ICON,
        7
      );
      const helpTextPopup2 = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
      const helpText2 = await helpTextPopup2.textContent();
      expect(helpText2).toContain(`Select the fields you'll group, so each group of records returned by the application is treated as a single record downstream in your flow. For example, export records from a source or lookup, group the records based on a column value, and import each group as a journal entry in NetSuite, where each journal entry contains all the records in the group as line items. When grouping, the page size property dictates the maximum number of groups included in a single page. If the application does not sort the exported data, grouping may not work as expected.`);
      
      
      await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL)
      await io.homePage.loadingTime()
      await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Amazon S3');
      await io.flowBuilder.click(selectors.flowBuilderPagePO.AMAZONS3);
      await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
      await io. flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,"S3")
      await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
      await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'S3_Export');
      await io.flowBuilder.click(selectors.basePagePO.SAVE);
      // Validating sort/group records available
      await io.homePage.clickByText("How would you like to group and sort records?");
      await io.flowBuilder.clickByIndex(
          selectors.flowBuilderPagePO.HELP_TEXT_ICON,
          8
        );
        const S3helpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
        const S3helpText = await S3helpTextPopup.textContent();
        expect(S3helpText).toContain('Enter one or more fields to use for sorting records.');
        await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
           
        await io.flowBuilder.clickByIndex(
          selectors.flowBuilderPagePO.HELP_TEXT_ICON,
          9
        );
        const S3helpTextPopup2 = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
        const S3helpText2 = await S3helpTextPopup2.textContent();
        expect(S3helpText2).toContain(`Select the fields you'll group, so each group of records returned by the application is treated as a single record downstream in your flow. For example, export records from a source or lookup, group the records based on a column value, and import each group as a journal entry in NetSuite, where each journal entry contains all the records in the group as line items. When grouping, the page size property dictates the maximum number of groups included in a single page. If the application does not sort the exported data, grouping may not work as expected.`);
        
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL)
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Google Drive');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.GDRIVE);
        await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
        await io. flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,"GDrive")
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'GDrive_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        // Validating sort/group records available
        await io.homePage.clickByText("How would you like to group and sort records?");
        await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.HELP_TEXT_ICON,
            6
          );
          const GDrivehelpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
          const GDrivehelpText = await GDrivehelpTextPopup.textContent();
          expect(GDrivehelpText).toContain('Enter one or more fields to use for sorting records.');
          await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
             
          await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.HELP_TEXT_ICON,
            7
          );
          const GDrivehelpTextPopup2 = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
          const GDrivehelpText2 = await GDrivehelpTextPopup2.textContent();
          expect(GDrivehelpText2).toContain(`Select the fields you'll group, so each group of records returned by the application is treated as a single record downstream in your flow. For example, export records from a source or lookup, group the records based on a column value, and import each group as a journal entry in NetSuite, where each journal entry contains all the records in the group as line items. When grouping, the page size property dictates the maximum number of groups included in a single page. If the application does not sort the exported data, grouping may not work as expected.`);
        
          
  });
});
