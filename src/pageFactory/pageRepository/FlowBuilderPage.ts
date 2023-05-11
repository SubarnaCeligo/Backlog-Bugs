import { Page, test } from "@playwright/test";
import { request } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
import { FlowBuilderPagePO } from "@objectOR/FlowBuilderPagePO";
import { FTP } from "../../templates/FTP";
import { Utilities } from "@lib/Utilities";
import { CommonPagePO } from "@objects/CommonPagePO";
import { SettingsPage } from "./SettingsPage";
import { Assertions } from "@lib/Assertions";

let webActions: WebActions,
  assert: Assertions,
  flowBuilder: FlowBuilderPagePO,
  commonPagePO: CommonPagePO,
  settingsPage: SettingsPage,
  util: Utilities;

export class FlowBuilderPage {
  private page: Page;
  connMap: any;
  integrationMap: any;
  FLOW_BUILDER_PAGE_URL =
    "integrations/" + process.env["INTEGRATION_ID"] + "/flows";
  IMPORTS_PAGE_URL = "/imports";

  public constructor(page: Page) {
    this.page = page;
    this.connMap = new Map();
    this.integrationMap = new Map();
    webActions = new WebActions(this.page);
    assert = new Assertions(this.page);
    flowBuilder = new FlowBuilderPagePO();
    commonPagePO = new CommonPagePO();
    settingsPage = new SettingsPage(this.page);
    util = new Utilities(this.page);
  }

  public get elePGButton() {
    return this.page.locator(flowBuilder.PAGE_GENERATOR);
  }

  public get eleAppSelection() {
    return this.page.locator(flowBuilder.APP_NAME_INPUT);
  }

  private async postCall(endpoint, reqBody) {
    const context = await request.newContext({
      baseURL: process.env["API_URL"]
    });
    const resp = await context.post(endpoint, {
      headers: {
        ContentType: "application/json",
        Authorization: await util.decrypt(`${process.env.API_TOKEN}`)
      },
      data: reqBody
    });
    return await resp.json();
  }

  private async putCall(endpoint, reqBody) {
    const context = await request.newContext({
      baseURL: process.env["API_URL"]
    });
    const resp = await context.put(endpoint, {
      headers: {
        ContentType: "application/json",
        Authorization: await util.decrypt(`${process.env.API_TOKEN}`)
      },
      data: reqBody
    });
    return await resp.json();
  }

  private async getCall(endpoint) {
    const context = await request.newContext({
      baseURL: process.env["API_URL"]
    });
    const resp = await context.get(endpoint, {
      headers: {
        Authorization: await util.decrypt(`${process.env.API_TOKEN}`)
      }
    });
    return await resp.json();
  }

