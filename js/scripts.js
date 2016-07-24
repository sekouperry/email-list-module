//Cookie setting JavaScript
function createCookie(name, value, days) {
    var expiry = "";
    if (days) {
        var mydate = new Date();
        mydate.setTime(mydate.getTime() + (days * 24 * 60 * 60 * 1000));
        expiry = "; expires=" + mydate.toUTCString();
    }
    document.cookie = name + "=" + value + expiry;
}
function getCookie(name) {
    var needle = name + "=";
    var cookieArray = document.cookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var myCookie = cookieArray[i].trim();
        if (myCookie.indexOf(needle) == 0) {
            return (myCookie.substring(needle.length, myCookie.length));
        }
    }
    return null;
}
var cookieName = 'test7'; /// Update cookie Name
var waitTime = 0;

$(document).ready(function() {
    $(".button").click(function(e) {
        e.preventDefault();
        var email = $("input#email").val();
        if (email == "") {return false;}
        var url = "addtodata.php";
        var myinnercontent = $(this).parents().find('.mytext');
        var mymainmodal = $(this).parents().find('.modal').attr('id');
        $.ajax({
            type: "POST",
            url: url,
            data: 'email=' + email,
            success: function(data) {
                if (data.status == "success") {
                    $('#mymask, #' + mymainmodal).delay(5000).fadeOut(400);
                    $(myinnercontent).html('<p>Thank you for your submission</p>');
                } else {
                    $(myinnercontent).html('<p>Sorry there was an error in your submission</p>');
                }
            }
        });
    });
    if (!getCookie(cookieName)) {
        var checkAction = setInterval(countTime, 1000);
        $(document).on('mousemove', function() {
            waitTime = 0;
        });
    }

    function countTime() {
        waitTime++;
        if (waitTime > 2) {
            popup('mymodal');
            createCookie(cookieName,'emailsignup',1);
            clearInterval(checkAction);
        }
    }

    function popup(oID) {
        var w = ($(window).width() / 2) - $('#' + oID).width() / 2;
        var h = ($(window).height() / 2) - $('#' + oID).height() / 2;
        $('#' + oID).css('left', w);
        $('#' + oID).css('top', h);
        $('#' + oID + ', #mymask ').show();
    };
    $('.closeme').click(function(e) {
        var myid = $(this).parents('div').attr('id');
        $('#mymask, #' + myid).hide();
    });
});