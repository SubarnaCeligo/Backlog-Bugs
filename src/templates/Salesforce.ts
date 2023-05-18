import type { Page } from "@playwright/test";

export class Salesforce {
  private page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  SALESFORCE_JSON = {
    SALESFORCE_EXPORT: {
      application: "adaptorType",
      Salesforce: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "exportType": "exportRecords",
      exportRecords: "action",
      "salesforce.soql": "query",
      "type": "type",
      "once.booleanField": "booleanField",
      "delta.dateField": "dateField",
      Advanced: "action",
      "dataURITemplate": "dataURITemplate",
      saveAndClose: "action"
    },
    SALESFORCE_BLOB_EXPORT: {
      lookupFiles: "action",
      "exportType": "lookupFiles",
      "oneToMany": true,
      "pathToMany": "pathToMany",
      saveAndClose: "action"
    },
    SALESFORCE_IMPORT: {
      application: "adaptorType",
      Salesforce: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      importRecords: "action",
      "exportType": "importRecords",
      "salesforce.api": "api",
      "salesforce.sObjectType": "sObjectType",
      "salesforce.operation": "operation",
      "salesforce.compositeOperation": "operation",
      "salesforce.upsert.externalIdField": "externalIdField",
      "salesforce.idLookup.extract": "extract",
      "dataURITemplate": "dataURITemplate",
      Advanced: "action",
      saveAndClose: "action"
    },
    SALESFORCE_BLOB_IMPORT: {
      application: "adaptorType",
      Salesforce: "action",
      connection: "_connectionId",
      transferFiles: "action",
      "exportType": "transferFiles",
      "oneToMany": true,
      "pathToMany": "pathToMany",
      "blobKeyPath": "blobKeyPath",
      "salesforce.blobOperation": "insert",
      "salesforce.blobContentVersionOperation": "upsert",
      "salesforce.contentVersion.title": "title",
      "salesforce.contentVersion.pathOnClient": "pathOnClient",
      "salesforce.contentVersion.contentDocumentId": "contentDocumentId",
      "salesforce.contentVersion.contentLocation": "contentLocation",
      "salesforce.attachment.name": "attachmentName",
      "salesforce.attachment.parentId": "parentId",
      "salesforce.document.name": "documentName",
      "salesforce.document.folderId": "documentFolderId",
      "salesforce.document.isInternalUseOnly": "documentIsInternalUseOnly",
      "salesforce.document.isPublic": "documentIsPublic",
      "salesforce.document.developerName": "documentDeveloperName",
      "salesforce.document.id": "documentId",
      save: "action",
      name: "name",
      Advanced: "action",
      saveAndClose: "action"
    }
  };
}
