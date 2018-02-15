$(document).ready(function(){
    console.log("TEST");

    retrieveProgress();




    setTimeout(function(){        
        $('.tap-target').tapTarget('open');
    }, 1500);
    $(".button-collapse").sideNav({
        menuWidth: 400, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: false, // Choose whether you can drag to open on touch screens,
    });
    $('.slickCarousel').slick({
        slidesToShow: 1,
        variableWidth: true,
        arrows: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,        
        centerMode: true,
        fade: true,
        waitForAnimate: false,
        cssEase: 'linear'
    });

    $('.headerCarousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        fade: true,
        cssEase: 'linear'
    });
    
    $('#repBtn').click(function(){
        console.log("CLICk");
        $(".button-collapse").sideNav('show');
    });


    $('#registerButton').click(function(){
        registerNewUser();
    });

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

  function registerNewUser()
  {
    var MobService = WindowsAzure.MobileServiceClient;
    var client = new MobService("https://acappeasytablemob.azurewebsites.net");
    var userTable = client.getTable("Users_Table");

    var usernameText = $('#inputTextUsername').val().trim();
    var passwordText = $('#inputTextPassword').val().trim();
    var confirmPasswordText = $('#inputTextConfirmPassword').val().trim();
    var emailText = $('#inputTextEmail').val().trim();
    var nameText = $('#inputTextName').val().trim();
    var licensePlateText = $('#inputTextLicensePlate').val().trim();

    //Validate them shits

    var requiredFields = [usernameText, passwordText, confirmPasswordText, emailText, nameText];
        //basic shit
        if(passwordText != confirmPasswordText)
        {			
          console.log("Password did not match");
          Materialize.toast('Passwords did not match :(', 4000)
          return;
        }
        else if(passwordText.length < 6 )
        {
            console.log("Password length can not be less than 6 characters");
            Materialize.toast('Password length can not be less than 6 characters :(', 4000)
          return;
        }
        else if($("#inputTextEmail").hasClass("invalid"))
        {
            console.log("Please provide a valid Email");
            Materialize.toast('Please provide a valid Email :(', 4000)
        }
        for(var i = 0; i < 5; i++)
        {
          if(requiredFields[i] == "")
          {
            console.log("Please complete all fields");
            Materialize.toast("Please complete all fields", 4000);
            return; 
          }			
        }

        //non-basic shit
        var query = userTable;
        query.where({ Username: usernameText }).read().then(function (results)
        {
          if(results != "")
          {
            console.log("Username is taken");
            Materialize.toast('Username is taken :(', 4000)
            return;
          }
          else
          { //check if email exists
            var query = userTable;
            query.where({ Email: emailText }).read().then(function (results)
            {
              if(results != "")
              {
                console.log("Email is taken");
                Materialize.toast("Email is taken", 4000);
                return;
              }
              else//passed validation
              {
                userTable.insert(
                {
                  Username: usernameText,
                  Password: passwordText,
                  Email: emailText,
                  Name: nameText,
                  LicensePlate: licensePlateText,
                  Country: "Philippines",
                  Exp: 0,
                  BluePoint: 0,
                  RedPoint: 0,
                  Origin: 'DESKTOP'
                }).done(function (result) 
                {
                    //success
                    Materialize.toast('Registration Successful!', 4000);
                }, function (err) 
                {
                  alert("Error: " + err);
                });
                
              }
            }, 
            function(err)
            {
              alert("Error: "+ err);
            }		
            );
          /*end of email check*/
          }
        }, 
        
        function(err)
        {
          alert("Error: "+ err);
        });



  }

  function reportButtonClick(elem)
  {
      console.log(elem.value);
      var userText = $("#inputReportLicense").val();

      userText = userText.replace(/^\s+/, '').replace(/\s+$/, '');
      if (userText === '') {
          return;
      } 
        var MobService = WindowsAzure.MobileServiceClient;
        var client = new MobService("https://acappeasytablemob.azurewebsites.net");
        var reportTable = client.getTable("Reports_Table");

    var licensePlateRaw = $("#inputReportLicense").val();		
    var licenseLetters = licensePlateRaw.replace(/[^A-Za-z]+/g, '').toUpperCase();
    var licenseDigits = licensePlateRaw.replace(/\D+/g, "");
    var licenseParsed = licenseLetters + " " + licenseDigits;

    var reporterID;
      if(localStorage.getItem("Username") == null)
      
      {
        reporterID = "ANONYMOUS";
        /* $('#message').text('Report Received');
        $('#popup-para').text('What are others saying about your driving? Register and find out!'); */
      
      }
    
      else reporterID = localStorage.getItem("Username");

      reportTable.insert(
        {
          ReportType: elem.id,
          ReportText: elem.text,
          LicensePlate: licenseParsed,
          ReporterID: reporterID,
          ReportDate: new Date().toISOString(),
          ReporterCountry: 'Philippines'				
        }).done(function (result) 
        {
          retrieveProgress();
          $("#inputReportLicense").val("");
          Materialize.toast('Report Submitted!', 4000);
          /*CHANGE THIS LATER*/
          canReportAgain = true;
          setTimeout(function()
          { 
          canReportAgain = true;
          }, 20000);
          
          
        }, function (err) 
        {
          alert("Error: " + err);
        }); 
      }
  