import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("IO-58006 scenarios", () => {
  test("@Env-QA @Env-IAQA C58006 Verify if toggle persists when user open iclient from Connections", async ({
    io,
    page,
    context
  }) => {
    const randomString = "http" + (Math.random() + 1).toString(36).substring(7);
    await io.flowBuilder.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    // connection page validation
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.THREEPL_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.NAME);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, randomString);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
    const edit = await page.$$(selectors.basePagePO.ADD_NEW_RESOURCE);
    await edit[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.NAME);
    const name = await page.$$(selectors.importPagePO.NAME);
    await name[1].fill(randomString);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTS_ID);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTS_ID,
      decrypt("MjExOWY2MWItMzgyNS00NTM0LTliMmUtOWYxZTBhNjNjYWFj")
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE);
    const save = await page.$$(selectors.basePagePO.SAVE);
    await save[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTS_ID);
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.CLIENTS_ID)).isVisible(),
      "Saved in Simple View Mode"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.EDIT_RESOURCE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EDIT_RESOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTS_ID);
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.CLIENTS_ID)).isVisible(),
      "Saved in Simple View Mode"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HTTP_CNNECTOR,
      1
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    const save1 = await page.$$(selectors.basePagePO.SAVE);
    await save1[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.EDIT_RESOURCE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EDIT_RESOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CLOSE);
    const cancel = await page.$$(selectors.basePagePO.CLOSE);
    await cancel[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.USERNAM3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.USERNAM3PL,
      "b779b82f-f5e5-4d59-a2c9-ea2c5eb8eec3"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ENVIRONMENT_WDIO);
    await io.flowBuilder.click(selectors.connectionsPagePO.ENVIRONMENT_WDIO);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ENV3PL);
    await io.flowBuilder.click(selectors.connectionsPagePO.ENV3PL);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    // created connection validation in import
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.IMPORTS);
    await io.flowBuilder.click(selectors.basePagePO.IMPORTS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.THREEPL_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.exportsPagePO.CONNECTIONS_DROPDOWN,
      randomString
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROPDOWNMENU);
    await io.flowBuilder.click(
      selectors.connectionsPagePO.CONNECTIONDROPDOWNMENU
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.EDIT_RESOURCE);
    const edit6 = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await edit6[0].click();
    const edits7 = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await edits7[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE);
    const save6 = await page.$$(selectors.basePagePO.SAVE);
    await save6[2].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTS_ID);
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.CLIENTS_ID)).isVisible(),
      "Saved in Simple View Mode"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.EDIT_RESOURCE);
    const edit7 = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await edit7[1].click();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH,
      1
    );
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.CLIENTS_ID)).isVisible(),
      "Saved in Simple View Mode"
    );
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    const save8 = await page.$$(selectors.basePagePO.SAVE);
    await save8[2].click();
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    const edit9 = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await edit9[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CLOSE);
    const close1 = await page.$$(selectors.basePagePO.CLOSE);
    await close1[2].click();
    const close2 = await page.$$(selectors.basePagePO.CLOSE);
    await close2[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
    const newconnection1 = await page.$$(selectors.basePagePO.ADD_NEW_RESOURCE);
    await newconnection1[1].click();
    // new connection in export
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.NAME);
    const expconn = await page.$$(selectors.importPagePO.NAME);
    await expconn[1].fill(randomString);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
    const edits = await page.$$(selectors.basePagePO.ADD_NEW_RESOURCE);
    await edits[2].click();
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.NAME);
    const name6 = await page.$$(selectors.importPagePO.NAME);
    await name6[2].fill(randomString);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTS_ID);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTS_ID,
      decrypt("MjExOWY2MWItMzgyNS00NTM0LTliMmUtOWYxZTBhNjNjYWFj")
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE);
    const save7 = await page.$$(selectors.basePagePO.SAVE);
    await save7[2].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTS_ID);
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.CLIENTS_ID)).isVisible(),
      "Saved in Simple View Mode"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.EDIT_RESOURCE);
    const editimport2 = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await editimport2[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTS_ID);
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.CLIENTS_ID)).isVisible(),
      "Saved in Simple View Mode"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.clickButtonByIndex(
      selectors.connectionsPagePO.HTTP_CNNECTOR,
      1
    );
    await io.homePage.loadingTime();
    await io.assert.expectToBeTrue(
      await (await page.$("[data-test='enableJWT']")).isVisible(),
      "HTTP View is not displayed"
    );
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE);
    const saves = await page.$$(selectors.basePagePO.SAVE);
    await saves[2].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.EDIT_RESOURCE);
    const editexport = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await editexport[1].click();
    await io.homePage.loadingTime();
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.ENABLEJWTHTTP)).isVisible(),
      "HTTP View is not displayed"
    );
    const cancels = await page.$$(selectors.basePagePO.CLOSE);
    await cancels[2].click();
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.USERNAM3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.USERNAM3PL,
      "b779b82f-f5e5-4d59-a2c9-ea2c5eb8eec3"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ENVIRONMENT_WDIO);
    await io.flowBuilder.click(selectors.connectionsPagePO.ENVIRONMENT_WDIO);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ENV3PL);
    await io.flowBuilder.click(selectors.connectionsPagePO.ENV3PL);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE);
    const savencontinues = await page.$$(selectors.basePagePO.SAVE);
    await savencontinues[1].click();
    await io.homePage.loadingTime();
    // validation in Export side
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.EXPORTS);
    await io.flowBuilder.click(selectors.basePagePO.EXPORTS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.THREEPL_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.exportsPagePO.CONNECTIONS_DROPDOWN,
      randomString
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROPDOWNMENU);
    await io.flowBuilder.click(
      selectors.connectionsPagePO.CONNECTIONDROPDOWNMENU
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.EDIT_RESOURCE);
    const edit1 = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await edit1[0].click();
    const edit4 = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await edit4[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE);
    const save2 = await page.$$(selectors.basePagePO.SAVE);
    await save2[2].click();
    await io.homePage.loadingTime();
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.CLIENTS_ID)).isVisible(),
      "Saved in Simple View Mode"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.EDIT_RESOURCE);
    const edit2 = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await edit2[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH,
      1
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTS_ID);
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.CLIENTS_ID)).isVisible(),
      "Saved in Simple View Mode"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE);
    const save3 = await page.$$(selectors.basePagePO.SAVE);
    await save3[2].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );  
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.EDIT_RESOURCE);
    const edit3 = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await edit3[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CLOSE);
    const close = await page.$$(selectors.basePagePO.CLOSE);
    await close[2].click();
    const closes1 = await page.$$(selectors.basePagePO.CLOSE);
    await closes1[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
    const newconnection = await page.$$(selectors.basePagePO.ADD_NEW_RESOURCE);
    await newconnection[1].click();
    // new connection in import
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.NAME);
    const impconn = await page.$$(selectors.importPagePO.NAME);
    await impconn[1].fill(randomString);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
    const edit5 = await page.$$(selectors.basePagePO.ADD_NEW_RESOURCE);
    await edit5[2].click();
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.NAME);
    const name5 = await page.$$(selectors.importPagePO.NAME);
    await name5[2].fill(randomString);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTS_ID);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTS_ID,
      decrypt("MjExOWY2MWItMzgyNS00NTM0LTliMmUtOWYxZTBhNjNjYWFj")
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE);
    const save5 = await page.$$(selectors.basePagePO.SAVE);
    await save5[2].click();
    await io.homePage.loadingTime();
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.CLIENTS_ID)).isVisible(),
      "Saved in Simple View Mode"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.EDIT_RESOURCE);
    const editimport = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await editimport[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTS_ID);
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.CLIENTS_ID)).isVisible(),
      "Saved in Simple View Mode"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HTTP_CNNECTOR,
      1
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ENABLEJWTHTTP);
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.ENABLEJWTHTTP)).isVisible(),
      "HTTP View is not displayed"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    const saves6 = await page.$$(selectors.basePagePO.SAVE);
    await saves6[2].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CLIENTSECRET3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CLIENTSECRET3PL,
      decrypt("TG9xazJFbVovMno5L2xGNk9COFB3aUh2dzdGbW1IaHA=")
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.EDIT_RESOURCE);
    const editimport1 = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await editimport1[1].click();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ENABLEJWTHTTP);
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.connectionsPagePO.ENABLEJWTHTTP)).isVisible(),
      "HTTP View is not displayed"
    );
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CLOSE);
    const cancel5 = await page.$$(selectors.basePagePO.CLOSE);
    await cancel5[2].click();
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.USERNAM3PL);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.USERNAM3PL,
      "b779b82f-f5e5-4d59-a2c9-ea2c5eb8eec3"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ENVIRONMENT_WDIO);
    await io.flowBuilder.click(selectors.connectionsPagePO.ENVIRONMENT_WDIO);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ENV3PL);
    await io.flowBuilder.click(selectors.connectionsPagePO.ENV3PL);
    const savencontinue = await page.$$(selectors.basePagePO.SAVE);
    await savencontinue[1].click();
  });
});