  public async createFlowFromAPI(jsonData: any): Promise<any> {
    var pageGen = [],
      pageProc = [],
      flowJSON = {};
    await this.loadConnections();
    await this.loadIntegrations();
    if (
      jsonData.hasOwnProperty("pageGenerators") &&
      jsonData.pageGenerators.length > 0
    ) {
      for (let index = 0; index < jsonData.pageGenerators.length; index++) {
        const exportData = jsonData.pageGenerators[index].qa__export;
        var exportID = await this.createExportorImport(exportData, "export");
        await test.step(
          "Created Export for flow with ID " + exportID,
          async () => {
            await webActions.logger(
              "Created Export for flow with ID " + exportID
            );
          }
        );
        var pg = {
          _exportId: exportID
        };
        pageGen.push(pg);
        //console.log("page gen",JSON.stringify(pageGen));
      }
    }
    if (
      jsonData.hasOwnProperty("pageProcessors") &&
      jsonData.pageProcessors.length > 0
    ) {
      for (let index = 0; index < jsonData.pageProcessors.length; index++) {
        var pp, importData;
        if (jsonData.pageProcessors[index].hasOwnProperty("qa__export")) {
          importData = jsonData.pageProcessors[index].qa__export;
          var ppExportID = await this.createExportorImport(importData, "export");
          await test.step(
            "Created Export for flow with ID " + ppExportID,
            async () => {
              await webActions.logger(
                "Created Export for flow with ID " + ppExportID
              );
            }
          );
          pp = {
            responseMapping: {
              fields: [],
              lists: []
            },
            type: "export",
            _exportId: ppExportID
          };
        } else {
          importData = jsonData.pageProcessors[index].qa__import;
          var importID = await this.createExportorImport(importData, "import");
          await test.step(
            "Created Import for flow with ID " + importID,
            async () => {
              await webActions.logger(
                "Created Import for flow with ID " + importID
              );
            }
          );
          pp = {
            responseMapping: {
              fields: [],
              lists: []
            },
            type: "import",
            _importId: importID
          };
        }
        pageProc.push(pp);
        //console.log("page proc", JSON.stringify(pageProc));
      }
    }
    let EDIT_FLOW = {
      name: "ENTER FLOW NAME",
      disabled: false,
      _integrationId: "",
      skipRetries: false,
      pageProcessors: [],
      pageGenerators: []
    };
    flowJSON = EDIT_FLOW;
    flowJSON["_integrationId"] = this.integrationMap.get("Automation Flows");
    flowJSON["name"] = jsonData["name"];
    flowJSON["pageGenerators"] = pageGen;
    flowJSON["pageProcessors"] = pageProc;

    if (jsonData.hasOwnProperty("export") && jsonData.export.type == "simple") {
      var dlExpID = await this.createExportorImport(jsonData.export, "export");
      var dlImpID = await this.createExportorImport(jsonData.import, "import");
      flowJSON["_exportId"] = dlExpID;
      flowJSON["_importId"] = dlImpID;
      delete flowJSON["pageGenerators"];
      delete flowJSON["pageProcessors"];
    }
    //console.log("FLOWS", JSON.stringify(flowJSON));
    const response = await this.postCall("v1/flows", flowJSON);
    if (jsonData.hasOwnProperty("export") && jsonData.export.type == "simple") {
      delete flowJSON["_exportId"];
      delete flowJSON["_importId"];
    }
    //console.log("res : " + JSON.stringify(response));
    if (response.hasOwnProperty("_id")) {
      await test.step(
        "Created Flow " + response.name + " with " + response._id,
        async () => {
          await webActions.logger(
            "Created Flow " + response.name + " with " + response._id
          );
        }
      );
      return response._id;
    } else {
      throw new Error(
        "Unable to get response " + JSON.stringify(response.errors)
      );
    }
  }

  public async createExportorImport(body, type) {
    let uri;
    if (type == "export") {
      uri = "v1/exports";
    } else if (type == "import") {
      uri = "v1/imports";
    }
    body.name = "AutomationStandalone_" + (await util.randomString(5));
    body._connectionId = await this.connMap.get(body._connectionId);
    const response = await this.postCall(uri, body);
    //console.log("res : " + JSON.stringify(response));
    if (response.hasOwnProperty("_id")) {
      return response._id;
    } else {
      var ids = [];
      for (var i = 0; i < response.length; i++) {
        ids.push(response[i]._id);
      }
      return ids;
    }
  }

  public async loadConnections() {
    try {
      var response = await this.getCall("v1/connections");
      for (var index in response) {
        var connection_name = response[index]["name"];
        var conn_id = response[index]["_id"];
        this.connMap.set(connection_name, conn_id);
      }

      //console.log("Map for the connection is", this.connMap);
    } catch (error) {
      console.log("Unable to fetch connections", error);
    }
  }

  public async loadIntegrations() {
    try {
      var response = await this.getCall("v1/integrations");
      for (const index in response) {
        var integration_name = response[index]["name"];
        if (integration_name === "Automation Flows") {
          this.integrationMap.set(integration_name, response[index]["_id"]);
        }
      }

      //console.log("Map for the Integration is",this.connMap)
    } catch (error) {
      console.log("Unable to fetch Integrations", error);
    }
  }

  async navigateToFlows() {
    await test.step("Navigating to Flows Page", async () => {
      let flows =
        "/integrations/" + this.integrationMap.get("Automation Flows") + "/flows";
      await webActions.navigateTo(flows);
    });
  }

