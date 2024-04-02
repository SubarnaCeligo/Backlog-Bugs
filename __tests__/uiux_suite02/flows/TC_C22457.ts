import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C22457 Should be able to click on all the types of resources on the left side such as connections,exports,imports.", () => {
  test("Exports check", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.goToMenu("Resources");
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.EXPORTS,
      "Unable to locate Exports"
    );
    await io.homePage.click(selectors.basePagePO.EXPORTS);
    await test.step("Validating Exports Title ", async () => {
      const pageTitle = page.getByRole("heading", {
        name: "Exports",
        exact: true
      });
      await expect(pageTitle).toHaveText("Exports");
    });
  });

  test("Imports check", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.goToMenu("Resources");
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.EXPORTS,
      "Unable to locate Imports"
    );
    await io.homePage.click(selectors.basePagePO.IMPORTS);
    await test.step("Validating Imports Title ", async () => {
      const pageTitle = page.getByRole("heading", {
        name: "Imports",
        exact: true
      });
      await expect(pageTitle).toHaveText("Imports");
    });
  });

  test("Connections check", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.goToMenu("Resources");
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.EXPORTS,
      "Unable to locate Connections"
    );
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await test.step("Validating Connections Title ", async () => {
      const pageTitle = page.getByRole("heading", {
        name: "Connections",
        exact: true
      });
      await expect(pageTitle).toHaveText("Connections");
    });
  });

  test("Agents check", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.goToMenu("Resources");
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.EXPORTS,
      "Unable to locate Agents"
    );
    await io.homePage.click(selectors.basePagePO.AGENTS);
    await test.step("Validating Agents Title ", async () => {
      const pageTitle = page.getByRole("heading", {
        name: "Agents",
        exact: true
      });
      await expect(pageTitle).toHaveText("Agents");
    });
  });

  test("iClients check", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.goToMenu("Resources");
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.EXPORTS,
      "Unable to locate iClients"
    );
    await io.homePage.click(selectors.basePagePO.ICLIENTS);
    await test.step("Validating Agents Title ", async () => {
      const pageTitle = page.getByRole("heading", {
        name: "iClients",
        exact: true
      });
      await expect(pageTitle).toHaveText("iClients");
    });
  });

  test("API Tokens check", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.goToMenu("Resources");
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.EXPORTS,
      "Unable to locate API Tokens"
    );
    await io.homePage.click(selectors.basePagePO.API_TOKENS);
    await test.step("Validating API Tokens Title ", async () => {
      const pageTitle = page.getByRole("heading", {
        name: "API tokens",
        exact: true
      });
      await expect(pageTitle).toHaveText("API tokens");
    });
  });

  test("Recycle bin check", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.goToMenu("Resources");
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.EXPORTS,
      "Unable to locate Recycle bin"
    );
    await io.homePage.click(selectors.basePagePO.RECYCLE_BIN);
    await test.step("Validating Recycle bin Title ", async () => {
      const pageTitle = page.getByRole("heading", {
        name: "Recycle bin",
        exact: true
      });
      await expect(pageTitle).toHaveText("Recycle bin");
    });
  });
});
