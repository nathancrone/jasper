$(document).ready(function () {

    $("form.form-validate").validate({
        rules: {
            Number: {
                required: true,
                phoneUS: true
            }
        },
        messages: {
            Number: {
                required: "Phone Number is required.",
                phoneUS: "Invalid Phone Number."
            }
        }
    });

});