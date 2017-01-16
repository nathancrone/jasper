$(document).ready(function () {

    $("form.form-validate").validate({
        rules: {
            Email: {
                required: true
            },
            Password: {
                required: true
            }
        },
        messages: {
            Email: {
                required: "Email is required."
            },
            Password: {
                required: "Password is required."
            }
        }
    });

});