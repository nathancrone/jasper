$(document).ready(function () {

    $.validator.addMethod("phoneUS", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/);
    }, "Please specify a valid phone number");

    $.validator.setDefaults({
        ignore: "",
        errorElement: "span",
        errorClass: "is-invalid-label form-error is-visible",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid-input");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("is-invalid-input");
        }
    });

});