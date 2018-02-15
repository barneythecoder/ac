/* $(document).ready(function(){
    console.log("TEST");
    $(".button-collapse").sideNav({
        menuWidth: 80, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
    });
    $(".statsNav").sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
    });
    $(".dsNav").sideNav({
        menuWidth: 590, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
    });

    $(".badgesNav").sideNav({
        menuWidth: 590, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
    });

    $("#profileFixedNav").mouseover(function(){
        $('.statsNav').sideNav('show');
    });

    $("#statsBars").click(function(){
        $(".dsNav").sideNav('show');
       
    });

    $("#badges").click(function(){
        $(".badgesNav").sideNav('show');
        
    });
}); */


var statsFixed = document.querySelector('.statsFixedNav');
var profileStats = document.querySelector('.profileStatsNav');
var driverScore = document.querySelector('.driverScoreNav');
var userBadges = document.querySelector('.userBadgesNav');
var reportSideNav = document.querySelector('.reportSideNav');
$(document).ready(function(){
     
     $('.statsFixedNav').sidenav();
     $('.profileStatsNav').sidenav();
     $('.driverScoreNav').sidenav();
     $('.userBadgesNav').sidenav();
     $('.reportSideNav').sidenav();

     var side = M.Sidenav.getInstance(statsFixed);

     //userBadgesInst.open();

     $('.statsFixedNav').mouseover(function(){
        var profStatsInst = M.Sidenav.getInstance(profileStats);
        profStatsInst.open();

     });

     $('#statsBars').click(function(){
        var driverScoreInst = M.Sidenav.getInstance(driverScore);
        var userBadgesInst = M.Sidenav.getInstance(userBadgesNav);
        userBadgesInst.close();
        driverScoreInst.open();

     });

     $('.see').click(function(){
        var driverScoreInst = M.Sidenav.getInstance(driverScore);
        var userBadgesInst = M.Sidenav.getInstance(userBadgesNav);
        driverScoreInst.close();
        userBadgesInst.open();
        

     });

     $('#repBtn').click(function(){
        var reportSideNavInst = M.Sidenav.getInstance(reportSideNav);
        reportSideNavInst.open();
     });

});