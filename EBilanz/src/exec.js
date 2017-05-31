function exec(string)
{
  var param = init_param();

  //calls dialog if inData contains no param
  /*var rtnDialog = true;
  if (string.length > 0) {
      param = JSON.parse(string);
  }
  else {
      rtnDialog = dialogExec(param);
  }

  if (!rtnDialog)
  {
	return "@Cancel";
  }*/
  
  var openingYear = 0;
  var closureYear = 0;
  var accountingOpeningDate = Banana.document.startPeriod();
  var accountingClosureDate = Banana.document.endPeriod();
  var accountingCurrentYear = '';
  if (accountingOpeningDate.length >= 10)
    openingYear = accountingOpeningDate.substring(0, 4);
  if (accountingClosureDate.length >= 10)
    closureYear = accountingClosureDate.substring(0, 4);
  if (openingYear > 0 && openingYear === closureYear)
    accountingCurrentYear = openingYear;
  if (accountingCurrentYear.length<=0)
    accountingCurrentYear = 'aktjahr';

  var contextList = [
  {
    'name': accountingCurrentYear,
    'startdate' : accountingOpeningDate,
    'enddate' : accountingClosureDate,
    'document' : Banana.document
  }];

  //E-Bilanz Online works only with one context (current year)
  /*var fileName = Banana.document.info("AccountingDataBase","FileNamePreviousYear");
  if (fileName.length>0)
  {
    var documentPreviousYear = Banana.application.openDocument(fileName);
    if (documentPreviousYear)
    {
      openingYear = 0;
      closureYear = 0;
      accountingOpeningDate = documentPreviousYear.startPeriod();
      accountingClosureDate = documentPreviousYear.endPeriod();
      accountingCurrentYear = '';
      if (accountingOpeningDate.length >= 10)
        openingYear = accountingOpeningDate.substring(0, 4);
      if (accountingClosureDate.length >= 10)
        closureYear = accountingClosureDate.substring(0, 4);
      if (openingYear > 0 && openingYear === closureYear)
        accountingCurrentYear = openingYear;
      if (accountingCurrentYear.length<=0)
        accountingCurrentYear = 'prevjahr';

      contextList.push(
        {
          'name':  accountingCurrentYear,
          'startdate' : accountingOpeningDate,
          'enddate' : accountingClosureDate,
          'document' : documentPreviousYear
        } );
    }
  }*/
  
  getAccountingData(param, contextList);
  return createInstance(param, contextList);
}
