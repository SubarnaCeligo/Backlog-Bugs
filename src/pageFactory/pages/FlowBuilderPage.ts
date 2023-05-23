import { Page, test } from "@playwright/test";
import { FTP } from "../../templates/FTP";
import { randomString } from "@utilities/stringUtil";
import BasePage from "./BasePage";
import { IFlowBuilderPage } from "@interface/IFlowBuilderPage";


export class FlowBuilderPage extends BasePage implements IFlowBuilderPage {

  constructor(page: Page) {
    super(page);
  }
  public get elePGButton() {
    return this.page.locator(this.selectors.FlowBuilderPagePO.PAGE_GENERATOR);
  }

  public get eleAppSelection() {
    return this.page.locator(this.selectors.FlowBuilderPagePO.APP_NAME_INPUT);
  }

  async navigateToFlows() {
    await test.step("Navigating to Flows Page", async () => {
      let flows = "";
      //  "/integrations/" + this.integrationMap.get("Automation Flows") + "/flows";
      await this.navigateTo(flows);
    });
  }
  public async fillFlowsForm(jsonData: any) {
    await this.addPageGenerator(jsonData);
    await this.addPageProcessor(jsonData);
  }

  public async addPageGenerator(data) {
    await this.navigateToFlows();
    await this.click(this.selectors.FlowBuilderPagePO.CREATEFLOW);
    var exp = data[0].qa__export;
    let app = exp.adaptorType;
    app = app.split("Export");
    let ap = app[0];
    const ele = await this.elePGButton;
    if (ele != null) await ele?.click();
    else throw new Error("No element, hence failed");
    let temp = await this.loadTemplate(ap, exp, "Export");
    temp.application = ap;
    temp.name = "AutomationStandaloneExport__" + (await randomString(10));
    //console.log("Map:", JSON.stringify(temp));
    for (var a in temp) {
      let loc = "[data-test='" + a + "']";
      var type = await this.determineControlType(loc);
      //console.log("type", type);
      await this.performActionWithControl(
        type.tempWebControl,
        type.typeOfControl,
        temp[a]
      );
    }
  }

