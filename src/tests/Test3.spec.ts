import { test } from "@playwright/test";
import { HomePage } from "@pages/HomePage";
import { SettingsPage } from "@pages/SettingsPage";
import { FlowBuilderPage } from "@pages/FlowBuilderPage";

test("Platform E2E || Orch_Blob_Create_Flow198_NetSuite_Customer_To_Salesforce_Account_Multiple_Attachments", async ({
  page
}) => {
  const homepage = new HomePage(page);
  const settingsPage = new SettingsPage(page);
  const flowBuilderPage = new FlowBuilderPage(page);
  await homepage.open();
  await homepage.goToIntegrationTile();
  await settingsPage.goToFlowBuilder();
  await flowBuilderPage.addPageGenerator();
  await flowBuilderPage.seleApplication("Netsuite", "NetSuite-TSTDRV1143616");
  await flowBuilderPage.fillExportform1();
  await flowBuilderPage.fillImportform1();
  await page.getByText("Automation Flows", { exact: true }).click();
  await page.locator('[data-test="createFlow"]').click();
  await page.locator('[data-test="Add source"]').click();
  await page.locator("#react-select-2-input").fill("net");
  await page.locator('[data-test="NetSuite"] span').first().click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("Export records from source application").click();
  await page
    .getByRole("button", { name: "Export records from source application" })
    .click();
  await page
    .getByRole("menuitem", { name: "Export records from source application" })
    .getByText("Export records from source application")
    .click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("NetSuite-TSTDRV1143616", { exact: true }).click();
  await page.locator('[data-test="save"]').click();
  await page.locator('[data-test="name"]').getByRole("textbox").click();
  await page
    .locator('[data-test="name"]')
    .getByRole("textbox")
    .fill("AutomationStandaloneExport__5XzdJXVpj6");
  await page.getByRole("button", { name: "Please select a record type" }).click();
  await page.getByRole("menuitem", { name: "Customer", exact: true }).click();
  await page
    .getByRole("button", { name: "Please select a saved search" })
    .click();
  await page
    .getByText(
      "Orch_Blob_Create_Flow198_NetSuite_Customer_To_Salesforce_Account_..."
    )
    .click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("All – always export all data...").click();
  await page.locator('[data-test="saveAndClose"]').click();
  await page.locator('[data-test="Add destination \\/ lookup"]').click();
  await page.locator("#react-select-3-input").fill("net");
  await page.locator('[data-test="NetSuite"]').getByText("NetSuite").click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("Look up additional records (per record)").click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("NetSuite-TSTDRV1143616", { exact: true }).click();
  await page.locator('[data-test="save"]').click();
  await page.locator('[data-test="name"]').getByRole("textbox").click();
  await page
    .locator('[data-test="name"]')
    .getByRole("textbox")
    .fill("AutomationStandaloneExport__OEYxwYHIwL");
  await page.getByRole("button", { name: "Please select a record type" }).click();
  await page.getByText("Customer", { exact: true }).click();
  await page
    .getByRole("button", { name: "Please select a saved search" })
    .click();
  await page
    .getByRole("menuitem", { name: "Orch_Blob_Create_Flow198_File-Savedsearch" })
    .click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("All – always export all data").click();
  await page.locator('[data-test="saveAndClose"]').click();
  await page
    .locator(
      '[data-test="pp-64182fb5f12579356eaa67d0"] [data-test="addDataProcessor"]'
    )
    .click();
  await page.locator("#react-select-4-input").fill("net");
  await page.locator('[data-test="NetSuite"]').getByText("NetSuite").click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("Transfer files into destination application").click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page
    .getByRole("menuitem", { name: "NetSuite-TSTDRV1143616", exact: true })
    .click();
  await page.locator('[data-test="save"]').click();
  await page.locator('[data-test="name"]').getByRole("textbox").click();
  await page
    .locator('[data-test="name"]')
    .getByRole("textbox")
    .fill("AutomationStandaloneExport__PyS9Db1UeM");
  await page.locator('[data-test="cancel"]').click();
  await page.locator('[data-test="Discard changes"]').click();
  await page.locator('[data-test="addProcessor"]').click();
  await page.locator("#react-select-5-input").fill("nets");
  await page.locator('[data-test="NetSuite"]').getByText("NetSuite").click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("Look up additional files (per record)").click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("NetSuite-TSTDRV1143616", { exact: true }).click();
  await page.locator('[data-test="save"]').click();
  await page.locator('[data-test="name"]').getByRole("textbox").click();
  await page
    .locator('[data-test="name"]')
    .getByRole("textbox")
    .fill("AutomationStandaloneExport__PyS9Db1UeM55");
  await page.getByLabel("Yes (advanced)").check();
  await page.getByPlaceholder("Not needed for array/row based data.").click();
  await page
    .getByPlaceholder("Not needed for array/row based data.")
    .fill("attachments");
  await page.locator('[id="text-netsuite\\.internalId"]').click();
  await page.locator('[id="text-netsuite\\.internalId"]').fill("{{data.fileid}}");
  await page.locator('[data-test="saveAndClose"]').click();
  await page.locator('[data-test="addProcessor"]').click();
  await page.locator("#react-select-6-input").fill("sales");
  await page.locator('[data-test="Salesforce"]').getByText("Salesforce").click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("Import records into destination application").click();
  await page
    .getByRole("button", { name: "Import records into destination application" })
    .click();
  await page.locator('[data-test="save"]').click();
  await page.locator('[data-test="name"]').getByRole("textbox").click();
  await page
    .locator('[data-test="name"]')
    .getByRole("textbox")
    .fill("AutomationStandaloneImport__6em5ySgqsC34");
  await page.getByLabel("SOAP (recommended)").check();
  await page
    .getByRole("button", { name: "Please select an sObject type" })
    .click();
  await page.getByRole("menuitem", { name: "Account", exact: true }).click();
  await page.locator('[data-test="insert"]').getByLabel("Insert").check();
  await page.locator('[data-test="saveAndClose"]').click();
  await page
    .locator(
      '[data-test="pp-64183099407bde0a6d616692"] [data-test="addDataProcessor"]'
    )
    .click();
  await page.locator('[data-test="importMapping"]').click();
  await page
    .locator('[data-test="text-fieldMappingExtract-0"]')
    .getByRole("textbox")
    .click();
  await page.locator("#react-select-7-input").fill("Name");
  await page
    .locator('[data-test="text-fieldMappingGenerate-0"]')
    .getByRole("textbox")
    .click();
  await page
    .locator('[data-test="text-fieldMappingGenerate-0"]')
    .getByRole("textbox")
    .click();
  await page.locator("#react-select-8-input").click();
  await page.locator("#react-select-8-input").fill("Account Name");
  await page.locator(".jss2421").click();
  await page.locator('[data-test="saveAndClose"]').click();
  await page.locator('[data-test="addProcessor"]').click();
  await page.locator("#react-select-9-input").fill("sa");
  await page.locator('[data-test="Salesforce"]').getByText("Salesforce").click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("Transfer files into destination application...").click();
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByText("Salesforce_Connection-celigoqa@foobar.com").click();
  await page.locator('[data-test="save"]').click();
  await page.locator('[data-test="name"]').getByRole("textbox").click();
  await page
    .locator('[data-test="name"]')
    .getByRole("textbox")
    .fill("AutomationStandaloneImport__pvwIMC9BVw");
  await page.getByLabel("Yes (advanced)").check();
  await page.getByPlaceholder("Not needed for array/row based data").click();
  await page
    .getByPlaceholder("Not needed for array/row based data")
    .fill("attachments");
  await page.getByRole("button", { name: "Please select" }).click();
  await page.getByRole("menuitem", { name: "Attachment" }).click();
  await page.getByLabel("Insert").check();
  await page.locator('[id="text-salesforce\\.attachment\\.name"]').dblclick();
  await page
    .locator('[id="text-salesforce\\.attachment\\.name"]')
    .fill("{{data.FileName}}");
  await page.locator('[id="text-salesforce\\.attachment\\.parentId"]').dblclick();
  await page
    .locator('[id="text-salesforce\\.attachment\\.parentId"]')
    .fill("{{data._PARENT.entityid}}");
  await page.locator('[data-test="Advanced"]').click();
  await page.getByPlaceholder("Blob Key Path").click();
  await page.getByPlaceholder("Blob Key Path").fill("blobKey");
  await page.locator('[data-test="saveAndClose"]').click();
  await page
    .locator(
      '[data-test="pp-64182fb5f12579356eaa67d0"] [data-test="addDataProcessor"]'
    )
    .click();
  await page
    .locator(
      '[data-test="pp-64182fb5f12579356eaa67d0"] [data-test="responseMapping"]'
    )
    .click();
  await page.locator('[data-test="text-extract-0"]').getByRole("textbox").click();
  await page.locator("#react-select-10-input").fill("data[0].blobKey");
  await page
    .locator('[data-test="text-generate-0"]')
    .getByRole("textbox")
    .click();
  await page.locator("#react-select-11-input").fill("blobKey");
  await page.locator('[data-test="saveAndClose"]').click();
  await page
    .locator(
      '[data-test="pp-64183099407bde0a6d616692"] [data-test="addDataProcessor"]'
    )
    .click();
  await page
    .locator(
      '[data-test="pp-64183099407bde0a6d616692"] [data-test="responseMapping"]'
    )
    .click();
  await page.locator('[data-test="text-extract-0"]').getByRole("textbox").click();
  await page.locator("#react-select-12-input").fill("id");
  await page
    .locator('[data-test="text-generate-0"]')
    .getByRole("textbox")
    .click();
  await page
    .locator('[data-test="text-generate-0"]')
    .getByRole("textbox")
    .click();
  await page.locator("#react-select-13-input").fill("entityid");
  await page.locator('[data-test="saveAndClose"]').click();
  await page.locator("div").filter({ hasText: "New flow" }).first().dblclick();
  await page.getByText("New flow").click();
  await page.getByRole("textbox").dblclick();
  await page
    .getByRole("textbox")
    .fill(
      "Orch_Blob_Create_Flow198_NetSuite_Customer_To_Salesforce_Account_Multiple_Attachments"
    );
  await page
    .locator("div")
    .filter({ hasText: "DESTINATIONS & LOOKUPS" })
    .first()
    .click();
  await page.locator(".jss939 > span > .MuiButtonBase-root").click();
  await page.locator('[data-test="Enable"]').click();
});
