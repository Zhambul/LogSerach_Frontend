<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Log Search</title>

    <script src="https://code.jquery.com/jquery-2.2.4.min.js"
            integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.45/js/bootstrap-datetimepicker.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.5.1/js/bootstrap-colorpicker.min.js"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossorigin="anonymous">

    <link rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.45/css/bootstrap-datetimepicker.css"/>

    <link rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.5.1/css/bootstrap-colorpicker.css"/>
    <script src="js/main.js"></script>
</head>
<body>

<div class="container">

    <div class="page-header">
        <h1>Log Search
            <small>slow but sure</small>
        </h1>
    </div>

    <a href="#" class="btn btn-default" id="cp4">Change background color</a>
    <a id="myUrl" href="qwewqeqwe"></a>

    <form id="searchForm">

        <div class="form-group">
            <label for="pattern">Pattern</label>
            <input type="text" class="form-control"
                   id="pattern"
                   name="pattern"
                   placeholder="Enter pattern">
        </div>

        <div class="form-group">
            <label for="targetType">Target Type</label>
            <select class="form-control" id="targetType" name="targetType">
                <option>domain</option>
                <option>cluster</option>
                <option>server</option>
            </select>
        </div>

        <div class="form-group">
            <label for="targetName">Target Name</label>
            <input type="text" class="form-control"
                   id="targetName"
                   name="targetName"
                   placeholder="Enter target name">
        </div>

        <div class="form-group">
            <label for="outputType">Output</label>
            <select class="form-control" id="outputType" name="targetType">
                <option>here</option>
                <option>xml</option>
                <option>html</option>
                <option>log</option>
                <option>pdf</option>
                <option>doc</option>
                <option>rtf</option>
            </select>
        </div>

        <label>From Date</label>
        <div class='input-group date' id='fromDate'>
            <input type='text' class="form-control" name="fromDate"/>
            <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
        </div>

        <br>

        <label>To Date</label>
        <div class='input-group date' id='toDate'>
            <input type='text' class="form-control" name="toDate"/>
            <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
        </div>
        <br>

        <button type="submit" class="btn btn-primary">Search</button>
    </form>

    <h2 id="resultNumber"></h2>
    <div id="searchResult"></div>
</div>

</body>
</html>
