document.addEventListener("DOMContentLoaded", function () {
  let formId = getFormByAction() || "create_customer";
  let allowedCountries = "all";
  let allowedCountriesArray = allowedCountries
    .split(",")
    .map(c => c.trim());  
  var createCustomerButton = document.querySelector(`#${formId} button`);
  createCustomerButton.id = "moAccountCreate";
  var createCustomerButton = document.querySelector(`#${formId} button`);
  createCustomerButton.type = "button";
  var createCustomerInputs = document.querySelectorAll(`#${formId} input`);
  for (var i = 0; i < createCustomerInputs.length; i++) {
    createCustomerInputs[i].onkeyup = function () {
      saveValue(this);
    };
  }
  document.getElementById("moAccountCreate").disabled = true;
  var appBaseUrl = "https://store.xecurify.com/moas";
  var flagfield;

  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.min.css";
  document.querySelector("head").appendChild(link);
  var intlTelInputScript = document.createElement("script");
  intlTelInputScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js";
  document.querySelector("head").appendChild(intlTelInputScript);
  var viewportMeta = document.createElement("meta");
  viewportMeta.name = "viewport";
  viewportMeta.content = "width=device-width, initial-scale=1";
  document.querySelector("head").appendChild(viewportMeta);
  var verifyOtpsForm = document.createElement("form");
  verifyOtpsForm.id = "verifyotps";
  verifyOtpsForm.action =
    appBaseUrl + "/rest/shopify/api/auth/register/verifyOtp2fa";
  verifyOtpsForm.method = "GET";

  const head = document.getElementsByTagName("head")[0];
  const form = document.createElement("form");
  form.setAttribute("id", "verifyotps");
  form.setAttribute(
    "action",
    appBaseUrl + "/rest/shopify/api/auth/register/verifyOtp2fa"
  );
  form.setAttribute("method", "GET");
  form.innerHTML =
    '<input type="text" id="txid" name="txid">' +
    '<input type="text" id="mobilenumber" name="mobilenumber">' +
    '<input type="text" id="otp" name="otp">' +
    '<input type="text" id="shop" name="shop">' +
    '<input type="text" id="shopcheckouturl" name="shopcheckouturl">' +
    '<input type="text" id="first_name" name="first_name">' +
    '<input type="text" id="last_name" name="last_name">' +
    '<input type="text" id="email" name="email">' +
    '<input type="text" id="password" name="password">';
  head.appendChild(form);
  var Hash_String = window.location.search;
  var CheckoutUrl = "/account";
  const Hash_Param = new URLSearchParams(Hash_String);
  if (Hash_Param.has("checkout_url"))
    CheckoutUrl = decodeURIComponent(Hash_Param.get("checkout_url"));
  var styles = "";
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js";
  document.head.appendChild(script);

  script.onload = function () {
    const flagnum = document.querySelector("#mobileNumbersRegister");
    const options = {
      separateDialCode: true,
      hiddenInput: "full_phone",
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      initialCountry: "ae",
    };
    allowedCountries = "all";
    if (allowedCountries && allowedCountries != "all") {            
      options.onlyCountries = allowedCountriesArray;
    }
    flagfield = window.intlTelInput(flagnum, options);
  };
  let accountCreateHandleMo = document.getElementById("moAccountCreate");
  let registerOTPHandleMo = document.getElementById("registerOTP");
  let otpHandleMo = document.getElementById("OTPval");
  let mobileErrorHandlersMo = document.getElementById("mobileErrors");
  let otpnumberhandleMo = document.getElementById("moOTPnumber");
  var txId;

  var phoneNumber;
  var contact;
  var email;
  var otpvalue;
  var flag = document.createElement("style");

  registerOTPHandleMo.addEventListener("click", function () {
      email = document.getElementById('RegisterForm-email').value;
    phoneNumber = flagfield.getNumber();
    contact = phoneNumber.substring(1);
    if (
      document.getElementsByName("customer[email]")[0].value == "" ||
      document.getElementsByName("customer[password]")[0].value == ""
    ) {
      mobileErrorHandlersMo.innerHTML =
        "Please enter valid email and password to continue...";
    } else if (flagfield.isValidNumber()) {
      mobileErrorHandlersMo.innerHTML =
        "Please wait. We are sending OTP on your Mobile Number";
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        appBaseUrl +
          "/rest/shopify/api/auth/otprequest2fa?shop=" +
          window.location.hostname +
          "&number=" +
          contact +
          "&method=create_customer"
        + "&email=" + email);
      xhr.setRequestHeader("Customer-Key", "19682");
      xhr.setRequestHeader("Timestamp", "1611582714234");
      xhr.setRequestHeader(
        "Authorization",
        "f32201d6adfd872acc19df58b606166e5e214678275998c2900a71978f1734e22bf8b71b4c0588b5d5022e497008bb9b76d182156dd4f371c1435935d517e0db"
      );
      xhr.onload = function () {
        if (xhr.status === 200) {
          var result = JSON.parse(xhr.responseText);
          console.log(result);
          if (result.status == "SUCCESS") {
            mobileErrorHandlersMo.innerHTML = "";
            otpHandleMo.style =
              'display:inline-block;text-align: center !important;padding: 21px !important;padding-left:28px !important"';
            otpnumberhandleMo.style = "display:inline-block;";
            registerOTPHandleMo.value = "Resend";
            accountCreateHandleMo.style = "display:inline-block; width:100%";
            accountCreateHandleMo.disabled = false;
            txId = result.txId;
          } else if (result.status == "false") {

            if(result.error_code == "Email already registered") {
              mobileErrorHandlersMo.innerHTML = 'Email entered is invalid or already Registered';
            }
            else if(result.error_code == "Phone has already been taken") {
              mobileErrorHandlersMo.innerHTML = 'Mobile Number entered is invalid or already Registered';
            }
            else{
              mobileErrorHandlersMo.innerHTML =
              "Mobile Number entered in invalid or already Registered";
            }
          }
        } else {
          console.error("Request failed.  Returned status of", xhr.status);
        }
      };
      xhr.send();
    } else {
      mobileErrorHandlersMo.innerHTML = "Invalid phone number.";
    }
  });

  document
    .getElementById("moAccountCreate")
    .addEventListener("click", function () {
      if (
        document.getElementsByName("customer[password]")[0].value == "" ||
        document.getElementsByName("customer[email]")[0].value == "" ||
        document.getElementById("OTPval").value.length < 4
      ) {
        mobileErrorHandlersMo.innerHTML =
          "Please enter valid OTP , email or password to continue.";
      } else {
        document.getElementById("verifyotps").elements.namedItem("txid").value =
          txId;
        document.getElementById("verifyotps").elements.namedItem("shop").value =
          window.location.hostname;
        document.getElementById("verifyotps").elements.namedItem("otp").value =
          otpHandleMo.value;
        document
          .getElementById("verifyotps")
          .elements.namedItem("mobilenumber").value = contact;
        document
          .getElementById("verifyotps")
          .elements.namedItem("shopcheckouturl").value = CheckoutUrl;
        document
          .getElementById("verifyotps")
          .elements.namedItem("first_name").value = document.getElementsByName(
          "customer[first_name]"
        )[0].value;
        document
          .getElementById("verifyotps")
          .elements.namedItem("last_name").value = document.getElementsByName(
          "customer[last_name]"
        )[0].value;
        document
          .getElementById("verifyotps")
          .elements.namedItem("email").value =
          document.getElementsByName("customer[email]")[0].value;
        document
          .getElementById("verifyotps")
          .elements.namedItem("password").value =
          document.getElementsByName("customer[email]")[0].value;
        document.getElementById("verifyotps").submit();
      }
    });
  if (Hash_Param.has("txid")) {
    mobileErrorHandlersMo.innerHTML =
      "You have entered invalid OTP. Please enter valid OTP to create an account";

    document.getElementById("moOTPnumber").style = "display: inline-block;";

    registerOTPHandleMo.value = "Resend";

    otpHandleMo.style =
      'display:inline-block;text-align: center !important;padding: 21px !important;padding-left:28px !important"';

    accountCreateHandleMo.style = "display:inline-block; width:100%";

    accountCreateHandleMo.disabled = false;

    txId = Hash_Param.get("txid");
    contact = Hash_Param.get("mobilenumber");
  }
  var styles =
    ".iti__selected-flag{background:none !important}" +
    ".registerOTP{margin: -1px;}" +
    "#OTPval::placeholder {color: initial !important;opacity: 1 !important;}";
  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
});