  public async addPageProcessor(data) {
    if ((await this.page.url()).search("flowbuilder") === -1) {
      await this.navigateToFlows();
      await this.click(this.selectors.FlowBuilderPagePO.CREATEFLOW);
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
        return await this.loadMap(obj, ftp.FTP_JSON.FTP_EXPORT);
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


  public async updateImportMappings(map: Map<any, any>) {
    var sourceText, destinationText, sourceField, destinationField;
    var i = 0;
    sourceField = await this.page.locator(
      this.selectors.FlowBuilderPagePO.MAPPER2_SOURCE_FIELD_FIELD
    );
    destinationText = await this.page.locator(
      this.selectors.FlowBuilderPagePO.MAPPER2_DESTINATION_FIELD_TEXT
    );
    destinationField = await this.page
      .locator(this.selectors.FlowBuilderPagePO.MAPPER2_DESTINATION_FIELD_FIELD)
      .nth(0);
    await destinationText.nth(i).dblclick();
    for (let [K, V] of map) {
      sourceText = await this.page.locator(
        this.selectors.FlowBuilderPagePO.MAPPER2_SOURCE_FIELD_TEXT
      );
      await destinationField.fill(K);
      await sourceText.nth(i).dblclick();
      await sourceField.fill(V);
      var add = await this.page.locator(
        this.selectors.FlowBuilderPagePO.FIELD_MAPPING_ADD
      );
      await add.nth(i).click();
      await add.nth(i).click();
      i += 1;
    }
  }

  public async enableFlow() {
    await this.page.waitForSelector(this.selectors.FlowBuilderPagePO.FLOW_TOGGLE);
    var checked = await this.page
      .locator(this.selectors.FlowBuilderPagePO.FLOW_TOGGLE)
      .getAttribute("checked");
    if (checked == null) {
      await this.click(this.selectors.FlowBuilderPagePO.FLOW_TOGGLE);
      await this.click(this.selectors.FlowBuilderPagePO.FLOW_ENABLE);
    }
    await this.page.waitForTimeout(1000);
  }

  public async disableFlow() {
    await this.page.waitForSelector(this.selectors.FlowBuilderPagePO.FLOW_TOGGLE);
    var checked = await this.page
      .locator(this.selectors.FlowBuilderPagePO.FLOW_TOGGLE)
      .getAttribute("checked");
    if (checked != null) {
      await this.click(this.selectors.FlowBuilderPagePO.FLOW_TOGGLE);
      await this.click(this.selectors.FlowBuilderPagePO.FLOW_DISABLE);
    }
    await this.page.waitForTimeout(1000);
  }

  public async waitForFlowToComplete() {
    await this.page.waitForTimeout(2000);
    var t = 0,
      maxWaitInQueue = 10;
    var status = await this.getText(
      this.selectors.FlowBuilderPagePO.FLOW_STATUS
    );
    while (!status.includes("Last run:")) {
      await this.page.waitForTimeout(1000);
      status = await this.getText(
        this.selectors.FlowBuilderPagePO.FLOW_STATUS
      );
      t += 1;
      if (t > maxWaitInQueue && status.includes("Waiting in queue")) {
        await this.click(
          this.selectors.FlowBuilderPagePO.REFRESH_JOBS_BOARD
        );
        t = 0;
      }
    }
  }

  public async runFlow() {
    await this.enableFlow();
    await this.click(this.selectors.FlowBuilderPagePO.RUN_FLOW);
    await this.waitForFlowToComplete();
  }

  public async deleteFlow() {
    await this.disableFlow();
    await this.click(this.selectors.FlowBuilderPagePO.OPEN_ACTIONS_MENU);
    await this.click(this.selectors.FlowBuilderPagePO.DELETE_FLOW);
    await this.click(this.selectors.BasePagePO.DELETE);
  }

  public async refreshErrorsDashboard() {
    await this.page.waitForTimeout(2000);
    var selected = await this.page
      .locator(this.selectors.FlowBuilderPagePO.RESOLVED_ERRORS_TAB)
      .getAttribute("aria-selected");
    if (selected == "true") {
      await this.click(this.selectors.BasePagePO.CLOSE_RIGHT_DRAWER);
      await this.page.reload({ timeout: 5000 });
      await this.page.waitForTimeout(5000);
      return true;
    }
  }

  public async navigateToJobErrorDashboard(jobName: string) {
    // var drawerStyle = await this.page.locator('[class$=" MuiDrawer-paperAnchorBottom MuiDrawer-paperAnchorDockedBottom MuiPaper-elevation0"]').getAttribute('style');
    // var height = drawerStyle.split(':')[1].trim();
    // var r = /\d+/;
    // var h = Number(height.match(r)[0]);
    // if (h < 303) {
    //   await this.click(flowBuilder.INCREASE_FLOW_BUILDER_BOTTOM_DRAWER);
    // }
    var job = await this.page.$$(this.selectors.FlowBuilderPagePO.JOB_NAME);
    var name;
    for (var i = 0; i < job.length; i++) {
      name = await job[i].textContent();
      if (name === jobName) {
        var errors = await this.page.$$(
          this.selectors.FlowBuilderPagePO.JOB_ERRORS
        );
        await errors[i].click();
        break;
      }
    }
    var t = await this.refreshErrorsDashboard();
    if (t) {
      await this.page.waitForTimeout(5000);
      await this.navigateToJobErrorDashboard(jobName);
    }
  }


  public async navigateToEm2Flow(flowID, flowType = "flowBuilder") {
    var intURL =
      process.env["BASE_URL"] +
      "/integrations/" +
      process.env["INTEGRATION_ID"] +
      "/";
    var flowURL = intURL + flowType + "/" + flowID;
    await this.navigateTo(flowURL);
    await this.delay(5000);
  }

  public async waitForErrorMsgToAppear() {
    await this.click(this.selectors.FlowBuilderPagePO.FITVIEW);
    var time = 0,
      flag = true,
      maxWait = 400;
    do {
      time += 2;
      await this.delay(100);
      process.stdout.write(". ");
      var headerStatus = await this.page.$$(
        this.selectors.FlowBuilderPagePO.HEADER_STATUS
      );
      for (let index = 0; index < headerStatus.length - 2; index++) {
        const errorStatus = await headerStatus[index];
        await errorStatus.waitForElementState("enabled");
        const headerMsg = await headerStatus[index].textContent();
        if (headerMsg.indexOf("error") > -1) {
          console.log("Found Error");
          flag = false;
          break;
        }
      }
    } while (flag && time < maxWait);
  }

  public async waitTillColumnsAppear(num: number) {
    var time = 0,
      flag = true,
      maxWait = 400;
    do {
      time += 2;
      await this.delay(100);
      process.stdout.write(". ");
      if (time % 100 == 0) {
        await this.click(this.selectors.FlowBuilderPagePO.REFRESH);
      }
      var columns = await this.page.$$(this.selectors.FlowBuilderPagePO.COLUMNS);
      if (columns && columns.length == num) {
        flag = false;
        break;
      }
    } while (flag && time < maxWait);
  }

  public async changeErrorDrawerView() {
    try {
      var toggleView = this.selectors.FlowBuilderPagePO.TOGGLE_VIEW;
      if (await this.isVisible(toggleView)) {
        await this.click(toggleView);
        var drawerView = this.selectors.FlowBuilderPagePO.LIST_VIEW_ERRORS;
        await this.click(drawerView);
        await this.delay(2000);
      }
    } catch (e) {
      console.log("Toggle not possible here");
    }
  }

  public async openErrorDetailsSection() {
    await this.changeErrorDrawerView();
    await this.delay(2000);
    await this.openErrorDetailsSection();
  }

  public async clickButtonAtTopOfArray(locator: string) {
    var elements = await this.page.$$(locator);
    let index = elements.length - 1;
    await elements[index].click();
    await this.delay(400);
  }

  public async closeErrorModalPopup() {
    var drawers = await this.page.$$(
      this.selectors.FlowBuilderPagePO.CLOSE_RIGHT_DRAWER
    );
    var closeIcon = await drawers[drawers.length - 1];
    await closeIcon.click();
    await this.delay(500);
  }


  public async navigateToFlowBuilderInEM2(flowID) {
    await this.navigateToEm2Flow(flowID);
    await this.waitForErrorMsgToAppear();
  }








}
