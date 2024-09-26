import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T31328 from "@testData/Connections/T31328.json";

test.describe("T31327 Verify if the SSL certificate and SSL client key by providing different formats when SSL certificate type is PEM format", () => {
  test("@Env-All @Zephyr-IO-T31327 @Priority-P2 T31327 Verify if the SSL certificate and SSL client key by providing JSON format when SSL certificate type is PEM format UI_Backlog", async ({ io, page }) => {
    await io.connectionPage.addStep("*** Creating and saving new connection ***");
    T31328.name = "T31327.1";
    let connectionId = await io.api.postCall(`v1/connections`, T31328);
    await io.connectionPage.loadingTime();
    await io.connectionPage.addStep("*** Editing the created connection ***");
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.click(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    // await io.connectionPage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.connectionPage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, connectionId.name);
    await io.connectionPage.clickByTextByIndex(connectionId.name, 0);
    await io.connectionPage.addStep("*** Selecting PEM format ***");
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.SSL_PEM);
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_PEM);

    await io.connectionPage.addStep("*** Uploading json files for ssl certificate and key ***");
    let certFile = await page.$(`${selectors.connectionsPagePO.SSL_CLIENT_CERT_CONTAINER} ${selectors.basePagePO.UPLOAD_FILE}`);
    let keyFile = await page.$(`${selectors.connectionsPagePO.SSL_CLIENT_KEY_CONTAINER} ${selectors.basePagePO.UPLOAD_FILE}`);
    await certFile.setInputFiles("testData/inputData/Connections/T31327.json");
    await io.connectionPage.loadingTime();

    await keyFile.setInputFiles("testData/inputData/Connections/T31327.json");
    await io.connectionPage.loadingTime();

    await io.connectionPage.fill(selectors.connectionsPagePO.PASSWORD, T31328.http.auth.basic.password);

    await io.connectionPage.addStep("*** Clicking on save ***");
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);

    await io.connectionPage.addStep("*** Validating that connection is saved by checkking if the save button is disbled ***");
    let SAVE_BUTTON = page.locator(selectors.basePagePO.SAVE);
    expect(SAVE_BUTTON).toHaveAttribute("disabled");
  });

  test("@Env-All @Zephyr-IO-T31327 @Priority-P2 T31327 Verify if the SSL certificate and SSL client key by providing XML Format when SSL certificate type is PEM format UI_Backlog", async ({ io, page }) => {
    await io.connectionPage.addStep("*** Creating and saving new connection ***");
    T31328.name = "T31327.2";
    let connectionId = await io.api.postCall(`v1/connections`, T31328);
    await io.connectionPage.addStep("*** Editing the created connection ***");
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.click(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    // await io.connectionPage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.connectionPage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, connectionId.name);
    await io.connectionPage.clickByTextByIndex(connectionId.name, 0);

    await io.connectionPage.addStep("*** Selecting PEM format ***");
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.SSL_PEM);
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_PEM);

    await io.connectionPage.addStep("*** Uploading xml files for ssl certificate and key ***");
    let certFile = await page.$(`${selectors.connectionsPagePO.SSL_CLIENT_CERT_CONTAINER} ${selectors.basePagePO.UPLOAD_FILE}`);
    let keyFile = await page.$(`${selectors.connectionsPagePO.SSL_CLIENT_KEY_CONTAINER} ${selectors.basePagePO.UPLOAD_FILE}`);
    await certFile.setInputFiles("testData/inputData/Connections/T31327.xml");
    await io.connectionPage.loadingTime();

    await keyFile.setInputFiles("testData/inputData/Connections/T31327.xml");
    await io.connectionPage.loadingTime();

    await io.connectionPage.fill(selectors.connectionsPagePO.PASSWORD, T31328.http.auth.basic.password);

    await io.connectionPage.addStep("Clicking on save");
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);

    await io.connectionPage.addStep("*** Validating that connection is saved by checkking if the save button is disbled ***");
    let SAVE_BUTTON = page.locator(selectors.basePagePO.SAVE);
    expect(SAVE_BUTTON).toHaveAttribute("disabled");

    await io.connections.deleteConnection(T31328.name);
  });

  test("@Env-All @Zephyr-IO-T31327 @Priority-P2 T31327 Verify if the SSL certificate and SSL client key by providing CSV Format when SSL certificate type is PEM format UI_Backlog", async ({ io, page }) => {
    await io.connectionPage.addStep("*** Creating and saving new connection ***");
    T31328.name = "T31327.3";
    let connectionId = await io.api.postCall(`v1/connections`, T31328);
    await io.connectionPage.addStep("*** Editing the created connection ***");
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.click(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    // await io.connectionPage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.connectionPage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, connectionId.name);
    await io.connectionPage.clickByTextByIndex(connectionId.name, 0);

    await io.connectionPage.addStep("*** Selecting PEM format ***");
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.SSL_PEM);
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_PEM);

    await io.connectionPage.addStep("*** Uploading csv files for ssl certificate and key ***");
    let certFile = await page.$(`${selectors.connectionsPagePO.SSL_CLIENT_CERT_CONTAINER} ${selectors.basePagePO.UPLOAD_FILE}`);
    let keyFile = await page.$(`${selectors.connectionsPagePO.SSL_CLIENT_KEY_CONTAINER} ${selectors.basePagePO.UPLOAD_FILE}`);
    await certFile.setInputFiles("testData/inputData/Connections/T31327.csv");
    await io.connectionPage.loadingTime();

    await keyFile.setInputFiles("testData/inputData/Connections/T31327.csv");
    await io.connectionPage.loadingTime();

    await io.connectionPage.fill(selectors.connectionsPagePO.PASSWORD, T31328.http.auth.basic.password);

    await io.connectionPage.addStep("Clicking on save");
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);

    await io.connectionPage.addStep("*** Validating that connection is saved by checkking if the save button is disbled ***");
    let SAVE_BUTTON = page.locator(selectors.basePagePO.SAVE);
    expect(SAVE_BUTTON).toHaveAttribute("disabled");

    await io.connections.deleteConnection(T31328.name);
  });

  test("@Env-All @Zephyr-IO-T31327 @Priority-P2 T31327 Verify if the SSL certificate and SSL client key by providing TXT Format when SSL certificate type is PEM format UI_Backlog", async ({ io, page }) => {
    await io.connectionPage.addStep("*** Creating and saving new connection ***");
    T31328.name = "T31327.4";
    let connectionId = await io.api.postCall(`v1/connections`, T31328);
    await io.connectionPage.addStep("*** Editing the created connection ***");
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.click(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    // await io.connectionPage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.connectionPage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, connectionId.name);
    await io.connectionPage.clickByTextByIndex(connectionId.name, 0);

    await io.connectionPage.addStep("*** Selecting PEM format ***");
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.SSL_PEM);
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_PEM);

    await io.connectionPage.addStep("*** Uploading txt files for ssl certificate and key ***");
    let certFile = await page.$(`${selectors.connectionsPagePO.SSL_CLIENT_CERT_CONTAINER} ${selectors.basePagePO.UPLOAD_FILE}`);
    let keyFile = await page.$(`${selectors.connectionsPagePO.SSL_CLIENT_KEY_CONTAINER} ${selectors.basePagePO.UPLOAD_FILE}`);
    await certFile.setInputFiles("testData/inputData/Connections/T31327.txt");
    await io.connectionPage.loadingTime();

    await keyFile.setInputFiles("testData/inputData/Connections/T31327.txt");
    await io.connectionPage.loadingTime();

    await io.connectionPage.fill(selectors.connectionsPagePO.PASSWORD, T31328.http.auth.basic.password);

    await io.connectionPage.addStep("*** Clicking on save ***");
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);

    await io.connectionPage.addStep("*** Validating that connection is saved by checking if the save button is disbled ***");
    let SAVE_BUTTON = page.locator(selectors.basePagePO.SAVE);
    expect(SAVE_BUTTON).toHaveAttribute("disabled");

    await io.connections.deleteConnection(T31328.name);
  });

  test("@Env-All @Zephyr-IO-T31327 @Priority-P2 T31327 Verify if the SSL certificate and SSL client key by providing Cert and key Format when SSL certificate type is PEM format UI_Backlog", async ({ io, page }) => {
    await io.connectionPage.addStep("*** Creating and saving new connection ***");
    T31328.name = "T31327.5";
    let connectionId = await io.api.postCall(`v1/connections`, T31328);
    await io.connectionPage.addStep("*** Editing the created connection ***");
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.click(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    // await io.connectionPage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.connectionPage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, connectionId.name);
    await io.connectionPage.clickByTextByIndex(connectionId.name, 0);

    await io.connectionPage.addStep("*** Selecting PEM format ***");
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.SSL_PEM);
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_PEM);  

    await io.connectionPage.addStep("*** Uploading cert and key files for ssl certificate and key ***");
    let certFile = await page.$(`${selectors.connectionsPagePO.SSL_CLIENT_CERT_CONTAINER} ${selectors.basePagePO.UPLOAD_FILE}`);
    let keyFile = await page.$(`${selectors.connectionsPagePO.SSL_CLIENT_KEY_CONTAINER} ${selectors.basePagePO.UPLOAD_FILE}`);
    await certFile.setInputFiles("testData/inputData/Connections/T31327.cert");
    await io.connectionPage.loadingTime();

    await keyFile.setInputFiles("testData/inputData/Connections/T31327.key");
    await io.connectionPage.loadingTime();

    await io.connectionPage.fill(selectors.connectionsPagePO.PASSWORD, T31328.http.auth.basic.password);

    await io.connectionPage.addStep("Clicking on save");
    await io.connectionPage.click(selectors.basePagePO.SAVE);

    await io.connectionPage.addStep("*** Validating that connection is saved by checkking if the save button is disbled ***");
    let SAVE_BUTTON = page.locator(selectors.basePagePO.SAVE);
    expect(SAVE_BUTTON).toHaveAttribute("disabled");

    await io.connections.deleteConnection(T31328.name);
  });
});
