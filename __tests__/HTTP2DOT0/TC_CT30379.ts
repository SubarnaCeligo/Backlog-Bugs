import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_CT30379", () => {
  // skipping this case as jira connector is unpublished from all the environments by connector team
    test.skip('@Env-All  @Zephyr-IO-TC30379 verify updated helptext for which field in jira2.0  ', async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.clickByText("Create");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(
          selectors.settingsPagePO.APP_NAME_INPUT,
          "JIRA"
        );
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.JIRA);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.JIRA);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText("Create flow step");
        await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_RESOURCE);
        //await io.flowBuilder.fill(selectors.importPagePO.ASSISTANT_METADATA_RESOURCE, 'Issue');
        await io.flowBuilder.clickByText("Avatar");
        await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_OPERTAION);
        //await io.flowBuilder.fill(selectors.importPagePO.ASSISTANT_METADATA_RESOURCE, 'Delete avatar');
        await io.flowBuilder.clickByText("Delete avatar");
        await io.flowBuilder.click(selectors.importPagePO.EXISTING_RECORDS);
        await io.flowBuilder.click(selectors.importPagePO.SOURCE_VALUE);
        await io.flowBuilder.click(selectors.importPagePO.LOOKUP_FIELD);
        await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
        const concurrencyHelptext = (await io.flowBuilder.getText(
          selectors.myAccountPagePO.HELP_BUBBLE
        )) as string;
        await io.assert.expectToContainValue(
          `Which field?Enter the path to the field in the source record that should be used to identify existing records. If a value is found for this field, then the source record will be considered an existing record. The dynamic field list makes it easy for you to select the field. If a field contains special characters (which may be the case for certain APIs), then the field is enclosed with square brackets [ ], for example, [field-name].[*] indicates that the specified field is an array, for example, items[*].id. In this case, you should replace * with a number corresponding to the array item. The value for only this array item (not, the entire array) is checked.Was this helpful?`,
          concurrencyHelptext,
          "helptext not found"
        );
    });
});