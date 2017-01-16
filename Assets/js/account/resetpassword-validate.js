a$(document).ready(function () {

    $("form.form-validate").validate({
        rules: {
            Email: {
                required: true,
                email: true
            },
            Password: {
                required: true,
                minlength: 6
            },
            ConfirmPassword: {
                required: true,
                equalTo: "#Password"
            }
        },
        messages: {
            Email: {
                required: "Email is required.",
                email: "Invalid email."
            },
            Password: {
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