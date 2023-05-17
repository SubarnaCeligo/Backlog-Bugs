export var links = {
  SIGNIN_PAGE_URL: "/signin",
  HOME_PAGE_URL: "/home",
  CONNECTIONS_PAGE_URL: "/connections",
  EXPORTS_PAGE_URL: "/exports",
  MY_ACCOUNT_PAGE_URL: "/myAccount/profile",
  FLOW_BUILDER_PAGE_URL: ""
};
export var TEST_RESULT = {
  TEST_EXECUTION_STOP_ON_FAILURE: false,
  IO_DASHBOARD_JOBCOUNT_SUCCESS: [1, 0, 0],
  IO_DASHBOARD_JOBCOUNT_IGNORE: [0, 1, 0],
  IO_DASHBOARD_JOBCOUNT_FAILURE: [0, 0, 1],
  JOB_COMPLETED_IN_IO_OK:
    "Job Completed Successfully with Correct Dashboard Count... ok!",
  ERR_JOB_COMPLETED_IN_IO_NOT_OK:
    "err!! ...Incorrect Job status from API. Verifying from UI.",
  CRITICAL_ERR_TERMINATING_TEST:
    "xxxxxxxxxxx      SOME ISSUE INITIALIZING BROWSER & LOGGING IN TO IO. TERMINATING TEST.      xxxxxxxxxxx"
  //add appropriate error message to be printed in testReport Here
};
