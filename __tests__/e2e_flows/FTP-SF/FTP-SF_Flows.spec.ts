import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"247_FTP_Xml_Export_To_SF_Import",
"024_Salesforce_Account_To_FTP_CSV_All",
"28689_FTP_Compression_Algorithm",
"C2810_Verify_Ftp_import_CSV_without_headers",
"C2810_Verify_Ftp_import_CSV_with_headers",
"C2661_FTP_FTP_EDI_Verify_Composite_Element",
"C29587_FTP_Missing_Field_In_Record_Group",
"C22867_FTP_FTP_SkipAgg",
"C29588_FTP_Multiple_Sort_Group_field",
"C22774_FTP_FTP_File_Handlebars",
"C30813_C14524_FTP_Sorting_mapping",
"C1972_FTP_FTP_EDIFACT_FileDefinition",
"C2496_FTP_FTP_Edit_File_Definition",
"C2656_FTP_EDI_FTP_Editing_RowDelimeter",
"C25871_FTP_EDI_RowDelimeter_CR",
"C25873_FTP_FTP_EDI_Verify_ParseData",
"C30821_FTP_SortAndGroup_FTP_CSV_JSON",
"C35980_FTP_To_FTP",
"C23023_FTP_To_FTP_skipagg_Zip",
"C1976_Verify_Flow_Not_Get_stalled_Corrupted_File_isPresent",
"493_FTP_To_FTP_Import_With_Skip_Aggregation_True",
"15136_FTP_SF_Composite_records",
"251_FTP_JSON_To_Salesforce_Account_Multifield",
"223_Create_118_FTP_to_FTP_MultifieldExpressions",
"303_Create_NS_to_EDI_Macy_870",
"304_Create_NS_to_Fixedwidth_EDI",
"308_NS_Export_MultiFIlter_To_FTP_All",
"642_NS_CustomServerScriptLog_To_FTP",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"FTP-SF");
})();