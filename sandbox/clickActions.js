
if (window.bluemixAnalytics) {
    analytics.track('Signed Up', {
        plan: '333'
    });
}



var link = document.getElementById('BUUttCli11');

analytics.trackLink(link, 'Clicked Free-Trial Link', {
    plan: 'Enterprise'
});



/**
 * Created by alavigne on 2016-11-10.
 */

/* common code used by all 'trial' pages */



// constants related to user form analytics
var UFA = {
    // reference to common analytics object utility methods.  It is assumed
    // that the analytics javascript will have been loaded.
    // the properties below will show up in segment and amplitude.
    PAGE: 'registration', // ufa event for the registration page,
    SUBMIT_BUTTON: 'submit button',
    LINK_CLICKED: 'link clicked',
    EVENT_FILLED: 'field filled',
    EVENT_ERROR: 'validation error',
    EVENT_SUBMIT: 'form submit',
    EVENT_SUBMIT_FAIL: 'form submit failed',
    INIT : 'page init',
    INIT_FAIL: 'page init failed'
};
if (window.bluemixAnalytics) {
    UFA.analytics = window.bluemixAnalytics;
}
if (!UFA.analytics) {

    UFA.analytics = {trackUserAction: function NoOP(){
        if (arguments.length > 4) {
            // directly invoke the callback;
            var callback = arguments[4];
            callback();
        }
    }};
}


/**
 *
 * setup_form_analytics
 *
 * initialize/setup the tracking for user form analytics
 *
 * inputFieldNames - array of input field name values to which to attach analytics events.  This
 * method will attach listeners to detect when user leaves these input fields, then to fire track events if they've
 * left with a field that has been left filled with some input.   These values need to match the
 * 'name' attribute of the input fields in the registration form.
 *
 */

function setup_form_analytics(inputFieldNames) {
    function fieldNotEmpty(field) {
        return ($(field).val().trim().length > 0);
    }

    var i;
    for (i = 0; i < inputFieldNames.length; i++) {
        var fieldSelector = 'input[name=' + inputFieldNames[i] + ']';
        (function (j) {
            $(fieldSelector).on('focusout', function (e) {
                // if the user is leaving the field and it is not empty, record as a field filled user event.
                if (fieldNotEmpty(e.target)) {
                    UFA.analytics.trackUserAction(UFA.PAGE, inputFieldNames[j], UFA.EVENT_FILLED, UFA.EVENT_FILLED);
                }
            });
        })(i);
    };

    // now add a listener for the country selector (if there's no country selector on this page, this
    // code won't do anything).
    $('select[name=countryCode]').on('change', function (e) {
        // if the user is leaving the field and it is not empty, record as a field filled user event.
        if (fieldNotEmpty(e.target)) {
            UFA.analytics.trackUserAction(UFA.PAGE, 'countryCode', UFA.EVENT_FILLED, UFA.EVENT_FILLED);
            console.log('Yes In 01');
        }
    });
}


function getQueryParameters() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


/**
 Error message used when validating form fields
 **/

var error_messages = {
    'missing_required_field': 'missing_required_field',
    'invalid_email_address': 'invalid_email_address',
    'email_already_registered': 'email_already_registered',
    'email_not_registered': 'email_not_registered',
    'invalid_character_in_password': 'invalid_character_in_password',
    'password_too_short': 'password_too_short',
    'password_too_long': 'password_too_long',
    'passwords_dont_match': 'passwords_dont_match',
    'invalid_phone_number': 'invalid_phone_number',
    'company_length_err': 'company_length_err',
    'password_length_err': 'password_length_err',
    'id_in_password': 'id_in_password',
    'password_no_alpha':'password_no_alpha',
    'password_no_special':'password_no_special',
    'password_no_upper': 'password_no_upper',
    'password_no_digit': 'password_no_digit',
    'invalid_confirmation_code': 'invalid_confirmation_code'
};


/**
 Regular expressions used when validating form fields
 **/
