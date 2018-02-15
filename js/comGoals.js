$(document).ready(function(){
    retrieveProgress();
});
function retrieveProgress()
  {
    var MobService = WindowsAzure.MobileServiceClient;
    var client = new MobService("https://acappeasytablemob.azurewebsites.net");
    var reportTable = client.getTable("Reports_Table");
    var yungNumberNaKailanganNiRen;
    query = reportTable;

    query.take(0).includeTotalCount().read().then(function (reports) 
          {
            // The space specified by 'placeToInsert' is an unordered list element <ul> ... </ul>
            yungNumberNaKailanganNiRen = reports.totalCount;
            $('#communityGoalsProgressText').text(yungNumberNaKailanganNiRen+"/500");
            
            //percentage
            var progressMeterNaAyawNiRocky = (yungNumberNaKailanganNiRen/500)*100;
            $('.determinate').css("width",  '0%');
            $('.determinate').css("width",  progressMeterNaAyawNiRocky +'%');
          }, 
            
          function (err) 
          {
            alert("Error: " + err);
          });
  }