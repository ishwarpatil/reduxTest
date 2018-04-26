// import $ from 'jquery';
// import {Stripe} from 'stripe';
// import {bootbox} from 'bootbox';
//
// $(document).ready(function() {
//     // Change the key to your one
//     Stripe.setPublishableKey('pk_test_UdoRNiwa9U5z7Q1kTKjet2xR');
//
//     $('#paymentForm')
//         .formValidation({
//             framework: 'bootstrap',
//             icon: {
//                 valid: 'glyphicon glyphicon-ok',
//                 invalid: 'glyphicon glyphicon-remove',
//                 validating: 'glyphicon glyphicon-refresh'
//             },
//             fields: {
//                 fullName: {
//                     validators: {
//                         notEmpty: {
//                             message: 'The full name is required'
//                         }
//                     }
//                 },
//                 ccNumber: {
//                     selector: '[data-stripe="number"]',
//                     validators: {
//                         notEmpty: {
//                             message: 'The credit card number is required'
//                         },
//                         creditCard: {
//                             message: 'The credit card number is not valid'
//                         }
//                     }
//                 },
//                 expMonth: {
//                     selector: '[data-stripe="exp-month"]',
//                     row: '.col-xs-3',
//                     validators: {
//                         notEmpty: {
//                             message: 'The expiration month is required'
//                         },
//                         digits: {
//                             message: 'The expiration month can contain digits only'
//                         },
//                         callback: {
//                             message: 'Expired',
//                             callback: function(value, validator) {
//                                 value = parseInt(value, 10);
//                                 var year         = validator.getFieldElements('expYear').val(),
//                                     currentMonth = new Date().getMonth() + 1,
//                                     currentYear  = new Date().getFullYear();
//                                 if (value < 0 || value > 12) {
//                                     return false;
//                                 }
//                                 if (year == '') {
//                                     return true;
//                                 }
//                                 year = parseInt(year, 10);
//                                 if (year > currentYear || (year == currentYear && value >= currentMonth)) {
//                                     validator.updateStatus('expYear', 'VALID');
//                                     return true;
//                                 } else {
//                                     return false;
//                                 }
//                             }
//                         }
//                     }
//                 },
//                 expYear: {
//                     selector: '[data-stripe="exp-year"]',
//                     row: '.col-xs-3',
//                     validators: {
//                         notEmpty: {
//                             message: 'The expiration year is required'
//                         },
//                         digits: {
//                             message: 'The expiration year can contain digits only'
//                         },
//                         callback: {
//                             message: 'Expired',
//                             callback: function(value, validator) {
//                                 value = parseInt(value, 10);
//                                 var month        = validator.getFieldElements('expMonth').val(),
//                                     currentMonth = new Date().getMonth() + 1,
//                                     currentYear  = new Date().getFullYear();
//                                 if (value < currentYear || value > currentYear + 100) {
//                                     return false;
//                                 }
//                                 if (month == '') {
//                                     return false;
//                                 }
//                                 month = parseInt(month, 10);
//                                 if (value > currentYear || (value == currentYear && month >= currentMonth)) {
//                                     validator.updateStatus('expMonth', 'VALID');
//                                     return true;
//                                 } else {
//                                     return false;
//                                 }
//                             }
//                         }
//                     }
//                 },
//                 cvvNumber: {
//                     selector: '[data-stripe="cvc"]',
//                     validators: {
//                         notEmpty: {
//                             message: 'The CVV number is required'
//                         },
//                         cvv: {
//                             message: 'The value is not a valid CVV',
//                             creditCardField: 'ccNumber'
//                         }
//                     }
//                 }
//             }
//         })
//         .on('success.form.fv', function(e) {
//             e.preventDefault();
//
//             var $form = $(e.target);
//
//             // Reset the token first
//             $form.find('[name="token"]').val('');
//
//             Stripe.card.createToken($form, function(status, response) {
//                 if (response.error) {
//                     bootbox.alert(response.error.message);
//                 } else {
//                     // Set the token value
//
//                     $form.find('[name="token"]').val(response.id);
//
//                     // You can submit the form to back-end as usual
//                     // $form.get(0).submit();
//
//                     // Or using Ajax
//                     $.ajax({
//                         // You need to change the url option to your back-end endpoint
//                         url: 'response.json',
//                         data: $form.serialize(),
//                         dataType: 'json'
//                     }).success(function(data) {
//                         // Handle the response
//                         bootbox.alert(data.message);
//
//                         // Reset the form
//                         $form.formValidation('resetForm', true);
//                     });
//                 }
//             });
//         });
// });