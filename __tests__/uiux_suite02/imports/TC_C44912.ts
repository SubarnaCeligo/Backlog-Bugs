import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C63001 from "@testData/Flows/C63001.json";

const dropdownValues = ["JSON_LISTINGS_FEED",
  "POST_EASYSHIP_DOCUMENTS",
  "POST_EXPECTED_SHIP_DATE_SOD",
  "POST_EXPECTED_SHIP_DATE_SOD_FLAT_FILE",
  "POST_FBA_INBOUND_CARTON_CONTENTS",
  "POST_FLAT_FILE_BOOKLOADER_DATA",
  "POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA",
  "POST_FLAT_FILE_FBA_CREATE_INBOUND_PLAN",
  "POST_FLAT_FILE_FBA_CREATE_REMOVAL",
  "POST_FLAT_FILE_FBA_UPDATE_INBOUND_PLAN",
  "POST_FLAT_FILE_FULFILLMENT_DATA",
  "POST_FLAT_FILE_FULFILLMENT_ORDER_CANCELLATION_REQUEST_DATA",
  "POST_FLAT_FILE_FULFILLMENT_ORDER_REQUEST_DATA",
  "POST_FLAT_FILE_INVLOADER_DATA",
  "POST_FLAT_FILE_LISTINGS_DATA",
  "POST_FLAT_FILE_LISTINGS_DATA",
  "POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA",
  "POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA",
  "POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA",
  "POST_FULFILLMENT_ORDER_CANCELLATION_REQUEST_DATA",
  "POST_FULFILLMENT_ORDER_REQUEST_DATA",
  "POST_INVENTORY_AVAILABILITY_DATA",
  "POST_INVOICE_CONFIRMATION_DATA",
  "POST_ORDER_ACKNOWLEDGEMENT_DATA",
  "POST_ORDER_FULFILLMENT_DATA",
  "POST_PAYMENT_ADJUSTMENT_DATA",
  "POST_PRODUCT_DATA",
  "POST_PRODUCT_IMAGE_DATA",
  "POST_PRODUCT_OVERRIDES_DATA",
  "POST_PRODUCT_PRICING_DATA",
  "POST_PRODUCT_RELATIONSHIP_DATA",
  "POST_STD_ACES_DATA",
  "POST_UIEE_BOOKLOADER_DATA",
  "RFQ_UPLOAD_FEED",
  "UPLOAD_VAT_INVOICE"]

test.describe("C44912 Verify feedType dropdown fields is getting displayed in HTTP import to support createFeedDocument and createFeed endpoints", () => {
  test("C44912 Verify feedType dropdown fields is getting displayed in HTTP import to support createFeedDocument and createFeed endpoints", async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(C63001, "FLOWS");
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.IMPORT
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.assert.verifyElementIsDisplayed(
      selectors.importPagePO.FEEDTYPE,
      "Feed type dropdown is not displayed"
    );
    await io.flowBuilder.clickByText('Please select');

    await page.keyboard.press('ArrowDown');
    
    for(let i=0; i<5; i++){
      await page.keyboard.press('ArrowDown');
      const element = await page.$(selectors.basePagePO.LISTBOX_ROLE);
      const text = await element.evaluate((el) => el.textContent);
      await io.assert.expectToBeTrue(text.includes(dropdownValues[i]), `Value ${dropdownValues[i]} not found in dropdown`);
    }
  });
});
