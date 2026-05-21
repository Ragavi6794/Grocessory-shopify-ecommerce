// alert('no');
// $(document).ready(function(){

(function () {
	window.WALLET = (function () {
		function WALLET() { }
		WALLET.loadjQuery = function (afterLoad) {
			if (Shopify.shop != "splashings-of-fabric.myshopify.com") {

				return WALLET.loadScript("https://code.jquery.com/jquery-3.6.0.min.js", function () {
					
					return WALLET.loadScript("https://checkout.razorpay.com/v1/checkout.js", function () {
						return WALLET.loadScript("https://js.stripe.com/v3/", function () {
							$ = jQuery.noConflict(true);
							$("head").append('<style type="text/css">.mp-spinner{ width: 50px !important; height: 50px !important; border-width: 4px !important; } .wm-thank-loader { position: fixed; background: rgba(255, 255, 255, 1); top: 0; left: 0; bottom: 0; right: 0; z-index: 1100} .wm-thank-loader .mp-spinner { width: 52px; height: 52px; border: 4px solid #cccccc; border-radius: 50%; animation: mp-spin 460ms infinite linear; -o-animation: mp-spin 460ms infinite linear; -ms-animation: mp-spin 460ms infinite linear; -webkit-animation: mp-spin 460ms infinite linear; -moz-animation: mp-spin 460ms infinite linear; border-color: #0033EE transparent; position: absolute; left: 50%; top: 50%; margin-left: -26px; margin-top: -26px; } .wm-thank-loader .title-text { position: relative; text-align: center !important; top: 56%; width: 100%; } @keyframes mp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @-o-keyframes mp-spin { from { -o-transform: rotate(0deg); } to { -o-transform: rotate(360deg); } } @-ms-keyframes mp-spin { from { -ms-transform: rotate(0deg); } to { -ms-transform: rotate(360deg); } } @-webkit-keyframes mp-spin { from { -webkit-transform: rotate(0deg); } to { -webkit-transform: rotate(360deg); } } @-moz-keyframes mp-spin { from { -moz-transform: rotate(0deg); } to { -moz-transform: rotate(360deg); } }.mp-absolute {	position: absolute;	}.mp-relative {	position: relative;	} .wk-margin-bottom{margin-bottom:10px;} .wk-text-danger{color:red!important;} .wk-text-success{color:green!important;}.wk-text-warning{color:#8a6d3b!important;} .wk-mp-hide{display:none!important;}</style>');
							$("body").append('<div class="wm-thank-loader"  style="display: none;"><div class="mp-spinner"></div><div class="title-text" id="wk-loader-msg1" style="font-size: 17px;>Please Wait...</div><div class="title-text">Do Not Press Back Or Refresh button</div></div>');

							WALLET.loadLink(WALLET.api_url + "/css/wallet.css");
							return afterLoad();
						});
					});

				});
			}
			else {
				return WALLET.loadScript("https://checkout.razorpay.com/v1/checkout.js", function () {
					return WALLET.loadScript("https://js.stripe.com/v3/", function () {
						$ = jQuery.noConflict(true);
						$("head").append('<style type="text/css">.mp-spinner{ width: 50px !important; height: 50px !important; border-width: 4px !important; } .wm-thank-loader { position: fixed; background: rgba(255, 255, 255, 1); top: 0; left: 0; bottom: 0; right: 0; z-index: 1100} .wm-thank-loader .mp-spinner { width: 52px; height: 52px; border: 4px solid #cccccc; border-radius: 50%; animation: mp-spin 460ms infinite linear; -o-animation: mp-spin 460ms infinite linear; -ms-animation: mp-spin 460ms infinite linear; -webkit-animation: mp-spin 460ms infinite linear; -moz-animation: mp-spin 460ms infinite linear; border-color: #0033EE transparent; position: absolute; left: 50%; top: 50%; margin-left: -26px; margin-top: -26px; } .wm-thank-loader .title-text { position: relative; text-align: center !important; top: 56%; width: 100%; } @keyframes mp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @-o-keyframes mp-spin { from { -o-transform: rotate(0deg); } to { -o-transform: rotate(360deg); } } @-ms-keyframes mp-spin { from { -ms-transform: rotate(0deg); } to { -ms-transform: rotate(360deg); } } @-webkit-keyframes mp-spin { from { -webkit-transform: rotate(0deg); } to { -webkit-transform: rotate(360deg); } } @-moz-keyframes mp-spin { from { -moz-transform: rotate(0deg); } to { -moz-transform: rotate(360deg); } }.mp-absolute {	position: absolute;	}.mp-relative {	position: relative;	} .wk-margin-bottom{margin-bottom:10px;} .wk-text-danger{color:red!important;} .wk-text-success{color:green!important;}.wk-text-warning{color:#8a6d3b!important;} .wk-mp-hide{display:none!important;}</style>');
						$("body").append('<div class="wm-thank-loader"  style="display: none;"><div class="mp-spinner"></div><div class="title-text" id="wk-loader-msg1" style="font-size: 17px;>Please Wait...</div><div class="title-text">Do Not Press Back Or Refresh button</div></div>');

						WALLET.loadLink(WALLET.api_url + "/css/wallet.css");
						return afterLoad();
					});
				});
			}
		};
		WALLET.loadLink = function (url) {
			var style;
			style = document.createElement("link");
			style.type = "text/css";
			style.rel = "stylesheet";

			style.href = url;
			return document.getElementsByTagName("head")[0].appendChild(style);

		}
		WALLET.loadScript = function (url, callback) {

			var script;
			script = document.createElement("script");
			script.type = "text/javascript";

			if (script.readyState) {
				script.onreadystatechange = function () {
					if (script.readyState == "loaded" || script.readyState == "complete") {
						script.onreadystatechange = null;
						return callback();
					}
				};
			}
			else {
				script.onload = function () {
					return callback();
				};
			}
			script.src = url;
			document.getElementsByTagName("head")[0].appendChild(script);
			return true;
		};
		return WALLET;
	})();

	WALLET.api_url = "https://app-wallet.webkul.com";
	WALLET.shop_name = Shopify.shop;
	WALLET.currency = Shopify.money_format;
	WALLET.path = window.location.pathname.split('/');
	WALLET.handle = WALLET.path.pop(-1);
	WALLET.page = WALLET.path.pop(-2);
	
	WALLET.showLoader = function () {
		var payment_method_find = $('.payment-method-list__item__info').html();
		// var payment_financial_status = $('.order_financial_status').val();

		$.ajax({
			type: 'POST',
			url: WALLET.api_url + "/admin/wallet",
			dataType: "text",
			crossDomain: true,
			data: { shop_name: WALLET.shop_name, callback: 'WALLET_AS_PAYMENT_METHOD', payment_method_find: payment_method_find },
			success: function (response) {
				if (WALLET.shop_name != 'amala-earth.myshopify.com') {
					if (response && response != 0 && response != "0" && response != '0') {
						$('body').find('.wm-thank-loader').show();
						$("#wk-loader-msg1").text(response);
					}
				}
				console.log("loader");
			},
			error: function (response) {
				console.log("something went wrong in loader ");
			}
		});

	};

	WALLET.removeLoader = function () {
		console.log("hide loader");
		$('body').find('.wm-thank-loader').hide();
	};

	WALLET.loadjQuery(function () {
		console.log(WALLET.currency);
		console.log('server 6');

		if (window.location.search.search("wk_collection_preview") > 0) {
			var theme_color = GetURLParameter('theme_color');
			if ($('#wk_cashback_collection_front').length > 0) {

			} else {
				setTimeout(
					function () {
						$(document).find('.wk_cashback').css('background-color', theme_color);
						$(document).find('.wk_cashback').html('<div id="wk_cashback_collection_front" >GET ' + Shopify.currency.active + ' 10 CASHBACK</div>').show();

					}, 2000);

			}
		}

		if (window.location.search.search("wk_wallet_preview") > 0) {
			var theme_color = GetURLParameter('theme_color');
			setTimeout(
				function () {
					$(document).find('#wk_wallet').children('div').css('display', 'inline-block');

				}, 2000);

		}

		if (window.location.search.search("wk_header_amt_preview") > 0) {
			if ($('.wk_money').length > 0) {

			} else {
				$(document).find('.wk_wallet_amount').html('<span class="wk_money">Wallet ' + Shopify.currency.active + ' 1</span>').show();
				// window.location.reload();
			}
		}

		if ($(".wk_wallet_amount").length > 0) {
			var customer_id = $(".wk_wallet_amount").attr("customer_id");
			var customer_email = $(".wk_wallet_amount").attr("customer_email");
			var remaning_amt = 'check';

			if(customer_email != undefined && customer_id != undefined && customer_email != null && customer_id != null && customer_email != 'NULL' && customer_id != 'NULL') {
				if(typeof wk_wallet_balance !== 'undefined' && wk_wallet_balance != '' && wk_wallet_balance != undefined) {
					var wk_wallet_header = wk_wallet_label+' '+wk_wallet_balance;
					$(".wk_wallet_amount").html(wk_wallet_header);
				} else {
					$.ajax({
						type: 'POST',
						url: WALLET.api_url + "/admin/wallet",
						jsonpCallback: "WALLETAMOUNT",
						dataType: "jsonp",
						crossDomain: true,
						data: { customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name, remaning_amt: remaning_amt },
						success: function (response) {
							// console.log(response);
							if (response) {
								if (window.location.search.search("wk_header_amt_preview") < 0) {
									$(".wk_wallet_amount").html(response);
								}
							}
						},
						error: function (response) {
							// console.log(response);
							console.log("something went wrong");
						}
					});
				}
			}
			
		}


		if ( WALLET.handle == "thank_you") {
		// if(false){


			// $("#wk-loader-msg1").text("Please Wait...while redirecting you to the order status page");

			if (getSession('wk_stripe_order_paid') === undefined || getSession('wk_stripe_order_paid') === null) {
				WALLET.showLoader();
				myinterval = setInterval(function () {
					WALLET.checkStripeEnable();
				}, 5000);
			} else {
				if (sessionStorage.getItem('wk_stripe_order_paid') == 0) {
					WALLET.showLoader();
					myinterval = setInterval(function () {
						WALLET.checkStripeEnable();
					}, 5000);
				}
			}

			//  ----------------------------------------- Code to re-set loader time ----------------------------------------------
			// if (getSession('wk_stripe_order_paid') === undefined || getSession('wk_stripe_order_paid') === null) {

			// 	if(sessionStorage.getItem('wk_stripe_order_paid') === undefined || sessionStorage.getItem('wk_stripe_order_paid') === null){
			// 		WALLET.showLoader();
			// 		myinterval = setInterval(function(){ 
			// 			WALLET.checkStripeEnable(); 
			// 		}, 10000);
			// 	}else{
			// 		myinterval = setInterval(function(){ 
			// 			WALLET.checkStripeEnable(); 
			// 		}, 5000);
			// 	}

			// }else{
			// 	if(getSession('wk_stripe_order_paid') == 0) {
			// 		WALLET.showLoader();
			// 		myinterval = setInterval(function(){ 
			// 			WALLET.checkStripeEnable(); 
			// 		}, 5000);
			// 	}
			// }
			//  ----------------------------------------- Code to re-set loader time ----------------------------------------------

			// if (getCookie('wk_stripe_order_paid') === undefined || getCookie('wk_stripe_order_paid') === null) {
			// 	WALLET.showLoader();
			// 	myinterval = setInterval(function(){ 
			// 		WALLET.checkStripeEnable(); 
			// 	}, 10000);
			// }else{
			// 	if(getCookie('wk_stripe_order_paid') == 0) {
			// 		WALLET.showLoader();
			// 		myinterval = setInterval(function(){ 
			// 			WALLET.checkStripeEnable(); 
			// 		}, 10000);
			// 	}
			// }
		}
		else if (WALLET.page == "pages" && WALLET.handle == "paypal-payment-cancelled" && window.location.search != "") {
			// var params = window.location.search.substring(1).split("=");
			// // console.log(params);
			// if(params[0] == "main_id_order"){
			// 	Stripe.checkGetPaypalPaymentUrl(params[1]);
			// }
		}

		WALLET.checkStripeEnable = function () {
			// WALLET.showLoader();
			var type = "token";
			var token = WALLET.handle;
			// var return_url = JSON.stringify(window.location.href);
			return_url = "";
			var order_checkout_no = window.location.pathname;
			if (WALLET.handle == "thank_you") {
				type = "checkout_token";
				token = WALLET.page;
				token = Shopify.Checkout.token;
			} else if (WALLET.page == "orders") {
				type = "checkout_token";
				token = WALLET.handle;
			}
			// type = "checkout_token";
			// token = 'fcefdc5ad80472dd12cc3b08252bcbbe';
			$.ajax
			({
				url: WALLET.api_url + "/admin/wallet_payment",
				type: "POST",
				jsonpCallback: 'STRIPEPAY',
				dataType: "jsonp",
				data: { type: type, token: token, return_url: "", order_checkout_no: order_checkout_no, shop_name: WALLET.shop_name },
				beforeSend: function () {
					WALLET.showLoader();
				},
				success: function (data) {
					// console.log(data);
					// setCookie('wk_stripe_order_paid','0',10);
					setSession('wk_stripe_order_paid', '0');

					if (typeof data.name === "undefined") {
						// else{
						// 	// }
						// 	// else if (Stripe.$.trim(data.method) == "paypal-adaptive") {
						// 	// 	/* payment was made by paypal adaptive payment method */
						// 	// 	var html = "<form id='wk_paypal_payment_form' method='POST' action='" + Stripe.api_url + "index.php?p=front_paypal_adaptive_payment_process' class='wk-mp-hide'><input type='hidden' name='return_url' value='" + window.location + "'/><input type='hidden' name='shop' value='" + Shopify.shop + "'/><input type='hidden' name='type' value='" + type + "'/><input type='hidden' name='token' value='" + token + "'/><input type='hidden' name='main_id_order' value='" + data.main_id_order + "'/><button id='wk_stripe_submit_btn' type='submit'/></form>";
						// 	// 	Stripe.removeLoader();
						// 	// 	Stripe.$("body").append(html);
						// 	// 	Stripe.$("#wk_paypal_payment_form").submit();
						// 	// }
						// }
					} else {
						WALLET.removeLoader();
						if (data.name == 'session_id') {
							session_id = data.session_id;
							var stripe = Stripe(data.publish_key);
							stripe.redirectToCheckout({
								// Make the id field from the Checkout Session creation API response
								// available to this file, so you can provide it as parameter here
								// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
								sessionId: session_id
							}).then(function (result) {
								// If `redirectToCheckout` fails due to a browser or network
								// error, display the localized error message to your customer
								// using `result.error.message`.
								console.log(result.error.message);
							});
						} else if (data.name == 'error_with_create_session') {
							console.log("this is due to issue with stripe key");
							console.log(data.message);

							$("body").find(".payment-method-list").append("<p>" + data.payment_status_label + ": <span class='wk-text-warning'>" + data.pending_label + "</span></p>");
							clearInterval(myinterval);
							// setCookie('wk_stripe_order_paid','1',10);
							setSession('wk_stripe_order_paid', '1');
							Shopify.Checkout.OrderStatus.addContentBox(
								'<h2>' + data.payment_status_label + '</h2>',
								'<p style="color:red;">' + data.error_msg + '</p>'
							)
							WALLET.removeLoader();
						} else if (data.name == 'extra_add_amount_below_cents') {

							console.log("This is due to which rest amount need to add in wallet to purchase products but that amount have not fullfill the minimum add amount condition of stripe.");

							$("body").find(".payment-method-list").append("<p>" + data.payment_status_label + ": <span class='wk-text-warning'>" + data.pending_label + "</span></p>");

							clearInterval(myinterval);
							// setCookie('wk_stripe_order_paid','1',10);
							setSession('wk_stripe_order_paid', '1');
							Shopify.Checkout.OrderStatus.addContentBox(
								'<h2>' + data.payment_status_label + '</h2>',
								'<p style="color:red;">' + data.error_msg + '</p>'
							)
							WALLET.removeLoader();
						} else if (data.name == "pending") {
							console.log("Get stuck at the time of create transaction crossponding to this order");

							$("body").find(".payment-method-list").append("<p>" + data.payment_status_label + ": <span class='wk-text-warning'>" + data.pending_label + "</span></p>");
							clearInterval(myinterval);
							// setCookie('wk_stripe_order_paid','1',10);
							setSession('wk_stripe_order_paid', '1');
							Shopify.Checkout.OrderStatus.addContentBox(
								'<h2>' + data.payment_status_label + '</h2>',
								'<p style="color:red;">' + data.error_msg + '</p>'
							)
							WALLET.removeLoader();
						}
						else if (data.name == "paid") {

							console.log("order paid successfully");
							clearInterval(myinterval);
							// setCookie('wk_stripe_order_paid','1',10);
							setSession('wk_stripe_order_paid', '1');
							$("body").find(".payment-method-list").append("<p>" + data.payment_status_label + " : <span class='wk-text-success'>" + data.success_label + "</span></p>");
							WALLET.removeLoader();
						} else if (data.name == 'different_payment_method') {

							console.log("This means that different payment method name saved in backend and frontend so its does not save the payment method orders with checkout_token.");
							clearInterval(myinterval);
							setSession('wk_stripe_order_paid', '1');
							WALLET.removeLoader();
						} else if (data.name == 'paypal_payment_creation') {
							window.open(data.checkout_link, '_top');
						} else if (data.name == 'error_with_create_paypal_token') {
							console.log(data.msg);
							Shopify.Checkout.OrderStatus.addContentBox(
								'<h2>' + data.payment_status_label + '</h2>',
								'<p style="color:red;">' + data.error_msg + '</p>'
							)
							clearInterval(myinterval);
							setSession('wk_stripe_order_paid', '1');
							WALLET.removeLoader();
						} else if ('razor_pay_payment_creation') {
							clearInterval(myinterval);
							setSession('wk_stripe_order_paid', '1');
							var rzp1 = new Razorpay(data.options);
							rzp1.open();
						}
					}
				},
				error: function (error) {
					console.log(error);
					console.log("error");
					WALLET.removeLoader();
				}
			});
		};
		if ($(".wk_cashback").length > 0) {  /*THIS IS FOR ALL PRODUCT ON PRODUCT GRIG IN SNIPPET */
			products_ids = [];
			product_metafields = [];
			$(".wk_cashback").each(function () {
				var product_id = $(this).attr('product_id');
				var product_metafield = $(this).attr('product_metafield');

				if (product_id) {
					products_ids.push(product_id);
				}

				if (product_metafield) {
					product_metafields.push(product_metafield);
				}
			});
			if (products_ids && product_metafields) {
				if (window.location.search.search("wk_collection_preview") > 0) {
					var preview_color_theme = GetURLParameter('theme_color');
				} else {
					var preview_color_theme = 0;
				}

				$(".wk_cashback").each(function () {
					var product_id = $(this).attr('product_id');
					var product_metafield = $(this).attr('product_metafield');
					if(product_metafield){		
						// var wk_data_set = wkMyArray1[0]+' '+product_metafield+' '+wkMyArray2[1];
						// $(this).find("#wk_cashback_product_front").text(wk_data_set);

						product_metafield_json = isJson(product_metafield);

						if(product_metafield_json != 'false' && product_metafield_json != false) {
							date = new Date();

							var date1 = new Date(product_metafield_json.date_from);
							var date2 = new Date(product_metafield_json.date_to);
							if ((date1.getTime() <= date.getTime()) && (date2.getTime() >= date.getTime())) {
								var same = $(this);
								$(same).html(wk_cashback_label);


								var wk_cashback_text = $(this).find("#wk_cashback_product_front").text();
								var wkMyArray1 = wk_cashback_text.split("{");
								var wkMyArray2 = wkMyArray1[1].split("}");
								var wk_data_set = wkMyArray1[0]+' '+product_metafield_json['amount']+' '+wkMyArray2[1];
								$(this).find("#wk_cashback_product_front").text(wk_data_set);
							}
						} else {
							var same = $(this);
							$(same).html(wk_cashback_label);


							var wk_cashback_text = $(this).find("#wk_cashback_product_front").text();
							var wkMyArray1 = wk_cashback_text.split("{");
							var wkMyArray2 = wkMyArray1[1].split("}");
							var wk_data_set = wkMyArray1[0]+' '+product_metafield+' '+wkMyArray2[1];
							$(this).find("#wk_cashback_product_front").text(wk_data_set);
						}
					}
				});





				// $.ajax({
				// 	type: 'POST',
				// 	url: WALLET.api_url + "/admin/walletCashback",
				// 	jsonpCallback: "CASHBACK_GRID",
				// 	dataType: "jsonp",
				// 	crossDomain: true,
				// 	data: { shop_name: WALLET.shop_name, products_ids: products_ids, preview_color_theme: preview_color_theme },
				// 	success: function (response) {
				// 		// console.log(response);
				// 		if (response) {
				// 			$(".wk_cashback").each(function () {
				// 				var product_id = $(this).attr('product_id');
				// 				var same = $(this);
				// 				$(response.data).each(function (index, value) {
				// 					$(value).each(function () {
				// 						if (value.product_id == product_id) {
				// 							// console.log(value.templates);
				// 							$(same).html(value.templates);
				// 						}
				// 					});
				// 				});
				// 			});
				// 		}
				// 	},
				// 	error: function (response) {
				// 		console.log("something went wrong");
				// 	}
				// });
			}
		}

		function isJson(str) {
			try {
				JSON.parse(str);
			} catch (e) {
				return false;
			}
			return JSON.parse(str);
		}

		if ($(".wk_cashback_product").length > 0) {
			if( (typeof wk_cashback_amount !== 'undefined') && (wk_cashback_amount != undefined) && (wk_cashback_amount != "") && (wk_cashback_amount != null) && (typeof wk_cashback_label !== 'undefined') && (wk_cashback_label != undefined) && (wk_cashback_label != null)){
				console.log(`wk_cashback_amount is ${wk_cashback_amount}`);
				console.log(`wk_cashback_label is ${wk_cashback_label}`);
				$(".wk_cashback_product").html(wk_cashback_label);
				$(".wk_cashback_product").css('display', 'none');

				var wk_cashback_text = $("#wk_cashback_product_front").text();
				var wkMyArray1 = wk_cashback_text.split("{");
				var wkMyArray2 = wkMyArray1[1].split("}");

				wk_cashback_amount_json = isJson(wk_cashback_amount);

				if(wk_cashback_amount_json != 'false' && wk_cashback_amount_json != false) {
					date = new Date();

					var date1 = new Date(wk_cashback_amount_json.date_from);
					var date2 = new Date(wk_cashback_amount_json.date_to);
					if ((date1.getTime() <= date.getTime()) && (date2.getTime() >= date.getTime())) {
						var wk_data_set = wkMyArray1[0]+' '+wk_cashback_amount_json['amount']+' '+wkMyArray2[1];
						$("#wk_cashback_product_front").text(wk_data_set);
						$(".wk_cashback_product").css('display', 'block');
					}
				} else {
					var wk_data_set = wkMyArray1[0]+' '+wk_cashback_amount+' '+wkMyArray2[1];
					$("#wk_cashback_product_front").text(wk_data_set);
					$(".wk_cashback_product").css('display', 'block');
				}
			} 
			// else {
			// 	var product_id = $(".wk_cashback_product").attr("product_id");
			// 	$.ajax({
			// 		type: 'POST',
			// 		url: WALLET.api_url + "/admin/walletCashback",
			// 		jsonpCallback: "CASHBACK_PRODUCT",
			// 		dataType: "jsonp",
			// 		crossDomain: true,
			// 		data: { product_id: product_id, shop_name: WALLET.shop_name },
			// 		success: function (response) {
			// 			// console.log(response);
			// 			// if(response.cashback){
			// 			//   $(".wk_cashback_product").html(response.cashback+ ' CASHBACK')
			// 			// }
			// 			if (response) {
			// 				$(".wk_cashback_product").html(response);
			// 			}
			// 		},
			// 		error: function (response) {
			// 			console.log("something went wrong");
			// 		}
			// 	});
			// }
		}

		checkPayWallet(WALLET.api_url);

		if ($("#wk_wallet_orders").length > 0) {
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			var customer_tag = $("#wk_wallet").attr("customer_tag");

			$("body").on('click', '.pending_orders_record_li', function () {
				var record_value = $(this).text();

				$.ajax({
					type: 'POST',
					url: WALLET.api_url + "/admin/wallet_pending_orders",
					jsonpCallback: "WALLET_PENDING_ORDERS",
					dataType: "jsonp",
					crossDomain: true,
					data: { record_value: record_value, customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name },
					success: function (response) {
						// console.log(response);
						if (response == 0) {
							$("#wk_wallet_orders").html("<p class='not_publish'>Customer not Exists</p>");
						}
						else {
							$("#wk_wallet_orders").html(response);
						}
					},
					error: function (response) {
						// console.log(response);
						console.log("something went wrong");
					}
				});


			});

			// localStorage.setItem('customer_email', email_id);
			// localStorage.setItem('customer_id', id);
			$.ajax({
				type: 'POST',
				url: WALLET.api_url + "/admin/wallet_pending_orders",
				jsonpCallback: "WALLET_PENDING_ORDERS",
				dataType: "jsonp",
				crossDomain: true,
				data: { customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name },
				success: function (response) {
					// console.log(response);
					if (response == 0) {
						$("#wk_wallet_orders").html("<p class='not_publish'>Customer not Exists</p>");
					}
					else {
						$("#wk_wallet_orders").html(response);
					}
				},
				error: function (response) {
					// console.log(response);
					console.log("something went wrong");
				}
			});

		}

		if ($("#wk_wallet").length > 0) {
			// alert(WALLET.api_url);
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			var customer_tag = $("#wk_wallet").attr("customer_tag");
			var wk_amount_metafield = true;
			var wk_currency_metafield = true;

			if (window.location.search.search("wk_wallet_preview") > 0) {
				var preview_color_theme = GetURLParameter('theme_color');
			} else {
				var preview_color_theme = 0;
			}

			if(typeof wk_wallet_remaning_amount !== 'undefined' && wk_wallet_remaning_amount != '' && wk_wallet_remaning_amount != undefined) {
				wk_amount_metafield = false;
			}

			if(typeof wk_shop_currency !== 'undefined' && wk_shop_currency != '' && wk_shop_currency != undefined) {
				wk_currency_metafield = false;
			}
			// localStorage.setItem('customer_email', email_id);
			// localStorage.setItem('customer_id', id);
			$.ajax({
				type: 'POST',
				url: WALLET.api_url + "/admin/walletFront",
				jsonpCallback: "WALLET",
				dataType: "jsonp",
				crossDomain: true,
				data: { customer_id: customer_id, customer_email: customer_email, wk_currency_metafield:wk_currency_metafield,  wk_amount_metafield: wk_amount_metafield, preview_color_theme: preview_color_theme, shop_name: WALLET.shop_name },
				success: function (response) {
					// console.log(response);
					if (response == 0) {
						$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
					}
					else {
						$("#wk_wallet").html(response);
						let searchParams = new URLSearchParams(window.location.search)
						if (searchParams.has('success')) {
							let amount_added_successfully = $(".amount_added_successfully").html();
							$('.wr_has_money_err').html(amount_added_successfully).show();
							$('.wr_has_money_err').css('color', 'green');
						}
					}
				},
				error: function (response) {
					// console.log(response);
					console.log("something went wrong");
				}
			});
			$("#wk_add_wallet").on("click", function () {
				// console.log(customer_id);
				// console.log(customer_email);
				// console.log(customer_tag);
				$.ajax({
					type: 'POST',
					url: WALLET.api_url + "/admin/wallet",
					jsonpCallback: "WALLET",
					dataType: "jsonp",
					crossDomain: true,
					data: { customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name },
					success: function (response) {
						// console.log(response);
						if (response == 0) {
							$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
						}
						else {
							// if((".money").length > 0){
							//
							// }
							// else{
							$("#wk_wallet").append(response);
							// }
						}
					},
					error: function (response) {
						console.log("something went wrong");
					}
				});
			});


			$("body").on("click", "#wk_add_money_myBtn", function() {
				$("#wk_wallet_add_money_modal").css("display", "block");
			});

			$("body").on("click", ".wk_refund_request_data_for_new", function() {
				$(".wk_refund_request").css("display", "block");
				$(".wk_request_refund_div").css("display", "block");
			});
			
			$("body").on("click", ".wk_wallet_add_close", function() {
				$("#wk_wallet_add_money_modal").css("display", "none");
			});
			
			window.onclick = function(event) {
				var modal = document.getElementById("wk_wallet_add_money_modal");
				if (event.target == modal) {
				$("#wk_wallet_add_money_modal").css("display", "none");
				}
			}
		}

		$('body').on('click', '.wk_save_wallet_settings', function (e) {
			var wk_priority 			= $('input[name="wk_priority"]:checked').val();
			var customer_id 			= $("#wk_wallet").attr("customer_id");
			var customer_email 			= $("#wk_wallet").attr("customer_email");
			var wk_id_customer_wallet 	= $(".wk_id_customer_wallet").val();

			$.ajax
			({
				url: WALLET.api_url + "/admin/wallet_front",
				type: "POST",
				jsonpCallback: "WALLET_SETTINGS",
				dataType: "jsonp",
				data: { customer_id: customer_id, wk_id_customer_wallet: wk_id_customer_wallet, customer_email: customer_email, shop_name: WALLET.shop_name, wk_priority: wk_priority, request:'save_priority' },
				beforeSend: function () {
					WALLET.showLoader();
				},
				success: function (data) {
					var x = document.getElementById("wk_wallet_setting_snackbar");
					x.className = "show";
					setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
				},
				error: function (error) {
					console.log(error);
				}
			});
		});

		$('body').on('click', '.wk_pay_rest_amt', function (e) {
			e.preventDefault();
			$('.wk_pay_rest_amt').prop('disabled', true);
			var pending_order_id = $(this).siblings('.pending_order_id').val();
			var customer_id = $(this).siblings('.customer_id').val();
			$.ajax ({
				url: WALLET.api_url + "/admin/wallet_pending_orders",
				type: "POST",
				jsonpCallback: 'PAY_REST_AMT',
				dataType: "jsonp",
				data: { customer_id: customer_id, pending_order_id: pending_order_id, shop_name: WALLET.shop_name },
				beforeSend: function () {
					$(".wk_main_pending_orders").addClass("wm-loader").prop("disabled", true);
				},
				complete: function () {
					$(".wk_main_pending_orders").removeClass("wm-loader").prop("disabled", false);
					$(".wk_main_pending_orders").prop("disabled", false);
				},
				success: function (data) {
					// console.log(data);
					// setCookie('wk_stripe_order_paid','0',10);
					setSession('wk_stripe_order_paid', '0');

					if (typeof data.name === "undefined") {
						// else{
						// 	// }
						// 	// else if (Stripe.$.trim(data.method) == "paypal-adaptive") {
						// 	// 	/* payment was made by paypal adaptive payment method */
						// 	// 	var html = "<form id='wk_paypal_payment_form' method='POST' action='" + Stripe.api_url + "index.php?p=front_paypal_adaptive_payment_process' class='wk-mp-hide'><input type='hidden' name='return_url' value='" + window.location + "'/><input type='hidden' name='shop' value='" + Shopify.shop + "'/><input type='hidden' name='type' value='" + type + "'/><input type='hidden' name='token' value='" + token + "'/><input type='hidden' name='main_id_order' value='" + data.main_id_order + "'/><button id='wk_stripe_submit_btn' type='submit'/></form>";
						// 	// 	Stripe.removeLoader();
						// 	// 	Stripe.$("body").append(html);
						// 	// 	Stripe.$("#wk_paypal_payment_form").submit();
						// 	// }
						// }
					} else {
						WALLET.removeLoader();
						if (data.name == 'session_id') {
							session_id = data.session_id;
							var stripe = Stripe(data.publish_key);
							stripe.redirectToCheckout({
								// Make the id field from the Checkout Session creation API response
								// available to this file, so you can provide it as parameter here
								// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
								sessionId: session_id
							}).then(function (result) {
								// If `redirectToCheckout` fails due to a browser or network
								// error, display the localized error message to your customer
								// using `result.error.message`.
								console.log(result.error.message);
							});
						} else if (data.name == 'error_with_create_session') {
							console.log("this is due to issue with stripe key");
							console.log(data.message);

							$("body").find(".payment-method-list").append("<p>" + data.payment_status_label + ": <span class='wk-text-warning'>" + data.pending_label + "</span></p>");
							clearInterval(myinterval);
							// setCookie('wk_stripe_order_paid','1',10);
							setSession('wk_stripe_order_paid', '1');
							Shopify.Checkout.OrderStatus.addContentBox(
								'<h2>' + data.payment_status_label + '</h2>',
								'<p style="color:red;">' + data.error_msg + '</p>'
							)
							WALLET.removeLoader();
						} else if (data.name == 'payPal_rest_AMT') {
							console.log(data.msg);
							window.open(data.link, '_top')
						} else if (data.name == 'extra_add_amount_below_cents') {

							console.log("This is due to which rest amount need to add in wallet to purchase products but that amount have not fullfill the minimum add amount condition of stripe.");

							$("body").find(".payment-method-list").append("<p>" + data.payment_status_label + ": <span class='wk-text-warning'>" + data.pending_label + "</span></p>");

							clearInterval(myinterval);
							// setCookie('wk_stripe_order_paid','1',10);
							setSession('wk_stripe_order_paid', '1');
							Shopify.Checkout.OrderStatus.addContentBox(
								'<h2>' + data.payment_status_label + '</h2>',
								'<p style="color:red;">' + data.error_msg + '</p>'
							)
							WALLET.removeLoader();
						} else if (data.name == "pending") {
							console.log("Get stuck at the time of create transaction crossponding to this order");

							$("body").find(".payment-method-list").append("<p>" + data.payment_status_label + ": <span class='wk-text-warning'>" + data.pending_label + "</span></p>");
							clearInterval(myinterval);
							// setCookie('wk_stripe_order_paid','1',10);
							setSession('wk_stripe_order_paid', '1');
							Shopify.Checkout.OrderStatus.addContentBox(
								'<h2>' + data.payment_status_label + '</h2>',
								'<p style="color:red;">' + data.error_msg + '</p>'
							)
							WALLET.removeLoader();
						} else if (data.name == "paid") {
							console.log("order paid successfully");
							// clearInterval(myinterval);
							// setCookie('wk_stripe_order_paid','1',10);
							setSession('wk_stripe_order_paid', '1');
							$("body").find(".payment-method-list").append("<p>" + data.payment_status_label + " : <span class='wk-text-success'>" + data.success_label + "</span></p>");
							WALLET.removeLoader();
							location.reload();
						} else if (data.name == 'wallet_balance_deducted') {
							console.log(data.msg);
							location.reload();
						} else if (data.name == 'different_payment_method') {

							console.log("This means that different payment method name saved in backend and frontend so its does not save the payment method orders with checkout_token.");
							clearInterval(myinterval);
							setSession('wk_stripe_order_paid', '1');
							WALLET.removeLoader();
						} else if (data.name == 'paypal_payment_creation') {
							window.open(data.checkout_link, '_top');
						} else if (data.name == 'error_with_create_paypal_token') {
							console.log(data.msg);
							Shopify.Checkout.OrderStatus.addContentBox(
								'<h2>' + data.payment_status_label + '</h2>',
								'<p style="color:red;">' + data.error_msg + '</p>'
							)
							clearInterval(myinterval);
							setSession('wk_stripe_order_paid', '1');
							WALLET.removeLoader();
						} else if (data.name == 'either_enable_or_different_payment_method') {
							console.log("The order can not be paid because either the payment method is not enabled or a different gateway is used.");
							setSession('wk_stripe_order_paid', '1');
							WALLET.removeLoader();
						} else if (data.name == 'order_already_paid') {
							location.reload();
						} else if (data.name == 'pay_rest_amount_under_process') {
							console.log("Pay rest amount under process.");
						} else if ('razor_pay_payment_creation') {
							// clearInterval(myinterval);
							// setSession('wk_stripe_order_paid','1');
							var rzp1 = new Razorpay(data.options);
							rzp1.open();
						}
					}
				},
				error: function (error) {
					console.log(error);
					console.log("error");
					WALLET.removeLoader();
				}
			});
		});

		$("body").on('click', '.wk_refund_request_data', function () {
			$(this).css("pointer-events", "none");
			var data = $(this);
			var wk_id_customer = $(".wk_id_customer").val();
			var wk_id_customer_wallet = $(".wk_id_customer_wallet").val();
			var wk_id_order_payment = $(this).siblings('.id_order_payment').val();
			var main_order_id = $(this).siblings('.order_id').val();
			$.ajax({
				type: 'POST',
				url: WALLET.api_url + "/admin/transaction",
				jsonpCallback: "TRANSACTION_REFUND",
				dataType: "jsonp",
				crossDomain: true,
				data: { wk_id_customer: wk_id_customer, wk_id_customer_wallet: wk_id_customer_wallet, wk_id_order_payment: wk_id_order_payment, main_order_id: main_order_id, shop_name: WALLET.shop_name },
				beforeSend: function () {
					$(".wk_main_body").addClass("wm-loader").prop("disabled", true);
					$(".wk_main_body").prop("disabled", true);
				},
				complete: function () {
					$(".wk_main_body").removeClass("wm-loader").prop("disabled", false);
					$(".wk_main_body").prop("disabled", false);
					$('.wk_refund_request_data').css("pointer-events", "auto");
				},
				success: function (response) {
					$('.wk_refund_request_data').css("pointer-events", "auto");
					console.log(response);
					var spend_amount = data.siblings('.wk_spend_amount').val();
					var added_amount = data.siblings('.wk_added_amount').val();
					var currency = $(".wk_refund_request_div").find('.wk_refund_request_currency').text();
					$(".wk_refund_request_div").find('.wk_refunded_amt').html(currency + '0.00').hide();
					if (response) {
						var requested_nd_refunded_amt = response['refunds_nd_requested'];
						console.log('spend_amount' + parseFloat(spend_amount));
						console.log('added_amount' + parseFloat(added_amount));
						console.log('requested_nd_refunded_amt' + parseFloat(requested_nd_refunded_amt));

						if (spend_amount > 0) {
							var final_amount = (parseFloat(spend_amount) - parseFloat(requested_nd_refunded_amt));
							if (final_amount > 0) {
								$(".wk_refund_request_div").find('.wk_refunded_amt').html(currency + final_amount.toFixed(2)).show();
								data.siblings('.refund_spended_amount').val(final_amount);
							}
						} else if (added_amount > 0) {
							var final_amount = (parseFloat(added_amount) - parseFloat(requested_nd_refunded_amt));
							if (final_amount > 0) {
								$(".wk_refund_request_div").find('.wk_refunded_amt').html(currency + final_amount).show();
								data.siblings('.refund_added_amount').val(final_amount);
							}
						}
					} else {
						console.log('spend_amount' + parseFloat(spend_amount));
						console.log('added_amount' + parseFloat(added_amount));
						$(".wk_refund_request_div").find('.wk_refunded_amt').show();
						console.log('requested_nd_refunded_amt => no amount refund & requested');
					}
				},
				error: function (response) {
					$('.wk_refund_request_data').css("pointer-events", "auto");
					console.log("something went wrong");
				}
			});
		});
			
		$("body").on('click', '.wk_transaction_history, .wk_transaction_history_for_new', function () {
			$(this).css("pointer-events", "none");
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			var wk_id_customer_wallet = $(".wk_id_customer_wallet").val();

			$.ajax({
				type: 'POST',
				url: WALLET.api_url + "/admin/transaction",
				jsonpCallback: "WALLET",
				dataType: "jsonp",
				crossDomain: true,
				data: { customer_id: customer_id, wk_id_customer_wallet: wk_id_customer_wallet, customer_email: customer_email, shop_name: WALLET.shop_name },
				beforeSend: function () {
					$(".wk_main_body").addClass("wm-loader").prop("disabled", true);
					$(".wk_main_body").prop("disabled", true);
				},
				complete: function () {
					$(".wk_main_body").removeClass("wm-loader").prop("disabled", false);
					$(".wk_main_body").prop("disabled", false);
				},
				success: function (response) {
					$('.wk_transaction_history').css("pointer-events", "auto");
					// console.log(response);
					if (response == 0) {
						$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
					}
					else {
						var border_bottom = $(".wk_transaction_history").siblings('.wk_wallet_active').css("border-bottom");
						$(".wk_transaction_history").siblings('.wk_wallet_active').removeClass('wk_wallet_active');
						// $(".wk_transaction_history").siblings('div').css({ "border-bottom": "none", "color": "#555" });
						$('.wk_wallet_mobile_icon_path').attr('stroke', "black");

						$(".wk_transaction_history").find(".wk_wallet_svg_div").find('.wk_wallet_mobile_icon').find('.wk_wallet_mobile_icon_path').attr('stroke', "white");

						$(".wk_transaction_history").parents(".wk_nev_bar").siblings(".wk_nev_bar").find(".wk_wallet_active").removeClass('wk_wallet_active');

						// $(".wk_transaction_history").css({ "border-bottom": border_bottom, "color": "#333" });
						$(".wk_transaction_history").addClass('wk_wallet_active');

						$(".wk_main_body").html(response);
						if ($('.wk_status_span_pending').length > 0) {
							$('.wk_status_span_pending').parent('.wk_status_span').css('padding', '0px');
						}
					}
				},
				error: function (response) {
					console.log("something went wrong");
				}
			});
		});

		$("body").on('click', '.wk_transaction_old', function () {
			$(this).css("pointer-events", "none");
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			var wk_id_customer_wallet = $(".wk_id_customer_wallet").val();

			$.ajax({
				type: 'POST',
				url: WALLET.api_url + "/admin/transaction",
				jsonpCallback: "WALLET_OLD",
				dataType: "jsonp",
				crossDomain: true,
				data: { customer_id: customer_id, wk_id_customer_wallet: wk_id_customer_wallet, customer_email: customer_email, shop_name: WALLET.shop_name },
				beforeSend: function () {
					$(".wk_main_body").addClass("wm-loader").prop("disabled", true);
					$(".wk_main_body").prop("disabled", true);
				},
				complete: function () {
					$(".wk_main_body").removeClass("wm-loader").prop("disabled", false);
					$(".wk_main_body").prop("disabled", false);
				},
				success: function (response) {
					$('.wk_transaction_history').css("pointer-events", "auto");
					// console.log(response);
					if (response == 0) {
						$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
					}
					else {
						var border_bottom = $(".wk_transaction_history").siblings('.wk_wallet_active').css("border-bottom");
						$(".wk_transaction_history").siblings('.wk_wallet_active').removeClass('wk_wallet_active');
						// $(".wk_transaction_history").siblings('div').css({ "border-bottom": "none", "color": "#555" });
						$('.wk_wallet_mobile_icon_path').attr('stroke', "black");

						$(".wk_transaction_history").find(".wk_wallet_svg_div").find('.wk_wallet_mobile_icon').find('.wk_wallet_mobile_icon_path').attr('stroke', "white");

						$(".wk_transaction_history").parents(".wk_nev_bar").siblings(".wk_nev_bar").find(".wk_wallet_active").removeClass('wk_wallet_active');

						// $(".wk_transaction_history").css({ "border-bottom": border_bottom, "color": "#333" });
						$(".wk_transaction_history").addClass('wk_wallet_active');

						$(".wk_main_body").html(response);
						if ($('.wk_status_span_pending').length > 0) {
							$('.wk_status_span_pending').parent('.wk_status_span').css('padding', '0px');
						}
					}
				},
				error: function (response) {
					console.log("something went wrong");
				}
			});
		});

		$("body").on('click', '.wk_wallet_settings', function () {
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			var wk_id_customer_wallet = $(".wk_id_customer_wallet").val();

			$.ajax({
				type: 'POST',
				url: WALLET.api_url + "/admin/wallet_front",
				jsonpCallback: "WALLET_SETTINGS",
				dataType: "jsonp",
				crossDomain: true,
				data: { customer_id: customer_id, wk_id_customer_wallet: wk_id_customer_wallet, customer_email: customer_email, shop_name: WALLET.shop_name },
				beforeSend: function () {
					$(".wk_main_body").addClass("wm-loader").prop("disabled", true);
					$(".wk_main_body").prop("disabled", true);
					$(".wk_refund_request_btn").css("pointer-events", 'none');
				},
				complete: function () {
					$(".wk_main_body").removeClass("wm-loader").prop("disabled", false);
					$(".wk_main_body").prop("disabled", false);
					$(".wk_refund_request_btn").css("pointer-events", 'auto');
				},
				success: function (response) {
					var border_bottom = $(".wk_wallet_settings").siblings('.wk_wallet_active').css("border-bottom");


					$('.wk_wallet_mobile_icon_path').attr('stroke', "black");
					$(".wk_wallet_settings").find(".wk_wallet_svg_div").find('.wk_wallet_mobile_icon').find('.wk_wallet_mobile_icon_path').attr('stroke', "white");

					$(".wk_wallet_settings").parents(".wk_nev_bar").siblings(".wk_nev_bar").find(".wk_wallet_active").removeClass('wk_wallet_active');

					$(".wk_wallet_settings").siblings('.wk_wallet_active').removeClass('wk_wallet_active');
					// $(".wk_wallet_settings").siblings('div').css({ "border-bottom": "none", "color": "#555" });

					// $(".wk_wallet_settings").css({ "border-bottom": border_bottom, "color": "#333" });
					$(".wk_wallet_settings").addClass('wk_wallet_active');
					$(".wk_main_body").html(response);
				},
				error: function (response) {
					console.log("something went wrong");
				}
			});
		});


		// if (($('.wk_wallet_collection_widget').length > 0) && ($('.wk_cashback').length > 0)) {
		// 	wkCheckCashbackMetafield().then(function(found) {
		// 		if (found) {
		// 			if((wk_collection_widget != undefined) && (wk_collection_widget != null)) {
		// 				$(".wk_wallet_collection_widget").html(wk_collection_widget);
		// 			}
		// 		}
		// 	});

		// 	function wkCheckCashbackMetafield() {
		// 		return new Promise(function(resolve) {
		// 			let found = false;

		// 			$('.wk_cashback').each(function() {
		// 				const metafieldValue = $(this).attr('product_metafield');
		// 				if (metafieldValue && metafieldValue.trim() !== '') {
		// 					console.log('Found:', metafieldValue);
		// 					found = true;
		// 					return false;
		// 				}
		// 			});

		// 			resolve(found);
		// 		});
		// 	}
			
		// }

		$("body").on('click', '.wk_transfer_history', function () {
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			if (customer_id && customer_email) {
				var offset = 0;
				var record_no = 1;
				var data = {
					customer_id: customer_id,
					customer_email: customer_email,
					offset: offset,
					record_no: record_no,
					shop_name: WALLET.shop_name
				}
				var result = transferedDetail(data);
			} else {
				console.log('customer id and email not found');
			}
		});

		$("body").on('click', '.transfer_record_li', function () {
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			if (customer_id && customer_email) {
				var record_no = $(this).text();
				if (record_no == '<') {
					var record_no = $(this).next('.transfer_record_li').text();
				}
				else if (record_no == '>') {
					var record_no = $(this).prev('.transfer_record_li').text();
				}
				if (parseInt(record_no) == 1) {
					var offset = 0;
				}
				else {
					var offset = (parseInt(record_no) - 1) * 10;
				}

				var data = {
					customer_id: customer_id,
					customer_email: customer_email,
					offset: offset,
					record_no: record_no,
					shop_name: WALLET.shop_name
				}
				var result = transferedDetail(data);
			} else {
				console.log('customer id and email not found');
			}
		});


		$("body").on('click', '.wk_refund_requests', function () {
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			if (customer_id && customer_email) {

				$.ajax({
					type: 'POST',
					url: WALLET.api_url + "/admin/transaction",
					jsonpCallback: "REFUNDREQUESTLISTING",
					dataType: "jsonp",
					crossDomain: true,
					data: { customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name },
					beforeSend: function () {
						$(".wk_main_body").addClass("wm-loader").prop("disabled", true);
						$(".wk_main_body").prop("disabled", true);
					},
					complete: function () {
						$(".wk_main_body").removeClass("wm-loader").prop("disabled", false);
						$(".wk_main_body").prop("disabled", false);
					},
					success: function (response) {
						// console.log(response);
						if (response == 0) {
							$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
						}
						else {

							var border_bottom = $(".wk_refund_requests").siblings('.wk_wallet_active').css("border-bottom");
							$(".wk_refund_requests").siblings('.wk_wallet_active').removeClass('wk_wallet_active');
							// $(".wk_refund_requests").siblings('div').css({ "border-bottom": "none", "color": "#555" });

							$('.wk_wallet_mobile_icon_path').attr('stroke', "black");
							$(".wk_refund_requests").find(".wk_wallet_svg_div").find('.wk_wallet_mobile_icon').find('.wk_wallet_mobile_icon_path').attr('stroke', "white");

							$(".wk_refund_requests").parents(".wk_nev_bar").siblings(".wk_nev_bar").find(".wk_wallet_active").removeClass('wk_wallet_active');

							// $(".wk_refund_requests").css({ "border-bottom": border_bottom, "color": "#333" });
							$(".wk_refund_requests").addClass('wk_wallet_active');

							$(".wk_main_body").html(response);
							if ($('.wk_status_span_pending').length > 0) {
								$('.wk_status_span_pending').parent('.wk_status_span').css('padding', '0px');
							}
						}
					},
					error: function (response) {
						console.log(response);
						console.log("something went wrong");
					}
				});
			} else {
				console.log("Customer Id & email Not Found");
			}
		});

		// Create autoComplete
		function wkComplete (request) {
			var wk_id_customer_wallet = $(".wk_id_customer_wallet").val();
			var wk_id_customer = $("#wk_wallet").attr("customer_id");
			$.ajax({
				type:'POST',
				url : WALLET.api_url+"/admin/transaction?callback=AUTOCOMPLETE_TRANSACTION_ID&shop_name="+WALLET.shop_name,
				crossDomain: true,
				data:{
					transaction_id: request, wk_id_customer_wallet: wk_id_customer_wallet, customer_id: wk_id_customer 
				},
				beforeSend: function() {
					$(".wk_front_loader").show();
				},
				success : function(response) {

					if($(".wk_wallet_custmized_autocomplete").length > 0) {
						$(".wk_wallet_custmized_autocomplete").html("");
						$(".wk_wallet_custmized_autocomplete").css("display", "block");
						$.each(response, function (i) {
							// console.log(response[i].product_name);
							$('<li class="wk_wallet_opt_li">')
								.append(`<span class="wk_wallet_auto_transaction">${response[i].transaction_id}</span> <input type="hidden" class="wk_selected_wallet_id" value="${response[i].transaction_id}"> <input type="hidden" class="wk_selected_wallet_max_amt" value="${response[i].max_allowed_amount}">`)
								.appendTo(".wk_wallet_custmized_autocomplete");
						});
					} else {
						$("#wk_transaction_history_id").after(`<ul class="wk_wallet_custmized_autocomplete"></ul>`)
						$.each(response, function (i) {
							// console.log(response[i].product_name);
							$('<li class="wk_wallet_opt_li">')
								.append(`<span class="wk_wallet_auto_transaction">${response[i].transaction_id}</span> <input type="hidden" class="wk_selected_wallet_id" value="${response[i].transaction_id}"> <input type="hidden" class="wk_selected_wallet_max_amt" value="${response[i].max_allowed_amount}">`)
								.appendTo(".wk_wallet_custmized_autocomplete");
						});
					}
				},
				error:function(response){
					// console.log(response);
	
					console.log("something went wrong");
				},
				complete: function() {
					$(".wk_front_loader").hide();
				}
			});
		}

		$("body").on("click", ".wk_wallet_opt_li", function() {
			var wk_selected_wallet_id = $(this).find(".wk_selected_wallet_id").val();
			var wk_wallet_auto_transaction = $(this).find(".wk_wallet_auto_transaction").text();
			var wk_id_customer_wallet = $(".wk_id_customer_wallet").val();
			var wk_id_customer = $("#wk_wallet").attr("customer_id");
			var wk_selected_wallet_max_amt = $(this).find(".wk_selected_wallet_max_amt").val();

			$(".wk_refunded_amt").text(wk_selected_wallet_max_amt);
			$("#wk_transaction_history_id").val(wk_wallet_auto_transaction);
			$('.wk_refund_request_input').attr('max', wk_selected_wallet_max_amt);
			$(".wk_wallet_custmized_autocomplete").html("");
			$(".wk_wallet_custmized_autocomplete").css("display", "none");
			
		})

		$("body").on("keyup", "#wk_transaction_history_id", function() {
			var wk_warranty_autocomplete = $(this).val();
			if(wk_warranty_autocomplete == "") {
				
			} else {
				wkComplete(wk_warranty_autocomplete);
			}
		})

		// $("body").on('click','.wk_dropdown-content > .refund_request',function(e){
		// 	e.preventDefault();
		// 	var refund_spended_amount_value = $(this).siblings('.refund_spended_amount').val();
		// 	var refund_added_amount_value = $(this).siblings('.refund_added_amount').val();
		// 	var currency = $(".wk_refund_request_div").find('.wk_refund_request_currency').text();
		// 	if(refund_spended_amount_value > 0){
		// 		$(".wk_refund_request_div").find('.wk_refunded_amt').html(currency + refund_spended_amount_value);
		// 	}else if(refund_added_amount_value){
		// 		$(".wk_refund_request_div").find('.wk_refunded_amt').html(currency + refund_added_amount_value);
		// 	}
		// });

		$("body").on('click', '.refund_request_record_li', function () {
			var record_value = $(this).text();
			var last_page = $('#last_page').val();
			if (record_value == '>') {
				var record_value = $(this).prev('.refund_request_record_li').text();
				record_value = parseInt(record_value) + parseInt('1');
			}
			if (record_value == '<') {
				var record_value = $(this).next('.refund_request_record_li').text();
				record_value = parseInt(record_value) - parseInt('5');
			}
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			if (parseInt(record_value) <= parseInt(last_page)) {
				$.ajax({
					type: 'POST',
					url: WALLET.api_url + "/admin/transaction",
					jsonpCallback: "REFUNDREQUESTLISTING",
					dataType: "jsonp",
					crossDomain: true,
					data: { customer_id: customer_id, customer_email: customer_email, record_value: record_value, shop_name: WALLET.shop_name },
					beforeSend: function () {
						$(".wk_main_body").addClass("wm-loader").prop("disabled", true);
						$(".wk_main_body").prop("disabled", true);
					},
					complete: function () {
						$(".wk_main_body").removeClass("wm-loader").prop("disabled", false);
						$(".wk_main_body").prop("disabled", false);
					},
					success: function (response) {
						// console.log(response);
						if (response == 0) {
							$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
						}
						else {
							$(".wk_status").css("border-bottom", "none");
							// $(".wk_transaction_history").css("border-bottom","3px solid #F56951");
							$(".wk_main_body").html(response);
							if ($('.wk_status_span_pending').length > 0) {
								$('.wk_status_span_pending').parent('.wk_status_span').css('padding', '0px');
							}
						}
					},
					error: function (response) {
						console.log("something went wrong");
					}
				});
			}
		});


		$("body").on('click', '.wk_settings_opt', function () {
			var val = $(this).find(".wk_wallet_setting_radio_btn").prop("checked", true);
		});


		$("body").on('click', '.record_li', function () {
			var record_value = $(this).text();
			var last_page = $('#last_page').val();
			if (record_value == '>') {
				var record_value = $(this).prev('.record_li').text();
				record_value = parseInt(record_value) + parseInt('1');
			}
			if (record_value == '<') {
				var record_value = $(this).next('.record_li').text();
				record_value = parseInt(record_value) - parseInt('5');
			}
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			var wk_id_customer_wallet = $(".wk_id_customer_wallet").val();
			var wkTransactionType = $(".wk-transaction-type").val();
			if((wkTransactionType == null) || (wkTransactionType == undefined)) {
				wkTransactionType = 'WALLET';
			}
			if (parseInt(record_value) <= parseInt(last_page)) {
				$.ajax({
					type: 'POST',
					url: WALLET.api_url + "/admin/transaction",
					jsonpCallback: wkTransactionType,
					dataType: "jsonp",
					crossDomain: true,
					data: { customer_id: customer_id, wk_id_customer_wallet: wk_id_customer_wallet, customer_email: customer_email, record_value: record_value, shop_name: WALLET.shop_name },
					beforeSend: function () {
						$(".wk_main_body").addClass("wm-loader").prop("disabled", true);
						$(".wk_main_body").prop("disabled", true);
					},
					complete: function () {
						$(".wk_main_body").removeClass("wm-loader").prop("disabled", false);
						$(".wk_main_body").prop("disabled", false);
					},
					success: function (response) {
						// console.log(response);
						if (response == 0) {
							$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
						}
						else {
							$(".wk_status").css("border-bottom", "none");
							// $(".wk_transaction_history").css("border-bottom","3px solid #F56951");
							$(".wk_main_body").html(response);
							if ($('.wk_status_span_pending').length > 0) {
								$('.wk_status_span_pending').parent('.wk_status_span').css('padding', '0px');
							}
						}
					},
					error: function (response) {
						console.log("something went wrong");
					}
				});
			}
		});

		$("body").on('click', '.wk_popup_transfer_cancel', function () {
			$(this).parents('.wk_popup_main_div').hide();
			$(this).siblings('button').html('TRANSFER MONEY');
		});


		$("body").on('click', '.wk_transfer_money', function () {
			var error = false;
			
			$('.wr_has_error').hide();
			
			var customer_id = $("#wk_wallet").attr("customer_id");
			
			var customer_email = $("#wk_wallet").attr("customer_email");
			
			var tranferrred_email = $(this).parents(".wk_transfer_money_btn").siblings(".wk_transfer_amt").find('.wk_wallet_transfer_div_email').find('.wk_email_detail').val();

			var transfer_money = $(this).parents(".wk_transfer_money_btn").siblings(".wk_transfer_amt").find('.wk_wallet_transfer_div_amt').find('.wk_input_currency').find('#wk_money_input').val();
			if (!$.trim(tranferrred_email)) {
				error = true;
				var error_email = $(".blank_email").val();
				$(".wr_email_error").html(error_email).show();
			}
			else if (!(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/.test(tranferrred_email))) {
				error = true;
				var error_email = $(".proper_email_format").val();
				$(".wr_email_error").html(error_email).show();
			}
			if (!$.trim(transfer_money)) {
				error = true;
				var error_money = $(".blank_amount").val();
				$(".wr_transfer_money_error").html(error_money).show();
			}
			else if (!(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(transfer_money))) {
				error = true;
				var error_money = $(".wrong_amount").val();
				$(".wr_transfer_money_error").html(error_money).show();
			}
			else if ((parseInt(transfer_money) < parseInt(1))) {
				error = true;
				var error_money = $(".wrong_amount").val();
				$(".wr_transfer_money_error").html(error_money).show();
			}

			if ($.trim(tranferrred_email) == customer_email) {
				error = true;
				var error_email = $(".receiver_email").val();
				$(".wr_email_error").html(error_email).show();
			}

			if (!error) {
				$('.wr_has_error').hide();
				$(".wk_popup_main_div").show();
				transfer_money_detail = { tranferrred_email: tranferrred_email, transfer_money: transfer_money };
			}
		});


		$("body").on('click', '.wk_popup_transfer_money', function () {
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			var tranferrred_email = transfer_money_detail.tranferrred_email;
			var transfer_money = transfer_money_detail.transfer_money;
			if (customer_id && customer_email && tranferrred_email && transfer_money) {
				$(".wk_popup_main_div").hide();
				$.ajax({
					type: 'POST',
					url: WALLET.api_url + "/admin/wallet_front",
					jsonpCallback: "TRANSFERMONEY",
					dataType: "jsonp",
					crossDomain: true,
					data: {
						customer_id: customer_id,
						customer_email: customer_email,
						tranferrred_email: tranferrred_email,
						transfer_money: transfer_money,
						shop_name: WALLET.shop_name
					},
					beforeSend: function () {
						$(".wk_transfer_money").addClass("wm-loader").prop("disabled", true);
						$(".wk_transfer_money").prop("disabled", true);
					},
					complete: function () {
						$(".wk_transfer_money").removeClass("wm-loader").prop("disabled", false);
						$(".wk_transfer_money").prop("disabled", false);
					},
					success: function (response) {
						console.log(response);
						if (response == 400) {
							var error_occoured = $(".error_occoured").val();
							$(".wr_transfer_money_error").html(error_occoured).show();
							// $('.wk_transfer_money').html('some  error occured to transfer money');
						}
						else if (response == 401) {
							var error_occoured = $(".cus_does_not_exist").val();
							$(".wr_transfer_money_error").html(error_occoured).show();
							// $('.wk_transfer_money').html('THIS CUSTOMER DOES NOT EXIST');
						}
						else if (response == 402) {
							var error_insufficient_balance = $(".error_insufficient_balance").val();
							$(".wr_transfer_money_error").html(error_insufficient_balance).show();
						}
						else if (response == 200) {
							var successful = $(".verify_transferred_mail").val();
							$('.wk_transfer_money').html(successful);
							$('.wk_transfer_money').css('pointer-events', 'none');
							$('.wk_transfer_money').addClass("wk_wallet_transfer_verify");
						}
						else {
							var successful = $(".transferred_successful").val();
							$('.wk_transfer_money').addClass("wk_wallet_transfer_verify");
							$('.wk_transfer_money').html(successful);

							setTimeout(function () {
								// $('.wk_transfer_money').html('TRANSFER MONEY');
								window.top.location.reload();
								window.scrollTo(0, 0);
							}, 800);
						}
					},
					error: function (response) {
						console.log("something went wrong");
					}
				});
			}
			else {

			}
		});


		$("body").on('click', '.wk_add_money_btn', function () {
			var error = false;
			$(".wr_has_money_err").hide();
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");
			var price = $("#wk_money_input").val();
			if (!$.trim(price)) {
				error = true;
				var error_money = $(".blank_amount").val();
				$(".wk_add_money_err_model").html(error_money).show();
			}
			else if ((parseInt(price) < parseInt(1))) {
				error = true;
				var error_money = $(".wrong_amount").val();
				$(".wk_add_money_err_model").html(error_money).show();
			}

			if (!error) {
				if (customer_id && customer_email) {

					$(".wr_has_money_err").hide();
					$(".wk_add_money_btn").prop("disabled", true);
					$(".wr_transfer_money_error").hide();
					$.ajax({
						type: 'POST',
						url: WALLET.api_url + "/admin/wallet_discount",
						jsonpCallback: "WALLET",
						dataType: "jsonp",
						crossDomain: true,
						data: { customer_id: customer_id, customer_email: customer_email, price: price, shop_name: WALLET.shop_name },
						beforeSend: function () {
							$(".wk_add_money_btn").addClass("wm-loader").prop("disabled", true);
							$(".wk_add_money_btn").prop("disabled", true);
						},
						complete: function () {
							$(".wk_add_money_btn").removeClass("wm-loader").prop("disabled", false);
							$(".wk_add_money_btn").prop("disabled", false);
						},
						success: function (response) {

							if (typeof response.name === "undefined") {
								window.open(response, '_top');
							} else {
								if (response.name == 'session_id') {
									session_id = response.session_id;
									var stripe = Stripe(response.publish_key);
									stripe.redirectToCheckout({
										// Make the id field from the Checkout Session creation API response
										// available to this file, so you can provide it as parameter here
										// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
										sessionId: session_id
									}).then(function (result) {
										// If `redirectToCheckout` fails due to a browser or network
										// error, display the localized error message to your customer
										// using `result.error.message`.
										console.log(result.error.message);
									});
								} else if (response.name == 'minimum_stripe_amt_err') {
									var error_money = $(".minimum_stripe_amt").val();
									$(".wk_add_money_err_model").html('Minimum amount should be 50 cents ').show();
								} else if (response.name == 'error') {
									console.log('this is due to have error with stripe key which is added with this app');
									$(".wk_add_money_err_model").html(response.error_msg).show();
								} else if (response.name == 'paypal_payment_creation') {
									window.open(response.checkout_link, '_top');
								} else if (response.name == 'paypal_payment_error') {
									$(".wk_add_money_err_model").html(response.msg).show();
									console.log('please check your paypal credentials');
								} else if (response.name == 'UNPROCESSABLE_ENTITY') {
									$(".wk_add_money_err_model").html(response.msg).show();
									console.log(response.msg);
								} else if (response.name == 'razor_pay') {
									var rzp1 = new Razorpay(response.options);
									rzp1.open();
									console.log(response.msg);
								} else if (response.name == 'wrong_credentials') {
									console.log('this is due to have error with razorpay key which is added with this app');
									$(".wk_add_money_err_model").html(response.msg).show();
								} else if (response.name == 'wrong_credentials_stripe_pay') {
									console.log('this is due to have error with stripe key which is added with this app');
									$(".wk_add_money_err_model").html(response.msg).show();
								} else if (response.name == 'wrong_credentials_paypal_pay') {
									console.log('this is due to have error with Paypal key which is added with this app');
									$(".wk_add_money_err_model").html(response.msg).show();
								}

							}

						},
						error: function (response) {
							console.log(response);
							console.log("something went wrong");
						}
					});
				}
			}
			// if(price){
			//
			//   if(price >= 1){
			//
			//   }
			// }
		});

		$("body").on('click', '.wk_status, .wk_click_status', function () {
			var customer_id = $("#wk_wallet").attr("customer_id");
			var customer_email = $("#wk_wallet").attr("customer_email");

			$.ajax({
				type: 'POST',
				url: WALLET.api_url + "/admin/walletFront",
				jsonpCallback: "WALLET",
				dataType: "jsonp",
				crossDomain: true,
				data: { customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name },
				success: function (response) {
					// console.log(response);
					if (response == 0) {
						$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
					}
					else {
						$("#wk_wallet").html(response);
						// var background = $('.wk_add_money_btn').css("background-color");
						// background = "3px solid " + background;
						// $(".wk_status").css('border-bottom', background);
						// $(".wk_add_amount").css('border-bottom', background);
					}
				},
				error: function (response) {
					// console.log(response);
					console.log("something went wrong");
				}
			});
		});

		$('body').on("click", ".wk_transfer_amount", function () {

			$(".wk_transfer_money").css('pointer-events', 'auto');
			$('.wr_has_error').hide();
			$(this).siblings('.wk_add_amount').css('border-bottom', 'none');
			$(this).parents('.wk_transactions').siblings('.wk_add_amt').hide();
			$(this).parents('.wk_transactions').siblings('.wk_money_add_btn').hide();
			$(this).parents('.wk_transactions').siblings('.wk_transfer_amt').show();
			$(this).parents('.wk_transactions').siblings('.wk_transfer_money_btn').show();
			$(".wk_wallet_add_modal-content").addClass("wk_wallet_mobile_view_transactions");
			$(".wk_add_money_main_div").addClass("wk_wallet_mobile_view_add_money_main_div");
			$(this).parents('.wk_transactions').siblings('.wk_transfer_amt').children('.wk_email_detail').val('');
			$(this).parents('.wk_transactions').siblings('.wk_transfer_amt').find('#wk_money_input').val('');
			var transfer_money = $(this).parents('.wk_transactions').siblings('.wk_popup_main_div').find('.wk_popup_transfer_money').text();
			$(this).parents('.wk_transactions').siblings('.wk_transfer_amt').find('.wk_transfer_money').html(transfer_money);

			var background = $('.wk_add_money_btn').css("background-color");
			if (!background) {
				var background = $('.total_record').css("background-color");
			}
			$(this).css('border-bottom', '3px solid ' + background);
		});

		$('body').on("click", ".wk_add_amount", function () {
			$(".wr_has_money_err").hide();
			$(this).siblings('.wk_transfer_amount').css('border-bottom', 'none');
			$(this).parents('.wk_transactions').siblings('.wk_add_amt').show();
			$(this).parents('.wk_transactions').siblings('.wk_money_add_btn').show();
			$(".wk_wallet_add_modal-content").removeClass("wk_wallet_mobile_view_transactions");
			$(".wk_add_money_main_div").removeClass("wk_wallet_mobile_view_add_money_main_div");
			$(this).parents('.wk_transactions').siblings('.wk_transfer_amt').hide();
			$(this).parents('.wk_transactions').siblings('.wk_transfer_money_btn').hide();

			var background = $('.wk_add_money_btn').css("background-color");
			if (!background) {
				var background = $('.total_record').css("background-color");
			}
			$(this).css('border-bottom', '3px solid ' + background);
		});

		if ($("body").find("#wk_get_cashback").length > 0) {
			var shop_name = WALLET.shop_name;
			// console.log(WALLET.api_url);
			// var price_and_current_curr = cartPrice();

			cartPrice().then(price_and_current_curr => {
				var total_price = price_and_current_curr['price'];
				var current_cart_curr = price_and_current_curr['currency'];
				$.ajax({
					type: 'POST',
					url: WALLET.api_url + "/admin/wallet_cart_cashback",
					jsonpCallback: "WALLET_CART",
					dataType: "jsonp",
					crossDomain: true,
					data: { total_price: total_price, current_cart_curr: current_cart_curr, shop_name: WALLET.shop_name },
					success: function (response) {
						if (response) {
							// console.log(response);
							$("#wk_get_cashback").html(response);
						}
					},
					error: function (response) {
						console.log("something went wrong");
					}
				});
			})
			.catch(error => {
				console.log(error);
			});
		}

		if ($(".wk_pay_wallet_cls").length > 0) {
			//for zasttra by pratik
			$("body").on('click', '.wk_pay_wallet_cls>button', function () {
				$.ajax({
					type: 'POST',
					url: WALLET.api_url + "/admin/wallet_payment",
					jsonpCallback: "WALLET",
					dataType: "jsonp",
					crossDomain: true,
					startTime: performance.now(),
					data: { price_detail: price_detail, customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name, wk_pay_req: true },
					success: function (response) {
						var discount_coupan_code = response;
						var hrf = '/cart/';
						var cart_perma = $(this).parent().attr('cart_perma');
						var not_div = $(this).parent().parent().siblings('.wk-note-data').find('textarea[name="note"]');
						if (not_div.length > 0) {
							if (not_div.val() != '')
								window.location.href = hrf + cart_perma + '?discount=' + discount_coupan_code + '&note=' + not_div.val();
							else
								window.location.href = hrf + cart_perma + '?discount=' + discount_coupan_code;
						}
						else
							window.location.href = hrf + cart_perma + '?discount=' + discount_coupan_code;
					},
					error: function (response) {
						console.log("something went wrong");
					}
				});
			})
		}
		else {
			$("body").on('click', '#wk_pay_wallet>button', function () {
				var a = 0;
				var customer_id = $("#wk_pay_wallet").attr("customer_id");
				var customer_email = $("#wk_pay_wallet").attr("customer_email");
				// var price_detail = cartPrice();
				// console.log(price_detail);
				var wk_pay_wallet_button = $("#wk_pay_wallet_button").attr("total_price");
				wk_pay_wallet_button =  parseFloat(wk_pay_wallet_button). toFixed(2);

				

				var wk_with_store_credit = "false";
				var wk_pay_wallet_input = document.getElementsByClassName("wk_pay_wallet_input");
				if(typeof wk_pay_wallet_input[0] !== 'undefined' &&  wk_pay_wallet_input[0].checked == true) {
					wk_with_store_credit = "true";
				}


				// if(wk_pay_wallet_button == undefined || wk_pay_wallet_button == null || wk_pay_wallet_button != price_total){

				cartPrice().then(price_detail => {
					var price_total = parseFloat(price_detail.price). toFixed(2);
					var shop_name = WALLET.shop_name;
					$.ajax({
						type: 'POST',
						url: WALLET.api_url + "/admin/wallet_payment",
						jsonpCallback: "pay_vie_wallet_discount",
						dataType: "jsonp",
						crossDomain: true,
						startTime: performance.now(),
						data: { price_detail: price_detail, wk_with_store_credit:wk_with_store_credit, customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name, wk_pay_req: true, wk_new_coupan: true },
						beforeSend: function () {
							$("#wk_pay_wallet>button").addClass("wm-loader").prop("disabled", true);
						},
						success: function (response) {
							var discount_coupan_code = response.discount_code;
                            // var wk_cart_note_dummy = $("#cartNoteDummy").val();
							var wk_cart_note_dummy = $("#cartNote").val();
                            var wk_cart_note_encoded = '';
                            if (wk_cart_note_dummy && (wk_cart_note_dummy.trim() != '')) {
                                wk_cart_note_dummy = wk_cart_note_dummy.trim();
                                wk_cart_note_encoded = encodeURIComponent(wk_cart_note_dummy);
                            }
                            var array = cartValue();
                            console.log(discount_coupan_code);
                            // if((typeof(variant_id[0]['auto_discount']) != "undefined" && variant_id[0]['auto_discount'] !== null) || (typeof(wk_booking_response_product_attribute) != "undefined")) {
                            if (typeof (wk_booking_response_product_attribute) != "undefined") {
                                createDraftOrdersMvWithDiscount(customer_id, customer_email, total_cart_price, discount_coupan_code, variant_id, wk_booking_response_product_attribute);
                            } else {
                                if((response.is_integrated =='1') && (typeof wk_pay_wallet_input[0] !=='undefined') && (wk_pay_wallet_input[0].checked ==true)) {
                                    const wkUserAttributes= {
                                        attributes: {
                                            "wk_with_store_credit": "true"
                                        },
                                        discountCode: `${response.discount_code}`,
                                    };

                                    fetch('/cart/update.js', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            attributes: wkUserAttributes.attributes
                                        }),
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log("Cart attributes updated:", data);
                                        const wkDiscountUrl=`/discount/${wkUserAttributes.discountCode}?redirect=/checkout`;
                                        window.location.href=wkDiscountUrl;
                                    })
                                    .catch(err => console.error('Error updating cart:', err));
                                } else if(response.is_integrated == '1') {
                                    fetch(`/discount/${response.discount_code}`)
                                    .then(() => {
                                        window.location.href='/checkout';
                                    })
                                    .catch(err => console.error(err));
                                } else {
                                    var hrf = '/cart/';
                                    $.each(variant_id, function (index, value) {
                                        hrf = hrf + value + ',';
                                    });
                                    $length = hrf.length;
                                    var res = hrf.substr(0, $length - 1);
                                    var parmalink = res + '?discount=' + discount_coupan_code;
                                    if(wk_cart_note_encoded != '') {
                                        parmalink = res + '?discount=' + discount_coupan_code + '&note=' + wk_cart_note_encoded;
                                    }
                                    
                                    var properties = '';
                                    $.each(properties_product_wise, function (index, value) {
                                        properties += '&attributes[' + value.key + ']=' + value.value + ''
                                    });

                                    if(typeof wk_pay_wallet_input[0] !== 'undefined' && wk_pay_wallet_input[0].checked == true) {
                                        properties += '&attributes[wk_with_store_credit]= true'
                                    }
                                    parmalink = parmalink += properties;
                                    // console.log(parmalink);
                                    window.location.href=parmalink;
                                }
                                // window.location.href = parmalink;
                            }
						},
						error: function (response) {
                            $("#wk_pay_wallet>button").removeClass("wm-loader").prop("disabled", false);
							$("#wk_pay_wallet>button").prop("disabled", false);
							console.log("something went wrong");
						}
					});
				})
				.catch(error => {
					console.log(error);  // Something went wrong.
				});
				// }else{
				// 	var discount_coupan_code = $(this).val();
				// 	if (WALLET.shop_name == "slurrpfarm.myshopify.com") {

				// 		var array = cartValue();
				// 		// if((typeof(variant_id[0]['auto_discount']) != "undefined" && variant_id[0]['auto_discount'] !== null) || (typeof(wk_booking_response_product_attribute) != "undefined")) {
				// 		if (typeof (wk_booking_response_product_attribute) != "undefined") {
				// 			createDraftOrdersMvWithDiscount(customer_id, customer_email, total_cart_price, discount_coupan_code, variant_id, wk_booking_response_product_attribute);
				// 		} else {
				// 			var hrf = '/cart/';
				// 			$.each(variant_id, function (index, value) {
				// 				hrf = hrf + value + ',';
				// 			});
				// 			$length = hrf.length;
				// 			var res = hrf.substr(0, $length - 1);
				// 			var parmalink = res + '?discount=' + discount_coupan_code;
				// 			// var properties = '';
				// 			// $.each(properties_product_wise,function(index, value) {
				// 			// 	properties += '&attributes['+value.key+']='+value.value+''
				// 			// });
				// 			// parmalink = parmalink +=properties;
				// 			// console.log(parmalink);
				// 			if(wk_pay_wallet_input[0].checked == true) {
				// 				properties += '&attributes[wk_with_store_credit]= true'
				// 			}
				// 			parmalink = parmalink +=properties;
				// 			window.location.href = parmalink;
				// 		}
	
				// 	} else {
	
				// 		var array = cartValue();
				// 		console.log(discount_coupan_code);
				// 		// if((typeof(variant_id[0]['auto_discount']) != "undefined" && variant_id[0]['auto_discount'] !== null) || (typeof(wk_booking_response_product_attribute) != "undefined")) {
				// 		if (typeof (wk_booking_response_product_attribute) != "undefined") {
				// 			createDraftOrdersMvWithDiscount(customer_id, customer_email, total_cart_price, discount_coupan_code, variant_id, wk_booking_response_product_attribute);
				// 		} else {
				// 			var hrf = '/cart/';
				// 			$.each(variant_id, function (index, value) {
				// 				hrf = hrf + value + ',';
				// 			});
				// 			$length = hrf.length;
				// 			var res = hrf.substr(0, $length - 1);
				// 			var parmalink = res + '?discount=' + discount_coupan_code;
				// 			var properties = '';
				// 			$.each(properties_product_wise, function (index, value) {
				// 				properties += '&attributes[' + value.key + ']=' + value.value + ''
				// 			});

				// 			if(wk_pay_wallet_input[0].checked == true) {
				// 				console.log("here");
				// 				properties += '&attributes[wk_with_store_credit]= true'
				// 			}
				// 			parmalink = parmalink += properties;
				// 			// console.log(parmalink);
				// 			window.location.href = parmalink;
				// 		}
				// 	}
				// }
			});
		}


		// $("body").on('change', '.wk_pay_wallet_input', function (){
		// 	a = 0;
		// 	var wk_with_store_credit = "false";
		// 	var wk_pay_wallet_input = document.getElementsByClassName("wk_pay_wallet_input");

		// 	if(wk_pay_wallet_input[0].checked == true) {
		// 		var wk_with_store_credit = "true";
		// 	}
		// 	var customer_id = $("#wk_pay_wallet").attr("customer_id");
		// 	var customer_email = $("#wk_pay_wallet").attr("customer_email");
		// 	var price_detail = cartPrice(); console.log(price_detail);
		// 	var shop_name = WALLET.shop_name;
		// 	var wk_pay_wallet = $("#wk_pay_wallet").attr("wk_total_price");
		// 	var wk_new_coupan = false;

		// 	if(wk_pay_wallet == null || wk_pay_wallet != price_detail.price){
		// 		wk_new_coupan = true;
		// 	}

		// 	$.ajax({
		// 		type: 'POST',
		// 		url: WALLET.api_url + "/admin/wallet_payment",
		// 		jsonpCallback: "WALLET",
		// 		dataType: "jsonp",
		// 		crossDomain: true,
		// 		startTime: performance.now(),
		// 		data: { price_detail: price_detail, wk_with_store_credit: wk_with_store_credit, customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name, wk_pay_req: false , wk_new_coupan: wk_new_coupan},
		// 		beforeSend: function () {
					
		// 		},
		// 		success: function (response) {
		// 			var time = performance.now() - this.startTime;
		// 			var seconds = time / 1000;
		// 			seconds = seconds.toFixed(3);
		// 			if (response) {
		// 				if ($(".wk_pay_wallet_cls").length > 1) {
		// 					$(".wk_pay_wallet_cls").each(function () {
		// 						$(this).html(response)
		// 					});
		// 				}
		// 				else{
		// 					$("#wk_pay_wallet").html(response);
		// 				}

		// 				var wk_pay_wallet_button = $("#wk_pay_wallet_button").attr("total_price");
		// 				$("#wk_pay_wallet").attr("wk_total_price", wk_pay_wallet_button);

		// 			}
		// 		},
		// 		error: function (response) {
		// 			console.log("something went wrong");
		// 		},complete: function () {
					
		// 		}
		// 	});
		// });


		$("body").on('click', '#wk_store_credit>button', function () {
			var a = 0;
			var customer_id = $("#wk_store_credit").attr("customer_id");
			var customer_email = $("#wk_store_credit").attr("customer_email");
			// var price_detail = cartPrice();
			// console.log(price_detail);
			console.log(WALLET.api_url);
			var wk_pay_wallet_button = $("#wk_store_credit_button").attr("total_price");
			wk_pay_wallet_button =  parseFloat(wk_pay_wallet_button). toFixed(2);

			cartPrice().then(price_detail => {
				var price_total = parseFloat(price_detail.price). toFixed(2);


				if(wk_pay_wallet_button == undefined || wk_pay_wallet_button == null || wk_pay_wallet_button != price_total){
					var shop_name = WALLET.shop_name;
					$.ajax({
						type: 'POST',
						url: WALLET.api_url + "/admin/wallet_payment",
						jsonpCallback: "STORE_CREDIT",
						dataType: "jsonp",
						crossDomain: true,
						startTime: performance.now(),
						data: { price_detail: price_detail, customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name, wk_pay_req: true, wk_new_coupan: true },
						success: function (response) {
							var discount_coupan_code = response.discount_code;

							if (WALLET.shop_name == "slurrpfarm.myshopify.com") {

								var array = cartValue();
								if (typeof (wk_booking_response_product_attribute) != "undefined") {
									createDraftOrdersMvWithDiscount(customer_id, customer_email, total_cart_price, discount_coupan_code, variant_id, wk_booking_response_product_attribute);
								} else {
									var hrf = '/cart/';
									$.each(variant_id, function (index, value) {
										hrf = hrf + value + ',';
									});
									$length = hrf.length;
									var res = hrf.substr(0, $length - 1);
									var parmalink = res + '?discount=' + discount_coupan_code;
									window.location.href = parmalink;
								}
			
							} else {
			
								var array = cartValue();
								console.log(discount_coupan_code);
								if (typeof (wk_booking_response_product_attribute) != "undefined") {
									createDraftOrdersMvWithDiscount(customer_id, customer_email, total_cart_price, discount_coupan_code, variant_id, wk_booking_response_product_attribute);
								} else {
									var hrf = '/cart/';
									$.each(variant_id, function (index, value) {
										hrf = hrf + value + ',';
									});
									$length = hrf.length;
									var res = hrf.substr(0, $length - 1);
									var parmalink = res + '?discount=' + discount_coupan_code;
									var properties = '';
									$.each(properties_product_wise, function (index, value) {
										properties += '&attributes[' + value.key + ']=' + value.value + ''
									});
									parmalink = parmalink += properties;
									// console.log(parmalink);

									if((response.is_integrated =='1') && (typeof wk_pay_wallet_input[0] !=='undefined') && (wk_pay_wallet_input[0].checked ==true)) {
										const wkUserAttributes= {
											attributes: {
												"wk_with_store_credit": "true"
											},
											discountCode: `${response.discount_code}`,
										};

										fetch('/cart/update.js', {
											method: 'POST',
											headers: {
												'Content-Type': 'application/json',
											},
											body: JSON.stringify({
												attributes: wkUserAttributes.attributes
											}),
										})
										.then(response => response.json())
										.then(data => {
											console.log("Cart attributes updated:", data);
											const wkDiscountUrl=`/discount/${wkUserAttributes.discountCode}?redirect=/checkout`;
											window.location.href=wkDiscountUrl;
										})
										.catch(err => console.error('Error updating cart:', err));
									} else if(response.is_integrated == '1') {
										fetch(`/discount/${response.discount_code}`)
										.then(() => {
											window.location.href='/checkout';
										})
										.catch(err => console.error(err));
									} else {
										window.location.href=parmalink;
									}
									// window.location.href = parmalink;
								}
							}
						},
						error: function (response) {
							console.log("something went wrong");
						}
					});
				}else{
					var discount_coupan_code = $(this).val();
					if (WALLET.shop_name == "slurrpfarm.myshopify.com") {

						var array = cartValue();
						if (typeof (wk_booking_response_product_attribute) != "undefined") {
							createDraftOrdersMvWithDiscount(customer_id, customer_email, total_cart_price, discount_coupan_code, variant_id, wk_booking_response_product_attribute);
						} else {
							var hrf = '/cart/';
							$.each(variant_id, function (index, value) {
								hrf = hrf + value + ',';
							});
							$length = hrf.length;
							var res = hrf.substr(0, $length - 1);
							var parmalink = res + '?discount=' + discount_coupan_code;
							window.location.href = parmalink;
						}

					} else {

						var array = cartValue();
						console.log(discount_coupan_code);
						if (typeof (wk_booking_response_product_attribute) != "undefined") {
							createDraftOrdersMvWithDiscount(customer_id, customer_email, total_cart_price, discount_coupan_code, variant_id, wk_booking_response_product_attribute);
						} else {
							var hrf = '/cart/';
							$.each(variant_id, function (index, value) {
								hrf = hrf + value + ',';
							});
							$length = hrf.length;
							var res = hrf.substr(0, $length - 1);
							var parmalink = res + '?discount=' + discount_coupan_code;
							var properties = '';
							$.each(properties_product_wise, function (index, value) {
								properties += '&attributes[' + value.key + ']=' + value.value + ''
							});
							parmalink = parmalink += properties;


							if((response.is_integrated =='1') && (typeof wk_pay_wallet_input[0] !=='undefined') && (wk_pay_wallet_input[0].checked ==true)) {
								const wkUserAttributes= {
									attributes: {
										"wk_with_store_credit": "true"
									},
									discountCode: `${response.discount_code}`,
								};

								fetch('/cart/update.js', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({
										attributes: wkUserAttributes.attributes
									}),
								})
								.then(response => response.json())
								.then(data => {
									console.log("Cart attributes updated:", data);
									const wkDiscountUrl=`/discount/${wkUserAttributes.discountCode}?redirect=/checkout`;
									window.location.href=wkDiscountUrl;
								})
								.catch(err => console.error('Error updating cart:', err));
							} else if(response.is_integrated == '1') {
								fetch(`/discount/${response.discount_code}`)
								.then(() => {
									window.location.href='/checkout';
								})
								.catch(err => console.error(err));
							} else {
								window.location.href=parmalink;
							}
							// window.location.href = parmalink;
						}
					}
				}
			}).catch(error => {
				console.log(error);  // Something went wrong.
			});
		});

		$("body").on('mouseenter', '.wk_main_body .wk_dropdown', function () {
			$(this).children('.wk_dropdown-content').show();
		});
		
		$("body").on('mouseleave', '.wk_main_body .wk_dropdown', function () {
			$(this).children('.wk_dropdown-content').hide();
		});

		$("body").on('click', '.wk_refund_request_cancle', function () {
			$(".wk_request_refund_div").hide();
			$(".wk_refund_request").hide();
		});


		$("#wk-rest-amt-open-modal").click(function() {
			$("#wk-rest-amt-Modal").fadeIn();
		});
		
		$(".wk-rest-amt-close").click(function() {
			$("#wk-rest-amt-Modal").fadeOut();
		});


		// $(window).click(function(event) {
		// 	if ($(event.target).is("#wk-rest-amt-Modal")) {
		// 	$("#wk-rest-amt-Modal").fadeOut();
		// 	}
		// });

		$("body").on('click', '.wk_refund_request_btn', function () {
			var customer_id 		= $("#wk_wallet").attr("customer_id");
			var customer_email 		= $("#wk_wallet").attr("customer_email");
			var id_order_payment 	= $('.wk_request_active').siblings('.id_order_payment').val();
			var added_amount 		= $('.wk_request_active').siblings('.refund_added_amount').val();
			var spended_amount 		= $('.wk_request_active').siblings('.refund_spended_amount').val();
			if (added_amount > 0) {
				var total_amount = added_amount;
			} else {
				var total_amount = spended_amount;
			}
			var order_id = $('.wk_request_active').siblings('.order_id').val();
			$('.wk_request_active').removeClass('wk_wallet_active');
			var requested_amount = $('.wk_refund_request_input').val();
			console.log((parseFloat(requested_amount) <= parseFloat(total_amount)));
			console.log(requested_amount);
			if ((requested_amount > 0) && (parseFloat(requested_amount) <= parseFloat(total_amount))) {
				$.ajax({
					type: 'POST',
					url: WALLET.api_url + "/admin/transaction",
					jsonpCallback: "REFUNDREQUEST",
					dataType: "jsonp",
					crossDomain: true,
					data: { customer_id: customer_id, customer_email: customer_email, id_order_payment: id_order_payment, requested_amount: requested_amount, shop_name: WALLET.shop_name },
					beforeSend: function () {
						$(".wk_refund_request_btn").addClass("wm-loader").prop("disabled", true);
						$(".wk_refund_request_btn").prop("disabled", true);
						$(".wk_refund_request_btn").css("pointer-events", 'none');
					},
					complete: function () {
						$(".wk_refund_request_btn").removeClass("wm-loader").prop("disabled", false);
						$(".wk_refund_request_btn").prop("disabled", false);
						$(".wk_refund_request_btn").css("pointer-events", 'auto');
					},
					success: function (response) {

						if (response == 0) {
							$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
						}
						else {
							$(".wk_status").css("border-bottom", "none");
							$(".wk_status").css("color", "#555");
							$(".wk_request_refund_div").hide();
							$(".wk_refund_request").hide();
							$(".wk_refund_requests").trigger('click');
						}
					},
					error: function (response) {
						console.log("something went wrong");
					}
				});
			}
		});

		$("body").on('click', '.wk_make_refund_request_btn', function () {
			$(".wk_transaction_id_err").css("display", "none");
			$("#wk_transaction_history_id").css("border-color", "black");
			var customer_id 		= $("#wk_wallet").attr("customer_id");
			var customer_email 		= $("#wk_wallet").attr("customer_email");
			var wk_history_id		= $('.wk_transaction_history_id').val();
			var total_amount = 0;
			
			var requested_amount 	= $('.wk_refund_request_input').val();
			
			console.log((parseFloat(requested_amount) <= parseFloat(total_amount)));
			console.log(requested_amount);
			if((wk_history_id != undefined) && (wk_history_id > 0)) {
				$.ajax({
					type: 'POST',
					url: WALLET.api_url + "/admin/transaction",
					jsonpCallback: "REFUND_REQUEST_FOR_NEW_TRANSACTION",
					dataType: "jsonp",
					crossDomain: true,
					data: { customer_id: customer_id, wk_history_id:wk_history_id, customer_email: customer_email, requested_amount: requested_amount, shop_name: WALLET.shop_name },
					beforeSend: function () {
						$(".wk_refund_request_btn").addClass("wm-loader").prop("disabled", true);
						$(".wk_refund_request_btn").prop("disabled", true);
						$(".wk_refund_request_btn").css("pointer-events", 'none');
					},
					complete: function () {
						$(".wk_refund_request_btn").removeClass("wm-loader").prop("disabled", false);
						$(".wk_refund_request_btn").prop("disabled", false);
						$(".wk_refund_request_btn").css("pointer-events", 'auto');
					},
					success: function (response) {
						
						if (response == 0) {
							$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
						} else if(response.key == 'transaction_data_is_null') {
							$("#wk_transaction_history_id").css("border-color", "red");
						} else if(response.key == 'unsufficient_amount') {
							
							var wk_unsufficient_label = response.label;
							var wkMyArray1 = wk_unsufficient_label.split("{");
							var wkMyArray2 = wkMyArray1[1].split("}");
							var wk_data_set = wkMyArray1[0]+' '+response.amount+' '+wkMyArray2[1];

							$(".wk_transaction_submit_err").text(wk_data_set);
							$(".wk_transaction_submit_err").css("display", "block");
						}
						else {
							$(".wk_status").css("border-bottom", "none");
							$(".wk_status").css("color", "#555");
							$(".wk_request_refund_div").hide();
							$(".wk_refund_request").hide();
							$(".wk_refund_requests").trigger('click');
						}
					},
					error: function (response) {
						console.log("something went wrong");
					}
				});
			} else {
				$(".wk_transaction_id_err").css("display", "block");
			}
		});

		$("body").on("click", ".wk_transaction_export", function() {
			var customer_id 		= $("#wk_wallet").attr("customer_id");
			var customer_email 		= $("#wk_wallet").attr("customer_email");
			$.ajax({
				type: 'POST',
				url: WALLET.api_url + "/admin/transaction",
				jsonpCallback: "EXPORT_WALLET_TRANSACTION",
				dataType: "jsonp",
				crossDomain: true,
				data: { customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name },
				beforeSend: function () {
					$(this).addClass("wm-loader").prop("disabled", true);
					$(this).prop("disabled", true);
					$(this).css("pointer-events", 'none');
				},
				complete: function () {
					$(this).removeClass("wm-loader").prop("disabled", false);
					$(this).prop("disabled", false);
					$(this).css("pointer-events", 'auto');
				},
				success: function (response) {
				},
				error: function (response) {
					console.log("something went wrong");
				}
			});
		})

		$("body").on('click', '.wk_dropdown-content a', function (e) {
			e.preventDefault();
			var added_amount = $(this).siblings('.refund_added_amount').val();
			var spended_amount = $(this).siblings('.refund_spended_amount').val();
			if (added_amount > 0) {
				var total_amount = added_amount;
			} else {
				var total_amount = spended_amount;
			}
			$('.wk_refund_request_input').val(total_amount);
			$(".wk_request_refund_div").show();
			$(".wk_refund_request").show();
			$(this).addClass('wk_request_active');
		});

		// $('body').on("click", "[name='plus']", function () {
		// $('body').on('change', '.quantity__input',function() {
		// 	$.ajax({
		// 		type: "POST",
		// 		url: 'https://'+Shopify.shop+"/cart.js",
		// 		dataType: "json",
		// 		data: {
		// 			sections: "cart-drawer,cart-icon-bubble",
		// 		},
		// 		async: false,
		// 		success: function (response) {
		// 			console.log(response);
		// 		},
		// 		error: function (response) {
		// 			console.log('error');
		// 		}
		// 	});
		// 	setTimeout(checkPayWallet(), 5000);
			
		// });
		$('body').on('change', '.quantity__input',function() {
			setTimeout(()=>{
				checkPayWallet(WALLET.api_url);
			}, 3000)
		});
		$('body').on('click', '.button--tertiary, [name="add"]',function() {
			setTimeout(()=>{
				checkPayWallet(WALLET.api_url);
			}, 3000)
		});

	});

}).call(this);

