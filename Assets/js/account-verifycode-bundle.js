$(document).ready(function () {

    $("form.form-validate").validate({
        rules: {
            Provider: {
                required: true
            },
            Code: {
                required: true
            }
        },
        messages: {
            Provider: {
                required: "Provider is required."
            },
            Code: {
                required: "Code is required."
            }
        }
    });

});