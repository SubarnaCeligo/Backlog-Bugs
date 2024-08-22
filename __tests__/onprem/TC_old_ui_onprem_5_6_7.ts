import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import old_mysql from "@testData/onprem/old_mysql.json";
import old_postgresql from "@testData/onprem/old_postgresql.json";
import old_mssql from "@testData/onprem/old_mssql.json";

test.describe("new_ui_onprem", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("mysql", async ({ io, page }) => {
    await io.flowBuilder.addStep("*** Create an old mysql import ***");
    const id = await io.createResourceFromAPI(old_mysql, "IMPORT");
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

  test("mssql", async ({ io, page }) => {
    await io.flowBuilder.addStep("*** Create an old mssql import ***");
    const id = await io.createResourceFromAPI(old_mssql, "IMPORT");
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

  test("postgresql", async ({ io, page }) => {
    await io.flowBuilder.addStep("*** Create an old postgresql import ***");
    const id = await io.createResourceFromAPI(old_postgresql, "IMPORT");
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
