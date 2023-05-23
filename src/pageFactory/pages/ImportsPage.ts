import { IO } from "@controller/IO";
import BasePage from "./BasePage";
import { IImportsPage } from "@interface/IImportsPage";

export class ImportsPage extends BasePage implements IImportsPage {

  public async fillImportForm(jsonData: any) {
    await this.page.locator('[data-test="addProcessor"]').click();
    await this.page.locator("#react-select-3-input").fill("NetSuite");
    await this.page
      .locator('[data-test="NetSuite"]')
      .getByText("NetSuite")
      .click();
    await this.page.getByRole("button", { name: "Please select" }).click();
    await this.page
      .getByText("Import records into destination application")
      .click();
    await this.page.getByRole("button", { name: "Please select" }).click();
    await this.page
      .getByRole("menuitem", { name: "netsuite automation", exact: true })
      .click();
    await this.page.locator('[data-test="save"]').click();
    await this.page.locator('[data-test="name"]').getByRole("textbox").click();
    await this.page
      .locator('[data-test="name"]')
      .getByRole("textbox")
      .fill("NS Customer Add/Update");
    await this.page
      .getByRole("button", { name: "Please select a record type" })
      .click();
    await this.selectTextfromDropDown(this.page, "customer");
    await this.page.getByText("Add or update").click();
    await this.page
      .locator('[data-test="netsuite_da.internalIdLookup.expression"]')
      .click();
    await this.page.waitForTimeout(2000);
    await this.page.locator('[data-add="rule"]').click();
    await this.page.locator('select[name$="_filter"]').selectOption("email");
    await this.page.locator('[class="io-filter-type form-control"]').click();
    var z = await this.page.locator(
      '[class="rule-value-container"] [class="settings-icon"]'
    );
    await z.evaluate((node: HTMLElement) => {
      node.click();
    });
    await this.page.getByLabel("Value").check();
    await this.page.locator('[data-test="Save"]').click();
    await this.page.locator('input[name$="_value_0"]').fill("EmailId");
    var k = await this.page.locator('[class="settings-icon"]');
    await k.evaluate((node: HTMLElement) => {
      node.click();
    });
    await this.page.locator('[data-test="field"]').click();
    await this.page.locator('[data-test="Save"]').click();
    await this.page.getByRole("button", { name: "Save & close" }).click();
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.waitForTimeout(2000);
    await this.page
      .locator('[data-test^="pp-"] [data-test="addDataProcessor"]')
      .click();
    await this.page.locator('[data-test="importMapping"]').click();
    await this.page.waitForTimeout(5000);
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-0"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("lastname");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-0"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-0"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("lastname");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-1"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("subsidiary");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-1"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-1"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type('"3"');
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-2"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("email");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-2"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-2"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("EmailId");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-3"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("isperson");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-3"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-3"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type('"true"');
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-4"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("entityid");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-4"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-4"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type('{{join \\" \\" firstname lastname}}');
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-5"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("firstname");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-5"] div')
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-5"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("firstname");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-6"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("addr1");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-6"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-6"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("address1");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-7"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("addr2");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-7"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-7"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("address2");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-8"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("city");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-8"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-8"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("city");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-9"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("state");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-9"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-9"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("statecode");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-10"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("country");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-10"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-10"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("country");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-11"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("zip");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-11"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-11"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("zipcode");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-12"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("addrphone");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-12"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-12"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("phone");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-13"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("defaultbilling");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-13"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-13"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("default");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-14"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("defaultshipping");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-14"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-14"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("default");
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.locator('[data-test="addProcessor"]').click();
    await this.page.keyboard.type("NetSuite");
    await this.page
      .locator('[data-test="NetSuite"]')
      .getByRole("img", { name: "Application image" })
      .click();
    await this.page.getByRole("button", { name: "Please select" }).click();
    await this.page
      .getByRole("menuitem", {
        name: "Import records into destination application"
      })
      .click();
    await this.page.getByRole("button", { name: "Please select" }).click();
    await this.page.getByText("netsuite automation", { exact: true }).click();
    await this.page.locator('[data-test="save"]').click();
    await this.page.locator('[data-test="name"]').getByRole("textbox").click();
    await this.page
      .locator('[data-test="name"]')
      .getByRole("textbox")
      .fill("nsordercreation");
    await this.page.locator('input[name="\\/description"]').click();
    await this.page
      .locator('input[name="\\/description"]')
      .fill("nsorderconnection");
    await this.page.getByLabel("Add or update").check();
    await this.page
      .getByRole("button", { name: "Please select a record type" })
      .click();
    await this.selectTextfromDropDown(this.page, "salesorder");
    await this.page
      .locator('[data-test="netsuite_da\\.internalIdLookup\\.expression"]')
      .click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole("button", { name: "Add Filter" }).click();
    await this.page
      .locator('select[name$="_filter"]')
      .selectOption("custbody_celigo_etail_transaction_ids");
    await this.page.locator('[class="io-filter-type form-control"]').click();
    var o = await this.page.locator(
      '[class="rule-value-container"] [class="settings-icon"]'
    );
    await o.evaluate((node: HTMLElement) => {
      node.click();
    });
    await this.page.getByLabel("Value").check();
    await this.page.locator('[data-test="Save"]').click();
    await this.page.getByRole("textbox").click();
    await this.page.getByRole("textbox").fill("id");
    await this.page.locator('input[name$="_value_0"]').click();
    o = await this.page.locator(
      '[class="rule-value-container"] [class="settings-icon"]'
    );
    await o.evaluate((node: HTMLElement) => {
      node.click();
    });
    await this.page.getByLabel("Field").check();
    await this.page.locator('[data-test="Save"]').click();
    await this.page.getByRole("button", { name: "Save & close" }).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.waitForTimeout(2000);
    await this.page
      .locator('[data-test^="pp-"] [data-test="addDataProcessor"]')
      .nth(1)
      .click();
    await this.page
      .locator('[data-test^="pp-"] [data-test="importMapping"]')
      .nth(1)
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-0"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("custbody_celigo_etail_order_id");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-0"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-0"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("id");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-1"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("celigo_replaceAllLines_item");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-1"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-1"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type('"true"');
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-2"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("custbody_celigo_shopify_store");
    await this.page.locator('[data-test="text-fieldMappingExtract-2"]').click();
    await this.page.locator('[data-test="text-fieldMappingExtract-2"]').click();
    await this.page.keyboard.type('"backward-auto-store3"');
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-3"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("custbody_celigo_etail_channel");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-3"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-3"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type('"Shopify"');
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-4"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("custbodycust_fullname");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-4"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-4"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("fullname");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-5"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("entity");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-5"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-5"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type('{{join \\" \\" firstname lastname}}');
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-6"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("email");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-6"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-6"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("EmailId");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-7"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("custbody12");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-7"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-7"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("itemname");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-8"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("quantity");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-8"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-8"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("quantity");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-9"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("amount");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-9"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-9"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("totalprice");
    await this.page
      .locator('[data-test="text-fieldMappingGenerate-10"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type("location");
    await this.page
      .locator('[data-test="text-fieldMappingExtract-10"]')
      .getByRole("textbox")
      .click();
    await this.page
      .locator('[data-test="text-fieldMappingExtract-10"]')
      .getByRole("textbox")
      .click();
    await this.page.keyboard.type('"NS1"');
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.getByText("New flow").click();
    await this.page
      .getByRole("textbox")
      .fill("Shopify Order to NetSuite Sales Order", { timeout: 1000 });
    await this.page
      .locator(
        '[class$=" MuiGrid-align-items-xs-center"] [class^="MuiButtonBase-root MuiIconButton-root jss"]'
      )
      .nth(1)
      .click();
    await this.page.locator('[data-test="Enable"]').click();
    await this.page.waitForTimeout(3000);
  }

  public async editImportForm(jsonData: any, importId: string) { }
}