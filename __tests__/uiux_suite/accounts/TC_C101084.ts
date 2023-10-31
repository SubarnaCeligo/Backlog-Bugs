import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe('C101084 To verify that the user will get error message when user provides the same email in change email operation', () => {

    test("C101084 To verify that the user will get error message when user provides the same email in change email operation", async ({
        io,
        page
      }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click('[data-test="editEmail"]')
        await io.myAccountPage.waitForElementAttached('[name="newEmail"]')
        await io.myAccountPage.fill('[name="newEmail"]', "io.auto.qa+300@celigo.com")
        await io.myAccountPage.waitForElementAttached('[name="password"]')
        await io.myAccountPage.fill('[name="password"]', 'Celigo@123');
        await io.myAccountPage.waitForElementAttached('[data-test="changeEmail"]')
        await io.myAccountPage.click('[data-test="changeEmail"]');
        await io.myAccountPage.waitForElementAttached('[data-test="Close"]')
        await io.myAccountPage.click('[data-test="Close"]');
        await io.myAccountPage.waitForElementAttached('#notification')
        await io.assert.verifyElementContainsText('#notification', "Another user already exists with the provided email address.")
      });
})