  public async addPageGenerator(data) {
    await this.navigateToFlows();
    await webActions.click(flowBuilder.CREATEFLOW);
    var exp = data[0].qa__export;
    let app = exp.adaptorType;
    app = app.split("Export");
    let ap = app[0];
    const ele = await this.elePGButton;
    if (ele != null) await ele?.click();
    else throw new Error("No element, hence failed");
    let temp = await this.loadTemplate(ap, exp, "Export");
    temp.application = ap;
    temp.name = "AutomationStandaloneExport__" + (await util.randomString(10));
    //console.log("Map:", JSON.stringify(temp));
    for (var a in temp) {
      let loc = "[data-test='" + a + "']";
      var type = await webActions.determineControlType(loc);
      //console.log("type", type);
      await webActions.performActionWithControl(
        type.tempWebControl,
        type.typeOfControl,
        temp[a]
      );
    }
  }

  public async addPageProcessor(data) {
    if ((await this.page.url()).search("flowbuilder") === -1) {
      await this.navigateToFlows();
      await webActions.click(flowBuilder.CREATEFLOW);
    }
    var imp = data[0].qa__import;
    let app = imp.adaptorType;
    app = app.split("Import");
    let ap = app[0];
    const ele = await this.elePGButton;
    if (ele != null) await ele?.click();
    else throw new Error("No element, hence failed");
  }

