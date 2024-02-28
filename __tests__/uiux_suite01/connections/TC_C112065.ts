import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C112065_C112066_C112067_C112068_C112069", () => 
{
  test.beforeEach(async ({ io }) => {
  await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

});

  test("C112065 Verify the JWT bearer under Auth type dropdown", async ({io, page}) => {
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
      await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
      await io.flowBuilder.loadingTime();
      await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
      const monitorExp = await io.homePage.isVisible("text='JWT bearer'");
      await io.assert.expectToBeValue(monitorExp.toString(), 'true', "Value is found");
  });
  test("C112066 Verify the Help text of Auth type in HTTP connectiion page", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPES);
    const monitorExp1 = await io.homePage.isVisible("text='JWT bearer'");
      await io.assert.expectToBeValue(monitorExp1.toString(), 'true', "Value is found")
  });
  test("C112067 Verify Configure JWT bearer section is added after Auth type", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    const monitorExp2 = await io.homePage.isVisible("text='Configure JWT bearer'");
    await io.assert.expectToBeValue(monitorExp2.toString(), 'true', "Value is found");
  });
  test("C112068 Verify signature method and send token via fields are added under Configure JWT bearer section", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    const monitorExp3 = await io.homePage.isVisible("text='Signature method'");
    await io.assert.expectToBeValue(monitorExp3.toString(), 'true', "Value is found");
    const monitorExp4 = await io.homePage.isVisible("text='Send token via'");
    await io.assert.expectToBeValue(monitorExp4.toString(), 'true', "Value is found");
  });
  test("C112069 Verify the default value of Signature method", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.connectionPage.click(selectors.connectionsPagePO.LOCATION);
    const monitorExp5 = await io.homePage.isVisible("text='Please select'");
    await io.assert.expectToBeValue(monitorExp5.toString(), 'true', "Value is found");
  });
});