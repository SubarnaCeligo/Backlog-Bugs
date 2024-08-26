import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T37690 from "@testData/onprem/T37690.json";
import T37692 from "@testData/onprem/T37692.json";
import T37691 from "@testData/onprem/T37691.json";

test.describe("T37690_T37691_T37692 Verify old UI for existing PostgreSQ, MsSQL, MySQL import with on-premise connection", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-46210 @Env-QA @Priority-P2 @Zephyr-IO-T37690 T37690_Verify old UI for existing MySQL import with on-premise connection", async ({ io, page }) => {
    await io.flowBuilder.addStep("*** Create an old mysql import ***");
    const id = await io.createResourceFromAPI(T37690, "IMPORT");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Open the old import ***");
    await io.flowBuilder.navigateTo(`/imports/edit/imports/${id}?app=mysql`);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Verify old ui is displayed ***");
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

    await io.flowBuilder.addStep("*** Delete the old import ***");
    await io.api.deleteCall(`v1/imports/${id}`);
  });

  test("@Epic-IO-46210 @Env-QA @Priority-P2 @Zephyr-IO-T37691 T37691_Verify old UI for existing MsSQL import with on-premise connection", async ({ io, page }) => {
    await io.flowBuilder.addStep("*** Create an old mssql import ***");
    const id = await io.createResourceFromAPI(T37691, "IMPORT");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Open the old import ***");
    await io.flowBuilder.navigateTo(`/imports/edit/imports/${id}?app=mssql`);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Verify old ui is displayed ***");
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

    await io.flowBuilder.addStep("*** Delete the old import ***");
    await io.api.deleteCall(`v1/imports/${id}`);
  });

  test("@Epic-IO-46210 @Env-QA @Priority-P2 @Zephyr-IO-T37692 T37692_Verify old UI for existing PostgreSQL import with on-premise connection", async ({ io, page }) => {
    await io.flowBuilder.addStep("*** Create an old postgresql import ***");
    const id = await io.createResourceFromAPI(T37692, "IMPORT");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Open the old import ***");
    await io.flowBuilder.navigateTo(`/imports/edit/imports/${id}?app=postgresql`);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Verify old ui is displayed ***");
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

    await io.flowBuilder.addStep("*** Delete the old import ***");
    await io.api.deleteCall(`v1/imports/${id}`);
  });
});
