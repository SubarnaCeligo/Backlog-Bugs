import type { Page } from "@playwright/test";

export class FTP {
  private page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  FTP_JSON = {
    FTP_EXPORT: {
      application: "adaptorType",
      FTP: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "file.type": "type",
      "ftp.directoryPath": "directoryPath",
      "ftp.fileNameStartsWith": "fileNameStartsWith",
      Advanced: "action",
      "file.encoding": "encoding",
      "file.skipDelete": "skipDelete",
      saveAndClose: "action"
    },
    FTP_IMPORT: {
      application: "adaptorType",
      FTP: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "file.type": "type",
      "ftp.directoryPath": "directoryPath",
      "file.fileName": "fileName",
      "text-columnDelimiter": "columnDelimiter",
      "rowDelimiter": "rowDelimiter",
      "replaceNewlineWithSpace": "replaceNewlineWithSpace",
      "replaceTabWithSpace": "replaceTabWithSpace",
      "truncateLastRowDelimiter": "truncateLastRowDelimiter",
      "wrapWithQuotes": "wrapWithQuotes",
      saveAndClose: "action"
    }
  };
}
