//for history, single-recharge, bulk-recharge pages
var history_page = document.getElementById("history-page"); 
var single_recharge_page = document.getElementById("single-recharge-page"); 
var bulk_recharge_page = document.getElementById("bulk-recharge-page"); 

//for confirm, success, error overlay
var continue_btn = document.getElementById("continue");
var edit_btn = document.getElementById("edit");
var confirm_overlay = document.getElementById("confirm-overlay");
var success_overlay = document.getElementById("success-overlay");
var error_overlay = document.getElementById("error-overlay");
var ok_btn = document.getElementById("ok_btn");
var retry_btn = document.getElementById("retry_btn");

function showSingleRecharge() {
    single_recharge_page.style.display = "block";
    history_page.style.display = "none";
    bulk_recharge_page.style.display = "none";
}

function showBulkRecharge() {
    bulk_recharge_page.style.display = "block";
    history_page.style.display = "none";
    single_recharge_page.style.display = "none";
}

var isHistoryClicked = false;
function showHistory() {
    history_page.style.display = "block";
    single_recharge_page.style.display = "none";
    bulk_recharge_page.style.display = "none";
    if(isHistoryClicked === false) {
    fetch('http://localhost:8080/history', {
        method: 'GET'
    })
    .then(response => response.json())
    .then((data)=>{
        const history_arr = data;
        
        $("#s-table").prepend('<h2>'+history_arr[0].day+'</h2>');
        $("#s-table").append('<table style="font-weight: bold">'+'<tr><td class="time">'+'TIME'+'</td><td class="msisdn">'+'MSISDN'+'</td><td class="amount">'+
        'AMOUNT'+'</td><td class="operator">'+'OPERATOR'+'</td><tr>'+'</table>');
        for (let i in history_arr){
            if(history_arr[i].day == history_arr[0].day) {
                if(history_arr[i].type == "single") {
                    $('#s-table').append('<table>'+'<tr><td class="time">'+history_arr[i].time+'</td><td class="msisdn">'+history_arr[i].mobile+'</td><td class="amount">'+
                    history_arr[i].amount+'</td><td class="operator">'+history_arr[i].operator+'</td><tr>'+'</table>');
                }
                else {
                    $('#s-table').append('<table>'+'<tr><td class="time">'+history_arr[i].time+'</td><td class="title">'+history_arr[i].title+'</td><td class="amount">'+'</td><td class="operator">'+'</td><tr>'+'</table>');
                }
            }
            else {
                if(history_arr[i].day !== history_arr[i-1].day){
                    $('#s-table').append('<h2>'+history_arr[i].day+'</h2');
                    $("#s-table").append('<table style="font-weight: bold">'+'<tr><td class="time">'+'TIME'+'</td><td class="msisdn">'+'MSISDN'+'</td><td class="amount">'+
                    'AMOUNT'+'</td><td class="operator">'+'OPERATOR'+'</td><tr>'+'</table>');
                }

                if(history_arr[i].type == "single") {
                    $('#s-table').append('<table>'+'<tr><td class="time">'+history_arr[i].time+'</td><td class="msisdn">'+history_arr[i].mobile+'</td><td class="amount">'+
                    history_arr[i].amount+'</td><td class="operator">'+history_arr[i].operator+'</td><tr>'+'</table>');
                }
                else {
                    $('#s-table').append('<table>'+'<tr><td class="time">'+history_arr[i].time+'</td><td class="title">'+history_arr[i].title+'</td><td class="amount">'+'</td><td class="operator">'+'</td><tr>'+'</table');
                }
            }
        }
    })
   
    document.body.removeEventListener('click', showHistory);
    }
    isHistoryClicked = true;
}

$(document).ready(function() {
    var readOnlyLength = $("#code").val().length;
    $('#output').text(readOnlyLength);
    $('.single-recharge-form').submit(function(e) {
        e.preventDefault();
        SingleRechargeSubmit();
        GetInputs();
        return false;
    });

    $('.bulk-recharge-form').submit(function(e) {
        e.preventDefault();
        BulkRechargeSubmit();
        return false;
    });
    
    $('#code').on('keypress, keydown', function(event) {
        var $number = $(this);
        $('#output').text(event.which + '-' + this.selectionStart);
        if ((event.which != 37 && (event.which != 39))
            && ((this.selectionStart < readOnlyLength)
            || ((this.selectionStart == readOnlyLength) && (event.which == 8)))) {
            return false;
        }
    });  
})


ok_btn.onclick = function() {
    success_overlay.style.display = "none";
    error_overlay.style.display = "none";
}
retry_btn.onclick = function() {
    error_overlay.style.display = "none";
}

function GetInputs() {
    document.getElementById("number_input").innerHTML = `0${document.getElementById("number").value}`;
    document.getElementById("amount_input").innerHTML = `${document.getElementById("amount").value}`/100;
    document.getElementById("operator_input").innerHTML = (document.getElementById("operator").value).toUpperCase();
}

function SingleRechargeSubmit() {
    confirm_overlay.style.display = "block";
    continue_btn.onclick = function() {
        confirm_overlay.style.display = "none";
    fetch('http://localhost:8080/recharge', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "mobile": "0" + $('#number').val(),
            "amount": $('#amount').val(),
            "operator": $('#operator').val(),
            "genuine": true,
            "email": "oadetimehin@terragonltd.com"
        })
    })
    .then(response => response.json())
    .then((resp)=>{
        if(resp.data.status === true) {
            success_overlay.style.display = "block";
            document.getElementById("approved_amount").innerHTML = resp.data.ApprovedAmount;
            document.getElementById("balance").innerHTML = resp.data.Balance;
        }
        else {
            error_overlay.style.display = "block";
            document.getElementById("message").innerHTML = resp.data.message;
        }
    })
    .catch((err) => {
        error_overlay.style.display = "block";
        document.getElementById("message").innerHTML = "Unable to connect to server";
    })
    }
    edit_btn.onclick = function() {
        confirm_overlay.style.display = "none";
    }
}

function BulkRechargeSubmit() {
    if(status === true) {
        success_overlay.style.display = "block";
    }
    else
        error_overlay.style.display = "block";
}

function searchHistory() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    table = document.getElementById("s-table");
    tr = table.getElementsByTagName("table");
    for (i = 0; i < tr.length; i++) {
      tr[i].style.display = "none";
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++) {
        cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            break;
        } 
      }   
    } 
    }
}