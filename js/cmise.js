var user_data = '', sql_call_back, sql;
var going_here = {back: 'acc_profile', here: 'acc_profile'};
var check_out_list = [], order_type = 0;
var val_email = /\S+@\S+\.\S+/;
/* Registration */
$( document ).ready(function(){
	function validate_registration_data(){
		var vals = ['','','','','',''], con = $('#register_page>.row>.col>.container>.col input,#register_page>.row>.col>.container>.col textarea');
		/* valiation */
			for (var i = 0; i < con.length ; i++) {
				
				if($(con[i]).val().trim().length < 2){
					$(con[i]).removeClass('valid').addClass('invalid');

					Materialize.toast($(con[i]).attr('er-msg'), 4000);

					$(con[i]).focus();

					return false;
				}else{
					$(con[i]).removeClass('invalid').addClass('valid');
				}
				vals[i] = $(con[i]).val().toProperCase();
			};

			if(!val_email.test(vals[4])){
				Materialize.toast('Please enter a valid email address', 4000);
				$('#register_page>.row>.col>.container>.col input#remail').addClass('invalid').focus();
				return false;
			}
			if(vals[3].length < 10 || !$.isNumeric(vals[3])){
				Materialize.toast('Please enter a valid phone number', 4000);
				$('#register_page>.row>.col>.container>.col input#rphnum').addClass('invalid').focus();
				return false;
			}
			
			if($('#register_page #agree:checked').val() != 'on'){
				Materialize.toast('Please check the terms and conditions box', 3000);
				return false;			
			}
		/* ajax Send*/
			$.ajax({
				type: "POST",
				url: "api/register_new_user.php",
				data: {fname: vals[0], lname: vals[1] ,city: vals[2],  phone_number: vals[3], email: vals[4], address: vals[5]},
				success: function(res){
					if(res.err == 0){
						user_data = {user_id: res.user_id, fname:  vals[0], lname:  vals[1],phone_number:  vals[3], city:  vals[2], address:  vals[5],email:  vals[4], date_added: ''};
						
						Materialize.toast('Please note your password: ' + res.pp);
						
						set_profile_data();
						
						if(document.location.href.split('#')[1].split("?")[0] == 'login_page')
							open_this('acc_profile');
						else
							open_this('desn_studio');

						get_wish_list();
					}else if(res.err == 1){
						 $('#login_page input#email').val(vals[4]);
						 $('#login_page input#pword').val(vals[3]);
						 Materialize.toast('Hey, we know you!', 5000);
						 Materialize.toast('Forgot Pass Phrase?<a onclick="reset_pass()" class="btn-flat red-text truncate">Reset Now</a>', 10000)
					}else{
						Materialize.toast('Please verify your registration data', 5000);
					}
				},
				error: function(){
					Materialize.toast('Please verify your registration credentials', 5000);
				}
			});
	}
	validate_reg_data = validate_registration_data;
});
/* Sign in */
$( document ).ready(function(){
	function validate_log_in_data(){
		var email = $('#login_page input#email').val().trim(), pp = $('#login_page input#pword').val().trim();

		if(!val_email.test(email)){
			Materialize.toast('Please Enter a valid email address', 4000);
			return false;
		}
		if($('#login_page input#pword').val().length != 8){
			Materialize.toast('Please Enter a valid password', 4000);
			$('#login_page input#pword').focus();
			return false;
		}
		

		$.ajax({
			type: "POST",
			url: "api/log_in_user.php",
			data: {email: email, pword: pp},
			success: function(res){
				if(res !== ''){
					user_data = res;
					set_profile_data();
					if(document.location.href.split('#')[1].split("?")[0] == 'login_page')
						open_this('acc_profile');
					else
						open_this('desn_studio');
					get_wish_list();
				}else{
					Materialize.toast('Invalid Login Credentials', 2000);
				}
			},
			error: function(){
				Materialize.toast('Oops Error logging in', 2000);
			}
		});
	}
	validate_log_in = validate_log_in_data;
});
/* Design Actions*/
$( document ).ready(function(){
	/* Product Manip */
		/* Color Change */
		$('#desn_studio #ep1 .col_pal>div, #dsn_side_bar #_ep1 .col_pal>div').click(function(){ //change product color
			$('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color', $(this).css('background-color').replace(')', ', 0.55)').replace('rgb(','rgba('));

			$('#desn_studio .dsn_share').attr('href', 'cmise.html#desn_studio?prod_id=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '&prod_cl=' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '&prod_gen=' + $('#desn_studio>.row>.col>.canv_item').attr('gender') + '&dsn_id=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '&dsn_col=' + $('#desn_studio>.row>.col>.brush_on .desn_contner svg .dsn_path_col').attr('fill') + '&prod_price=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-price') + '&dsn_price=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));
		});	
		/* Product change */
		function change_product_dspd(item_id, price){
			$('#desn_studio>.row>.col>.canv_item').html('<img src="img/products/' + $('#gend_select>a:not(.btn-flat)').attr('id') + '/' + item_id + '.jpg"><img src="img/products/' +$('#gend_select>a:not(.btn-flat)').attr('id')+ '/' + item_id + '.png">');

				$('#desn_studio>.row>.col>.canv_item').attr('prod-price', price);
				$('#desn_studio>.row>.col>.canv_item').attr('prod-id', item_id);
				$('#desn_studio>.row>.col>.canv_item').attr('gender', $('#gend_select>a:not(.btn-flat)').attr('id'));

				$('#desn_studio .dsn_share').attr('href', 'cmise.html#desn_studio?prod_id=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '&prod_cl=' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '&prod_gen=' + $('#desn_studio>.row>.col>.canv_item').attr('gender') + '&dsn_id=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '&dsn_col=' + $('#desn_studio>.row>.col>.brush_on .desn_contner svg .dsn_path_col').attr('fill') + '&prod_price=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-price') + '&dsn_price=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));
		}
		ch_prod_img = change_product_dspd;
		/* Gender change */
		function product_gender_change(state){
			$('#desn_studio>.row>.col>.canv_item img:nth-child(2)').attr('src', 'img/products/' + $(state).attr('id') + '/' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '.png');
			$('#desn_studio>.row>.col>.canv_item img:nth-child(1)').attr('src', 'img/products/' + $(state).attr('id') + '/' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '.jpg');
			$('#gend_select>a:not(.btn-flat)').addClass('btn-flat');
			$(state).removeClass('btn-flat');
			$('#desn_studio>.row>.col>.canv_item').attr('gender', $(state).attr('id'));

			$('#desn_studio .dsn_share').attr('href', 'cmise.html#desn_studio?prod_id=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '&prod_cl=' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '&prod_gen=' + $('#desn_studio>.row>.col>.canv_item').attr('gender') + '&dsn_id=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '&dsn_col=' + $('#desn_studio>.row>.col>.brush_on .desn_contner svg .dsn_path_col').attr('fill') + '&prod_price=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-price') + '&dsn_price=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));
		}
		prod_gen_ch = product_gender_change;

	/* Design manip */
		/* Desgin Color Change*/
		$('#desn_studio #ep2 .col_pal>div, #dsn_side_bar #_ep2 .col_pal>div').click(function(){ //change product color
			$('#desn_studio>.row>.col>.brush_on .desn_contner>svg .dsn_path_col').attr('fill', $(this).css('background-color'));

			$('#desn_studio .dsn_share').attr('href', 'cmise.html#desn_studio?prod_id=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '&prod_cl=' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '&prod_gen=' + $('#desn_studio>.row>.col>.canv_item').attr('gender') + '&dsn_id=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '&dsn_col=' + $('#desn_studio>.row>.col>.brush_on .desn_contner svg .dsn_path_col').attr('fill') + '&prod_price=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-price') + '&dsn_price=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));
		});
		/* Design Change */
		function change_dsn_image(from){ //change product color
			$('#desn_studio>.row>.col>.brush_on .desn_contner').html($(from).html());
			$('#desn_studio>.row>.col>.brush_on .desn_contner svg').attr('width', '150px');
			$('#desn_studio>.row>.col>.brush_on .desn_contner svg').attr('height', '150px');
			$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id', $(from).attr('dsn-id'));
			$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price', $(from).attr('dsn-price'));

			$('#desn_studio .dsn_share').attr('href', 'cmise.html#desn_studio?prod_id=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '&prod_cl=' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '&prod_gen=' + $('#desn_studio>.row>.col>.canv_item').attr('gender') + '&dsn_id=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '&dsn_col=' + $('#desn_studio>.row>.col>.brush_on .desn_contner svg .dsn_path_col').attr('fill')+ '&prod_price=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-price') + '&dsn_price=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));
		}
		ch_dsn_img = change_dsn_image;
});
/* Get and set user Stuff */
$( document ).ready(function(){
	function set_user_profile_data(){
		$('#acc_profile>.row .col #full_name').val(user_data.fname + ' ' + user_data.lname);
		$('nav #nav_fname>span').html(user_data.fname);
		$('#order_checkout>.row input#b_fname').val(user_data.fname);
		$('#order_checkout>.row input#b_lname').val(user_data.lname);

		$('#acc_profile>.row input#email').val(user_data.email);
		$('#order_checkout>.row input#b_email').val(user_data.email);

		$('#acc_profile>.row input#phnum').val(user_data.phone_number);
		$('#order_checkout>.row input#b_phnum').val(user_data.phone_number);

		$('#acc_profile>.row input#city').val(user_data.city);
		$('#order_checkout>.row input#b_city').val(user_data.city);

		$('#acc_profile>.row #addrs').html(user_data.address);
		$('#order_checkout>.row textarea#b_addrs').val(user_data.address);
		$('#order_checkout>.row .input-field label').addClass('active');

		
	}
	set_profile_data = set_user_profile_data;	

	function get_user_order_list(){
		sql = 'SELECT purchases.*, a.price as prod_price, b.price as dsn_price, b.svg from purchases, products a, designs b where purchases.prod_id = a.product_id and purchases.dsn_id = b.id and user_id = "' + user_data.user_id + '" order by id asc;';
		sql_call_back = function (data){			
			$('#order_tracking>.row>.col>table>tbody.order_table').html('');
			for (var i = data.length - 1; i >= 0; i--) {
				$('#order_tracking>.row>.col>table>tbody.order_table').append('<tr id="item_' + data[i].id + '"><td><div class="col l12 m12 s12"><div class="canv_item center" prod-id="' + data[i].prod_id + '" gender="' + data[i].prod_gen + '" prod-price="' + data[i].prod_price + '"><img src="img/products/' + data[i].prod_gen + '/' + data[i].prod_id + '.jpg"><img src="img/products/' + data[i].prod_gen + '/' + data[i].prod_id + '.png" style="background-color: ' + data[i].prod_cl+ '"></div><div class="brush_on"><div class="desn_contner" dsn-price="' + data[i].dsn_price +'">' + data[i].svg + '</div></div></div></td><td>GHS ' + (parseInt(data[i].prod_price) + parseInt(data[i].dsn_price)) + '</td><td>' + data[i].quantity + '</td><td>' + data[i].size + '</td><td>' + (data[i].quantity *  (parseInt(data[i].prod_price) + parseInt(data[i].dsn_price)))+ '</td><td>' + data[i].date_added + '</td><td class="green-text">' + data[i].status + '</td><td><a class="btn btn-flat white"  onclick="re_order(\'' + data[i].prod_id + '\', \'' + data[i].prod_cl + '\', \'' +data[i].prod_gen+ '\', \''+ data[i].dsn_id+'\', \'' + data[i].dsn_cl + '\', \'' + data[i].prod_price+ '\', \'' + data[i].dsn_price + '\', \'' + data[i].id + '\')"><i class="mdi-navigation-refresh grey-text text-darken-2"></i></a><a class="btn btn-flat white"  onclick="open_this_dsn(\'' + data[i].prod_id + '\', \'' + data[i].prod_cl + '\', \'' +data[i].prod_gen+ '\', \''+ data[i].dsn_id+'\', \'' + data[i].dsn_cl + '\', \'' + data[i].prod_price+ '\', \'' + data[i].dsn_price + '\');"><i class="mdi-action-visibility blue-text text-darken-2"></i></a><a class="btn btn-flat white"  onclick="del_purch(' + data[i].id + ')"><i class="mdi-action-delete red-text text-darken-2"></i></a></td></tr>');

					
					$('#order_tracking>.row>.col>table>tbody.order_table #item_' +data[i].id+ ' .brush_on .desn_contner svg .dsn_path_col').attr('fill', data[i].dsn_cl);
			};
			$('#order_tracking>.row>.col>table>tbody.order_table .brush_on .desn_contner svg').attr('width', '37.5px');
			$('#order_tracking>.row>.col>table>tbody.order_table .brush_on .desn_contner svg').attr('height', '37.5px');
			$('#order_tracking>.row>.col>p>span.red-text').html(data.length);
			$('#order_tracking>.row>.col>table>tbody.order_table').append('<tr><td colspan="8" class="center-align flow-text white">No more items found :(</td></tr>');
		};
		get_sql(sql);
	}
	get_orders = get_user_order_list;
});
/* WishList */
$( document ).ready(function(){ 
	function add_dsn_to_wishlist(){
		if(user_data != ''){
			sql = 'INSERT INTO cart (prod_id, prod_gen, dsn_id, prod_cl, dsn_col, us_id) VALUES ("' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '", "' +  $('#desn_studio>.row>.col>.canv_item').attr('gender') + '", "' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '", "' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '", "' + $('#desn_studio>.row>.col>.brush_on .desn_contner>svg .dsn_path_col').attr('fill') + '", "' + user_data.user_id + '");';

			sql_call_back = function(res){
				if($.isNumeric(res)){
					Materialize.toast('Design Added to whislist', 3000);
				}else{
					Materialize.toast('Oops Error. Try again later.', 2000);	
				}
			}
			ins_sql(sql);
			
		}else{
			check_nav('login_page');			
		}
	}
	add_wish = add_dsn_to_wishlist;

	function get_user_wish_list(){
		sql = 'SELECT cart.*, a.price as prod_price, b.price as dsn_price, b.svg from cart, products a, designs b where cart.prod_id = a.product_id and cart.dsn_id = b.id and us_id = "' + user_data.user_id + '" order by cart.id';
		sql_call_back = function (data){			
			$('#acc_profile>.row>.col.saved_dsns').html('');
			for (var i = data.length - 1; i >= 0; i--) {				
				$('#acc_profile>.row .saved_dsns').append('<div class="col l3 m6 s12" id="item_' +data[i].id+ '"><div class="canv_item center"><img src="img/products/' + data[i].prod_gen + '/' + data[i].prod_id  +'.jpg"><img src="img/products/' + data[i].prod_gen + '/' + data[i].prod_id  +'.png" style="background-color: ' +data[i].prod_cl+ '"></div><div class="brush_on"><div class="desn_contner">' + data[i].svg + '</div><a onclick="open_this_dsn(\'' + data[i].prod_id + '\', \'' + data[i].prod_cl + '\', \'' +data[i].prod_gen+ '\', \''+ data[i].dsn_id+'\', \'' + data[i].dsn_col + '\', \'' + data[i].prod_price+ '\', \'' + data[i].dsn_price + '\');" class="btn btn-flat waves-effect waves-blue" id="edit_dsn" style="top:20px;right:10px;"><i class="mdi-content-create blue-text"></i></a><a onclick="del_wish(' + data[i].id + ')" class="btn btn-flat waves-effect waves-blue" id="edit_dsn" style="bottom:20px;left:10px;"><i class="mdi-action-delete red-text"></i></a><a class="btn btn-flat black-text waves-effect waves-blue" id="edit_dsn" style="bottom:20px;right:10px;" href="cmise.html#desn_studio?prod_id=' + data[i].prod_id + '&prod_cl=' + data[i].prod_cl + '&prod_gen=' +data[i].prod_gen+ '&dsn_id='+ data[i].dsn_id+'&dsn_col=' + data[i].dsn_col + '&prod_price=' + data[i].prod_price+ '&dsn_price=' + data[i].dsn_price + '" target="_blank" title="Share design"><i class="mdi-social-share green-text left"></i></a></div></div>');

					$('#acc_profile>.row .saved_dsns>#item_' +data[i].id+ ' .brush_on .desn_contner svg').attr('width', '150px');
					$('#acc_profile>.row .saved_dsns>#item_' +data[i].id+ ' .brush_on .desn_contner svg').attr('height', '150px');
					$('#acc_profile>.row .saved_dsns>#item_' +data[i].id+ ' .brush_on .desn_contner svg .dsn_path_col').attr('fill', data[i].dsn_col);
			};
			$('#acc_profile>.row .saved_dsns').append('<div onclick="open_this(\'desn_studio\')" class="col m3 s12" style="width: 302px; height: 403px;"><div class="show_more_but center" title="Add new item to wishlist"><i class="mdi-content-add-circle grey-text text-lighten-2 large"></i></div></div>');
		};
		get_sql(sql);
	}
	get_wish_list = get_user_wish_list;

	function delete_wish_item(id){
		sql = 'DELETE FROM cart WHERE id = "' + id + '";';
		sql_call_back = function(data) {
			$('#acc_profile>.row>.col.saved_dsns>.col#item_' + id).fadeOut(1000, function() {
				$('#acc_profile>.row>.row.saved_dsns>.col#item_' + id).remove();				
			});
		}
		ins_sql(sql);
	}
	del_wish = delete_wish_item;
});
/* Open Designs*/
$( document ).ready(function(){
	function open_dsn_to_edit(prod_id, prod_cl, prod_gen, dsn_id, dsn_col, prod_price, dsn_price){
		$.get("img/dsn/" + dsn_id + ".svg", function(data) {
			$('#desn_studio>.row>.col>.brush_on .desn_contner').html(new XMLSerializer().serializeToString(data.documentElement));
			$('#desn_studio>.row>.col>.brush_on .desn_contner svg').attr('width', '150px');
			$('#desn_studio>.row>.col>.brush_on .desn_contner svg').attr('height', '150px');
			$('#desn_studio>.row>.col>.brush_on .desn_contner svg .dsn_path_col').attr('fill', dsn_col);
		});
		$('#desn_studio>.row>.col>.canv_item').html('<img src="img/products/' + prod_gen + '/' + prod_id + '.jpg"><img src="img/products/' + prod_gen + '/' + prod_id + '.png">');

		$('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background', prod_cl);		
		
		$('#desn_studio>.row>.col>.canv_item').attr('gender', prod_gen);
		$('#desn_studio>.row>.col>.canv_item').attr('prod-id', prod_id);
		$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id', dsn_id);
		$('#desn_studio>.row>.col>.canv_item').attr('prod-price', prod_price);
		$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price', dsn_price);

		$('#gend_select>a:not(#' + prod_gen + ')').addClass('btn-flat');
		$('#gend_select>a#' + prod_gen).removeClass('btn-flat');

		$('#desn_studio .dsn_share').attr('href', 'cmise.html#desn_studio?prod_id=' + prod_id+ '&prod_cl=' + prod_cl + '&prod_gen=' + prod_gen + '&dsn_id=' + dsn_id + '&dsn_col=' + dsn_col + '&prod_price=' + prod_price + '&dsn_price=' + dsn_price);

		open_this('desn_studio');
	}
	open_this_dsn = open_dsn_to_edit;
});
/* Buy item */
$( document ).ready(function(){ 
	var prod_info = {prod_id: '', prod_col: '', dsn_id: '', dsn_col: '', prod_gen: '', dsn_svg: '', price: '0'};
	function re_order_item(prod_id, prod_cl, prod_gen, dsn_id, dsn_col, prod_price, dsn_price, purc_id){
		prod_info = {prod_id: prod_id, prod_col: prod_cl, dsn_id: dsn_id, dsn_col: dsn_col, prod_gen: prod_gen, dsn_svg: '', price: (parseInt(dsn_price) + parseInt(prod_price))};

		$('.price_total').html('Total: GH ' + prod_info.price);

		open_this('order_checkout');

		$('#order_checkout>.row>.col>table>tbody').html('<tr id="item_0"><td><div class="col l12 m12 s12"><div class="canv_item center"><img src="img/products/' + prod_info.prod_gen + '/' + prod_info.prod_id + '.jpg"><img src="img/products/' +prod_info.prod_gen + '/' + prod_info.prod_id + '.png" style="background-color: ' + prod_info.prod_col + '"></div><div class="brush_on"><div class="desn_contner"></div></div></div></td><td>' + prod_info.price + '</td><td><input id="quant" type="text" er-msg="Please Enter a quantity" class="validate col l4 m12 s12" value="1" onkeyup="calc_price(this.value, ' + prod_info.price + ', 0)"></td><td><select class="browser-default" id="size"><option value="M">Meduim</option><option value="L">Large</option><option value="XL">Extra Large</option></select></td><td> GHS <span class="red-text">' + prod_info.price + '</span></td><td><a class="btn btn-flat white"  onclick="rm_it_ui(0)"><i class="mdi-action-delete red-text text-darken-2"></i></a></td></tr>');

		$('#order_checkout>.row>.col>table .brush_on .desn_contner').html($('#order_tracking>.row>.col>table>tbody.order_table #item_' + purc_id + ' .desn_contner').html());
		/*$('#order_checkout>.row>.col>table .brush_on .desn_contner svg').attr('width', '37.5px');
		$('#order_checkout>.row>.col>table .brush_on .desn_contner svg').attr('height', '37.5px');
		$('#order_checkout>.row>.col>table .brush_on .desn_contner svg .dsn_path_col').attr('fill', prod_info.dsn_col);*/
	}
	re_order = re_order_item;
	function buy_item_now(){
		order_type = 0;
		prod_info.prod_id = $('#desn_studio>.row>.col>.canv_item').attr('prod-id');
		prod_info.dsn_id = $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id');
		prod_info.prod_col = $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color');
		prod_info.dsn_col = $('#desn_studio>.row>.col>.brush_on .desn_contner svg .dsn_path_col').attr('fill');
		
		prod_info.prod_gen = $('#desn_studio>.row>.col>.canv_item').attr('gender');
		prod_info.dsn_svg = $('#desn_studio>.row>.col>.brush_on .desn_contner').html();

		prod_info.price = parseInt($('#desn_studio>.row>.col>.canv_item').attr('prod-price')) + parseInt($('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));

		$('.price_total').html('Total: GH ' + prod_info.price);

		open_this('order_checkout');

		$('#order_checkout>.row>.col>table>tbody').html('<tr id="item_0"><td><div class="col l12 m12 s12"><div class="canv_item center"><img src="img/products/' + prod_info.prod_gen + '/' + prod_info.prod_id + '.jpg"><img src="img/products/' +prod_info.prod_gen + '/' + prod_info.prod_id + '.png" style="background-color: ' + prod_info.prod_col + '"></div><div class="brush_on"><div class="desn_contner">' + prod_info.dsn_svg + '</div></div></div></td><td>' + prod_info.price + '</td><td><input id="quant" type="text" er-msg="Please Enter a quantity" class="validate col l4 m12 s12" value="1" onkeyup="calc_price(this.value, ' + prod_info.price + ', 0)"></td><td><select class="browser-default" id="size"><option value="M">Meduim</option><option value="L">Large</option><option value="XL">Extra Large</option></select></td><td> GHS <span class="red-text">' + prod_info.price + '</span></td><td><a class="btn btn-flat white"  onclick="rm_it_ui(0)"><i class="mdi-action-delete red-text text-darken-2"></i></a></td></tr>');

		$('#order_checkout>.row>.col>table .brush_on .desn_contner svg').attr('width', '37.5px');
		$('#order_checkout>.row>.col>table .brush_on .desn_contner svg').attr('height', '37.5px');
		$('#order_checkout>.row>.col>table .brush_on .desn_contner svg .dsn_path_col').attr('fill', prod_info.dsn_col);
	}
	buy_now = buy_item_now;

	function calc_order_quantity_price(quant, price, itd){
		$('#order_checkout>.row>.col>table>tbody>tr#item_' + itd + '>td>span').html(quant * price);
		var prices = $('#order_checkout>.row>.col>table>tbody>tr>td>span');
		var price = 0;
		for (var i = prices.length - 1; i >= 0; i--) {
			price += parseInt($(prices[i]).html());
		};
		$('.price_total').html('Total: GH ' + price);

	}
	calc_price = calc_order_quantity_price;

	function place_order_now(){
		/* Purchase data validation */
		con = $('#order_checkout>.row .order_table input, #order_checkout>.row .order_table select');
		for (var i = 0; i < con.length ; i++) {
			if($(con[i]).val().trim() == ''){
				$(con[i]).removeClass('valid').addClass('invalid');

				Materialize.toast($(con[i]).attr('er-msg'), 4000);

				$(con[i]).focus();

				return false;
			}else{
				$(con[i]).removeClass('invalid').addClass('valid');
			}
		};
		/* Reg Data Validation */
		
		var vals = ['','','','','',''], con = $('#order_checkout>.row .billing_reg input, #order_checkout>.row .billing_reg textarea, #order_checkout>.row .billing_reg select');
		
			for (var i = 0; i < con.length ; i++) {
				if($(con[i]).val().trim() == ''){
					$(con[i]).removeClass('valid').addClass('invalid');

					Materialize.toast($(con[i]).attr('er-msg'), 4000);

					$(con[i]).focus();

					return false;
				}else{
					$(con[i]).removeClass('invalid').addClass('valid');
				}
				vals[i] = $(con[i]).val()
			};			

			if(!val_email.test(vals[4])){
				Materialize.toast('Please enter a valid email address', 4000);
				$('#order_checkout>.row input#b_email').addClass('invalid').focus();
				return false;
			}
			if(vals[3].length < 10 || !$.isNumeric(vals[3])){
				Materialize.toast('Please enter a valid phone number', 4000);
				$('#order_checkout>.row input#b_phnum').addClass('invalid').focus();
				return false;
			}
			
			if($('#order_checkout>.row input#b_agree:checked').val() != 'on'){
				Materialize.toast('Please check the terms and conditions box', 3000);
				return false;			
			}

			if(user_data == ""){
				/* Register new user */
					$.ajax({
						type: "POST",
						url: "api/register_new_user.php",
						data: {fname: vals[0], lname: vals[1] ,city: vals[2],  phone_number: vals[3], email: vals[4], address: vals[5]},
						success: function(res){
							if(res.err == 0){
								Materialize.toast('Please note your password: ' + res.pp);
								user_data = {user_id: res.user_id, fname:  vals[1], lname:  vals[1],phone_number:  vals[3], city:  vals[2], address:  vals[5],email:  vals[4], date_added: ''};
								set_profile_data();
								add_purchase_now();
							}else if(res.err == 1){
								 $('#login_page input#email').val(vals[4]);
								 $('#login_page input#pword').val(vals[3]);
								 Materialize.toast('Hey, we know you!', 5000);
								 open_this('login_page');
								 Materialize.toast('Forgot Pass Phrase?<a onclick="reset_pass()" class="btn-flat red-text truncate">Reset Now</a>', 10000)
							}else{
								Materialize.toast('Please verify your registration data', 5000);
							}
						},
						error: function(){
							Materialize.toast('Oops Error registering new user', 2000);
							Materialize.toast('Please verify your phone number', 5000);
						}
					});
			}else{
				add_purchase_now();
			}
		return true;
	}
	place_order = place_order_now;

	function add_purchase_now() {
		sql = '';
		if($('#order_checkout .order_table>tr').length >= 1){
			if(order_type){
				for (var i = check_out_list.length - 1; i >= 0; i--) {
					if(check_out_list[i] !== null){
						sql += 'INSERT INTO purchases (size, quantity, prod_id, prod_gen, prod_cl, dsn_id, dsn_cl, user_id) VALUES ("' + $('#order_checkout .order_table>tr#item_' + i + ' select#size').val() + '", "' + $('#order_checkout .order_table>tr#item_' + i + ' input#quant').val() + '", "' + check_out_list[i].prod_id + '", "' + check_out_list[i].prod_gen + '", "' + check_out_list[i].prod_col + '", "' + check_out_list[i].dsn_id + '", "' + check_out_list[i].dsn_col + '", "' + user_data.user_id + '");';
						$('#cart_count').html(0);
					}
				};
			}else{
				sql = 'INSERT INTO purchases (size, quantity, prod_id, prod_gen, prod_cl, dsn_id, dsn_cl, user_id) VALUES ("' + $('#order_checkout .order_table>tr#item_0 select#size').val() + '", "' + $('#order_checkout .order_table>tr#item_0 input#quant').val() + '", "' + prod_info.prod_id + '", "' + prod_info.prod_gen + '", "' + prod_info.prod_col + '", "' + prod_info.dsn_id + '", "' + prod_info.dsn_col + '", "' + user_data.user_id + '");';	
			}
			sql_call_back = function(res){
				if($.isNumeric(res)){
					if(order_type){
						check_out_list = [];					
					}else{
						prod_info = {prod_id: '', prod_col: '', dsn_id: '', dsn_col: '', prod_gen: '', dsn_svg: '', price: '0'};
					}

					Materialize.toast('Purchase Successfull', 3000);
					open_this('order_tracking');
					get_orders();
				}else{
					Materialize.toast('Oops Error. Try again later.', 2000);	
				}
			}
			ins_sql(sql);
		}else{
			Materialize.toast('You have nothing in you cart', 2000);
		}
	}
});
/* Check out stuff */
$( document ).ready(function(){
	function add_item_to_checkout(){
		var new_index = check_out_list.length;
		check_out_list[new_index] = {prod_id: '', prod_col: '', dsn_id: '', dsn_col: '', prod_gen: '', dsn_svg: '', price: 0};
		check_out_list[new_index].prod_id = $('#desn_studio>.row>.col>.canv_item').attr('prod-id');
		check_out_list[new_index].dsn_id = $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id');
		check_out_list[new_index].prod_col = $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color');
		check_out_list[new_index].dsn_col = $('#desn_studio>.row>.col>.brush_on .desn_contner svg .dsn_path_col').attr('fill');
		
		check_out_list[new_index].prod_gen = $('#desn_studio>.row>.col>.canv_item').attr('gender');
		check_out_list[new_index].dsn_svg = $('#desn_studio>.row>.col>.brush_on .desn_contner').html();

		check_out_list[new_index].price = parseInt($('#desn_studio>.row>.col>.canv_item').attr('prod-price')) + parseInt($('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));
		Materialize.toast('Design Added to cart', 1000);
		$('#cart_count').html(check_out_list.length);
	}
	add_cart = add_item_to_checkout;

	function display_checkout_items(){
		if(check_out_list.length > 0){
			open_this('order_checkout');
			order_type = 1;
			var price = 0;
			$('#order_checkout>.row>.col>table>tbody').html('');
			for (var i = check_out_list.length - 1; i >= 0; i--) {
				if(check_out_list[i] !== null){
					$('#order_checkout>.row>.col>table>tbody').append('<tr id="item_' + i + '"><td><div class="col l12 m12 s12"><div class="canv_item center"><img src="img/products/' + check_out_list[i].prod_gen + '/' + check_out_list[i].prod_id + '.jpg"><img src="img/products/' +check_out_list[i].prod_gen + '/' + check_out_list[i].prod_id + '.png" style="background-color: ' + check_out_list[i].prod_col + '"></div><div class="brush_on"><div class="desn_contner">' + check_out_list[i].dsn_svg + '</div></div></div></td><td>' + check_out_list[i].price + '</td><td><input id="quant" type="text" er-msg="Please Enter a quantity" class="validate col l4 m12 s12" value="1" onkeyup="calc_price(this.value, ' + check_out_list[i].price + ', ' + i + ')"></td><td><select class="browser-default" id="size"><option value="M">Meduim</option><option value="L">Large</option><option value="XL">Extra Large</option></select></td><td> GHS <span class="red-text">' + check_out_list[i].price + '</span></td><td><a class="btn btn-flat white"  onclick="rm_it_ui(' + i + ')"><i class="mdi-action-delete red-text text-darken-2"></i></a></td></tr>');
					price += check_out_list[i].price;
				}
			};
			$('#order_checkout>.row>.col>table .brush_on .desn_contner svg').attr('width', '37.5px');
			$('#order_checkout>.row>.col>table .brush_on .desn_contner svg').attr('height', '37.5px');
			$('.price_total').html('Total: GH ' + price);
		}else{
			Materialize.toast('You have no Items in cart', 2000);
		}
	}
	show_cart = display_checkout_items;

	function remove_from_ui(id){
    	$('#order_checkout>.row>.col>table>tbody #item_' + id).fadeOut(1000, function() {
			$(id).remove();
		});
    	check_out_list[id] = null;
    }
    rm_it_ui = remove_from_ui;
});
/* Edit order */
$( document ).ready(function(){
	function delete_purchase(id){
		sql = 'DELETE FROM purchases WHERE id = "' + id + '";';
		sql_call_back = function(data) {
			$('#order_tracking>.row>.col>p>span.red-text').html(parseInt($('#order_tracking>.row>.col>p>span.red-text').html()) - 1);
			$('#order_tracking>.row>.col>table>tbody.order_table>tr#item_' + id).fadeOut(1000, function() {
				$('#order_tracking>.row>.col>table>tbody.order_table>tr#item_' + id).remove();
			});			
		}
		ins_sql(sql);
	}
	del_purch = delete_purchase;
});
/* Edit User Data */
$( document ).ready(function(){
	function edit_user_data(inp_data, col){
		if(user_data !== ''){
			if(col.split(' ').length == 2){
				if(inp_data.split(' ')[1] == '' || inp_data.split(' ')[1] == undefined)
					return false;
					col = col.split(' ');
					inp_data = inp_data.split(' ');
					sql = 'UPDATE users SET ' + col[0] + ' = "' + inp_data[0].toProperCase() + '", ' + col[1] + ' = "' + inp_data[1].toProperCase() + '" WHERE users.user_id = "' + user_data.user_id + '";';
			}else{
				sql = 'UPDATE users SET ' + col + ' = "' + inp_data.toProperCase() + '" WHERE users.user_id = "' + user_data.user_id + '";';
			}
			sql_call_back = function(data) {
				Materialize.toast('User Data Updated', 4000);
			}
			ins_sql(sql);
		}
	}
	edit_u_data = edit_user_data;

	function update_live_user_data(){
		user_data.fname = $('#acc_profile>.row .col #full_name').val().split(' ')[0];
		user_data.lname =  $('#acc_profile>.row .col #full_name').val().split(' ')[1];
		user_data.email = $('#acc_profile>.row input#email').val();
		user_data.phone_number = $('#acc_profile>.row input#phnum').val();
		user_data.city = $('#acc_profile>.row input#city').val();
		user_data.address = $('#acc_profile>.row #addrs').val();

		/* set */
		$('nav #nav_fname>span').html(user_data.fname);
		$('#order_checkout>.row input#b_fname').val(user_data.fname);
		$('#order_checkout>.row input#b_email').val(user_data.email);
		$('#order_checkout>.row input#b_phnum').val(user_data.phone_number);
		$('#order_checkout>.row input#b_city').val(user_data.city);
		$('#order_checkout>.row textarea#b_addrs').val(user_data.address);
		$('#order_checkout>.row input#b_lname').val(user_data.lname);
	}
	update_live_data = update_live_user_data;

	function enable_user_data_edit(){
		$('#acc_profile>.row .col input[disabled=""], #acc_profile>.row .col textarea[disabled=""]').removeAttr('disabled');
		Materialize.toast('User data editing enabled', 4000);
	}
	enable_edit = enable_user_data_edit;

	function reset_user_passPhrase(){
		var email = $('#login_page input#email').val().trim(), pp = $('#login_page input#pword').val().trim();
		if(!val_email.test(email)){
			Materialize.toast('Please Enter your email address', 4000);
			return false;
		}
		if(pp.length < 10 || !$.isNumeric(pp)){
			Materialize.toast('Please Enter a valid phone number in the password box', 4000);
			return false;
		}

		/* ajax Send*/
			$.ajax({
				type: "POST",
				url: "api/reset_pass.php",
				data: {phone_number: $('#login_page input#pword').val().trim(), email: $('#login_page input#email').val().trim()},
				success: function(res){
					if(res == ''){
						Materialize.toast('Invalid email or phone number entered', 5000);
					}else{
						Materialize.toast('Your new password is: ' + res);
					}
				},
				error: function(){
					Materialize.toast('Please verify your credentials', 5000);
				}
			});
	}
	reset_pass = reset_user_passPhrase;
});
/* init */
$( document ).ready(function(){
	$('.button-collapse').sideNav({
		menuWidth: 70,
		edge: 'left'
	});
	$('._show_opts').sideNav({
		menuWidth: 300,
		edge: 'right',
	});
	$('.drag-target')[1].remove();
	open_this(document.location.href.split('#')[1].split("?")[0]);

	if(document.location.href.split('#')[1].split("?").length > 1){
		vals = document.location.href.split('#')[1].split("?")[1].replace(/%20/g,' ');
		vals = vals.split("&");
		open_this_dsn(vals[0].split("=")[1], vals[1].split("=")[1], vals[2].split("=")[1], vals[3].split("=")[1], vals[4].split("=")[1], vals[5].split("=")[1], vals[6].split("=")[1]);		
	}
	load_avail_products();

	/* Nav Slide */
		function slide_left(){
		}
		move_left = slide_left;


	/* Navigation */
		function check_log_in_nav(id){
			if(user_data !== ''){
				open_this(id); 
				return true;
			}else{
				Materialize.toast('<span>Please Login or Register to continue</span><a onclick="open_this(\'desn_studio\')" class="btn-flat red-text truncate"><i class="mdi-navigation-arrow-back left red-text"></i>Back</a>', 7000);
				open_this('login_page');
				return false;
			} 
		}
		check_nav = check_log_in_nav;

	/* Load studio elements */
		function load_dsn_elements(prod_id){
			/* Designs */
			sql = 'SELECT * from designs where prod_id = "' + prod_id + '" order by id asc limit 2;';
			$('#desn_studio #ep2 .desn_list').html('');
			sql_call_back = function (data){			
				sql = '';
				for (var i = 0; i < data.length; i++) {
					$('#desn_studio #ep2 .desn_list').append('<div title="' + data[i].name + '" onclick="ch_dsn_img(this)" dsn-id="'+ data[i].id +'" dsn-price="' + data[i].price + '">' +data[i].svg+ '</div>');
					$('#dsn_side_bar #_ep2 .desn_list').append('<div title="' + data[i].name + '" onclick="ch_dsn_img(this)" dsn-id="'+ data[i].id +'" dsn-price="' + data[i].price + '">' +data[i].svg+ '</div>');
					sql = 'SELECT * from designs where prod_id = "' +  data[i].prod_id + '" and id > ' + data[i].id + ' order by id limit 2;';
				};
				if(sql != '')
					get_sql(sql);
				if(document.location.href.split('#')[1].split("?").length < 2 && $('#desn_studio>.row>.col>.brush_on .desn_contner').html() == ''){
					$('#desn_studio>.row>.col>.brush_on .desn_contner').html(data[0].svg);
					$('#desn_studio>.row>.col>.brush_on .desn_contner svg').attr('width', '150px');
					$('#desn_studio>.row>.col>.brush_on .desn_contner svg').attr('height', '150px');
					$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id', data[0].id);
					$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price', data[0].price);					
				}
			};
			get_sql(sql);
		}


		function load_avail_products(){
			sql = 'SELECT * from products order by product_id;';
			sql_call_back = function (data){			
				$('#desn_studio .canv_item_list').html('');
				for (var i = data.length - 1; i >= 0; i--) {
					$('#desn_studio .canv_item_list').append('<div title="' + data[i].name + '" onclick="ch_prod_img(\'' + data[i].product_id + '\', \'' + data[i].price + '\')"><img src="img/products/F/' + data[i].product_id + '.jpg"><img src="img/products/F/' + data[i].product_id + '.png"></div>');
				};
				if(document.location.href.split('#')[1].split("?").length < 2){
					$('#desn_studio>.row>.col>.canv_item').html('<img src="img/products/' + $('#gend_select>a:not(.btn-flat)').attr('id') + '/' + data[0].product_id + '.jpg"><img src="img/products/' +$('#gend_select>a:not(.btn-flat)').attr('id')+ '/' + data[0].product_id + '.png">');

					$('#desn_studio>.row>.col>.canv_item').attr('prod-price', data[0].price);
					$('#desn_studio>.row>.col>.canv_item').attr('prod-id', data[0].product_id);
					$('#desn_studio>.row>.col>.canv_item').attr('gender', $('#gend_select>a:not(.btn-flat)').attr('id'));					
				}
				load_dsn_elements(data[0].product_id);
			};
			get_sql(sql);
		}		
});