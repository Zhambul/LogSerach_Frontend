function onSearchSubmit(event) {
    event.preventDefault();
    console.log("sending searchRequest");
    $("#searchResult").empty();
    $("#resultNumber").empty();
    var $submit = $(this).find("button[type='submit']");
    $submit.prop('disabled', true);
    $submit.text('Searching');

    searchRequest();
    return false;
}

function searchRequest() {
    var from = new Date();
    var data = getSearchFormData();

    $.ajax({
        type: 'POST',
        url: data.outputType == 'here' ?
            'http://localhost:7001/log_search-1.0-SNAPSHOT/resources/search/text'
            : "http://localhost:7001/log_search-1.0-SNAPSHOT/resources/search/file",
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: onSearchSuccess,
        error: onSearchError
    });

    function onSearchSuccess(response) {
        searchDisabled(false);
        if (response.logs == null) {
            onFile(response);
            return;
        }
        onSearchResult(response, from);
    }

    function onSearchError(error) {
        console.log("error");
        console.log(error);
        if (error.status == 401) {
            console.log("auth");
            $("#loginDiv").show();
            $("#logInRequestBtn").hide();
            $("#logOutBtn").hide();
        }
        searchDisabled(false);
    }

    function getSearchFormData() {
        return {
            regexp: $('#pattern').val(),
            targetType: $("#targetType").find("option:selected").html(),
            targetName: $("#targetName").find("option:selected").html(),
            outputType: $("#outputType").find("option:selected").html()
        }
    }
}

function scrollToResult() {
    var offset = $("#resultNumber").offset();

    $('html, body').animate({
        scrollTop: offset.top,
        scrollLeft: offset.left
    });
}

function onSearchResult(searchResult, from) {
    console.log("on search result");
    var to = new Date();
    var timeDiff = to - from;
    var $resultNumber = $("#resultNumber");
    var $searchResult = $("#searchResult");
    $resultNumber.text("Result: " + searchResult.logs.length + " entries ");
    $resultNumber.append("<small> " + timeDiff + " ms</small>");
    searchResult.logs.forEach(function (log, index) {
        $searchResult.append($('<div/>').text((index + 1) + " " + log.payload));
        $searchResult.append("<br>");
    });
    scrollToResult();
}

function searchDisabled(disabled, searching) {
    var $submit = $("#searchForm").find("button[type='submit']");
    $submit.prop('disabled', disabled);
    if (searching) {
        $submit.text('Searching');
        return;
    }
    $submit.text('Search');
}

function onFile(url) {
    console.log("on file");
    console.log(url);
    var fullUrl = "http://localhost:7001/log_search-1.0-SNAPSHOT/resources/download/" + url.fileName;
    console.log(fullUrl);
    document.location.href = fullUrl;
    console.log('wqeqweqweqwewqeqwe');
}

function onLogin(event) {
    event.preventDefault();
    console.log("logging in");
    $.ajax({
        type: 'POST',
        url: 'http://localhost:7001/log_search-1.0-SNAPSHOT/resources/auth/login',
        data: JSON.stringify({
            login: $("#login").val(),
            password: $("#password").val()
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: onLoginSuccess,
        error: onLoginError
    });
    return false;


    function onLoginSuccess() {
        console.log("login success");
        $("#loginDiv").hide();
        $("#logOut").show();
        userInfoRequest();
    }

    function onLoginError(event) {
        console.log("logging error");
    }
}

function userInfoRequest() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:7001/log_search-1.0-SNAPSHOT/resources/user/info',
        success: function (data) {
            console.log("user data success");
            console.log(data);
            $("#logOut").show();
            $("#logInRequestBtn").hide();
            $("#userName").text(data.userName);
            setTargetInfo(data);
            searchDisabled(false);
        },
        error: function () {
            console.log("user data error");
        }
    });
    $("#loginDiv").hide();
    $('#fromDate').datetimepicker();
    $('#toDate').datetimepicker();
}

function setTargetInfo(data) {
    var $targetType = $('#targetType');
    $targetType.empty();

    var targetTypes = Array.from(new Set(data.userPermissions.map(function (it) {
        return it.targetType;
    })));

    $.each(targetTypes, function (key, value) {
        $targetType
            .append($('<option>', {value: key})
                .text(value));
    });

    var selectedTargetType = data.userPermissions[0].targetType;
    onTargetTypeChanged(selectedTargetType, data.userPermissions);

    $targetType.on('change', function (event) {
        var targetType = $(this).find("option:selected").html();
        onTargetTypeChanged(targetType, data.userPermissions);
    })
}

function onTargetTypeChanged(targetType, permissions) {
    $('#targetName').empty();

    var currentTargets = permissions
        .filter(function (it) {
            return it.targetType == targetType
        })
        .map(function (it) {
            return it.targetName;
        });

    $.each(currentTargets, function (key, value) {
        $('#targetName')
            .append($('<option>', {value: key})
                .text(value));
    });
}

function onLogOut() {
    console.log("logging out");
    $.ajax({
        type: 'POST',
        url: 'http://localhost:7001/log_search-1.0-SNAPSHOT/resources/auth/logout',
        data: null,
        headers: {
            'Content-Type': 'application/json'
        },
        success: function () {
            console.log("logout success");
            $("#logOut").hide();
            $("#logInRequestBtn").show();
            $("#searchResult").empty();
            $("#resultNumber").empty();
            $("#targetName").empty();
            $("#targetType").empty();
            $("#pattern").val('');
            searchDisabled(true, false);
        },
        error: function () {
            console.log("logout error");
        }
    });
}

$(function () {
    console.log("loaded");
    searchDisabled(true, false);
    $("#logOut").hide();

    $("#logInRequestBtn").on('click', function (e) {
        $("#loginDiv").show();
        $(this).hide();
    });

    $("#logOutBtn").on('click', onLogOut);

    userInfoRequest();

    $('#cp4').colorpicker().on('changeColor', function (e) {
        $('body')[0].style.backgroundColor = e.color.toString(
            'rgba');
    });

    $("#searchForm").submit(onSearchSubmit);

    $("#loginForm").submit(onLogin);
});