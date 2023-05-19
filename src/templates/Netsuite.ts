import type { Page } from "@playwright/test";

export class Netsuite {
  private page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  NETSUITE_JSON = {
    NETSUITE_EXPORT: {
      application: "adaptorType",
      NetSuite: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "netsuite.restlet.recordType": "recordType",
      "netsuite.restlet.searchId": "searchId",
      Replace: "action",
      "type": "type",
      "delta.dateField": "dateField",
      "once.booleanField": "booleanField",
      "restlet.type": "type",
      "restlet.delta.dateField": "dateField",
      "restlet.once.booleanField": "booleanField",
      "pageSize": "pageSize",
      "netsuite.restlet.batchSize": "batchSize",
      "custom:[data-test='suiteapp2.0']": "action",
      "custom:[data-test='suiteapp1.0']": "action",
      "custom:[data-test='suitebundle']": "action",
      "netsuite.restlet.criteria": "qa__criteria",
      "netsuite.skipGrouping": "skipGrouping",
      saveAndClose: "action"
    },
    NETSUITE_BLOB_EXPORT: {
      "lookupFiles": "action",
      "exportType": "lookupFiles",
      "oneToMany": true,
      "pathToMany": "pathToMany",
      "netsuite.internalId": "internalId",
      Advanced: "action",
      "custom:[data-test='suiteapp2.0']": "action",
      "custom:[data-test='suiteapp1.0']": "action",
      "custom:[data-test='suitebundle']": "action",
      saveAndClose: "action"
    },
    NETSUITE_IMPORT: {
      application: "adaptorType",
      NetSuite: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "netsuite_da.recordType": "recordType",
      "netsuite_da.operation": "operation",
      "ignoreExisting": "ignoreExisting",
      lookupRecords: "action",
      "exportType": "lookupRecords",
      lookupFiles: "action",
      transferFiles: "action",
      importRecords: "action",
      "oneToMany": true,
      "pathToMany": "pathToMany",
      "ignoreMissing": "ignoreMissing",
      Advanced: "action",
      "custom:[data-test='suiteapp2.0']": "action",
      "custom:[data-test='suiteapp1.0']": "action",
      "custom:[data-test='suitebundle']": "action",
      "netsuite_da.batchSize": "batchSize",
      "idLockTemplate": "idLockTemplate",
      "dataURITemplate": "dataURITemplate",
      saveAndClose: "action"
    },
    NETSUITE_BLOB_IMPORT: {
      transferFiles: "action",
      "exportType": "transferFiles",
      Advanced: "action",
      "blobKeyPath": "blobKeyPath",
      "netsuite.operation": "add",
      "netsuite.file.name": "fileName",
      "netsuite.file.folder": "folder",
      "oneToMany": true,
      "pathToMany": "pathToMany",
      saveAndClose: "action"
    }
  };
}
