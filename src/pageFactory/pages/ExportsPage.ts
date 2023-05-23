import { IO } from "@controller/IO";
import BasePage from "./BasePage";
import { IExportsPage } from "@interface/IExportsPage";

export class ExportsPage extends BasePage implements IExportsPage {
  public async fillQueryParameters(map: Map<any, any>) {
    var qname = this.selectors.ExportsPagePO.QUERY_PARAMETERS_NAME_FIELD;
    var qvalue = this.selectors.ExportsPagePO.QUERY_PARAMETERS_VALUE_FIELD;
    var queryparams;
    for (let [K, V] of map) {
      queryparams = await this.page.$$(
        this.selectors.ExportsPagePO.QUERY_PARAMETERS_ROW
      );
      var i = queryparams.length - 1;
      await this.page.locator(qname + i + '"]').fill(K);
      await this.page.locator(qvalue + i + '"]').fill(V);
    }
  }

  public async selectConnection(connectionName: string) {
    var listBox = await this.page
      .locator(this.selectors.BasePagePO.CONNECTION + " div")
      .nth(0)
      .getAttribute("aria-haspopup");
    if (listBox == "listbox") {
      await this.click(this.selectors.BasePagePO.CONNECTION);
      await this.selectTextfromDropDown(this.page, connectionName);
    } else {
      await this.click(this.selectors.BasePagePO.CONNECTION);
      await this.fill(
        this.selectors.ExportsPagePO.CONNECTIONS_DROPDOWN,
        connectionName
      );
      await this.page.keyboard.press("ArrowDown");
      await this.page.keyboard.press("Enter");
    }
  }

  public async fillExportForm(jsonData:any) {
    await this.page.locator('[data-test="name"]').getByRole("textbox").click();
    await this.page
      .locator('[data-test="name"]')
      .getByRole("textbox")
      .fill("Shopify Order Export PW");
    await this.page
      .locator('[data-test="assistantMetadata\\.resource"]')
      .getByRole("button", { name: "Please select" })
      .click();
    await this.selectTextfromDropDown(this.page, "order");
    await this.page.getByRole("button", { name: "Please select" }).click();
    await this.page.getByText("Retrieve a list of Orders").click();
    await this.page.locator(this.selectors.BasePagePO.SAVE_AND_CLOSE).click();
    await this.page
      .locator(this.selectors.FlowBuilderPagePO.DATA_PROCESSOR)
      .click();
    await this.page
      .locator(this.selectors.FlowBuilderPagePO.EXPORT_TRANSFORMATION)
      .click();
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
    await this.page.locator("#extract-13").fill("customer.default_address.city");
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
    await this.page.locator("#extract-19").fill("customer.default_address.phone");
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
    await this.page
      .locator("this.selectors.FlowBuilderPagePO.DATA_PROCESSOR")
      .click();
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
    // await this.selectTextfromDropDown(page, 'String');
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
    await this.page
      .locator("this.selectors.FlowBuilderPagePO.DATA_PROCESSOR")
      .click();
    await this.page.locator('[data-test="exportHooks"]').click();
    await this.page.waitForTimeout(2000);
    await this.page.locator('[data-test="preSavePage\\.script"]').first().click();
    await this.page.locator('[data-test="name"]').getByRole("textbox").click();
    await this.page.waitForTimeout(2000);
    await this.page
      .locator('[data-test="name"]')
      .getByRole("textbox")
      .fill("Export Basic NS_TEST");
    await this.page.getByRole("button", { name: "Please select" }).click();
    await this.selectTextfromDropDown(this.page, "preSavePage");
    await this.page.waitForTimeout(2000);
    await this.page
      .locator("#content-inline div")
      .filter({
        hasText:
          "/** preSavePageFunction stub:** The name of the function can be changed to anyth"
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
    await this.page
      .locator("this.selectors.FlowBuilderPagePO.DATA_PROCESSOR")
      .click();
    await this.page.locator('[data-test="exportSchedule"]').click();
    await this.page.getByLabel("Use preset").check();
    await this.page.getByRole("button", { name: "Please select" }).click();
    await this.selectTextfromDropDown(this.page, "every_half_hour");
    await this.page.locator('[data-test="endTime"]').click();
    await this.selectTextfromDropDown(this.page, "11:35 PM");
    await this.page.locator('[data-test="startTime"]').click();
    await this.selectTextfromDropDown(this.page, "1:05 PM");
    await this.page.locator('[data-test="saveAndClose"]').click();
  }


  public async editExportForm(jsonData: any, exportId: string) { }
}
