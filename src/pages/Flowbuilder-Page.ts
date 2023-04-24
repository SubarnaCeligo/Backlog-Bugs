import type { Page } from "@playwright/test";
import { selectTextfromDropDown } from "../utils/commonBrowserActions";

export class FlowBuilderPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public get elePGButton() {
    return this.page.locator('[data-test="addGenerator"]');
  }

  public get eleAppSelection() {
    return this.page.locator("#react-select-2-input");
  }

  public async addPageGenerator() {
    const ele = await this.elePGButton;
    if (ele != null) await ele?.click();
    else throw new Error("No element, hence failed");
  }

  public async selectApplication(appname: string, connname: string) {
    const ele = await this.eleAppSelection;
    if (ele != null) {
      await ele.fill(appname);
      await this.page
        .locator("[data-test=" + appname + "]")
        .getByText(appname)
        .click();
      //await this.page.getByRole('button', { name: 'Please select' }).click();
      //await this.page.getByText('Export records from source application').click();
      await this.page.getByRole("button", { name: "Please select" }).click();
      await this.page.getByText(connname, { exact: true }).click();
      await this.page.locator('[data-test="save"]').click();
    } else {
      throw new Error("No element, hence failed");
    }
  }

  public async seleApplication(appname: string, connname: string) {
    const ele = await this.eleAppSelection;
    if (ele != null) {
      await ele.fill(appname);
      await this.page
        .locator("[data-test=" + appname + "]")
        .getByText(appname)
        .click();
      await this.page.getByRole('button', { name: 'Please select' }).click();
      await this.page.getByText('Export records from source application').click();
      await this.page.getByRole("button", { name: "Please select" }).click();
      await this.page.getByText(connname, { exact: true }).click();
      await this.page.locator('[data-test="save"]').click();
    } else {
      throw new Error("No element, hence failed");
    }
  }

  public async fillExportForm() {
    await this.page.locator('[data-test="name"]').getByRole("textbox").click();
    await this.page
      .locator('[data-test="name"]')
      .getByRole("textbox")
      .fill("Shopify Order Export PW");
    await this.page
      .locator('[data-test="assistantMetadata\\.resource"]')
      .getByRole("button", { name: "Please select" })
      .click();
    await selectTextfromDropDown(this.page, "order");
    await this.page.getByRole("button", { name: "Please select" }).click();
    await this.page.getByText("Retrieve a list of Orders").click();
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.locator('[data-test="addDataProcessor"]').click();
    await this.page.locator('[data-test="exportTransformation"]').click();
    await this.page.getByPlaceholder("extract").click();
    await this.page.getByPlaceholder("extract").fill("id");
    await this.page
      .locator('[data-test="generate-0"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-0"]')
      .getByPlaceholder("generate")
      .fill("id");
    await this.page.locator("#extract-1").click();
    await this.page.locator("#extract-1").fill("email");
    await this.page
      .locator('[data-test="generate-1"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-1"]')
      .getByPlaceholder("generate")
      .fill("Email");
    await this.page.locator("#extract-2").click();
    await this.page.locator("#extract-2").fill("checkout_id");
    await this.page
      .locator('[data-test="generate-2"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-2"]')
      .getByPlaceholder("generate")
      .fill("chckid");
    await this.page.locator("#extract-3").click();
    await this.page.locator("#extract-3").fill("customer.first_name");
    await this.page
      .locator('[data-test="generate-3"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-3"]')
      .getByPlaceholder("generate")
      .fill("customer[*].firstname");
    await this.page.locator("#extract-4").click();
    await this.page.locator("#extract-4").fill("customer.last_name");
    await this.page
      .locator('[data-test="generate-4"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-4"]')
      .getByPlaceholder("generate")
      .fill("customer[*].lastname");
    await this.page.locator("#extract-5").click();
    await this.page.locator("#extract-5").fill("current_total_price");
    await this.page
      .locator('[data-test="generate-5"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-5"]')
      .getByPlaceholder("generate")
      .fill("totalprice");
    await this.page.locator("#extract-6").click();
    await this.page.locator("#extract-6").fill("line_items[*].title");
    await this.page
      .locator('[data-test="generate-6"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-6"]')
      .getByPlaceholder("generate")
      .fill("item[*].name");
    await this.page.locator("#extract-7").click();
    await this.page.locator("#extract-7").fill("total_line_items_price");
    await this.page
      .locator('[data-test="generate-7"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-7"]')
      .getByPlaceholder("generate")
      .fill("totalitem[*].price");
    await this.page.locator("#extract-8").click();
    await this.page.locator("#extract-8").fill("line_items[*].id");
    await this.page
      .locator('[data-test="generate-8"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-8"]')
      .getByPlaceholder("generate")
      .fill("item[*].id");
    await this.page.locator("#extract-9").click();
    await this.page.locator("#extract-9").fill("line_items[*].quantity");
    await this.page
      .locator('[data-test="generate-9"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-9"]')
      .getByPlaceholder("generate")
      .fill("item[*].quantity");
    await this.page.locator("#extract-10").click();
    await this.page.locator("#extract-10").fill("order_number");
    await this.page
      .locator('[data-test="generate-10"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-10"]')
      .getByPlaceholder("generate")
      .fill("ordernumber");
    await this.page.locator("#extract-11").click();
    await this.page
      .locator("#extract-11")
      .fill("customer.default_address.address1");
    await this.page
      .locator('[data-test="generate-11"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-11"]')
      .getByPlaceholder("generate")
      .fill("address[*].address1");
    await this.page.locator("#extract-12").click();
    await this.page
      .locator("#extract-12")
      .fill("customer.default_address.address2");
    await this.page
      .locator('[data-test="generate-12"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-12"]')
      .getByPlaceholder("generate")
      .fill("address[*].address2");
    await this.page.locator("#extract-13").click();
    await this.page
      .locator("#extract-13")
      .fill("customer.default_address.city");
    await this.page
      .locator('[data-test="generate-13"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-13"]')
      .getByPlaceholder("generate")
      .fill("address[*].city");
    await this.page.locator("#extract-14").click();
    await this.page
      .locator("#extract-14")
      .fill("customer.default_address.company");
    await this.page
      .locator('[data-test="generate-14"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-14"]')
      .getByPlaceholder("generate")
      .fill("address[*].company");
    await this.page.locator("#extract-15").click();
    await this.page
      .locator("#extract-15")
      .fill("customer.default_address.country");
    await this.page
      .locator('[data-test="generate-15"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-15"]')
      .getByPlaceholder("generate")
      .fill("address[*].country");
    await this.page.locator("#extract-16").click();
    await this.page
      .locator("#extract-16")
      .fill("customer.default_address.country_code");
    await this.page
      .locator('[data-test="generate-16"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-16"]')
      .getByPlaceholder("generate")
      .fill("address[*].code");
    await this.page.locator("#extract-17").click();
    await this.page
      .locator("#extract-17")
      .fill("customer.default_address.default");
    await this.page
      .locator('[data-test="generate-17"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-17"]')
      .getByPlaceholder("generate")
      .fill("address[*].defaultaddress");
    await this.page.locator("#extract-18").click();
    await this.page.locator("#extract-18").fill("customer.default_address.zip");
    await this.page
      .locator('[data-test="generate-18"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-18"]')
      .getByPlaceholder("generate")
      .fill("address[*].zipcode");
    await this.page.locator("#extract-19").click();
    await this.page
      .locator("#extract-19")
      .fill("customer.default_address.phone");
    await this.page
      .locator('[data-test="generate-19"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-19"]')
      .getByPlaceholder("generate")
      .fill("address[*].phone");
    await this.page.locator("#extract-20").click();
    await this.page
      .locator("#extract-20")
      .fill("customer.default_address.province_code");
    await this.page
      .locator('[data-test="generate-20"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-20"]')
      .getByPlaceholder("generate")
      .fill("address[*].statecode");
    await this.page.locator("#extract-21").click();
    await this.page
      .locator("#extract-21")
      .fill("customer.default_address.default");
    await this.page
      .locator('[data-test="generate-21"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-21"]')
      .getByPlaceholder("generate")
      .fill("address[*].default");
    await this.page.locator("#extract-22").click();
    await this.page.locator("#extract-22").fill("customer.id");
    await this.page
      .locator('[data-test="generate-22"]')
      .getByPlaceholder("generate")
      .click();
    await this.page
      .locator('[data-test="generate-22"]')
      .getByPlaceholder("generate")
      .fill("customer[*].customerid");
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.locator('[data-test="addDataProcessor"]').click();
    await this.page.locator('[data-test="exportFilter"]').click();
    await this.page
      .locator('select[name$="_filter"]')
      .selectOption("record.Email", { timeout: 500 });
    await this.page
      .locator('select[name$="_operator"]')
      .selectOption("contains", { timeout: 500 });
    await this.page
      .locator('input[name$="_value_0"]')
      .fill("xinej@b2bx", { timeout: 500 });
    // var x = await this.page.locator('[class="rule-filter-container"] [class="settings-icon"]');
    // await x.evaluate((node: HTMLElement) => { node.click() });
    // await this.page.getByRole('button', { name: 'Number' }).click();
    // await this.page.getByRole('menuitem', { name: 'String' }).click();
    // await this.page.locator('[data-test="dataType"] [class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input"]').getByRole('button', { name: 'Please select' }).click();
    // await selectTextfromDropDown(page, 'String');
    // await this.page.locator('[data-test="Save"]').click();
    // await this.page.locator('input[name$="_value_0"]').click();
    // var y = await this.page.locator('[class="rule-value-container"] [class="settings-icon"]');
    // await y.evaluate((node: HTMLElement) => { node.click() });
    // await this.page.getByRole('button', { name: 'Number' }).click();
    // await this.page.getByRole('menuitem', { name: 'String' }).click();
    // await this.page.locator('[data-test="Save"]').click();
    // await this.page.locator('[data-not="group"]').dblclick();
    await this.page.mouse.click(50, 100);
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.locator('[data-test="addDataProcessor"]').click();
    await this.page.locator('[data-test="exportHooks"]').click();
    await this.page.waitForTimeout(2000);
    await this.page
      .locator('[data-test="preSavePage\\.script"]')
      .first()
      .click();
    await this.page.locator('[data-test="name"]').getByRole("textbox").click();
    await this.page.waitForTimeout(2000);
    await this.page
      .locator('[data-test="name"]')
      .getByRole("textbox")
      .fill("Export Basic NS_TEST");
    await this.page.getByRole("button", { name: "Please select" }).click();
    await selectTextfromDropDown(this.page, "preSavePage");
    await this.page.waitForTimeout(2000);
    await this.page
      .locator("#content-inline div")
      .filter({
        hasText:
          "/** preSavePageFunction stub:** The name of the function can be changed to anyth",
      })
      .nth(1)
      .click();
    await this.page
      .locator("#content-inline")
      .getByRole("textbox")
      .press("Meta+a");
    await this.page.keyboard.press("Backspace");
    await this.page.waitForTimeout(2000);
    var b = `/*
        * preSavePageFunction stub:
        *
        * The name of the function can be changed to anything you like.
        *
        * The function will be passed one 'options' argument that has the following fields:
        *   'data' - an array of records representing one page of data. A record can be an object {} or array [] depending on the data source.
        *   'files' - file exports only. files[i] contains source file metadata for data[i]. i.e. files[i].fileMeta.fileName.
        *   'errors' - an array of errors where each error has the structure {code: '', message: '', source: '', retryDataKey: ''}.
        *   'retryData' - a dictionary object containing the retry data for all errors: {retryDataKey: { data: <record>, stage: '', traceKey: ''}}.
        *   '_exportId' - the _exportId currently running.
        *   '_connectionId' - the _connectionId currently running.
        *   '_flowId' - the _flowId currently running.
        *   '_integrationId' - the _integrationId currently running.
        *   'pageIndex' - 0 based. context is the batch export currently running.
        *   'lastExportDateTime' - delta exports only.
        *   'currentExportDateTime' - delta exports only.
        *   'settings' - all custom settings in scope for the export currently running.
        *
        * The function needs to return an object that has the following fields:
        *   'data' - your modified data.
        *   'errors' - your modified errors.
        *   'abort' - instruct the batch export currently running to stop generating new pages of data.
        *   'newErrorsAndRetryData' - return brand new errors linked to retry data: [{retryData: <record>, errors: [<error>]}].
        * Throwing an exception will signal a fatal error and stop the flow.
        */
        function preSavePage (options) {
          var updatedData = []
          for(var i = 0; i< options.data.length; i++){
            var eachRecord = {
              "id": options.data[0].id,
              "EmailId": options.data[0].Email,
              "chckid": options.data[0].chckid,
              "firstname": options.data[0].customer[0].firstname,
              "lastname" : options.data[0].customer[0].lastname,
              "totalprice" : options.data[0].totalprice,
              "itemname" : options.data[0].item[0].name,
              "itemid" : options.data[0].item[0].id,
              "quantity" : options.data[0].item[0].quantity,
              "ordernumber" : options.data[0].ordernumber,
              "address1" :  options.data[0].address[0].address1,
              "address2" : options.data[0].address[0].address2,
              "city" : options.data[0].address[0].city,
              "company" : options.data[0].address[0].company,
              "country" : options.data[0].address[0].country,
              "code" : options.data[0].address[0].code,
              "zipcode" : options.data[0].address[0].zipcode,
              "phone" : options.data[0].address[0].phone,
              "statecode" : options.data[0].address[0].statecode,
              "default" : options.data[0].address[0].default,
              "customerid" : options.data[0].customer[0].customerid,
              "fullname" : options.data[0].customer[0].firstname + " " + options.data[0].customer[0].lastname
            }
            updatedData.push(eachRecord)
          }
          // "fullname" : options.data[0].fullname
          return {
            data: updatedData,
            errors: options.errors,
            abort: false,
            newErrorsAndRetryData: []
          }
        }`;
    await this.page.locator("#content-inline").getByRole("textbox").fill(b);
    await this.page.waitForTimeout(2000);
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.locator('[name="script-preSavePage"]').fill("preSavePage");
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.locator('[data-test="addDataProcessor"]').click();
    await this.page.locator('[data-test="exportSchedule"]').click();
    await this.page.getByLabel("Use preset").check();
    await this.page.getByRole("button", { name: "Please select" }).click();
    await selectTextfromDropDown(this.page, "every_half_hour");
    await this.page.locator('[data-test="endTime"]').click();
    await selectTextfromDropDown(this.page, "11:35 PM");
    await this.page.locator('[data-test="startTime"]').click();
    await selectTextfromDropDown(this.page, "1:05 PM");
    await this.page.locator('[data-test="saveAndClose"]').click();
  }

  public async fillImportForm() {
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
    await selectTextfromDropDown(this.page, "customer");
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
        name: "Import records into destination application",
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
    await selectTextfromDropDown(this.page, "salesorder");
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

  public async fillExportform1() {
    await this.page.locator('[data-test="name"]').getByRole("textbox").click();
    await this.page
      .locator('[data-test="name"]')
      .getByRole("textbox")
      .fill("AutomationStandaloneExport__aE5s2tbl1T4");
    await this.page.getByRole("button", { name: "Please select" }).click();
    await this.page.getByRole("menuitem", { name: "JSON" }).click();
    await this.page.locator('[id="text-ftp\\.directoryPath"]').click();
    await this.page
      .locator('[id="text-ftp\\.directoryPath"]')
      .fill("/io.auto.qa/IO_UI_Automation_FTPExports");
    await this.page.locator('[id="text-ftp\\.fileNameStartsWith"]').click();
    await this.page
      .locator('[id="text-ftp\\.fileNameStartsWith"]')
      .fill("CCard_Transaction_Add.json");
    await this.page.locator('[data-test="Advanced"]').click();
    await this.page.getByLabel("Leave file on server").check();
    await this.page.getByRole("button", { name: "Please select" }).click();
    await this.page.getByRole("menuitem", { name: "UTF-8" }).click();
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.setInputFiles(
      '[id="fileUpload"]',
      "/Users/shivapotlapelli/Documents/GitHub/Playwright_Platform_POC/assets/FTPUploads/78_FTP to NSCustomer_JSON.json"
    );
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.waitForTimeout(5000);
  }

  public async fillImportform1() {
    await this.page.locator('[data-test="addProcessor"]').click();
    await this.page.waitForTimeout(1000);
    await this.page.locator('[class="css-y8aj3r"] input').fill('net');
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
      .getByRole("menuitem", { name: "NetSuite-TSTDRV1143616", exact: true })
      .click();
    await this.page.locator('[data-test="save"]').click();
    await this.page.locator('[data-test="name"]').getByRole("textbox").click();
    await this.page
      .locator('[data-test="name"]')
      .getByRole("textbox")
      .fill("AutomationStandaloneImport__niW08Y2NV5");
    await this.page
      .getByRole("button", { name: "Please select a record type" })
      .click();
    await selectTextfromDropDown(this.page, "creditcardcharge");
    await this.page.locator('[data-test="add"]').getByLabel("Add").check();
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.locator('[data-test="addDataProcessor"]').click();
    await this.page.locator('[data-test="addDataProcessor"]').click();
    await this.page.locator('[data-test="importMapping"]').click();
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
    await this.page.locator('[data-test="saveAndClose"]').click();
    await this.page.getByText("New flow").click();
    await this.page.getByRole("textbox").click({
      clickCount: 3,
    });
    await this.page
      .getByRole("textbox")
      .fill("TC_610_Credit_Card_Transaction_Add");
  }
}
