$(document).ready(function () {

    $("form.form-validate").validate({
        rules: {
            NewPassword: {
                required: true,
                minlength: 6
            },
            ConfirmPassword: {
                required: true,
                equalTo: "#Password"
            }
        },
        messages: {
            NewPassword: {
                required: "Password is required.",
                minlength: "The password must be at least 6 characters long."
            },
            ConfirmPassword: {
                required: "Comfirm password is required.",
                equalTo: "The password and confirmation password do not match."
            }
        }
    });

});