function checkPayWallet(api_url) {

	if ($("body").find(".wk_pay_wallet").length > 0) {
		var a = 0;
		var customer_id 			= $(".wk_pay_wallet").attr("customer_id");
		var customer_email 			= $(".wk_pay_wallet").attr("customer_email");
		// var price_detail 			= cartPrice(); console.log(price_detail);
		var shop_name 				= WALLET.shop_name;
		var wk_pay_wallet 			= $(".wk_pay_wallet").attr("wk_total_price");
		var wk_new_coupan 			= false;

		cartPrice().then(price_detail => {
			if(wk_pay_wallet == null || wk_pay_wallet != price_detail.price){
				wk_new_coupan = true;
			}

			$.ajax({
				type: 'POST',
				url: api_url + "/admin/wallet_payment",
				jsonpCallback: "pay_vie_wallet_tpl",
				dataType: "jsonp",
				crossDomain: true,
				startTime: performance.now(),
				data: { price_detail: price_detail, customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name, wk_pay_req: false , wk_new_coupan: wk_new_coupan},
				success: function (response) {
					var time = performance.now() - this.startTime;
					var seconds = time / 1000;
					seconds = seconds.toFixed(3);
					var result = 'AJAX request took ' + seconds + ' seconds to complete.';
					console.log(result);
					if (response) {
						if ($(".wk_pay_wallet_cls").length > 1) {
							$(".wk_pay_wallet_cls").each(function () {
								$(this).html(response)
							});
						}
						else{
							$(".wk_pay_wallet").html(response);
						}
						var wk_pay_wallet_button = $("#wk_pay_wallet_button").attr("total_price");
						$(".wk_pay_wallet").attr("wk_total_price", wk_pay_wallet_button);

					} else {
						$(".wk_pay_wallet").html("");
					}
				},
				error: function (response) {
					console.log("something went wrong");
				}
			});
		}).catch(error => {
			console.log(error);  // Something went wrong.
		});
	} else if ($("body").find("#wk_pay_wallet").length > 0) {
		var a = 0;
		var customer_id 			= $("#wk_pay_wallet").attr("customer_id");
		var customer_email 			= $("#wk_pay_wallet").attr("customer_email");
		// var price_detail 			= cartPrice(); console.log(price_detail);
		var shop_name 				= WALLET.shop_name;
		var wk_pay_wallet 			= $("#wk_pay_wallet").attr("wk_total_price");
		var wk_new_coupan 			= false;

		cartPrice().then(price_detail => {
			if(wk_pay_wallet == null || wk_pay_wallet != price_detail.price){
				wk_new_coupan = true;
			}

			$.ajax({
				type: 'POST',
				url: WALLET.api_url + "/admin/wallet_payment",
				jsonpCallback: "pay_vie_wallet_tpl",
				dataType: "jsonp",
				crossDomain: true,
				startTime: performance.now(),
				data: { price_detail: price_detail, customer_id: customer_id, customer_email: customer_email, shop_name: WALLET.shop_name, wk_pay_req: false , wk_new_coupan: wk_new_coupan},
				success: function (response) {

					var time = performance.now() - this.startTime;
					var seconds = time / 1000;
					seconds = seconds.toFixed(3);
					var result = 'AJAX request took ' + seconds + ' seconds to complete.';
					console.log(result);
					// console.log(response);
					if (response) {
						//for zasttra by pratik
						if ($(".wk_pay_wallet_cls").length > 1) {
							$(".wk_pay_wallet_cls").each(function () {
								$(this).html(response)
							});
						}
						else{
							$("#wk_pay_wallet").html(response);
						}

						var wk_pay_wallet_button = $("#wk_pay_wallet_button").attr("total_price");
						$("#wk_pay_wallet").attr("wk_total_price", wk_pay_wallet_button);

					} else {
						$("#wk_pay_wallet").html("");
					}
				},
				error: function (response) {
					console.log("something went wrong");
				}
			});
		}).catch(error => {
			console.log(error);  // Something went wrong.
		});
	}

}

