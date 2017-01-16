$(document).ready(function () {

    $("form.form-validate").validate({
        rules: {
            OldPassword: {
                required: true
            },
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
            OldPassword: {
                required: "Current Password is required."
            },
            NewPassword: {
                required: "Comfirm password is required.",
                minlength: "The new password must be at least 6 characters long."
            },
            ConfirmPassword: {
                required: "Comfirm password is required.",
                equalTo: "The password and confirmation password do not match."
            }
        }
    });

});