var _regexp = {
    numeric: "^[0-9]*$",
    email: "^([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+" + "([\\(]{1}[!#-'*+\\-\\/-9=?A-Z^-~]+[\\)]{1}){0,}[!#-'*+\\-\\/-9=?A-Z^-~]{0,}" + "\\@[a-zA-Z0-9]+([a-zA-Z0-9]*\\-[a-zA-Z0-9]+)*(([.]|\\_)([a-zA-Z0-9]+)(\\-[a-zA-Z0-9]+)*)*[.]([a-zA-Z]*|museum|travel)$",
    emailExcludeChars: "[$+?&#*]",
    passwordAllowedChars: "^[A-Za-z0-9-_.@]+$",
    ibmId: "^([!$&\\x5D\\x5B#-'+\\-\\/-9=?A-Z^-~]+[.])*[!$&\\x5D\\x5B#-'+\\-\\/-9=?A-Z^-~]+" + "([\\(]{1}[!$&\\x5D\\x5B#-'+\\-\\/-9=?A-Z^-~]+[\\)]{1}){0,}[!$&\\x5D\\x5B#-'+\\-\\/-9=?A-Z^-~]{0,}" + "\\@[a-zA-Z0-9]+([a-zA-Z0-9]*\\-[a-zA-Z0-9]+)*(([.]|\\_)([a-zA-Z0-9]+)(\\-[a-zA-Z0-9]+)*)*[.]([a-zA-Z]{2,4})$",
    url: "^(notes|http(s?))://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9()-.?,'/\\+=@&amp;%$#_]*)?$",
    urlProtocol: "^(notes|http(s?))://",
    phone1: "^(\\+|00)(( )*\\(([. -~]*[0-9]+[. -~]*)+\\))?([. -~]*[0-9]+[. -~]*)+((\\(([. -~]*[0-9]+[. -~]*)+\\))?([. -~]*[0-9]+[. -~]*)*)*$",
    phone2: "^((\\(([1-9]\\d{2})\\))|([1-9]\\d{2}))[ -.~]?(\\d{3})[ -.~]?(\\d{4})$",
    phone3: "^[0-9]+([ ]*[-~]?[ ]*[0-9]+)*$",
    alphaNumericWithSpecialChar: "^([a-zA-Z0-9]+((([ ]?[-][ ]?)|[_]|[ ]|([ ]?['][ ]?)|([ ]?[.][ ]?)|([ ]?[&][ ]?)|([ ]?[~][ ]?)|" + "([ ]?[!][ ]?)|([ ]?[#][ ]?)|([ ]?[$][ ]?)|([ ]?[*][ ]?)|([ ]?[+][ ]?)|([ ]?[=][ ]?))?[a-zA-Z0-9]+)*([.]|['])?)$"
};


/*
 Check if an input field is empty.
 */
function validate_required(input) {
    if (!input.val() || input.val().trim().length === 0) {
        return 'missing_required_field';
    }
}

function validate_none(input) {
    return;
}

/**
 common/shared form validation functions
 */

function _selectRegexForPhoneNumber(_c) {

    if (_c.substring(0, 1) === '+' || _c.substring(0, 2) === '00') {
        return _regexp.phone1;
    } else {
        if (_c.indexOf('(') !== -1 || _c.indexOf('.') !== -1) {
            return _regexp.phone2;
        } else {
            return _regexp.phone3;
        }
    }

}


function validate_phone_number(item) {

    var valid = false;
    var phone_number = $(item).val().replace(/\s+/g, '');

    if (phone_number.length > 9) {
        var exp = new RegExp(_selectRegexForPhoneNumber(phone_number));
        valid = exp.test(phone_number);
    }

    if (!valid) {
        return error_messages.invalid_phone_number;
    }

}


function validate_email(input) {

    //Sanity check, must be something in the field
    if (validate_required(input)) {
        return validate_required(input);
    }

    var emailAddress = input.val().trim();
    var error = false;

    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var is_email = re.test(emailAddress);
    if (!is_email) {
        error = true;
    }

    //Additional E-mail validations (remainder of the function, defect 106088)
    var reg_basic = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!reg_basic.test(emailAddress)) {
        error = true;
    }

    //Validation based on UAA requirement:
    if (!/^[a-zA-Z0-9+\-_.@'!]+$/.test(emailAddress)) {
        error = true;
    }

    // IBM ID require the email to have two level of domain
    if (domain_levels(emailAddress) < 2) {
        error = true;
    }

    if (error) {
        return error_messages.invalid_email_address;
    }

}

var confirmationCodeIsValidating = false; // cc validation is in progress
var confirmationCodeIsValidated = false; // cc validation has been completed
var confirmationCodeIsInvalid = false; // is the current confirmation code correct/valid?