function transferedDetail(data) {
	$.ajax({
		type: 'POST',
		url: WALLET.api_url + "/admin/wallet_transfer_history",
		jsonpCallback: "TRANSFERHISTORY",
		dataType: "jsonp",
		crossDomain: true,
		data: data,
		beforeSend: function () {
			$(".wk_main_body").addClass("wm-loader").prop("disabled", true);
			$(".wk_main_body").prop("disabled", true);
		},
		complete: function () {
			$(".wk_main_body").removeClass("wm-loader").prop("disabled", false);
			$(".wk_main_body").prop("disabled", false);
		},
		success: function (response) {
			// console.log(response);
			if (response == 0) {
				$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
			}
			else {

				var border_bottom = $(".wk_transfer_history").siblings('.wk_wallet_active').css("border-bottom");
				$(".wk_transfer_history").siblings('.wk_wallet_active').removeClass('wk_wallet_active');

				$('.wk_wallet_mobile_icon_path').attr('stroke', "black");
				$(".wk_transfer_history").find(".wk_wallet_svg_div").find('.wk_wallet_mobile_icon').find('.wk_wallet_mobile_icon_path').attr('stroke', "white");

				$(".wk_transfer_history").parents(".wk_nev_bar").siblings(".wk_nev_bar").find(".wk_wallet_active").removeClass('wk_wallet_active');

				// $(".wk_transfer_history").siblings('div').css({ "border-bottom": "none", "color": "#555" });

				// $(".wk_transfer_history").css({ "border-bottom": border_bottom, "color": "#333" });
				$(".wk_transfer_history").addClass('wk_wallet_active');

				$(".wk_main_body").html(response);
				if ($('.wk_status_span_pending').length > 0) {
					$('.wk_status_span_pending').parent('.wk_status_span').css('padding', '0px');
				}
			}
		},
		error: function (response) {
			console.log("something went wrong");
		}
	});
}

