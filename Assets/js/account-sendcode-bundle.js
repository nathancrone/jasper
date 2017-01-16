$(document).ready(function () {

    $("form.form-validate").validate({
        rules: {
            SelectedProvider: {
                required: true
            }
        },
        messages: {
            SelectedProvider: {
                required: "Provider is required."
            }
        }
    });

});