function validate_confirmation_code() {

    var validate_confirmation_code_complete = function(valid) {
        confirmationCodeIsValidating = false;
        confirmationCodeIsValidated = true;
        $('div.content-area').attr('data-user-type', "NEW"); // (resets c code spinner)
        clear($("#confirmationCode input")); // clears any existing validation decoration

        if (valid) {
            confirmationCodeIsInvalid = false;
            $('#confirmationCode').addClass('valid'); // sets it to a green checkmark.
            enable_submit();  // kick the function that enables/disables the submit button.
        } else {
            confirmationCodeIsInvalid = true;
            $('#confirmationCode').addClass('error');
            $('#confirmationCode span[data-message="invalid_confirmation_code"]').addClass('visible');
            set_submit_button_state(false); // submit button always false if conf code is invalid.
        }
    };

    var otp = $('input[name="confirmationCode"]').val();

    if (otp.length == 0) {
        return error_messages.missing_required_field;
    }

    // has the confirmation code already been validated by a previous invocation?
    if (confirmationCodeIsValidating) {
        return "pending";
    }

    if (confirmationCodeIsValidated) {
        return confirmationCodeIsInvalid;  // we've already checked.  return the cached value.  false = valid, true = invalid.
    }

    confirmationCodeIsValidating = true;  // prevents multiple calls to the asynchronous check.

    $('#confirmationCode').removeClass('error');
    $('#confirmationCode').removeClass('valid');

    $('div.content-area').attr('data-user-type', "CHECKING"); // set spinner in conf code spinning

    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: idaasAPI + window.idaas.location,
        xhrFields: {
            withCredentials: true
        },
        success: function (data, textStatus, jqXHR) {
            validate_confirmation_code_complete(true);
        },
        error: function (request, status, error) {
            validate_confirmation_code_complete(false);
        },
        dataType: 'json',
        data: JSON.stringify({"otp.user.otp": otp, "otp.user.otp-hint": ""})
    });

    // return 'pending' to prevent the validation caller from decorating before we know what
    // the validation result is. The xhr responses above will finally set the decoration when it comes back.
    return "pending";

}

/* a simpler, non idaas-integrated version of the check confirmation code.  Some of the linking screens
 use this version, some use the fancier version above.
 */
function validate_confirmation_code_simple() {

    var field_name = 'confirmationCode';

    //Clear all errors
    $('#' + field_name).removeClass('error');
    $('#' + field_name).removeClass('valid');
    $('#' + field_name + ' .visible').removeClass('visible');

    var input = $('#confirmationCode input');

    var error;

    if (!$(input).val() || $(input).val().trim().length === 0) {

        error = 'missing_required_field';

        var error_element_query = '#' + field_name + ' > ' + ' span[data-message="' + error + '"]';
        $(error_element_query).addClass('visible');

        //Highlight the field in red.
        $('#' + field_name).addClass('error');

    } else {
        $('#' + field_name).addClass('valid');

    }

    return error;
}

var PASSWORD_MAX_LENGTH = 31;
var PASSWORD_MIN_LENGTH = 8;
var COMPANY_MAX_LENGTH = 128;


//validate the password field
function validate_password(input){
    var password = input.val();
    var passwordField = $('input[name=password]');
    var secondPassword = $('input[name=secondPassword]');
    var emailAddress = $('input[name=email]');
    //requirements for a valid password
    const requirements = {
        alpha: 1,
        length: 8,
        max: 31,
        number: 1,
        special: 1,
        upper: 1,
        allowedCharacters: 'a-zA-Z0-9',
        allowedSpecial: '_\\-|@.,/!~#$%^&*()}[\\]\\=\\.\\+\','
    };
    //match any of each requirements from the input value
    const alpha = password.match(/[a-z]/g) || [];
    const upper = password.match(/[A-Z]/g) || [];
    const number = password.match(/\d/g) || [];
    const special = password.match(/[^a-zA-Z0-9]/g) || [];

    //define our list of valid special characters
    const whiteListCharacters = new RegExp("^[" + requirements.allowedCharacters + requirements.allowedSpecial + "]+$");
    //checks for validity

    //not empty
    if(password === ""){
        return error_messages.missing_required_field;
    }
    //passwords match
    if (passwordField.val() !== secondPassword.val() && input.attr('name') === 'secondPassword'){
        return error_messages.passwords_dont_match;
    }
    //not illegal
    if (!whiteListCharacters.test(password)) {
        return error_messages.invalid_character_in_password;;
    }
    //too short or too long
    if (password.length < requirements.length || password.length > requirements.max) {
        return error_messages.password_length_err;
    }
    //at least one lower
    if (alpha.length < requirements.alpha) {
        return error_messages.password_no_alpha;
    }
    //at least one upper
    if (upper.length < requirements.upper) {
        return error_messages.password_no_upper;
    }
    //at least one number
    if (number.length < requirements.number) {
        return error_messages.password_no_digit;
    }
    //at least one special
    if (special.length < requirements.special) {
        return error_messages.password_no_special;
    }
    //email address is not in password
    if (emailAddress && passwordField.val().indexOf(emailAddress.val()) > -1) {
        return error_messages.id_in_password;
    }
}






