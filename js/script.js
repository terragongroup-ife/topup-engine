//for history, single-recharge, bulk-recharge pages
var history_page = document.getElementById("history-page"); 
var single_recharge_page = document.getElementById("single-recharge-page"); 
var bulk_recharge_page = document.getElementById("bulk-recharge-page"); 

// var history_btn = document.getElementById("show-history");
//for confirm, success, error overlay
var continue_btn = document.getElementById("continue");
var edit_btn = document.getElementById("edit");
var confirm_overlay = document.getElementById("confirm-overlay");
var success_overlay = document.getElementById("success-overlay");
var error_overlay = document.getElementById("error-overlay");
var ok_btn = document.getElementById("ok_btn");
var retry_btn = document.getElementById("retry_btn");

//for history page
var single_r_history_btn = document.getElementById("single-r-history-btn");
var bulk_r_history_btn = document.getElementById("bulk-r-history-btn");
var single_history_page = document.getElementById("single-recharge-history");
var bulk_history_page = document.getElementById("bulk-recharge-history");


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

function showHistory() {
    history_page.style.display = "block";
    single_recharge_page.style.display = "none";
    bulk_recharge_page.style.display = "none";
}

function showSingleHistory() {
    single_history_page.style.display = "block";
    bulk_history_page.style.display = "none";   
}

function showBulkHistory() {
    bulk_history_page.style.display = "block";
    single_history_page.style.display = "none";   
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
    document.getElementById("amount_input").innerHTML = `${document.getElementById("amount").value}`;
    document.getElementById("operator_input").innerHTML = (document.getElementById("operator").value).toUpperCase();
}

function SingleRechargeSubmit() {
    confirm_overlay.style.display = "block";
    var status = "true";
    continue_btn.onclick = function() {
            // $("#loader").show();
        confirm_overlay.style.display = "none";
        if(status == "true"){
            success_overlay.style.display = "block";
        }
        else {
            error_overlay.style.display = "block";
        }
    }
    edit_btn.onclick = function() {
        confirm_overlay.style.display = "none";
    }
}

function BulkRechargeSubmit() {
    // $("#loader").show();
    let status = true;
    if(status === true) {
        success_overlay.style.display = "block";
    }
    else
        error_overlay.style.display = "block";
}

