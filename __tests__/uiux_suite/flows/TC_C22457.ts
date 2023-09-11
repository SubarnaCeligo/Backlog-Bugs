import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C22457 Should be able to click on all the types of resources on the left side such as connections,exports,imports.", () => {
    test("Exports check", async ({io,page}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        let isExportsVisible = await io.homePage.isVisible(selectors.basePagePO.EXPORTS);
        if(!isExportsVisible) await io.homePage.clickByText('Resources');
        isExportsVisible = await io.homePage.isVisible(selectors.basePagePO.EXPORTS); 
        expect(isExportsVisible).toBe(true);
        await io.homePage.click(selectors.basePagePO.EXPORTS);
        const pageTitle = page.getByRole('heading', {name : 'Exports', exact: true});
        await expect(pageTitle).toHaveText('Exports');
    });

    test("Imports check", async ({io,page}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        let isImportsVisible = await io.homePage.isVisible(selectors.basePagePO.IMPORTS);
        if(!isImportsVisible) await io.homePage.clickByText('Resources');
        isImportsVisible = await io.homePage.isVisible(selectors.basePagePO.IMPORTS);
        expect(isImportsVisible).toBe(true);
        await io.homePage.click(selectors.basePagePO.IMPORTS);
        const pageTitle = page.getByRole('heading', {name : 'Imports', exact: true});
        await expect(pageTitle).toHaveText('Imports');
    });

    test("Connections check", async ({io,page}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        let isConnectionsVisible = await io.homePage.isVisible(selectors.basePagePO.CONNECTIONS);
        if(!isConnectionsVisible) await io.homePage.clickByText('Resources');
        isConnectionsVisible = await io.homePage.isVisible(selectors.basePagePO.CONNECTIONS);
        expect(isConnectionsVisible).toBe(true);
        await io.homePage.click(selectors.basePagePO.CONNECTIONS);
        const pageTitle = page.getByRole('heading', {name : 'Connections', exact: true});
        await expect(pageTitle).toHaveText('Connections');
    });

    test("Agents check", async ({io,page}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        let isAgentsVisible = await io.homePage.isVisible(selectors.basePagePO.AGENTS);
        if(!isAgentsVisible) await io.homePage.clickByText('Resources');
        isAgentsVisible = await io.homePage.isVisible(selectors.basePagePO.AGENTS);
        expect(isAgentsVisible).toBe(true);
        await io.homePage.click(selectors.basePagePO.AGENTS);
        const pageTitle = page.getByRole('heading', {name : 'Agents', exact: true});
        await expect(pageTitle).toHaveText('Agents');
    });

    test("iClients check", async ({io,page}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        let isiClientsVisible = await io.homePage.isVisible(selectors.basePagePO.ICLIENTS);
        if(!isiClientsVisible)await io.homePage.clickByText('Resources');
        isiClientsVisible = await io.homePage.isVisible(selectors.basePagePO.ICLIENTS);
        expect(isiClientsVisible).toBe(true);
        await io.homePage.click(selectors.basePagePO.ICLIENTS);
        const pageTitle = page.getByRole('heading', {name : 'iClients', exact: true});
        await expect(pageTitle).toHaveText('iClients');
    });

    test("API Tokens check", async ({io,page}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        let isAPITokenVisible = await io.homePage.isVisible(selectors.basePagePO.API_TOKENS);
        if(!isAPITokenVisible)await io.homePage.clickByText('Resources');
        isAPITokenVisible = await io.homePage.isVisible(selectors.basePagePO.API_TOKENS);
        expect(isAPITokenVisible).toBe(true);
        await io.homePage.click(selectors.basePagePO.API_TOKENS)
        const pageTitle = page.getByRole('heading', {name : 'API tokens', exact: true});
        await expect(pageTitle).toHaveText('API tokens');
    });

    test("Recycle bin check", async ({io,page}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        let isRecycleBinVisible = await io.homePage.isVisible(selectors.basePagePO.RECYCLE_BIN);
        if(!isRecycleBinVisible)await io.homePage.clickByText('Resources');
        isRecycleBinVisible = await io.homePage.isVisible(selectors.basePagePO.RECYCLE_BIN);
        expect(isRecycleBinVisible).toBe(true);
        await io.homePage.click(selectors.basePagePO.RECYCLE_BIN)
        const pageTitle = page.getByRole('heading', {name : 'Recycle bin', exact: true});
        await expect(pageTitle).toHaveText('Recycle bin');
    });
  });