// create draft order for multiple variants
function createDraftOrdersMvWithDiscount(customer_id, customer_email, total_cart_price, title, variants_array, wk_booking_response_product_attribute) {
	variants_array = JSON.stringify(variants_array);
	wk_booking_response_product_attribute = JSON.stringify(wk_booking_response_product_attribute);
	console.log(wk_booking_response_product_attribute);
	console.log(title);
	$.ajax({
		url: WALLET.api_url + "/admin/wallet_discount",
		type: 'POST',
		dataType: "text",
		crossDomain: true,
		data: { customer_id: customer_id, customer_email: customer_email, title: title, total_cart_price: total_cart_price, variants_array: variants_array, wk_booking_response_product_attribute: wk_booking_response_product_attribute, shop_name: WALLET.shop_name, callback: 'DRAFT_ORDER_MULTIPLE_VARIANT' },
		beforeSend: function () {
			$(".wk_add_money_btn").addClass("wm-loader").prop("disabled", true);
			$(".wk_add_money_btn").prop("disabled", true);
		},
		complete: function () {
			$(".wk_add_money_btn").removeClass("wm-loader").prop("disabled", false);
			$(".wk_add_money_btn").prop("disabled", false);
		},
		success: function (response) {
			console.log(response);
			window.open(response, '_top');
		},
		error: function (response) {
			console.log("something went wrong");
		}
	});
}

