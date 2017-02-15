function request($submit, $resultNumber, $searchResult) {
    var from = new Date();
    var data = getData();

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
        success: onSuccess,
        error: onError
    });

    function getData() {
        return {
            regexp: "weblogic",
            targetType: "server",
            targetName: "standalone_server",
            outputType: 'here'
        }
    }

    function onSuccess(response) {

        console.log("getting response");
        searchDisabled(false);
        if (data.outputType != null) {
            onFile(response);
            return;
        }
        onSearchResult(response);
    }

    function onFile(url) {
        //todo check undefined

        console.log("on file");
        console.log(url);
        var fullUrl = "http://localhost:7001/log_search-1.0-SNAPSHOT/resources/download/" + url.name;
        console.log(fullUrl);
        document.location.href = fullUrl;
        console.log('wqeqweqweqwewqeqwe');
    }

    function onSearchResult(searchResult) {
        console.log("on search result");
        var to = new Date();
        var timeDiff = to - from;
        $resultNumber.text("Result: " + searchResult.logs.length + " entries ");
        $resultNumber.append("<small> " + timeDiff + " ms</small>");
        searchResult.logs.forEach(function (log, index) {
            $searchResult.append($('<div/>').text((index + 1) + " " + log.payload));
            $searchResult.append("<br>");
        });

        scrollToResult();
    }

    function onError(event) {
        console.log("error");
        console.log(event);
        searchDisabled(false);
    }

    function scrollToResult() {
        var offset = $resultNumber.offset();

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
    }

    function searchDisabled(disabled) {
        $submit.prop('disabled', disabled);
        if (disabled) {
            $submit.text('Searching');
        }
        else {
            $submit.text('Search');
        }
    }
}

function onSearch(event) {
    event.preventDefault();
    console.log("sending request");
    var $searchResult = $("#searchResult");
    var $resultNumber = $("#resultNumber");
    $searchResult.empty();
    $resultNumber.empty();
    var $submit = $(this).find("button[type='submit']");
    $submit.prop('disabled', true);
    $submit.text('Searching');

    request($submit, $resultNumber, $searchResult);

    return false;
}

$(function () {
    console.log("loaded");

    $('#fromDate').datetimepicker();
    $('#toDate').datetimepicker();

    $('#cp4').colorpicker().on('changeColor', function (e) {
        $('body')[0].style.backgroundColor = e.color.toString(
            'rgba');
    });

    $("#searchForm").submit(onSearch);
});