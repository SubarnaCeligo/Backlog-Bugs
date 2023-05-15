import type { Page } from "@playwright/test";

export class Shopify {
  private page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  SHOPIFY_JSON = {
    SHOPIFY_EXPORT: {
      application: "assistant",
      Shopify: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "assistantMetadata.resource": "resource",
      "assistantMetadata.operation": "operation",
      saveAndClose: "action"
    },
    SHOPIFY_IMPORT: {
      application: "assistant",
      Shopify: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "assistantMetadata.resource": "resource",
      "assistantMetadata.operation": "operation",
      "assistantMetadata.ignoreExisting": "ignoreExisting",
      saveAndClose: "action"
    }
  };
}
