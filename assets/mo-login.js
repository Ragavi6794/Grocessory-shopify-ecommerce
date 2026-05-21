jQuery(document).ready(function () {

	var appUrl = "https://store.xecurify.com";
	var sourceUrl = window.location.href;
	localStorage.setItem("sourceUrl", sourceUrl); 
	var isEmailRegisterEnabled = "on";
	var flagfield;
	var otpvalue;
var otpDigitsNumber = "6";
	$('head').append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.min.css">');
	$('head').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput-jquery.js"></script>');
	$('head').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput-jquery.min.js"></script>');
	$('head').append('link href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js">');
	$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1" />');
	$('head').append("<form id='verifyotp' action='" + appUrl + "/moas/rest/shopify/api/auth/verifyOtp2fa' method='GET'> " +
		"<input type='text' id='txid' name='txid'></input>" +
		"<input type='text' id='mobilenumber' name='mobilenumber'></input>" +
		"<input type='text' id='otp' name='otp'></input>" +
		"<input type='text' id='shop' name='shop'></input>" +
		"<input type='text' id='authtype' name='authtype'></input>" +
		"<input type='text' id='shopcheckouturl' name='shopcheckouturl'></input>" +
		"<input type='text' id='source_url' name='source_url'></input>" +
		"</form>");
$('head').append("<form id='loginShopify' action='" + appUrl + "/moas/rest/2fa/loginToShopify' method='GET'> " +
		"<input type='text' id='shop' name='shop'></input>" +
		"<input type='text' id='mobilenumber' name='mobilenumber'></input>" +
		"<input type='text' id='shopcheckouturl' name='shopcheckouturl'></input>" +
		"<input type='text' id='emailEntered' name='emailEntered'></input>" +
		"</form>");


	 $('#customer_login').hide();
	 $('#login').hide();


	$('main').append(
		'<div id="MOLoginModal" class="mo-modal" style="display: none; /* Hidden by default */ position:relative; /* Stay in place */ z-index:0;/* Sit on top */ padding-top:0%;/* Location of the box */ left: 0;	top:10;/* Full width */ /* Full height */	overflow: hidden; /* Enable scroll if needed */ /* Fallback color */ /* Black w/ opacity */	opacity:1; margin-bottom :50px; padding:1rem; margin-top: -3% !important" onload="OTPInput();">' +

		'<div class="mo-modal-content" style="">' +
		'<p id="MOheading" style="display:none;">Login With OTP</p><br><br>' +
		'<p style="" id="mobileNumberText">Enter your contact number to login.</p><br>' +
		'<p style="display:none;" id="otpText">Enter OTP sent to your number.</p>' +
		'<p style="display:none;" id="emailText">Enter your emai id to register and login</p>' +
		'<div id="mobileField"><input type="text" id="mobileNumber" style="display:inline-block;" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57));"></div>' +
		'<input type="text" id="email" placeholder="Enter your email" style="display:none;" required>' +
		'<div id="input-code" style="margin-top: 30px;padding: 10px;display: flex; margin: auto; justify-content: space-evenly; ">' +
		'<input type="text" id="otpinput1" class="passInput" style="display:none;" maxlength="1" inputmode="numeric" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" required>' +
		'<input type="text" id="otpinput2" class="passInput" style="display:none;" maxlength="1" inputmode="numeric" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" required>' +
		'<input type="text" id="otpinput3" class="passInput" style="display:none;" maxlength="1" inputmode="numeric" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" required>' +
		'<input type="text" id="otpinput4" class="passInput" style="display:none;" maxlength="1" inputmode="numeric" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" required>' +
		'<input type="text" id="otpinput5" class="passInput" style="display:none;" maxlength="1" inputmode="numeric" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" required>' +
		'<input type="text" id="otpinput6" class="passInput" style="display:none;" maxlength="1" inputmode="numeric" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" required>' +
		'</div>' +
		'<label id="mobileError" style="display:inline-block;"></label>' +
		'<button id="verifyButton" class="btn" style="display:none; -webkit-appearance: button; cursor: pointer;">VERIFY</button><br>' +
		'<button id="loginButton" class="btn" style="display:none; -webkit-appearance: button; cursor: pointer;">Login</button><br>' +
		'<span id="timer" style="color:#318cd0"></span>' +
		'<div style="margin-top: 18px;"><a href="#" id="resendButton" style="display:none;">Resend OTP</a></div>' +
		'<div style="margin-top: 18px;"><a href="#" id="emailResendButton" style="display:none;">Resend OTP</a></div>' +
		'<div style="margin-top: 18px;"><a href="#" id="whatsappResendButton" style="display:none;">Resend OTP</a></div>' +
		'<div style="margin-top: 18px;"><a href="#" id="changeButton" style="display:none;">Change Phone Number</a></div>' +
		'<button id="submitButton" class="btn" style="display:inline-block;">NEXT</button>' +
		'<button id="emailsubmitButton" class="btn" style="display:none;">NEXT</button>' +
		'<button id="whatsAppSubmitButton" class="btn" style="display:none;">NEXT</button>' +
		'<div style = "margin:auto;">'+
		'<button id="emailButton" class="btn" style="display:inline-block;">Email</button>' +
		'<button id="phoneButton" class="btn" style="display:inline-block;pointer-events: none; background-color:#e4e8ed; border:none;color:#5e6d7b">Phone</button>' +
		'<button id="whatsappButton" class="btn" style="display:inline-block;">WhatsApp</button><br>' +
		'</div>'+
		'<button class="btn default" id="defaultShopifylogin" style="border:none ;cursor: pointer; background-color:inherit; text-decoration: underline; font-size:18px">Login With Shopify</button>' +
        '<a href="/account/register">Create Account</a>' +
		'</div>' +
		'</div>');


	$('main').append(
		'<div id="updateModal" class="mo-modal" style="display: none; display: none; /* Hidden by default */ position: absolute; /* Stay in place */ z-index: 999; /* Sit on top */ padding-top: 5%; /* Location of the box */ left: 0;	top: 0;	width: 100%;  /* Full width */ height: 100%; /* Full height */	overflow: auto; /* Enable scroll if needed */ background-color: rgb(0,0,0); /* Fallback color */ background-color: rgba(0,0,0,0.4); /* Black w/ opacity */	opacity:1;">' +

		'<div class="mo-modal-content" style="background:white;padding:20px;">' +

		'<p><span id = "MOclosebuttonprofile" class="close" style="float: right;font-size: 21px;font-weight: 700;line-height: 1;color: #000;text-shadow: 0 1px 0 #fff;filter: alpha(opacity=20);opacity: .2; cursor: pointer">x</span></p>' +
		'<p id="MOupdateheading" style="color:#0d0d0d; text-align: center; font-weight: 600; font-size: 22px; display:inline-block; font-family:sans-serif ; border-bottom: 3px solid #d47303;" >UPDATE PROFILE</p><br><br>' +
		        '<p class="mo_label_name" id="userEmailText"> First Name <span style="float: right;margin-right: 21%;">Last Name</span> </p><input class="mo_input_firstname" type="text" style="" id="userFirstName"><input class="mo_input_lastname" type="text" style="" id="userLastName">'+
		'<p style="text-align: center; color: #131212; font-weight: 600; font-family:sans-serif; font-size: 18px;" id="userEmailText">Email</p>' +
		'<input type="email" style="display:inline-block; background-color: #f5f4f4; color:#0d0d0d; padding:18px 36px; text-align: center; font-size:14px; margin:5px; width:100%; border: 2px solid #f6f6f6;"  id="userEmail" q>' +
		'<hr style="margin: 4rem 0;">' +
		'<p style="text-align: center; color: #131212; width : 100% ;font-weight: 600; font-family:sans-serif; font-size: 18px;" id="MobileNumber">Enter Mobile Number</p>' +
		'<input type="text" style="display:inline-block; background-color: #f5f4f4; color:#0d0d0d; padding:18px 36px; text-align: center; font-size:14px; margin:5px; width:100%; border: 2px solid #f6f6f6;"  id="updateMobileNumber" >' +
		'<label id="mobileError" style="color: #131212;font-size: 14px; letter-spacing:1px; width : 80% "></label><br>' +
		'<hr style="margin: 4rem 0;">' +

		'<button id="updatenumbersubmit" class="btn" style="cursor: pointer; border: 1px solid transparent; background-color:#f16c13; text-align=center; box-shadow: 0 10px 30px 0 rgba(233, 189, 95, 0.4); border-radius: 5px 5px 5px 5px; color:white; font-size:17px; padding:13px 60px;">UPDATE</button><br>' +
		'</div>' +

		'</div>');

	var Hash_String = window.location.search;
var shop_name = window.location.hostname;
var CheckoutUrl = '' ;
	const Hash_Param = new URLSearchParams(Hash_String);
	if (Hash_Param.has('hash')) {
		document.cookie = "storefront_digest=" + Hash_Param.get('hash') + "; path=/";
		window.location.href = "https://" + shop_name;
	}
	if (Hash_Param.has('checkout_url')) {
	CheckoutUrl = decodeURIComponent(Hash_Param.get('checkout_url'));
	}
else if ("" == "false" || (window.location.pathname.indexOf('/account/login') !== -1 || window.location.pathname.indexOf('/account/register') !== -1 || window.location.href == null)) {
	 CheckoutUrl = "/account" ;
} else {
	 CheckoutUrl = window.location.href ;
}
	$("#mobileNumber").keyup(function (event) {
		if (event.keyCode === 13) {
			$("#submitButton").click();
		}
	});

	$("#otpinput6").keyup(function (event) {
		if (event.keyCode === 13) {
			$("#verifyButton").click();
		}
	});
	if ($('#customer_login').css('display') == 'none')
		$("#MOLoginModal").css("display", "block");
	else
		$("#MOLoginModal").css("display", "none");

	$.getScript("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js", function () {
    function getISOCodes(callingCodes) {
        const countries = intlTelInputGlobals.getCountryData();
        return callingCodes.map(code => {
            const country = countries.find(country => country.dialCode === code);
            return country ? country.iso2.toLowerCase() : null;
        });
    }
countriesString = [].map(String);
let countriesArray = ['GLOBAL'];
		flagnum = document.querySelector("#mobileNumber");
    const options = {
      separateDialCode: true,
      hiddenInput: "full_phone",
      initialCountry: "ae",
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    };
    if (countriesArray && countriesArray[0] != '' && countriesArray[0] != 'GLOBAL') {
      options.onlyCountries = countriesArray;
    }
    flagfield = window.intlTelInput(flagnum, options);	});

	const $inp = $(".passInput");
	$inp.on({
		paste(ev) { // Handle Pasting
			const clip = ev.originalEvent.clipboardData.getData('text').trim();
			// Allow numbers only
if( otpDigitsNumber == "4"){
			if (!/\d{4}/.test(clip)) return ev.preventDefault(); // Invalid. Exit here. Split string to Array or characters
}
else{
			if (!/\d{6}/.test(clip)) return ev.preventDefault(); // Invalid. Exit here. Split string to Array or characters
}
			const s = [...clip];
			// Populate inputs. Focus last input.
			$inp.val(i => s[i]).eq(5).focus();
		},
		input(ev) { // Handle typing
			const i = $inp.index(this);
			if (this.value) $inp.eq(i + 1).focus();
		},
		keydown(ev) { // Handle Deleting 
			const i = $inp.index(this);
			if (!this.value && ev.key === "Backspace" && i) $inp.eq(i - 1).focus();
		}
	});


	var cartCookieValue = getCookie("cart");
	if (typeof cartCookieValue !== 'undefined') {
		createCookie("cart", cartCookieValue, 15);
	}


	var styles = '.mo-modal-content {' +
		'margin: auto; padding:5px; border: 1px solid #888; width: 40%; text-align:center;border: none; }' +
		'html {-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%}' +
		'body {line-height: 1.1; color: #333; background-color: #fff;}' +
		'.iti {width : 80%;}' +
		'.iti__selected-dial-code {font-size: 14px ;     background-color: transparent }'+
		'div[class^="iti__flag"] { display: inline-block ;}' +
		'.passInput{text-align: center;line-height: 8px;padding: 0 !important;font-size: 20px;height: 39px;width: 8%;border-radius: 7px; border: 2px solid black; margin-bottom: 5px;}' +
		'#MOheading{color:#0d0d0d; text-align: center; font-weight: 600; font-size: 40px; width :60% ;margin : 0 0 15px}' +
		'#mobileNumberText{text-align: center; color: #131212; font-size: 18px; letter-spacing:1px width:60%}' +
		'#email{width: 80% ;margin-top: 5px; margin-bottom: 0px; text-align: center; font-size:14px;border: 1px solid #a5a5a5; height:4rem;}' +
		'#mobileNumber{width: 100% ;margin-top: 5px; margin-bottom: 20px; text-align: center; font-size:14px;border: 1px solid #a5a5a5; height:4rem;}' +
		'#mobileError{color: #131212;font-size: 14px; letter-spacing:1px ; width : 80% ;}' +
		'#submitButton{cursor: pointer; width: 80% ; background-color: black; color:white;  margin-top: 5px; margin-bottom: 20px; text-align: center; font-size:14px;border: 1px solid #a5a5a5; height:4rem;}' +
		'#whatsAppSubmitButton{cursor: pointer; width: 80% ; background-color: black; color:white;  margin-top: 5px; margin-bottom: 20px; text-align: center; font-size:14px;border: 1px solid #a5a5a5; height:4rem;}' +
		'#emailButton{cursor: pointer; padding : 0px 40px;  color:black;   background-color: transparent; margin-top: 2px; margin-bottom: 20px; text-align: center; font-size:14px;border: 1px solid black; height:3rem;}' +
		'#whatsappButton{cursor: pointer; padding : 0px 40px;  color:black;   background-color: transparent; margin-top: 2px; margin-bottom: 20px; text-align: center; margin-left: 10px;font-size:14px;border: 1px solid black; height:3rem;}' +
		'#phoneButton{cursor: pointer; padding: 0px 40px;  color:black;   background-color: transparent;margin-top: 2px; margin-bottom: 20px; margin-left: 10%; text-align: center; font-size:14px;border: 1px solid black; height:3rem;}' +
		'#emailsubmitButton{cursor: pointer; width: 80% ; background-color: black; color:white;  margin-top: 5px; margin-bottom: 20px; text-align: center; font-size:14px;border: 1px solid #a5a5a5; height:4rem;}' +
		'#verifyButton{cursor: pointer;  width: 80%;  background-color: black; color:white;  margin-top: 20px; margin-bottom: 20px; text-align: center; font-size:14px;border: 1px solid #a5a5a5; height:4rem;}' +
		'#loginButton{cursor: pointer;  width: 80%;  background-color: black; color:white;  margin-top: 20px; margin-bottom: 20px; text-align: center; font-size:14px;border: 1px solid #a5a5a5; height:4rem;}' +
		'#resendButton{color:black;font-size: 18px; letter-spacing:1px;}' +
		'#emailResendButton{color:black;font-size: 18px; letter-spacing:1px;}' +
		'#whatsappResendButton{color:black;font-size: 18px; letter-spacing:1px;}' +
		'#emailButton:hover {background-color: black; color:white}'+
		'#whatsappButton:hover {background-color: black; color:white}'+
		'#phoneButton:hover{background-color:black; color: white}'+
		'#changeButton{color:black; position: relative; top: -10px;font-size: 18px; letter-spacing:1px; }' +
		'#otpText{ color:#131212; font-weight:600; font-family:sans-serif; font-size:18px}' +
		'#emailText{ color:#131212; font-weight:600; font-family:sans-serif; font-size:18px}' +
		'.mo_label_name{text-align: left;margin-left: 13%;color: #131212;font-weight: 600;font-family: sans-serif;font-size: 18px;}'+
		'.mo_input_firstname{display: inline-block;background-color: #f5f4f4;color: #0d0d0d;padding: 18px 36px;text-align: center;font-size: 14px;margin: 5px;width: 45%;float: left;border: 2px solid #f6f6f6;}'+
		'.mo_input_lastname{display: inline-block;background-color: #f5f4f4;color: #0d0d0d;padding: 18px 36px;text-align: center;font-size: 14px;margin: 5px;width: 45%;border: 2px solid #f6f6f6;}'+
		'.mo_input_label{text-align: center;color: #131212;font-weight: 600;font-family: sans-serif;font-size: 18px;}'+
		'.mo_input_update{display: inline-block;background-color: #f5f4f4;color: #0d0d0d;padding: 18px 36px;text-align: center;font-size: 14px;margin: 5px;width: 100%;border: 2px solid #f6f6f6;}'+
		'.mo_update_btn{cursor: pointer;border: 1px solid transparent;background-color: #f16c13;text-align=center: ;border-radius: 5px 5px 5px 5px;color: white;font-size: 17px;padding: 13px 60px;width: 100%;}'+
		'#MOLoginModal{' +
		' padding-top: 8%; opacity:1}' +
		// '@media (max-width : 50%){ #MOLoginModal .mo-modal-content {' +
		// 'box-shadow: 2px 2px 6px 2px; margin: auto; padding: 20px; margin-bottom:50px;border: 1px solid #888; width: 92%; text-align:center;' +
		// '}'+
		// '}'+
		'@media (max-width : 800px){ .mo-modal-content {' +
		'width:90%; font-size:25px;' +
		'}' +
		'}' +
		'#updateModal{' +
		' padding-top: 8%; opacity:1}' +
		'@media (max-width : 420px){ #updateModal .mo-modal-content {' +
		'background-color: rgba(0,0,0,0.4) box-shadow: 2px 2px 6px 2px; margin: auto; padding: 20px; border: 1px solid #888; width: 92%; text-align:center;' +
		'}' +

		'.close {color: #aaaaaa; float: right; position: relative; top: -16px; font-size: 28px; font-weight: bold;}' +

		'.close:hover,' +
		'.close:focus { color: #000; text-decoration: none; cursor: pointer; }' +
		'.mo-modal { display: none; /* Hidden by default */ position: relative; /* Stay in place */ z-index: 999; /* Sit on top */ padding-top: 5%; /* Location of the box */ left: 0;	top: 0;	width: 100%; /* Full width */ height: 100%; /* Full height */	overflow: auto; /* Enable scroll if needed */  /* Fallback color */  /* Black w/ opacity */	opacity:1; }';


	var styleSheet = document.createElement("style");
	styleSheet.type = "text/css";
	styleSheet.innerText = styles;
	document.head.appendChild(styleSheet);

var shopifyLogin = "off";
if( shopifyLogin == "off" ){
  $('#defaultShopifylogin').hide();
}
var smsStatus = "on";
var emailStatus = "on";
var whatsappStatus = "off";
if( smsStatus == "on" && emailStatus == "off" && whatsappStatus == "off"){
  $('#phoneButton').hide();
  $('#emailButton').hide();
  $('#whatsappButton').hide();
  $('#submitButton').show();
}
var emailDomainRestrictStatus = "off";
var emailDomainToRestrict = "";
if( smsStatus == "on" && emailStatus == "on" && whatsappStatus == "off"){
  $('#whatsappButton').hide();
  $('#submitButton').show();
}
if( smsStatus == "off" && emailStatus == "on" && whatsappStatus == "on"){
  $('#phoneButton').hide();
  $('#whatsAppSubmitButton').show();
  $('#submitButton').hide();
  $('#mobileNumberText').text('Enter your WhatsApp Number to login');
  $('#submitButton').hide();
}
if( smsStatus == "off" && emailStatus == "off" && whatsappStatus == "on"){
  $('#emailButton').hide();
  $('#phoneButton').hide();
  $('#whatsAppSubmitButton').show();
  $('#whatsappButton').hide();
  $('#submitButton').hide();
  $('#mobileNumberText').text('Enter your WhatsApp Number to login');
}
if( smsStatus == "off" && emailStatus == "on" && whatsappStatus == "off"){
  $('#emailButton').hide();
  $('#phoneButton').hide();
  $('#submitButton').hide();
  $('#whatsappButton').hide();
  $('#whatsAppSubmitButton').hide();
  $('#emailsubmitButton').show();
  $('#email').show();
  $('#mobileField').hide();
  $('#mobileNumberText').text('Enter your email to login');
}
if( smsStatus == "on" && emailStatus == "on" && whatsappStatus == "on"){
  $('#emailButton').show();
  $('#whatsappButton').show();
}
if( smsStatus == "on" && emailStatus == "off" && whatsappStatus == "on"){
  $('#emailButton').hide();
  $('#whatsappButton').show();
  $('#emailsubmitButton').hide();
  $('#email').hide();
}
var shopifyPlans= "";
console.log('');	document.getElementById('MOclosebuttonprofile').onclick = function () {
		document.getElementById('updateModal').style.display = 'none';
	}


	var current_url = window.location + " ";
	if (current_url.indexOf("account") > 0 && current_url.indexOf("account/login") < 0 && current_url.indexOf("account/register") < 0) {
		//var els1 = document.getElementById("customer_logout_link");
		var anchors = document.querySelectorAll('a[href*="/account/addresses"]');
		var els1 = anchors[0];
		var el = document.createElement("div");
		el.innerHTML = '<a href="#" id="profile_update">Update Profile</a><br><br>';

		els1.parentNode.insertBefore(el, els1);
		$.ajax(
			{
				url: "/apps/2fa/moas/rest/shopify/getuserinfo2fa?shop=" + window.location.hostname + "&id=" + ShopifyAnalytics.meta.page.customerId,
				type: "GET",
				headers:{ 'Customer-Key': '19682', 'Timestamp': '1611582714234', 'Authorization': 'f32201d6adfd872acc19df58b606166e5e214678275998c2900a71978f1734e22bf8b71b4c0588b5d5022e497008bb9b76d182156dd4f371c1435935d517e0db' },
	success: function (result) {
	if (result.status == 'success') {
	document.getElementById("userEmail").value = result.email;
	document.getElementById("userFirstName").value = (result.firstName === undefined || result.firstName === null) ? "" : result.firstName;
	document.getElementById("userLastName").value = (result.lastName === undefined || result.lastName === null) ? "" : result.lastName; 
	if (result.phone) {
 	document.getElementById("updateMobileNumber").value = result.phone == "undefined" ? "" : result.phone;

						}

					}
				},
				error: function (xhr, status, p3, p4) {
					var err = "Error " + " " + status + " " + p3;
					if (xhr.responseText && xhr.responseText[0] == "{")
						err = JSON.parse(xhr.responseText).message;
					alert(err);
				}
			});
	}



	if (document.getElementById("profile_update")) {
		document.getElementById("profile_update").addEventListener('click', function () {

			document.getElementById('updateModal').style.display = 'block';
		});
	}
var updateProfileStatus = "off";
if(updateProfileStatus == "off" ){
  $('#profile_update').hide();
}
	document.getElementById("updatenumbersubmit").addEventListener('click', function () {

		mobileErrorHandler.innerHTML = "";
let emailid = document.getElementById("userEmail").value;
let phoneNumber = document.getElementById("updateMobileNumber").value;
if(!validateEmail(emailid)){
						window.alert("Invalid email address format.")
}
else if(phoneNumber && !validatePhoneNumber(phoneNumber)){
						window.alert("Invalid phone number format. Enter country code before phone number.")
}
else{
  let first_name = document.getElementById("userFirstName").value;
		if(first_name=="undefined"){
			first_name="";
		}
        let last_name = document.getElementById("userLastName").value;
		if(last_name=="undefined"){
			last_name="";
		}		$.ajax(
			{
		 url: "/apps/2fa/moas/rest/shopify/updateuserinfo2fa?shop=" + window.location.hostname + "&id=" + ShopifyAnalytics.meta.page.customerId + "&number=" + document.getElementById("updateMobileNumber").value + "&email=" + emailid + "&first_name=" + first_name + "&last_name=" + last_name,
				type: "GET",
				headers: { 'Customer-Key': '19682', 'Timestamp': '1611582714234', 'Authorization': 'f32201d6adfd872acc19df58b606166e5e214678275998c2900a71978f1734e22bf8b71b4c0588b5d5022e497008bb9b76d182156dd4f371c1435935d517e0db' },
				success: function (result) {

					if (result.status == 'true') {
						alert("Your profile has been updated!")
						document.getElementById("mobileError").innerHTML = "";
						document.getElementById('updateModal').style.display = 'none';

					}
					else if (result.status == 'false') {
						window.alert("Phone number has already been taken")
					}
else if (result.status == 'failed') {
window.alert("This information cannot be processed")
}
				},
				error: function (xhr, status, p3, p4) {
					var err = "Error " + " " + status + " " + p3;
					if (xhr.responseText && xhr.responseText[0] == "{")
						err = JSON.parse(xhr.responseText).message;
					alert(err);
				}
			}
		);
}

	});

	var submitButtonHandle = document.getElementById('submitButton');
	let mobileNumberHandle = document.getElementById('mobileNumber')
	let mobileNumberTextHandle = document.getElementById('mobileNumberText')
	let otpTextHandle = document.getElementById('otpText');
	let emailTextHandle = document.getElementById('emailText');
	let otp1Handle = document.getElementById('otpinput1');
	let otp2Handle = document.getElementById('otpinput2');
	let otp3Handle = document.getElementById('otpinput3');
	let otp4Handle = document.getElementById('otpinput4');
	let otp5Handle = document.getElementById('otpinput5');
	let otp6Handle = document.getElementById('otpinput6');
	let mobileErrorHandler = document.getElementById("mobileError");
	let verifyButtonHandle = document.getElementById('verifyButton');
	let loginButtonHandle = document.getElementById('loginButton');
	let defaultloginHandle = document.getElementById("defaultShopifylogin");
	var txId;
	let resendButtonHandle = document.getElementById('resendButton');
	let changeButtonHandle = document.getElementById('changeButton');
	let emailResendButtonHandle = document.getElementById('emailResendButton');
	var phoneNumber;
	var contact;
	var flag = document.createElement('style');
	var emailSubmitButtonHandle = document.getElementById('emailsubmitButton');
	var emailHandle = document.getElementById('email');
	var emailButtonHandle = document.getElementById('emailButton');
	var phoneButtonHandle = document.getElementById('phoneButton');
	var whatsAppButtonHandle = document.getElementById('whatsappButton');
	var whatsAppSubmitButtonHandle = document.getElementById('whatsAppSubmitButton');
	let whatsappResendButtonHandle = document.getElementById('whatsappResendButton');

	emailButtonHandle.addEventListener('click', function () {
if( smsStatus == "on"){
		phoneButtonHandle.style = 'pointer-events: auto;';
};

if( whatsappStatus == "on"){
		whatsAppButtonHandle.style = 'pointer-events: auto;';
};

		emailHandle.style = 'display:inline-block';
		mobileNumberHandle.style = 'display:none';
		emailSubmitButtonHandle.style = 'display:inline-block';
		submitButtonHandle.style = 'display:none';
		whatsAppSubmitButtonHandle.style = 'display:none';
		changeButtonHandle.innerHTML = 'Change Email Address';
		mobileNumberTextHandle.innerHTML ='Enter your email to login.';
		otpTextHandle.innerHTML = 'Enter the OTP sent to your email.';
		emailButtonHandle.style = 'pointer-events :none; background-color:#e4e8ed ;border:none; color:#5e6d7b';
		$('.iti').hide();
	});

	phoneButtonHandle.addEventListener('click', function () {
if( whatsappStatus == "on"){
		whatsAppButtonHandle.style = 'pointer-events: auto;';
};

if( emailStatus == "on"){
		emailButtonHandle.style = 'pointer-events: auto;';
};

		mobileNumberHandle.style = 'display:inline-block';
		emailHandle.style = 'display:none';
		submitButtonHandle.style = 'display:inline-block';
		emailSubmitButtonHandle.style = 'display:none';
		whatsAppSubmitButtonHandle.style = 'display:none';
		changeButtonHandle.innerHTML = 'Change Phone Number';
		mobileNumberTextHandle.innerHTML ='Enter your contact number to login.';
		phoneButtonHandle.style = 'pointer-events :none; background-color:#e4e8ed ;border:none; color:#5e6d7b';
        $('.iti').show();
	});

	whatsAppButtonHandle.addEventListener('click', function () {
if( smsStatus == "on"){
		phoneButtonHandle.style = 'pointer-events: auto;';
};

if( emailStatus == "on"){
		emailButtonHandle.style = 'pointer-events: auto;';
};

		mobileNumberHandle.style = 'display:inline-block';
		emailHandle.style = 'display:none';
		submitButtonHandle.style = 'display:none';
		whatsAppSubmitButtonHandle.style = 'display:inline-block';
		emailSubmitButtonHandle.style = 'display:none';
		changeButtonHandle.innerHTML = 'Change Phone Number';
		mobileNumberTextHandle.innerHTML ='Enter your WhatsApp number to login.';
		whatsAppButtonHandle.style = 'pointer-events :none; background-color:#e4e8ed ;border:none; color:#5e6d7b';
        $('.iti').show();
	});


	whatsAppSubmitButtonHandle.addEventListener('click', function () {
		phoneNumber = flagfield.getNumber();
		contact = phoneNumber.substring(1);
		if (flagfield.isValidNumber()) {
			mobileErrorHandler.innerHTML = "Please wait. We are sending OTP on your WhatsApp Number";
			$.ajax(
				{
					url: appUrl + "/moas/rest/shopify/api/auth/otprequest2fa?shop=" + window.location.hostname + "&number=" + contact + "&delivery=whatsapp",
					type: "GET",
					headers:{ 'Customer-Key': '19682', 'Timestamp': '1611582714234', 'Authorization': 'f32201d6adfd872acc19df58b606166e5e214678275998c2900a71978f1734e22bf8b71b4c0588b5d5022e497008bb9b76d182156dd4f371c1435935d517e0db' },
					success: function (result) {

						if (result.status == 'SUCCESS') {

							mobileErrorHandler.innerHTML = "";


							mobileNumberHandle.style = 'display:none'

							mobileNumberTextHandle.style = 'display:none'

							whatsAppSubmitButtonHandle.style = 'display:none'

							phoneButtonHandle.style = 'display:none'

							emailButtonHandle.style = 'display:none'

							whatsAppButtonHandle.style = 'display:none'

							otpTextHandle.style = 'display:block;'

							otp1Handle.style = 'display:inline-block;'

							otp2Handle.style = 'display:inline-block;'

							otp3Handle.style = 'display:inline-block;'

							otp4Handle.style = 'display:inline-block;'

							otp5Handle.style = 'display:inline-block;'

							otp6Handle.style = 'display:inline-block;'
if( otpDigitsNumber == "4"){
  $('#otpinput5').hide();
  $('#otpinput6').hide();
}

							verifyButtonHandle.style = 'display:inline-block;'

							whatsappResendButton.style = 'display:inline-block;';

							changeButtonHandle.style = 'display:inline-block;';

							flag.innerHTML = '.iti__selected-flag[class^="iti__"] { display: none; }';

							document.head.appendChild(flag);

							txId = result.txId;

						}
						else if (result.status == 'false') {
							mobileErrorHandler.innerHTML = "Mobile Number entered is invalid. Please check or add mobile number to your profile";
						}
						else if (result.status == 'FAILED' ) {

							mobileErrorHandler.innerHTML = "Transaction limit for this number is exceeded. Please change the number or try after some time";
						}

					},

					error: function (xhr, status, p3) {
						var err = "Error " + " " + status + " " + p3;
						if (xhr.responseText && xhr.responseText[0] == "{") {
							err = JSON.parse(xhr.responseText).message;
							console.log(err);
						}
						alert(err);
					}

				});
		}
		else {
			alert('Invalid phone number.');
		}
	});

	submitButtonHandle.addEventListener('click', function () {
		phoneNumber = flagfield.getNumber();
		contact = phoneNumber.substring(1);
		if (flagfield.isValidNumber()) {
			mobileErrorHandler.innerHTML = "Please wait. We are sending OTP on your Mobile Number";
			$.ajax(
				{
					url: appUrl + "/moas/rest/shopify/api/auth/otprequest2fa?shop=" + window.location.hostname + "&number=" + contact + "&action=register",
					type: "GET",
					headers:{ 'Customer-Key': '19682', 'Timestamp': '1611582714234', 'Authorization': 'f32201d6adfd872acc19df58b606166e5e214678275998c2900a71978f1734e22bf8b71b4c0588b5d5022e497008bb9b76d182156dd4f371c1435935d517e0db' },
					success: function (result) {

						if (result.status == 'SUCCESS') {

							mobileErrorHandler.innerHTML = "";


							mobileNumberHandle.style = 'display:none'

							mobileNumberTextHandle.style = 'display:none'

							submitButtonHandle.style = 'display:none'

							phoneButtonHandle.style = 'display:none'

							emailButtonHandle.style = 'display:none'

							whatsAppButtonHandle.style = 'display:none'

							otpTextHandle.style = 'display:block;'

							otp1Handle.style = 'display:inline-block;'

							otp2Handle.style = 'display:inline-block;'

							otp3Handle.style = 'display:inline-block;'

							otp4Handle.style = 'display:inline-block;'

							otp5Handle.style = 'display:inline-block;'

							otp6Handle.style = 'display:inline-block;'
if( otpDigitsNumber == "4"){
  $('#otpinput5').hide();
  $('#otpinput6').hide();
}

							verifyButtonHandle.style = 'display:inline-block;'

							resendButtonHandle.style = 'display:inline-block;';

							changeButtonHandle.style = 'display:inline-block;';

							flag.innerHTML = '.iti__selected-flag[class^="iti__"] { display: none; }';

							document.head.appendChild(flag);

							txId = result.txId;

						}
						else if (result.status == 'false') {
							mobileErrorHandler.innerHTML = "Mobile Number entered is invalid. Please check or add mobile number to your profile";
						}
						else if (result.status == 'FAILED' ) {

							mobileErrorHandler.innerHTML = "Transaction limit for this number is exceeded. Please change the number or try after some time";
						}

					},

					error: function (xhr, status, p3) {
						var err = "Error " + " " + status + " " + p3;
						if (xhr.responseText && xhr.responseText[0] == "{") {
							err = JSON.parse(xhr.responseText).message;
							console.log(err);
						}
						alert(err);
					}

				});
		}
		else {
			alert('Invalid phone number.');
		}
	});



	whatsappResendButtonHandle.addEventListener('click', function () {
		phoneNumber = flagfield.getNumber();
		contact = phoneNumber.substring(1);
 const currentUrl = new URLSearchParams(window.location.search);
 if(contact == "" && currentUrl.has('mobilenumber'))
    contact = currentUrl.get('mobilenumber').replace(/#/g, '');
		mobileErrorHandler.innerHTML = "Please Wait. We are sending OTP again.";
       $.ajax(
			{
				url:  appUrl + "/moas/rest/shopify/api/auth/otprequest2fa?shop=" + window.location.hostname + "&number=" + contact + "&delivery=whatsapp",
				type: "GET",
				headers:{ 'Customer-Key': '19682', 'Timestamp': '1611582714234', 'Authorization': 'f32201d6adfd872acc19df58b606166e5e214678275998c2900a71978f1734e22bf8b71b4c0588b5d5022e497008bb9b76d182156dd4f371c1435935d517e0db' },
				success: function (result) {


					if (result.status == 'SUCCESS') {

						mobileErrorHandler.innerHTML = "";


						mobileNumberHandle.style = 'display:none'

						mobileNumberTextHandle.style = 'display:none'

						submitButtonHandle.style = 'display:none'
						whatsAppSubmitButtonHandle.style = 'display:none'
						phoneButtonHandle.style = 'display:none'
						
						emailButtonHandle.style = 'display:none'

						whatsAppButtonHandle.style = 'display:none'

						otpTextHandle.style = 'display:block;'

						otp1Handle.style = 'display:inline-block;'

						otp2Handle.style = 'display:inline-block;'

						otp3Handle.style = 'display:inline-block;'

						otp4Handle.style = 'display:inline-block;'

						otp5Handle.style = 'display:inline-block;'

						otp6Handle.style = 'display:inline-block;'
var otpDigitsNumber = "6";
if( otpDigitsNumber == "4"){
  $('#otpinput5').hide();
  $('#otpinput6').hide();
}
						verifyButtonHandle.style = 'display:inline-block;'

						whatsappResendButtonHandle.style = 'display:inline-block;';

						changeButtonHandle.style = 'display:inline-block;';

						txId = result.txId;

					}
					else if (result.status == 'false') {
						mobileErrorHandler.innerHTML = "The entered mobile phone number is invalid. Please check your mobile number or add your mobile number to your profile ";
					}
						else if (result.status == 'FAILED' ) {

							mobileErrorHandler.innerHTML = "Transaction limit for this number is exceeded. Please change the number or try after some time";
						}
				},
				error: function (xhr, status, p3, p4) {
					//var err = "Error " + " " + status + " " + p3;
					//if(status== "FAILED")
					// if (xhr.responseText && xhr.responseText[0] == "{")
					// 	err = JSON.parse(xhr.responseText).message;
					//alert(err);
				}
			}
		);
	});

	resendButtonHandle.addEventListener('click', function () {
		phoneNumber = flagfield.getNumber();
		contact = phoneNumber.substring(1);
 const currentUrl = new URLSearchParams(window.location.search);
 if(contact == "" && currentUrl.has('mobilenumber'))
    contact = currentUrl.get('mobilenumber').replace(/#/g, '');
		mobileErrorHandler.innerHTML = "Please Wait. We are sending OTP again.";
       $.ajax(
			{
				url:  appUrl + "/moas/rest/shopify/api/auth/otprequest2fa?shop=" + window.location.hostname + "&number=" + contact + "&action=register",
				type: "GET",
				headers:{ 'Customer-Key': '19682', 'Timestamp': '1611582714234', 'Authorization': 'f32201d6adfd872acc19df58b606166e5e214678275998c2900a71978f1734e22bf8b71b4c0588b5d5022e497008bb9b76d182156dd4f371c1435935d517e0db' },
				success: function (result) {


					if (result.status == 'SUCCESS') {

						mobileErrorHandler.innerHTML = "";


						mobileNumberHandle.style = 'display:none'

						mobileNumberTextHandle.style = 'display:none'

						submitButtonHandle.style = 'display:none'
						phoneButtonHandle.style = 'display:none'
						
						emailButtonHandle.style = 'display:none'

						otpTextHandle.style = 'display:block;'

						otp1Handle.style = 'display:inline-block;'

						otp2Handle.style = 'display:inline-block;'

						otp3Handle.style = 'display:inline-block;'

						otp4Handle.style = 'display:inline-block;'

						otp5Handle.style = 'display:inline-block;'

						otp6Handle.style = 'display:inline-block;'
var otpDigitsNumber = "6";
if( otpDigitsNumber == "4"){
  $('#otpinput5').hide();
  $('#otpinput6').hide();
}
						verifyButtonHandle.style = 'display:inline-block;'

						resendButtonHandle.style = 'display:inline-block;';

						changeButtonHandle.style = 'display:inline-block;';

						txId = result.txId;

					}
					else if (result.status == 'false') {
						mobileErrorHandler.innerHTML = "The entered mobile phone number is invalid. Please check your mobile number or add your mobile number to your profile ";
					}
						else if (result.status == 'FAILED' ) {

							mobileErrorHandler.innerHTML = "Transaction limit for this number is exceeded. Please change the number or try after some time";
						}
				},
				error: function (xhr, status, p3, p4) {
					//var err = "Error " + " " + status + " " + p3;
					//if(status== "FAILED")
					// if (xhr.responseText && xhr.responseText[0] == "{")
					// 	err = JSON.parse(xhr.responseText).message;
					//alert(err);
				}
			}
		);
	});



	changeButtonHandle.addEventListener('click', function () {
		phoneNumber = flagfield.getNumber();
		contact = phoneNumber.substring(1);
          
		if(changeButtonHandle.innerHTML == 'Change Email Address')
		{
            mobileErrorHandler.innerHTML = "Please change your Email Address";
			submitButtonHandle.style = 'display:none';
			emailSubmitButtonHandle.style = 'display:inline-block';
			emailHandle.style = 'display:inline-block'
	     	phoneButtonHandle.style = 'display:none'
						
		emailButtonHandle.style = 'display:none'

		otpTextHandle.style = 'display:none'

		otp1Handle.style = 'display:none'

		otp2Handle.style = 'display:none'

		otp3Handle.style = 'display:none'

		otp4Handle.style = 'display:none'

		otp5Handle.style = 'display:none'

		otp6Handle.style = 'display:none'

		verifyButtonHandle.style = 'display:none'

		resendButtonHandle.style = 'display:none'
		emailResendButtonHandle.style = 'display:none'
		whatsappResendButtonHandle.style = 'display:none'

		changeButtonHandle.style = 'display:none'
		}
       else{

		mobileErrorHandler.innerHTML = "Please change your Mobile Number"


		mobileNumberTextHandle.style = 'display:inline-block;'

		mobileNumberHandle.style = 'display:block;'

		submitButtonHandle.style = 'display:inline-block;'
		phoneButtonHandle.style = 'display:none'
						
		emailButtonHandle.style = 'display:none'

		otpTextHandle.style = 'display:none'

		otp1Handle.style = 'display:none'

		otp2Handle.style = 'display:none'

		otp3Handle.style = 'display:none'

		otp4Handle.style = 'display:none'

		otp5Handle.style = 'display:none'

		otp6Handle.style = 'display:none'

		verifyButtonHandle.style = 'display:none'

		resendButtonHandle.style = 'display:none'
		whatsappResendButtonHandle.style = 'display:none'


		changeButtonHandle.style = 'display:none'

		flag.innerHTML = '.iti__selected-flag[class^="iti__"] { display: flex; }';

		// txId = result.txId;
	   }
		//}
		//else {
		//alert('Invalid phone number.');
		//}
	});

	emailSubmitButtonHandle.addEventListener('click', function () {
		email = emailHandle.value;
if( emailDomainRestrictStatus == "on" && email.includes(emailDomainToRestrict) === false ){
			mobileErrorHandler.innerHTML = "This email domain is not permitted for login.";}
		else if (email.length != 0 && email.includes('@') ) {
			mobileErrorHandler.innerHTML = "Please wait. We are sending OTP on your Email Address";
			$.ajax(
				{
					url: appUrl + "/moas/rest/shopify/api/auth/otprequest2fa?shop=" + window.location.hostname + "&to=" + encodeURIComponent(email) + "&action=register",
					type: "GET",
					headers: { 'Customer-Key': '19682', 'Timestamp': '1611582714234', 'Authorization': 'f32201d6adfd872acc19df58b606166e5e214678275998c2900a71978f1734e22bf8b71b4c0588b5d5022e497008bb9b76d182156dd4f371c1435935d517e0db' },
					success: function (result) {

						if (result.status == 'SUCCESS') {

							mobileErrorHandler.innerHTML = "";


							mobileNumberHandle.style = 'display:none'

							mobileNumberTextHandle.style = 'display:none'

							submitButtonHandle.style = 'display:none'
							emailSubmitButtonHandle.style = 'display:none'
							whatsAppSubmitButtonHandle.style = 'display:none'
							phoneButtonHandle.style = 'display:none'
						
							emailButtonHandle.style = 'display:none'
							whatsAppButtonHandle.style = 'display:none'
							emailHandle.style = 'display:none'
							otpTextHandle.style = 'display:block;'

							otp1Handle.style = 'display:inline-block;'

							otp2Handle.style = 'display:inline-block;'

							otp3Handle.style = 'display:inline-block;'

							otp4Handle.style = 'display:inline-block;'

							otp5Handle.style = 'display:inline-block;'

							otp6Handle.style = 'display:inline-block;'
var otpDigitsNumber = "6";
if( otpDigitsNumber == "4"){
  $('#otpinput5').hide();
  $('#otpinput6').hide();
}

							verifyButtonHandle.style = 'display:inline-block;'

							emailResendButtonHandle.style = 'display:inline-block;'

							changeButtonHandle.style = 'display:inline-block;'

							flag.innerHTML = '.iti__selected-flag[class^="iti__"] { display: none; }';

							document.head.appendChild(flag);

							txId = result.txId;

						}
						else if (result.status == 'false') {
							mobileErrorHandler.innerHTML = "Email entered is invalid. Please check or add email to your profile";
						}
						else if (result.status == 'FAILED') {

							mobileErrorHandler.innerHTML = "Transaction limit for this email is exceeded. Please change the email or try after sometime";
						}

					},

					error: function (xhr, status, p3) {
						var err = "Error " + " " + status + " " + p3;
						if (xhr.responseText && xhr.responseText[0] == "{") {
							err = JSON.parse(xhr.responseText).message;
							console.log(err);
						}
						alert(p3);
					}

				});
		}
		else {
			alert('Invalid  email address.');
		}
	});

	emailResendButtonHandle.addEventListener('click', function () {
		email = emailHandle.value;
if(email == "" && Hash_Param.has('mobilenumber')){
 email = Hash_Param.get('mobilenumber').replace(/#/g, '');
}if( emailDomainRestrictStatus == "on" && email.includes(emailDomainToRestrict) === false ){
			mobileErrorHandler.innerHTML = "This email domain is not permitted for login.";return;}
		mobileErrorHandler.innerHTML = "Please Wait. We are sending OTP again.";
       $.ajax(
			{
				url: appUrl + "/moas/rest/shopify/api/auth/otprequest2fa?shop=" + window.location.hostname + "&to=" + encodeURIComponent(email) + "&action=register",
				type: "GET",
				headers: { 'Customer-Key': '19682', 'Timestamp': '1611582714234', 'Authorization': 'f32201d6adfd872acc19df58b606166e5e214678275998c2900a71978f1734e22bf8b71b4c0588b5d5022e497008bb9b76d182156dd4f371c1435935d517e0db' },
				success: function (result) {

					if (result.status == 'SUCCESS') {

						mobileErrorHandler.innerHTML = "";


						mobileNumberHandle.style = 'display:none'

						mobileNumberTextHandle.style = 'display:none'

						submitButtonHandle.style = 'display:none'
						phoneButtonHandle.style = 'display:none'
						
						emailButtonHandle.style = 'display:none'

						otpTextHandle.style = 'display:block;'

						otp1Handle.style = 'display:inline-block;'

						otp2Handle.style = 'display:inline-block;'

						otp3Handle.style = 'display:inline-block;'

						otp4Handle.style = 'display:inline-block;'

						otp5Handle.style = 'display:inline-block;'

						otp6Handle.style = 'display:inline-block;'
var otpDigitsNumber = "6";
if( otpDigitsNumber == "4"){
  $('#otpinput5').hide();
  $('#otpinput6').hide();
}
						verifyButtonHandle.style = 'display:inline-block;'

						emailResendButtonHandle.style = 'display:inline-block'

						changeButtonHandle.style = 'display:inline-block;';

						txId = result.txId;

					}
					else if (result.status == 'false') {
						mobileErrorHandler.innerHTML = "The entered email address is invalid. Please check your email address or add your email to your profile ";
					}
				},
				error: function (xhr, status, p3, p4) {
					//var err = "Error " + " " + status + " " + p3;
					//if(status== "FAILED")
					// if (xhr.responseText && xhr.responseText[0] == "{")
					// 	err = JSON.parse(xhr.responseText).message;
					//alert(err);
				}
			}
		);
	});



	defaultloginHandle.addEventListener('click', function () {
		document.getElementById("MOLoginModal").style.display = 'none';
		document.getElementById("customer_login").style.display = 'block';
		document.getElementById("login").style.display = 'block';

	});

document.getElementById("loginButton").addEventListener('click', function() {
if(!validateEmail(emailHandle.value)){
	alert('Invalid Email address');
}
	else{
		document.getElementById('loginShopify').elements.namedItem("emailEntered").value = emailHandle.value;
		document.getElementById('loginShopify').elements.namedItem("shop").value = window.location.hostname;
		document.getElementById('loginShopify').elements.namedItem("mobilenumber").value = contact;
		document.getElementById('loginShopify').elements.namedItem("shopcheckouturl").value = CheckoutUrl;
		document.getElementById('loginShopify').submit();
}
	});

	document.getElementById("verifyButton").addEventListener('click', function () {
		otpvalue = $("#otpinput1,#otpinput2,#otpinput3,#otpinput4,#otpinput5,#otpinput6").map(function () { return this.value; }).get().join('');

/* Check whether email register after OTP login is enabled */
		var verifyOtpEndpoint;
			if(contact== undefined)
			{
			contact = emailHandle.value;
			document.getElementById('verifyotp').elements.namedItem("authtype").value = "email";
			}
		if(isEmailRegisterEnabled == "on" && !validateEmail(contact)){
			verifyOtpEndpoint = "verifySmsOtp2fa";
		}
		else{
			verifyOtpEndpoint = "verifyOtp2fa";
		}
if (verifyOtpEndpoint == "verifyOtp2fa") {
    var Hash_String = window.location.search;
    const Hash_Param = new URLSearchParams(Hash_String);
    if(Hash_Param.has('txid')){
        txId = Hash_Param.get('txid');
    }
    if(Hash_Param.has('mobilenumber')){
        contact = Hash_Param.get('mobilenumber');
    }
    if(Hash_Param.has('checkout_url')){
        CheckoutUrl = Hash_Param.get('checkout_url');
    }
    mobileErrorHandler.innerHTML = "Please Wait. Your OTP is being verified.";
    phoneButtonHandle.style.display = 'none';
    emailButtonHandle.style.display = 'none';
    whatsAppButtonHandle.style.display = 'none';
    document.getElementById('verifyotp').elements.namedItem("txid").value = txId;
    document.getElementById('verifyotp').elements.namedItem("shop").value = window.location.hostname;
    document.getElementById('verifyotp').elements.namedItem("otp").value = otpvalue;
    document.getElementById('verifyotp').elements.namedItem("mobilenumber").value = contact;
    document.getElementById('verifyotp').elements.namedItem("shopcheckouturl").value = CheckoutUrl;
    document.getElementById('verifyotp').submit();
} else {
    $.ajax({
        url: appUrl + "/moas/rest/2fa/api/auth/" + verifyOtpEndpoint + "?shop=" + window.location.hostname + "&mobilenumber=" + contact + "&shopcheckouturl=" + CheckoutUrl + "&txid=" + txId + "&otp=" + otpvalue,
        type: "GET",
        headers: {
            'Customer-Key': '19682',
            'Timestamp': '1611582714234',
            'Authorization': 'f32201d6adfd872acc19df58b606166e5e214678275998c2900a71978f1734e22bf8b71b4c0588b5d5022e497008bb9b76d182156dd4f371c1435935d517e0db'
        },
        success: function (result) {
            if (result.status == 'SUCCESS') {
                emailTextHandle.style.display = 'block';
                mobileNumberHandle.style.display = 'none';
                mobileNumberTextHandle.style.display = 'none';
                emailHandle.style.display = 'block';
                otpTextHandle.style.display = 'none';
                mobileErrorHandler.innerHTML = "";
                resendButtonHandle.style.display = 'none';
                changeButtonHandle.style.display = 'none';
                verifyButtonHandle.style.display = 'none';
                loginButtonHandle.style.display = 'block';
                loginButtonHandle.style.width = '100%';
                $('#mobileField').hide();

                otp1Handle.style.display = 'none';
                otp2Handle.style.display = 'none';
                otp3Handle.style.display = 'none';
                otp4Handle.style.display = 'none';
                otp5Handle.style.display = 'none';
                otp6Handle.style.display = 'none';

                var otpDigitsNumber = "6";
                if (otpDigitsNumber == "4") {
                    $('#otpinput5').hide();
                    $('#otpinput6').hide();
                }
            } else if (validateEmail(result.status)) {
                document.getElementById('loginShopify').elements.namedItem("emailEntered").value = result.status;
                document.getElementById('loginShopify').elements.namedItem("shop").value = window.location.hostname;
                document.getElementById('loginShopify').elements.namedItem("mobilenumber").value = contact;
                document.getElementById('loginShopify').elements.namedItem("shopcheckouturl").value = CheckoutUrl;
                document.getElementById('loginShopify').submit();
            } else {
                mobileErrorHandler.innerHTML = "You have entered an invalid OTP";
            }
        }
    });
}

if (Hash_Param.has('status')) {
    emailTextHandle.style.display = 'block';
    mobileNumberHandle.style.display = 'none';
    mobileNumberTextHandle.style.display = 'none';
    emailHandle.style.display = 'block';
    $('#mobileField').hide();
}
	if (Hash_Param.has('txid')) {
		mobileErrorHandler.innerHTML = "You have entered invalid OTP"

		mobileNumberHandle.style = 'display:none'

		mobileNumberTextHandle.style = 'display:none'

		submitButtonHandle.style = 'display:none'

		otpTextHandle.style = 'display:block;'

		otp1Handle.style = 'display:inline-block;'

		otp2Handle.style = 'display:inline-block;'
		otp3Handle.style = 'display:inline-block;'

		otp4Handle.style = 'display:inline-block;'

		otp5Handle.style = 'display:inline-block;'

		otp6Handle.style = 'display:inline-block;'

var otpDigitsNumber = "6";
if( otpDigitsNumber == "4"){
  $('#otpinput5').hide();
  $('#otpinput6').hide();
}
		verifyButtonHandle.style = 'display:inline-block;'

       phoneButtonHandle.style = 'display:none';
       whatsAppButtonHandle.style = 'display:none';
						
		emailButtonHandle.style = 'display:none';
		if(Hash_Param.get('mobilenumber').includes('@'))
		{
		document.getElementById("resendButton").style = 'display:none;';
		changeButtonHandle.innerHTML = 'Change Email Address';
        changeButtonHandle.style = 'display:display:inline-block;';
		 document.getElementById("emailResendButton").style = 'display:inline-block';
		}
		else
		{
		document.getElementById("resendButton").style = 'display:inline-block;';
		changeButtonHandle.innerHTML = 'Change Phone Number';
        changeButtonHandle.style = 'display:display:inline-block;';
		 document.getElementById("emailResendButton").style = 'display:none';
		}
		// document.getElementById("resendButton").style = 'display:inline-block; ';

		// changeButtonHandle.style = 'display:inline-block;';

		flag.innerHTML = '.iti__selected-flag[class^="iti__"] { display: none; }';

		document.head.appendChild(flag);

		txId = Hash_Param.get('txid');
		contact = Hash_Param.get('mobilenumber');
	}

});
});



setTimeout(function() {
	var Hash_String = window.location.search;
	const Hash_Param = new URLSearchParams(Hash_String);
	let mobileErrorHandler = document.getElementById("mobileError");
	let mobileNumberHandle = document.getElementById('mobileNumber')
	let mobileNumberTextHandle = document.getElementById('mobileNumberText')
	var submitButtonHandle = document.getElementById('submitButton');
	let otpTextHandle = document.getElementById('otpText');
	let otp1Handle = document.getElementById('otpinput1');
	let otp2Handle = document.getElementById('otpinput2');
	let otp3Handle = document.getElementById('otpinput3');
	let otp4Handle = document.getElementById('otpinput4');
	let otp5Handle = document.getElementById('otpinput5');
	let otp6Handle = document.getElementById('otpinput6');
	let verifyButtonHandle = document.getElementById('verifyButton');
	let resendButtonHandle = document.getElementById('resendButton');
	let changeButtonHandle = document.getElementById('changeButton');
	var emailButtonHandle = document.getElementById('emailButton');
	var phoneButtonHandle = document.getElementById('phoneButton');
	var whatsAppButtonHandle = document.getElementById('whatsappButton');
	var flag = document.createElement('style');
if (Hash_Param.has('txid')) {
	mobileErrorHandler.innerHTML = "You have entered invalid OTP"

	mobileNumberHandle.style = 'display:none'

	mobileNumberTextHandle.style = 'display:none'

	submitButtonHandle.style = 'display:none'

	otpTextHandle.style = 'display:block;'

	otp1Handle.style = 'display: inline-block;'

	otp2Handle.style = 'display: inline-block;'

	otp3Handle.style = 'display: inline-block;'

	otp4Handle.style = 'display: inline-block;'

	otp5Handle.style = 'display: inline-block;'

	otp6Handle.style = 'display: inline-block;'

var otpDigitsNumber = "6";
if( otpDigitsNumber == "4"){
  $('#otpinput5').hide();
  $('#otpinput6').hide();
}
verifyButtonHandle.style = 'display: inline-block;'

	resendButtonHandle.style = 'display:inline-block;' 

	changeButtonHandle.style = 'display:inline-block;'

	phoneButtonHandle.style = 'display:none';
	whatsAppButtonHandle.style = 'display:none';
		emailButtonHandle.style = 'display:none';

	flag.innerHTML = '.iti__selected-flag[class^="iti__"] { display: none; }';

    document.head.appendChild(flag);

	txId = Hash_Param.get('txid');
	contact = Hash_Param.get('mobilenumber');
}
}, 50);
function popup() {
	document.getElementById('MOLoginModal').style.display = 'block';
	document.getElementById('customer_login').style.display = 'none';
	document.getElementById('login').style.display = 'none';
}



// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
// 	if (event.target == document.getElementById('MOLoginModal')) {
// 		document.getElementById('MOLoginModal').style.display = 'none';
// 	}

// 	if (event.target == document.getElementById('updateModal')) {
// 		document.getElementById('updateModal').style.display = 'none';
// 	}

// }


function getCookie(cookieName) {
	let cookie = {};
	document.cookie.split(";").forEach(function (el) {
		let [key, value] = el.split("=");
		cookie[key.trim()] = value;
	})
	return cookie[cookieName];
}

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	else {
		expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

function validateEmail(email){
    var validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
    if(email.match(validRegex)){
        return true;
    }
    else {
        return false;
   }
}
function validatePhoneNumber(phone){
 var validRegex = /^\+\d{1,}$/;
 if(validRegex.test(phone)){
      return true;
 }
 else{
   return false;
 }
}