function cartPrice() {
    return new Promise((resolve, reject) => {

        let wk_shopify_shop = typeof wk_shop_domain !== 'undefined' && wk_shop_domain
            ? wk_shop_domain
            : Shopify.shop;

        $.ajax({
            type: 'GET',
            url: `https://${wk_shopify_shop}/cart.js`,
            dataType: "json",
            success: function (cart) {

                console.log("Cart Data:", cart);

                wk_cart_price = cart.original_total_price / 100;
                currency = cart.currency;

                wk_wm_hasSubscription = cart.items.some(item => !!item?.selling_plan_allocation);

                const result = {
                    price: wk_cart_price,
                    currency: currency,
                    selling_plan_allocation: wk_wm_hasSubscription ? 1 : 0,
                };

                resolve(result);
            },
            error: function (xhr) {
                console.error("Cart API Error", xhr);
                reject("Unable to load cart");
            }
        });

    });
}

function cartValue() {
	var hf = '/';
	wk_booking_properties = false;
	wk_uploaded_image_property = false;   // this is for the "mysequin.myshopify.com"
	// because the image property not get correctly
	properties_product_wise = new Array();

	var wk_shopify_shop = Shopify.shop;
	if(typeof wk_shop_domain !== 'undefined' && wk_shop_domain != '' && wk_shop_domain != undefined) {
		wk_shopify_shop = wk_shop_domain;
	}

	var a = 0;
	$.ajax({
		type: 'GET',
		url: 'https://'+wk_shopify_shop+'/cart.js',
		dataType: "json",
		contentType: "application/json",
		async: false,
		success: function (response) {
			console.log(response);

			$.each(response['items'], function (index, value) {
				if (value.properties) {
					if (!$.isEmptyObject(value.properties)) {
						// if (typeof value.properties[0] != 'undefined') {
						$.each(value.properties, function (i1, v1) {
							if (i1 == 'wk_booking') {
								wk_booking_properties = true;
								return false;
							}
							// if (i1 == 'Uploaded image') {
							// 	wk_uploaded_image_property = true;
							// 	return false;
							// }
							// if (i1 == 'Engrave Name') {  // this is for my mysequin.in
							// 	wk_booking_properties = true;
							// 	return false;
							// }
							// if (Shopify.shop == 'mysequin.myshopify.com') {
							// 	wk_booking_properties = true;
							// 	return false;
							// }
							// if (i1 == 'Your ID') { // this is only for "gamers1store.myshopify.com"
							// 	wk_booking_properties = true;
							// 	return false;
							// }
						});
						if (wk_booking_properties == true) {
							return false;
						}
						// if (wk_uploaded_image_property == true) {
						// 	return false;
						// }
					}
				}
			});
			console.log(wk_booking_properties);
			console.log(wk_uploaded_image_property);
			
			// if ((typeof (response['cart_level_discount_applications'][0]) != "undefined" && response['cart_level_discount_applications'][0] !== null) || wk_booking_properties == true || wk_uploaded_image_property == true) {

			if ( wk_booking_properties == true ) {
				wk_booking_response_product_attribute = response['items'];
				variant_id = [[], []];
				total_cart_price = response['original_total_price'] / 100;
				$.each(response['items'], function (index, value) {
					var id = value.id;
					var quantity = value.quantity;

					variant_id[index] = {};
					variant_id[index]["id"] = id;
					variant_id[index]["quantity"] = quantity;
					variant_id[index]["auto_discount"] = true;

					// variant_id.push(id_quantity);
					// if(value.properties) {
					// 	properties_values = '';
					// 	$.each(value.properties,function(index,value){
					// 		properties_values+= index+':'+value+',';
					// 	});
					// 	properties_product_wise.push({
					// 		key: value.product_title,
					// 		value: properties_values
					// 	});
					// }
				});
			} else {
				variant_id = new Array();
				$.each(response['items'], function (index, value) {
					var id = value.id;
					var quantity = value.quantity;
					var id_quantity = id + ':' + quantity;
					// variant_id.push(value.id);
					variant_id.push(id_quantity);
					if (value.properties) {
						if (!$.isEmptyObject(value.properties)) {
							// if (typeof value.properties[0] != 'undefined') {
							properties_values = '';
							$.each(value.properties, function (index, value) {
								properties_values += index + ':' + value + ',';
							});
							properties_product_wise.push({
								key: value.product_title,
								value: properties_values
							});
						}
					}
				});
			}
			console.log(variant_id);
		},
		error: function (response) {
			console.log('error');
		}
	});
	console.log(properties_product_wise);
	return variant_id;
	// return hf;
}

