import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T37695 from "@testData/onprem/T37695.json";

test.describe("T37695_Verify cloning of flow with old import form cloud connection", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-46210 @Env-QA @Env-PLATFORMFIVE @Priority-P2 @Zephyr-IO-T37695 T37695_Verify cloning of flow with old import form cloud connection", async ({ io, page }) => {
    T37695.name = `${T37695.name}-${Math.random().toString(36).slice(2, 7)}`;
    await io.flowBuilder.addStep("*** Create a new flow ***");
    const flowid = await io.createResourceFromAPI(T37695, "FLOWS");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Clone the flow ***");
    await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONEFLOW);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.click(
      selectors.integrationPagePO.SELECT_DESTINATION_INTEGRATION
    );
    await io.flowBuilder.clickByText("Automation_flows");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Configure connections ***");
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("POSTGRESQL CONNECTION");
    await io.flowBuilder.selectTextfromDropDown(page, connId);
    await io.flowBuilder.clickByText("Done");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    connMap = await io.api.loadConnections();
    var connId = connMap.get("MYSQL CONNECTION");
    await io.flowBuilder.selectTextfromDropDown(page, connId);
    await io.flowBuilder.clickByText("Done");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    connMap = await io.api.loadConnections();
    var connId = connMap.get("MSSQL CONNECTION");
    await io.flowBuilder.selectTextfromDropDown(page, connId);
    await io.flowBuilder.clickByText("Done");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    connMap = await io.api.loadConnections();
    var connId = connMap.get("FTP CONNECTION");
    await io.flowBuilder.selectTextfromDropDown(page, connId);
    await io.flowBuilder.clickByText("Done");
    for (let i = 0; i < 3; i++) {
      await io.flowBuilder.loadingTime();
    }

    await io.flowBuilder.addStep("*** Open the cloned flow ***");
    await io.flowBuilder.clickByText(`Clone - ${T37695.name}`);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Zoom out ***");
    await io.flowBuilder.click('[aria-label="Zoom out"]');
    await io.flowBuilder.click('[aria-label="Zoom out"]');
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Open PostgreSQL import ***");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep(
      "*** Verify all the elements are present in import ***"
    );
    await io.assert.verifyElementDisplayedByText(
      "Query type *",
      "Query type is not present"
    );

    let isOldUI = false;
    try {
      await io.assert.verifyElementDisplayedByText(
        "Insert",
        "Insert is not present in Old UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Update",
        "Update is not present in Old UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Insert or Update",
        "Insert or Update is not present in Old UI"
      );

      isOldUI = true;
    } catch (e) {
      expect(isOldUI).toBeTruthy();
    }
    expect(isOldUI).toBeTruthy();

    await io.flowBuilder.addStep("*** Close PostgreSQL Import ***");
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Open MSSQL import ***");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 1);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep(
      "*** Verify all the elements are present in import ***"
    );
    await io.assert.verifyElementDisplayedByText(
      "Query type *",
      "Query type is not present"
    );

    isOldUI = false;
    try {
      await io.assert.verifyElementDisplayedByText(
        "Insert",
        "Insert is not present in Old UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Update",
        "Update is not present in Old UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Insert or Update",
        "Insert or Update is not present in Old UI"
      );

      isOldUI = true;
    } catch (e) {
      expect(isOldUI).toBeTruthy();
    }
    expect(isOldUI).toBeTruthy();

    await io.flowBuilder.addStep("*** Close MSSQL Import ***");
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Open MySQL import ***");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 2);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep(
      "*** Verify all the elements are present in import ***"
    );
    await io.assert.verifyElementDisplayedByText(
      "Query type *",
      "Query type is not present"
    );

    isOldUI = false;
    try {
      await io.assert.verifyElementDisplayedByText(
        "Insert",
        "Insert is not present in Old UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Update",
        "Update is not present in Old UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Insert or Update",
        "Insert or Update is not present in Old UI"
      );

      isOldUI = true;
    } catch (e) {
      expect(isOldUI).toBeTruthy();
    }
    expect(isOldUI).toBeTruthy();

    await io.flowBuilder.addStep("*** Close MySQL Import ***");
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.loadingTime();
  });
});