/*
 Pre-condition: Company name has a max of 128 characters.
 */
function validate_company(input) {

    //Candidate company
    var company = $(input).val();

    /* Check length */
    if (company.length > COMPANY_MAX_LENGTH) {
        return error_messages.company_length_err;
    }
}



/*
 get_all_fields

 Get a list of all the form fields on the page

 returns a set of jquery elements
 */
function get_all_fields() {
    return $('.ibm-id-fields :input,#email :input,#confirmationCode :input');
}




/**
 form validation styling/treatment routines
 */

/**
 * Common form field decoration clear method.
 * Remove all decorations from a given field (input/select)
 */
function clear(field) {

    //Map the input element to it's parent form box
    var name = field.attr('name');
    var parent = $('#' + name);

    //Remove error marker(s)
    parent.removeClass('error');
    $('#' + name + ' span.error').removeClass('visible');


    //Remove success marker
    parent.removeClass('valid');

    if (field.attr('type') === 'email') {
        field.next().removeClass('hidden');
    }
}

/**
 * Common form field decoration method.
 *
 * An input/select field has been changed. Add a decoration (checkmark, error marker) to it.
 */
function decorate(field) {
    clear(field);

    var field_name = field.attr('name');
    var constraint = config.constraints[field_name];
    if (!constraint) {
        return;
    }

    var error = constraint(field);

    if (error == 'pending') {
        // special case for handling asynchronous validations.
        return;
    }

    if (field.attr('type') === 'email') {
        field.next().addClass('hidden');
    }

    if (error) {
        $('#' + field_name).addClass('error');
        $('#' + field_name + " span[data-message=" + error + "]").addClass('visible');

        // we have a validation error.  track this as user form analytics event.
        UFA.analytics.trackUserAction(UFA.PAGE, $(field).attr('name'), UFA.EVENT_ERROR, error);
    } else {
        $('#' + field_name).addClass('valid');
    }

    return error;

}

/**
 * Common "form submitted" variable.
 */

var form_submitted = false;

/**
 * Common form validation method.  Validate the form before submitting, adding decorators where necessary.
 * Suitable for most pages in the registration microservice.
 *
 * email_editable - if true, indicates that the email field on the page's form is editable.  We have
 * special validation behavior in this case: if there's an error with the e-mail field, we want to
 * decorate it only and leave the other fields undecorated (with error indications).
 */

function is_valid_form(email_editable){

    var valid = true;
    var error;

    if (email_editable) {
        // email field is special.  if there's an error with the e-mail field, we want to
        // decorate it only and leave the other fields undecorated with error indications.
        var emailField = $("input[name='email']");
        error = decorate(emailField);
    }

    if (error) { // error with email field?
        valid = false;
    } else {
        var form_elements = $('.form-entry input,.form-entry select');
        var visible_form_elements = form_elements.filter(':visible');
        visible_form_elements.each(function (index) {
            var error = decorate($(this));
            valid = valid && !error;
        });
    }

    return valid;
}



/** methods having to do with the state / styling of the form submit button **/

/*
 set_submit_button_state

 Set the submit button's state.

 Set the parent of the submit btn to ignore the mouse events

 Parameters:

 enabled - if true, enable submit button.  otherwise, disable submit button.
 */
function set_submit_button_state(enabled) {
    var submit_button_area = $('.register-btn-area');
    var submit_button = $('#register-user');

    if (enabled) {
        submit_button_area.removeClass('disabled');
        submit_button.css('pointer-events', 'all');
    } else {
        submit_button_area.addClass('disabled');
        submit_button.css('pointer-events', 'none');
    }
}