  public async loadTemplate(appName, obj, type) {
    let name = appName.toUpperCase();
    switch (name) {
      case "FTP":
        let ftp = new FTP(this.page);
        return await webActions.loadMap(obj, ftp.FTP_JSON.FTP_EXPORT);
    }
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
      await this.page.getByRole("button", { name: "Please select" }).click();
      await this.page.getByText("Export records from source application").click();
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
    await webActions.selectTextfromDropDown(this.page, "order");
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
    // await webActions.selectTextfromDropDown(page, 'String');
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
    await this.page.locator('[data-test="preSavePage\\.script"]').first().click();
    await this.page.locator('[data-test="name"]').getByRole("textbox").click();
    await this.page.waitForTimeout(2000);
    await this.page
      .locator('[data-test="name"]')
      .getByRole("textbox")
      .fill("Export Basic NS_TEST");
    await this.page.getByRole("button", { name: "Please select" }).click();
    await webActions.selectTextfromDropDown(this.page, "preSavePage");
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
    await this.page.locator('[data-test="addDataProcessor"]').click();
    await this.page.locator('[data-test="exportSchedule"]').click();
    await this.page.getByLabel("Use preset").check();
    await this.page.getByRole("button", { name: "Please select" }).click();
    await webActions.selectTextfromDropDown(this.page, "every_half_hour");
    await this.page.locator('[data-test="endTime"]').click();
    await webActions.selectTextfromDropDown(this.page, "11:35 PM");
    await this.page.locator('[data-test="startTime"]').click();
    await webActions.selectTextfromDropDown(this.page, "1:05 PM");
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
    await webActions.selectTextfromDropDown(this.page, "customer");
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
    await webActions.selectTextfromDropDown(this.page, "salesorder");
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
    await this.page.locator('[class="css-y8aj3r"] input').fill("net");
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
    await webActions.selectTextfromDropDown(this.page, "creditcardcharge");
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
      clickCount: 3
    });
    await this.page
      .getByRole("textbox")
      .fill("TC_610_Credit_Card_Transaction_Add");
  }

  public async updateImportMappings(map: Map<any, any>) {
    var sourceText, destinationText, sourceField, destinationField;
    var i = 0;
    sourceField = await this.page.locator(flowBuilder.MAPPER2_SOURCE_FIELD_FIELD);
    destinationText = await this.page.locator(
      flowBuilder.MAPPER2_DESTINATION_FIELD_TEXT
    );
    destinationField = await this.page
      .locator(flowBuilder.MAPPER2_DESTINATION_FIELD_FIELD)
      .nth(0);
    await destinationText.nth(i).dblclick();
    for (let [K, V] of map) {
      sourceText = await this.page.locator(flowBuilder.MAPPER2_SOURCE_FIELD_TEXT);
      await destinationField.fill(K);
      await sourceText.nth(i).dblclick();
      await sourceField.fill(V);
      var add = await this.page.locator(flowBuilder.FIELD_MAPPING_ADD);
      await add.nth(i).click();
      await add.nth(i).click();
      i += 1;
    }
  }

  public async enableFlow() {
    await webActions.page.waitForSelector(flowBuilder.FLOW_TOGGLE);
    var checked = await webActions.page
      .locator(flowBuilder.FLOW_TOGGLE)
      .getAttribute("checked");
    if (checked == null) {
      await webActions.click(flowBuilder.FLOW_TOGGLE);
      await webActions.click(flowBuilder.FLOW_ENABLE);
    }
    await webActions.page.waitForTimeout(1000);
  }

  public async disableFlow() {
    await webActions.page.waitForSelector(flowBuilder.FLOW_TOGGLE);
    var checked = await webActions.page
      .locator(flowBuilder.FLOW_TOGGLE)
      .getAttribute("checked");
    if (checked != null) {
      await webActions.click(flowBuilder.FLOW_TOGGLE);
      await webActions.click(flowBuilder.FLOW_DISABLE);
    }
    await webActions.page.waitForTimeout(1000);
  }

  public async waitForFlowToComplete() {
    await webActions.page.waitForTimeout(2000);
    var t = 0,
      maxWaitInQueue = 10;
    var status = await webActions.getText(flowBuilder.FLOW_STATUS);
    while (!status.includes("Last run:")) {
      await webActions.page.waitForTimeout(1000);
      status = await webActions.getText(flowBuilder.FLOW_STATUS);
      t += 1;
      if (t > maxWaitInQueue && status.includes("Waiting in queue")) {
        await webActions.click(flowBuilder.REFRESH_JOBS_BOARD);
        t = 0;
      }
    }
  }

  public async runFlow() {
    await this.enableFlow();
    await webActions.click(flowBuilder.RUN_FLOW);
    await this.waitForFlowToComplete();
  }

  public async deleteFlow() {
    await this.disableFlow();
    await webActions.click(flowBuilder.OPEN_ACTIONS_MENU);
    await webActions.click(flowBuilder.DELETE_FLOW);
    await webActions.click(commonPagePO.DELETE);
  }

  public async refreshErrorsDashboard() {
    await webActions.page.waitForTimeout(2000);
    var selected = await webActions.page
      .locator(flowBuilder.RESOLVED_ERRORS_TAB)
      .getAttribute("aria-selected");
    if (selected == "true") {
      await webActions.click(commonPagePO.CLOSE_RIGHT_DRAWER);
      await webActions.page.reload({ timeout: 5000 });
      await webActions.page.waitForTimeout(5000);
      return true;
    }
  }

  public async navigateToJobErrorDashboard(jobName: string) {
    // var drawerStyle = await webActions.page.locator('[class$=" MuiDrawer-paperAnchorBottom MuiDrawer-paperAnchorDockedBottom MuiPaper-elevation0"]').getAttribute('style');
    // var height = drawerStyle.split(':')[1].trim();
    // var r = /\d+/;
    // var h = Number(height.match(r)[0]);
    // if (h < 303) {
    //   await webActions.click(flowBuilder.INCREASE_FLOW_BUILDER_BOTTOM_DRAWER);
    // }
    var job = await webActions.page.$$(flowBuilder.JOB_NAME);
    var name;
    for (var i = 0; i < job.length; i++) {
      name = await job[i].textContent();
      if (name === jobName) {
        var errors = await webActions.page.$$(flowBuilder.JOB_ERRORS);
        await errors[i].click();
        break;
      }
    }
    var t = await this.refreshErrorsDashboard();
    if (t) {
      await webActions.page.waitForTimeout(5000);
      await this.navigateToJobErrorDashboard(jobName);
    }
  }
}