function cartValueForSellingPlan(id) {
	var hf = '/';
	properties_product_wise = new Array();
	var selling_plan_allocation = 0;

	var wk_shopify_shop = Shopify.shop;
	if(typeof wk_shop_domain !== 'undefined' && wk_shop_domain != '' && wk_shop_domain != undefined) {
		wk_shopify_shop = wk_shop_domain;
	}

	var a = 0;
	$.ajax({
		type: 'GET',
		url: 'https://'+wk_shopify_shop+'/cart.js',
		dataType: "json",
		contentType: "application/json",
		async: false,
		success: function (response) {
			console.log(response);

			$.each(response['items'], function (index, value) {
				if(value.selling_plan_allocation && (id == value.variant_id)) {
					selling_plan_allocation = value.selling_plan_allocation;
					selling_plan_allocation = selling_plan_allocation.selling_plan.id;

					// properties_product_wise.push({
					// 	selling_plan_id: selling_plan_allocation,
					// 	variant_id: value.variant_id
					// });
				}

			});
		},
		error: function (response) {
			console.log('error');
		}
	});
	// return hf;
	return selling_plan_allocation;
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 0.5 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function setSession(cname, cvalue) {
	sessionStorage.setItem(cname, cvalue);
}

function getSession(cname) {
	sessionStorage.getItem(cname);
}

function GetURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return decodeURIComponent(sParameterName[1]);
		}
	}
}