/*

 Validate all visible fields on the form, add error decoration where necessary,
 and enable/disable the submit button depending on results of validation check.

 */
function enable_submit() {

    var valid = true;

    // start off with the button in an enabled state.
    set_submit_button_state(true);

    // iterate through the form's fields, looking to see if any fail validation.
    get_all_fields().filter(':visible').each(function (index) {
        var field_name = $(this).attr('name');
        var constraint = config.constraints[field_name];
        if (constraint) {
            var error = constraint($(this));

            if (error == 'pending') {
                error = true;  // pending is the same as an error for the case of enabling the submit button.
            }

            valid = valid && !error;
        }
    });
    // get the captcha
    if (grecaptcha) {
        var captcha = grecaptcha.getResponse();
        valid = valid && captcha.length > 0;
    }

    if (!valid) {
        // if form is not valid, submit button should be disabled.
        set_submit_button_state(false);
    }

}


/* prevent auto-submission of forms (happens on some browsers)
 * put this in an onSubmit handler in forms */
function preventSubmit(event) {
    event.preventDefault();
    return false;
}


/**
 * Common checks and work that needs to be done before any form submits.
 * If this method returns null, the form should not be submitted.
 *
 * returns: a form_data object if form submit should proceed, null if not.
 */
function submit_prep() {

    if (form_submitted) {
        return null;
    }

    if (!is_valid_form()) {
        // user attempting to submit an invalid form.  track this as user form analytics event.
        UFA.analytics.trackUserAction(UFA.PAGE, UFA.SUBMIT_BUTTON, UFA.EVENT_SUBMIT_FAIL, "form invalid");
        return null;
    }

    // user submitted a valid form.  track this as user form analytics event.
    UFA.analytics.trackUserAction(UFA.PAGE, UFA.SUBMIT_BUTTON, UFA.EVENT_SUBMIT, "form valid");

    form_submitted = true;

    show_page_processing();

    //Copy form data into the data structure
    var form_data = {};

    $(':input[name]').each( function (index) {
        if ($(this).is(':checkbox')) {
            form_data[this.name] = $(this).is(':checked');
        } else {
            form_data[this.name] = $(this).val();
        }
    });

    return form_data;
}


/**
 * standard init method.  To be called in the ready method of all variants of the
 * registration page.
 *
 * param init_data : object containing parameters used to guide the initialization.
 * expected contents:
 *
 * {
 *     UFA_tracked_fields: array, // array  of (strings) of the fields to track for analytics
 *     UFA_page_name_qualifier: string, // a string qualifier to append to UFA track events for this page (so that
 *                                      // we can distinguish track events between the different flavors of registration page).
 *     per_keystroke_validation_exclude: string, // a string containing selectors identifying fields to be EXCLUDED from
 *                                               // per-keystroke form validation (OPTIONAL)
 * }
 */

function page_init(init_data) {

    // if the page wants to exclude certain fields from per-keystroke form validation,
    // they can do that by specifying the appropriate css selector(s) in the following param.
    var per_keystroke_validation_exclude = init_data.per_keystroke_validation_exclude;
    if (!per_keystroke_validation_exclude) {
        per_keystroke_validation_exclude = "";  // default is no exclusion.
    }

    /* call enable_submit on every keystroke to dynamically enable submit button as necessary */
    $(":input").not(per_keystroke_validation_exclude).keyup(function (e) {
        enable_submit();
    });

    // Typing in a field clears the current decoration
    $(":input").on('keyup paste', function (e) {
        if (e.keyCode != 9) { // do not clear when user inputs a 'tab'
            clear($(this));
        }
    });

    // Changing a field means we should revalidate (except e-mail, which is special
    // and has separate special validation).
    get_all_fields().not('#email :input').on('focusout', function () {
        decorate($(this));
        enable_submit($(this));
    });

    // register a click handler on the form's submit button.
    $('.register-btn-area').click(function () {
        var disabled = $(this).hasClass('disabled');
        var processing = $(this).hasClass('processing');

        if (disabled || processing) return;

        submit();
    });

    // further qualify the user form analytics tag for this page
    if (init_data.UFA_page_name_qualifier) {
        UFA.PAGE += ' ' + init_data.UFA_page_name_qualifier;
    }

    // instrument the page's form for UFA (user form analytics)
    if (!init_data.UFA_tracked_fields) {
        init_data.UFA_tracked_fields = [];
    }
    setup_form_analytics(init_data.UFA_tracked_fields);

}


