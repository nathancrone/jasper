$(document).ready(function () {

    $("form.form-validate").validate({
        rules: {
            Code: {
                required: true
            }, 
            PhoneNumber: {
                required: true,
                phoneUS: true
            }
        },
        messages: {
            Code: {
                required: "Code is required."
            }, 
            PhoneNumber: {
                required: "Phone Number is required.",
                phoneUS: "Invalid Phone Number."
            }
        }
    });

});