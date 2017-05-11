   $(document).ready(function () {
        var json = [
        {"Name":"Dr. Salman Rauf","Email_ID":"salman.rauf@gmail.com","Number":"03334567120","Address":"DHA Medical Center Y Block"},
        {"Name":"Dr.Kiran Masood","Email_ID":"kiranmasood@hotmail.com","Number":"03214561111","Address":"National Hospital DHA"}
        ];
        var tr;
        for (var i = 0; i < json.length; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + json[i].Name + "</td>");
            tr.append("<td>" + json[i].Email_ID + "</td>");
            tr.append("<td>" + json[i].Number + "</td>");
            tr.append("<td>" + json[i].Address + "</td>");

            $('table').append(tr);
        }
    });