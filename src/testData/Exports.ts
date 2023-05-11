export class ExportTestdata {
  Sample_Export = {
    qa__export: {
      adaptorType: "FTPExport",
      _connection: "FTP CONNECTION",
      name: "FTP export",
      ftp: {
        directoryPath: "/io.auto.qa/IO_UI_Automation_FTPExports_FileAdaptors",
        fileNameStartsWith: "108.FTP_Xml_Export_To_NS_Import.xml"
      },
      file: {
        output: "records",
        skipDelete: true,
        xml: {
          resourcePath: "/data"
        },
        encoding: "utf8",
        type: "xml"
      },
      asynchronous: true,
      dataURITemplate: "{{{Name}}}",
      qa__path: "/FTP_uploads/108.FTP_Xml_Export_To_NS_Import.xml"
    }
  };
  C55447 = {
    APP_NAME: "FTP",
    CONNECTION_NAME: "FTP CONNECTION",
    NAME: "Test C55447"
  };
  C51543 = {
    APP_NAME: "Stripe",
    CONNECTION_NAME: "STRIPE CONNECTION",
    NAME: "test C51543"
  };
}