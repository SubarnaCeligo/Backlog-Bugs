import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Connections/Create/Create_Connection_HTTP_Basic_JSON_Zendesk.json";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C68894", () => {
    test("C68894", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
        await io.connectionPage.clickByText("Create connection")
        await io.connectionPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.importsPage.fill(selectors.basePagePO.NAME, "HTTP CONNECTION PLEASE DELETE");
        await io.importsPage.fill(selectors.connectionsPagePO.BASE_URI_INPUT, TC.importJSON.http.baseURI);
        await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
        await io.connectionPage.clickByText("Basic");
        await io.importsPage.fill(selectors.connectionsPagePO.USERNAME, process.env["HTTP_ZENDESK_USER"]);
        await io.importsPage.fill(selectors.connectionsPagePO.PASSWORD, decrypt(process.env["HTTP_ZENDESK_PASSWORD"]));
        await io.connectionPage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
        await io.connectionPage.click(selectors.connectionsPagePO.PING_METHOD);
        await io.connectionPage.selectTextfromDropDown(page, "GET");
        await io.connectionPage.fill(selectors.connectionsPagePO.RELATIVEURI, 'users');
        await io.connectionPage.click(selectors.importPagePO.ADVANCED);
        await io.connectionPage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
        await io.connectionPage.clickByText("PFX");
        const fileChooserPromise = page.waitForEvent("filechooser");
        await io.homePage.clickByText("Choose file");
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles("testData/inputData/Connections/AES_certificate.pfx");
        await io.connectionPage.fill(selectors.connectionsPagePO.SSL_PASSPHRASE, 'celigo123');
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.connectionPage.clickByText("HTTP CONNECTION PLEASE DELETE");
        await io.importsPage.fill(selectors.connectionsPagePO.PASSWORD, decrypt(process.env["HTTP_ZENDESK_PASSWORD"]));
        await io.connectionPage.click(selectors.importPagePO.ADVANCED);
        await io.connectionPage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
        await io.connectionPage.clickByText("PEM");
        const fileChooserPromise1 = page.waitForEvent("filechooser");
        await io.connectionPage.click(selectors.connectionsPagePO.SSL_CLIENT_KEY);
        const fileChooser1 = await fileChooserPromise1;
        await fileChooser1.setFiles("testData/inputData/Connections/AES_private.key");
        const fileChooserPromise2 = page.waitForEvent("filechooser");
        await io.connectionPage.click(selectors.connectionsPagePO.SSL_CLIENT_CERT);
        const fileChooser2 = await fileChooserPromise2;
        await fileChooser2.setFiles("testData/inputData/Connections/AES_certificate.crt");
        await io.connectionPage.fill(selectors.connectionsPagePO.SSL_PASSPHRASE, 'celigo123');
        await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION);
        await io.assert.verifyElementDisplayedByText(
            "Your connection is working great! Nice Job!",
            "Connection creation error"
        );
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.clickButtonInTable(selectors.flowBuilderPagePO.JOB_NAME, selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, "HTTP CONNECTION PLEASE DELETE");
        await io.connectionPage.click(selectors.connectionsPagePO.DELETE_CONNECTION);
        await io.connectionPage.click(selectors.basePagePO.DELETE);
    });
    test("C68896", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
        await io.connectionPage.clickByText("Create connection")
        await io.connectionPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.importsPage.fill(selectors.basePagePO.NAME, "HTTP CONNECTION PLEASE DELETE");
        await io.importsPage.fill(selectors.connectionsPagePO.BASE_URI_INPUT, TC.importJSON.http.baseURI);
        await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
        await io.connectionPage.clickByText("Basic");
        await io.importsPage.fill(selectors.connectionsPagePO.USERNAME, process.env["HTTP_ZENDESK_USER"]);
        await io.importsPage.fill(selectors.connectionsPagePO.PASSWORD, decrypt(process.env["HTTP_ZENDESK_PASSWORD"]));
        await io.connectionPage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
        await io.connectionPage.click(selectors.connectionsPagePO.PING_METHOD);
        await io.connectionPage.selectTextfromDropDown(page, "GET");
        await io.connectionPage.fill(selectors.connectionsPagePO.RELATIVEURI, 'users');
        await io.connectionPage.click(selectors.importPagePO.ADVANCED);
        await io.connectionPage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
        await io.connectionPage.clickByText("PEM");
        const fileChooserPromise = page.waitForEvent("filechooser");
        await io.connectionPage.click(selectors.connectionsPagePO.SSL_CLIENT_KEY);
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles("testData/inputData/Connections/AES_private.key");
        const fileChooserPromise1 = page.waitForEvent("filechooser");
        await io.connectionPage.click(selectors.connectionsPagePO.SSL_CLIENT_CERT);
        const fileChooser1 = await fileChooserPromise1;
        await fileChooser1.setFiles("testData/inputData/Connections/AES_certificate.crt");
        await io.connectionPage.fill(selectors.connectionsPagePO.SSL_PASSPHRASE, 'celigo123');
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.connectionPage.clickByText("HTTP CONNECTION PLEASE DELETE");
        await io.importsPage.fill(selectors.connectionsPagePO.PASSWORD, decrypt(process.env["HTTP_ZENDESK_PASSWORD"]));
        await io.connectionPage.click(selectors.importPagePO.ADVANCED);
        await io.connectionPage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
        await io.connectionPage.clickByText("PFX");
        const fileChooserPromise2 = page.waitForEvent("filechooser");
        await io.homePage.clickByText("Choose file");
        const fileChooser2 = await fileChooserPromise2;
        await fileChooser2.setFiles("testData/inputData/Connections/AES_certificate.pfx");
        await io.connectionPage.fill(selectors.connectionsPagePO.SSL_PASSPHRASE, 'celigo123');
        await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION);
        await io.assert.verifyElementDisplayedByText(
            "Your connection is working great! Nice Job!",
            "Connection creation error"
        );
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.clickButtonInTable(selectors.flowBuilderPagePO.JOB_NAME, selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, "HTTP CONNECTION PLEASE DELETE");
        await io.connectionPage.click(selectors.connectionsPagePO.DELETE_CONNECTION);
        await io.connectionPage.click(selectors.basePagePO.DELETE);
    });
});
