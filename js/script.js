var continue_btn = document.getElementById("continue");
var edit_btn = document.getElementById("edit");
var confirm_overlay = document.getElementById('confirm');
var success_overlay = document.getElementById("success");
var error_overlay = document.getElementById("error");
var ok_btn = document.getElementById("ok_btn");
var retry_btn = document.getElementById("retry_btn");

ok_btn.onclick = function() {
    success_overlay.style.display = "none";
    error_overlay.style.display = "none";
}
retry_btn.onclick = function() {
    error_overlay.style.display = "none";
}

function GetInput() {
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
    console.log("Bulk recharge")
    var status = "true";
    if(status == "true") {
        success_overlay.style.display = "block";
    }
    else
        error_overlay.style.display = "block";
}

$(document).ready(function() {
    var readOnlyLength = $("#code").val().length;
    $('#output').text(readOnlyLength);
    $('.single-recharge-form').submit(function(e) {
        e.preventDefault();
        SingleRechargeSubmit();
        GetInput();
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
