import { API } from "@celigo/ui-core-automation";
const flakycases = await (API as any).getFlakyCases("/platform_suites/widget/25");
const testCases = [
  "TC_311_Multifilter_AND_OR_Operator_equals_notequals_greaterthan",
  "TC_313_Multifilter_GROUP_NOT_Operator_equals_notequals",
  "TC_314_Filter_Rows_Data",
  "TC_316_FTPExport_GroupedData_InputFilter",
  "TC_317_InputFilter_With_Rows_Data_With_NS_Export",
  "TC_318_InputFilter_With_Record_Data_With_NS_Export",
  "TC_487_FTP_SortByFields_Descending_To_FTP_Import",
  "TC_488_FTP_SortByFields_Ascending_To_FTP_Import",
  "TC_489_FTP_Without_SortAndGroup_To_FTP_Import",
  "TC_490_FTP_GroupByFields_To_FTP_Import",
  "TC_491_FTP_SortAndGroup_To_FTP_Import",
  "TC_492_FTP_SortAndGroup_NestedJson_To_FTP_Import",
  "TC_493_FTP_To_FTP_Import_With_Skip_Aggregation_True",
  "TC_701_FTP_TO_FTPimport_Dir_path_as_handlebar",
  "TC_708_Skip_Row_Validation",
  "TC_710_FTP_Export_Encoding_UTF8",
  "TC_711_FTP_Export_Encoding_WIN1252",
  "TC_C20794_FTP_Huge_Header_Export_And_Import",
  "TC_C37478_FTP_InvalidHandlebarErrorValidation",
  "TC_043_Create_81_Sftp_XlSX_To_Netsuite_Customer_Using_FileType_XLSX"
];
testCases.forEach(testCase => {
  if (!flakycases.includes(testCase)) {
       require(`./${testCase}`);
  }
});
