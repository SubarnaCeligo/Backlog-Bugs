import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T1646 validate that the user is getting help text, help syntax, able to edit the expression, and should be able to select any item from the 'Fields' section and include it in the expression -->>GraphQL Connection/export/import/lookup", () => {
  test("@Env-All @Zephyr-IO-T1646 @Priority-P2 T1646 validate that the user is getting help text, help syntax, able to edit the expression, and should be able to select any item from the 'Fields' section and include it in the expression -->>GraphQL Connection/export/import/lookup UI_Backlog", async ({ io, page }) => {
    await io.flowBuilder.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);

    await io.flowBuilder.addStep("*** Creating a new graphql connection ***"); 
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'GraphQL');
    await io.flowBuilder.clickByText('GraphQL');
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_T1646_Connection');
    
    await io.flowBuilder.addStep("*** Clicking on handlebar editor ***");
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.click(selectors.connectionsPagePO.GRAPHQL_BUTTON);

    await io.flowBuilder.addStep("*** Editing the Handlebars template to have '{{' ***");
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.fill(selectors.connectionsPagePO.RULE_TEXTAERA, '{{');

    await io.flowBuilder.addStep("*** Selecting a field from the 'Fields' section ***");
    await io.flowBuilder.clickByText('Aggregate');
    await io.flowBuilder.clickByText('sum');

    await io.flowBuilder.addStep("*** Verifying the selected field is included in the expression ***");
    let sampleData =  (await io.exportsPage.getText(`${selectors.flowBuilderPagePO.RULE} ${selectors.basePagePO.ACE_CONTENT}`)).toString();
    await expect(sampleData).toContain("{{sum");

    await io.flowBuilder.addStep("*** Verifying that the expression is editable ***");
    await io.flowBuilder.clickByTextByIndex('Fields', 0);
    await io.flowBuilder.clickByText('settings');
    sampleData =  (await io.exportsPage.getText(`${selectors.flowBuilderPagePO.RULE} ${selectors.basePagePO.ACE_CONTENT}`)).toString();
    await expect(sampleData).toContain("{{sum settings");
  });
});