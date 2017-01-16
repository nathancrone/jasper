$(document).ready(function () {

    $("form.form-validate").validate({
        rules: {
            Email: {
                required: true,
                email: true
            }
        },
        messages: {
            Email: {
                required: "Email is required.",
                email: "Invalid email."
            }
        }
    });
});