/**
 * common method to add extra tracking data to registration form submissions
 *
 * @param - form_data : reference to the form to which to add tracking data
 * @param - switches : variable set of 'switch' parameters.  Presence of a parameter turns on
 * the tracking for that property (based on the string value of the param).  Possible parameter values:
 * 'cm_mmc', 'ibm_unique_id', 'BLUISS', 'ajs_anonymous_id'
 *
 * e.g. addFormTrackingData(data, 'cm_mmc', 'BLUISS' );
 */

function addFormTrackingData(form_data) {

    var args = Array.prototype.slice.call(arguments);

    var contains = function(s) {
        if (args.indexOf(s)!=-1) { return true; }
        return false;
    };

    if (contains('ibm_unique_id')) {
        var ibm_unique_id = getQueryParameters()['ibm_unique_id'];
        if (ibm_unique_id) {
            form_data.ibmUniqueID = ibm_unique_id;
        }
    }

    if (contains('BLUISS')) {
        var wiProfileId = $.cookie('BLUISS');
        if (wiProfileId) {
            form_data.wiProfileId = wiProfileId;
        }
    }

    if (contains('ajs_anonymous_id')) {
        var anonymousId = $.cookie('ajs_anonymous_id');
        if (anonymousId) {
            form_data.anonymousId = anonymousId.slice(1, -1);
        } else if (window.analytics && window.analytics.user && (typeof window.analytics.user == 'function')) {
            form_data.anonymousId = window.analytics.user().anonymousId();
        }
    }
}

/**
 * Coremetrics analytic event routines
 *
 */

const CM_EVENT_NAME = 'ConversionEvent';
const CM_EVENT_ID = 'ICE - cloudoev2';
const CM_EVENT_CATEGORY_ID ='ICE Trial Sign Up';

function _publish_cm_event(type, data) {
    if (!window._$ || !window._$) {
        return;
    }
    window._$.publish(type, data);
}


/**
 * emitCMEvent
 *
 * Emit a core metrics event for the loading/submission of the page.
 *
 * @param type - '1' for a page load, '2' for a page submit.
 * @param cm_event_id - core metrics event id for this page's initialization
 *  (OPTIONAL, defaults to CM_EVENT_ID)
 */
function emitCMEvent(type, cm_event_id) {

    if (!cm_event_id) {
        cm_event_id = CM_EVENT_ID;
    }

    try {
        window._$.publish(CM_EVENT_NAME, {
            eventID: cm_event_id,
            actionType: type,
            eventCategoryId: CM_EVENT_CATEGORY_ID
        });
    } catch (err) {
        console.log('Error registering event with coremetrics: ' + err);
    }
}

/** convenience routines for page load/page submit **/
function emitCMEventForPageLoad(cm_event_id) {
    emitCMEvent('1', cm_event_id);
}

function emitCMEventForPageSubmit(cm_event_id) {
    emitCMEvent('2', cm_event_id);
}


/**
 * dispatch a 'registers' event to the bluemix analytics microservice
 */

function emitAnalyticsUServiceEvent() {
    var event;
    if (typeof window.Event === 'function') {
        event = new Event('registers');
    } else {
        event = document.createEvent('Event');
        event.initEvent('registers', true, false);
    }
    document.dispatchEvent(event);
}

/**
 * redirectTo
 *
 * perform a redirect
 *
 * @param url
 */
function redirectTo(url) {
    window.location = url;
}


/**
 * show_page_processing/hide_page_processing
 *
 * show/hide a full page "processing" treatment.
 */

function show_page_processing() {
    $('#registering').removeClass('hidden');
}

function hide_page_processing() {
    $('#registering').addClass('hidden');
}


/** --- execution --- **/

function jsonToQueryString(json) {
    return Object.keys(json).map(function(key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    }).join('&');
}

/* Find the number of domain levels in an e-mail address */
function domain_levels(address) {
    var levels = 2;
    try {
        var parts = address.split('@');
        var name = parts[0];
        var domain = parts[1];
        length = domain.split('.').length;
    } catch (err) {
        // console.log('Issue with address: ' + address);
    }
    return length;
}
