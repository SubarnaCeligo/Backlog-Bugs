
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C22324.json";

test.describe("TC_C22324", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C22324", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    var flowId = flows.get(FTP.name)["flowId"];
await test.step(
      "Created Flow " +
        flows.get(FTP.name)["flowName"] +
        " With ID " +
        flows.get(FTP.name)["flowId"]
    ,()=>{});
    //Checking job status
    await io.api.checkJobStatusFromAPI(
      FTP.name,
      flows.get(FTP.name)["flowId"],
      [1, 0, 1]
    );
    await io.homePage.isPageReady();
    const url = await io.homePage.getCurrentUrl();
    if (process.env["NODE_ENV"] == "qa") {
      expect(url).toBe(
        "https://qa.staging.integrator.io/integrations/6317333395653f0f15147f47/flows"
      );
      expect(url).toBeTruthy();
      await io.em2.getEm2ErrorTable( flowId);
      await test.step("Click on action drop down",()=>{});
      await io.homePage.click(
        selectors.integrationPagePO.ERRORDETAILSPAGE
      );
      // const resulttext = page.$(
      //   selectors.flowBuilderPagePO.RESPONSE_CONTENT
      // ).getText();

      const resulttext = await io.homePage.getText(selectors.flowBuilderPagePO.RESPONSE_CONTENT)
     
      expect(resulttext).toContain("Message:Forbidden");
      expect(resulttext).toContain("Code: 403");
      expect(resulttext).toContain(" Source: Zendesk Support");
      expect(resulttext).toContain("Classification : Connection");
      expect(resulttext).not.toEqual("trace key value");
await test.step(
        "Verified in error details the trace key value should not exist"
, async ()=>{});
      await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    } else if (process.env["NODE_ENV"] == "qaprod") {
      expect(url).toBe(
        "https://qaprod.staging.integrator.io/integrations/6317333395653f0f15147f47/flows"
      );
      expect(url).toBeTruthy();
      await io.em2.getEm2ErrorTable(  flowId);
      await test.step("Click on action drop down",()=>{});
      await io.homePage.click(
        selectors.integrationPagePO.ERRORDETAILSPAGE
      );
      // const resulttext = page.$(
      //   selectors.flowBuilderPagePO.RESPONSE_CONTENT
      // ).getText();

      const resulttext = await io.homePage.getText(selectors.flowBuilderPagePO.RESPONSE_CONTENT)
     
      expect(resulttext).toContain("Message:Forbidden");
      expect(resulttext).toContain("Code: 403");
      expect(resulttext).toContain(" Source: Zendesk Support");
      expect(resulttext).toContain("Classification : Connection");
      expect(resulttext).not.toEqual("trace key value");
await test.step(
        "Verified in error details the trace key value should not exist"
, async ()=>{});
      await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    } else if (process.env["NODE_ENV"] == "staging") {
      expect(url).toBe(
        "https://staging.integrator.io/integrations/6317518c5bca603be6bc9af0/flows"
      );
      expect(url).toBeTruthy();
      await io.homePage.isPageReady();
      await io.em2.getEm2ErrorTable(flowId);
      await test.step("Click on action drop down",()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.integrationPagePO.OPENACTIONSMENU,
        2
      );
      await test.step("Open Error Details",()=>{});
      await io.homePage.click(
        selectors.flowBuilderPagePO.VIEWERROR
      );
      // const resulttext1 = page.$(
      //   selectors.flowBuilderPagePO.RESPONSE_CONTENT
      // ).getText();

      const resulttext1 = await io.homePage.getText(selectors.flowBuilderPagePO.RESPONSE_CONTENT)

      expect(resulttext1).toContain("Message:Forbidden");
      expect(resulttext1).toContain("Code: 403");
      expect(resulttext1).toContain(" Source: Zendesk Support");
      expect(resulttext1).toContain("Classification : Connection");
      expect(resulttext1).not.toEqual("trace key value");
await test.step(
        "Verified in error details the trace key value should not exist"
, async ()=>{});
      await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE_RIGHT_DRAWER, 1);
      await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    } else if (process.env["NODE_ENV"] == "platformone") {
      expect(url).toBe(
        "https://platform1.dev.integrator.io/integrations/647727df11d7f6d908528628/flows"
      );
      expect(url).toBeTruthy();
      await io.homePage.isPageReady();
      await io.em2.getEm2ErrorTable( flowId);
      await test.step("Click on action drop down",()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.integrationPagePO.OPENACTIONSMENU,
        2
      );
      await test.step("Open Error Details",()=>{});
      await io.homePage.click(
        selectors.flowBuilderPagePO.VIEWERROR
      );
      // const resulttext1 = page.$(
      //   selectors.flowBuilderPagePO.RESPONSE_CONTENT
      // ).getText();

      const resulttext1 = await io.homePage.getText(selectors.flowBuilderPagePO.RESPONSE_CONTENT)

      expect(resulttext1).toContain("Message:Forbidden");
      expect(resulttext1).toContain("Code: 403");
      expect(resulttext1).toContain(" Source: Zendesk Support");
      expect(resulttext1).toContain("Classification : Connection");
      expect(resulttext1).not.toEqual("trace key value");
await test.step(
        "Verified in error details the trace key value should not exist"
, async ()=>{});
      await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE_RIGHT_DRAWER, 1);
      await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    }
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.DELETE_FLOW
    );
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
