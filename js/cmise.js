var user_data = '', sql_call_back, sql;
var going_here = {back: 'acc_profile', here: 'acc_profile'};

/* Registration */
$( document ).ready(function(){
	function validate_registration_data(){
		var vals = ['','','','','',''], con = $('#order_checkout>.row input, #order_checkout>.row textarea, #order_checkout>.row select');
		/* valiation */
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
					if(res !== ''){
						Materialize.toast('Please note your password: ' + res.pp);
						user_data = {user_id: res.user_id, fname:  vals[0], lname:  vals[1],phone_number:  vals[3], city:  vals[2], address:  vals[5],email:  vals[4], date_added: ''}
						set_profile_data();
						if(document.location.href.split('#')[1].split("?")[0] == 'login_page')
							open_this('acc_profile');
						else
							open_this('desn_studio');
						get_wish_list();
					}else{
						Materialize.toast('Oops Error registering new user', 2000);
					}
				},
				error: function(){
					Materialize.toast('Oops Error registering new user', 2000);
					Materialize.toast('Pleasev verify your phone Number', 5000);
				}
			});
	}
	validate_reg_data = validate_registration_data;
});
/* Sign in */
$( document ).ready(function(){
	function validate_log_in_data(){
		var vals = ['', ''];
		for (var i = 0; i < $('#login_page input').length ; i++) {
			inp = $('#login_page input')[i];
			
			if($(inp).val().trim() == ''){
				$(inp).removeClass('valid').addClass('invalid');

				Materialize.toast($(inp).attr('er-msg'), 2000);

				$(inp).focus();

				return false;
			}else{
				$(inp).removeClass('invalid').addClass('valid');
			}
			vals[i] = $(inp).val()
		};
		

		$.ajax({
			type: "POST",
			url: "api/log_in_user.php",
			data: {email: vals[0], pword: vals[1]},
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
		$('#desn_studio #ep1 .col_pal>div').click(function(){ //change product color
			$('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color', $(this).css('background-color').replace(')', ', 0.55)').replace('rgb(','rgba('));

			$('#desn_studio .dsn_share').attr('href', 'http://localhost/!/logicgh/cmise.html#desn_studio?prod_id=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '&prod_cl=' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '&prod_gen=' + $('#desn_studio>.row>.col>.canv_item').attr('gender') + '&dsn_id=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '&dsn_col=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-col') + '&prod_price=' + $('#desn_studio>.row>.col>.canv_item').attr('price') + '&dsn_price=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));
			go_to('desn_studio');
		});	
		/* Product change */
		$('#desn_studio .play_bd .canv_item_list>div>img').click(function(){ //change product
			if($('#desn_studio>.row>.col>.canv_item img:nth-child(2)').attr('src') == $(this).attr('src')){
				 Materialize.toast('Product Currently displayed', 2000);
			}else{
				$('#desn_studio>.row>.col>.canv_item img:nth-child(2)').attr('src', $(this).attr('src'));
				$('#desn_studio>.row>.col>.canv_item img:nth-child(1)').attr('src', $(this).attr('src').replace('.png', '.jpg'));
				$('#desn_studio>.row>.col>.canv_item').attr('price', $(this).attr('price'));
				$('#desn_studio>.row>.col>.canv_item').attr('prod-id', $(this).attr('prod-id'));
				$('#desn_studio>.row>.col>.canv_item').attr('gender', 'F');
				go_to('desn_studio');

				$('#desn_studio .dsn_share').attr('href', 'http://localhost/!/logicgh/cmise.html#desn_studio?prod_id=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '&prod_cl=' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '&prod_gen=' + $('#desn_studio>.row>.col>.canv_item').attr('gender') + '&dsn_id=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '&dsn_col=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-col') + '&prod_price=' + $('#desn_studio>.row>.col>.canv_item').attr('price') + '&dsn_price=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));
			}
		});
		/* Gender change */
		function product_gender_change(state){
			$('#desn_studio>.row>.col>.canv_item img:nth-child(2)').attr('src', 'img/products/' + $(state).attr('id') + '/' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '.png');
			$('#desn_studio>.row>.col>.canv_item img:nth-child(1)').attr('src', 'img/products/' + $(state).attr('id') + '/' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '.jpg');
			$('#gend_select>a:not(.btn-flat)').addClass('btn-flat');
			$(state).removeClass('btn-flat');
			$('#desn_studio>.row>.col>.canv_item').attr('gender', $(state).attr('id'));
			go_to('desn_studio');

			$('#desn_studio .dsn_share').attr('href', 'http://localhost/!/logicgh/cmise.html#desn_studio?prod_id=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '&prod_cl=' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '&prod_gen=' + $('#desn_studio>.row>.col>.canv_item').attr('gender') + '&dsn_id=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '&dsn_col=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-col') + '&prod_price=' + $('#desn_studio>.row>.col>.canv_item').attr('price') + '&dsn_price=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));
		}
		prod_gen_ch = product_gender_change;

	/* Design manip */
		/* Desgin Color Change*/
		$('#desn_studio #ep2 .col_pal>div').click(function(){ //change product color
			$('#desn_studio>.row>.col>.brush_on .desn_contner').css('background-position', (parseInt($(this).attr('nth') % 5) * -150) + 'px ' + (parseInt($(this).attr('nth') / 5) * -150) + 'px');
			$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-col', $(this).attr('nth'));
			go_to('desn_studio');

			$('#desn_studio .dsn_share').attr('href', 'http://localhost/!/logicgh/cmise.html#desn_studio?prod_id=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '&prod_cl=' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '&prod_gen=' + $('#desn_studio>.row>.col>.canv_item').attr('gender') + '&dsn_id=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '&dsn_col=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-col') + '&prod_price=' + $('#desn_studio>.row>.col>.canv_item').attr('price') + '&dsn_price=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));
		});
		/* Design Change */
		function change_dsn_image(from){ //change product color
			$('#desn_studio>.row>.col>.brush_on .desn_contner').css('background-image', $(from).css('background-image').replace('tm/', ''));
			$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id', $(from).attr('dsn-id'));
			$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price', $(from).attr('dsn-price'));
			go_to('desn_studio');

			$('#desn_studio .dsn_share').attr('href', 'http://localhost/!/logicgh/cmise.html#desn_studio?prod_id=' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '&prod_cl=' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '&prod_gen=' + $('#desn_studio>.row>.col>.canv_item').attr('gender') + '&dsn_id=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '&dsn_col=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-col') + '&prod_price=' + $('#desn_studio>.row>.col>.canv_item').attr('price') + '&dsn_price=' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));
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
		sql = 'SELECT purchases.*, a.price as prod_price, b.price as dsn_price from purchases, products a, products b where purchases.prod_id = a.product_id and purchases.dsn_id = b.product_id and user_id = "' + user_data.user_id + '" order by id asc;';
		sql_call_back = function (data){			
			$('#order_tracking>.row>.col>table>tbody.order_table').html('');
			for (var i = data.length - 1; i >= 0; i--) {
				$('#order_tracking>.row>.col>table>tbody.order_table').append('<tr id="item_' + data[i].id + '"><td><div class="col l12 m12 s12"><div class="canv_item center" prod-id="' + data[i].prod_id + '" gender="' + data[i].prod_gen + '" prod-price="' + data[i].prod_price + '"><img src="img/products/' + data[i].prod_gen + '/' + data[i].prod_id + '.jpg"><img src="img/products/' + data[i].prod_gen + '/' + data[i].prod_id + '.png" style="background-color: ' + data[i].prod_cl+ '"></div><div class="brush_on"><div class="desn_contner" style="background-image: url(\'img/dsn/' + data[i].dsn_id + '.png\'); background-position: ' +((data[i].dsn_cl % 5) * -75) + 'px ' + (parseInt(data[i].dsn_cl / 5) * -75) + 'px" dsn-id="'+ data[i].dsn_id +'" dsn-price="' + data[i].dsn_price +'"></div></div></div></td><td>GHS ' + (parseInt(data[i].prod_price) + parseInt(data[i].dsn_price)) + '</td><td>' + data[i].quantity + '</td><td>' + data[i].size + '</td><td>' + (data[i].quantity *  (parseInt(data[i].prod_price) + parseInt(data[i].dsn_price)))+ '</td><td>' + data[i].date_added + '</td><td class="green-text">' + data[i].status + '</td><td><a class="btn btn-flat white"  onclick="open_this_dsn(\'' + data[i].prod_id + '\', \'' + data[i].prod_cl + '\', \'' +data[i].prod_gen+ '\', \''+ data[i].dsn_id+'\', \'' + data[i].dsn_cl + '\', \'' + data[i].prod_price+ '\', \'' + data[i].dsn_price + '\');"><i class="mdi-action-visibility blue-text text-darken-2"></i></a><a class="btn btn-flat white"  onclick="del_purch(' + data[i].id + ')"><i class="mdi-action-delete red-text text-darken-2"></i></a></td></tr>');
			};
			$('#order_tracking>.row>.col>p>span.red-text').html(data.length);
			$('#order_tracking>.row>.col>table>tbody.order_table').append('<tr><td colspan="8" class="center-align flow-text">No more items found :(</td></tr>');
		};
		get_sql(sql);
	}
	get_orders = get_user_order_list;
});
/* WishList */
$( document ).ready(function(){ 
	function add_dsn_to_wishlist(){
		if(user_data != ''){
			sql = 'INSERT INTO cart (prod_id, prod_gen, dsn_id, prod_cl, dsn_col, us_id) VALUES ("' + $('#desn_studio>.row>.col>.canv_item').attr('prod-id') + '", "' +  $('#desn_studio>.row>.col>.canv_item').attr('gender') + '", "' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') + '", "' + $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color') + '", "' + $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-col') + '", "' + user_data.user_id + '");';

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
		sql = 'SELECT cart.*, a.price as prod_price, b.price as dsn_price from cart, products a, products b where cart.prod_id = a.product_id and cart.dsn_id = b.product_id and us_id = "' + user_data.user_id + '" order by cart.id';
		sql_call_back = function (data){			
			$('#acc_profile>.row .saved_dsns').html('');
			for (var i = data.length - 1; i >= 0; i--) {				
				$('#acc_profile>.row .saved_dsns').append('<div class="col l3 m6 s12" id="item_' +data[i].id+ '"><div class="canv_item center"><img src="img/products/' + data[i].prod_gen + '/' + data[i].prod_id  +'.jpg"><img src="img/products/' + data[i].prod_gen + '/' + data[i].prod_id  +'.png" style="background-color: ' +data[i].prod_cl+ '"></div><div class="brush_on"><div class="desn_contner" style="background-image: url(\'img/dsn/' + data[i].dsn_id + '.png\'); background-position: ' + ((data[i].dsn_col % 5) * -150) + 'px ' + (parseInt(data[i].dsn_col / 5) * -150) + 'px;" dsn-id="'+ data[i].dsn_id +'"></div><a onclick="open_this_dsn(\'' + data[i].prod_id + '\', \'' + data[i].prod_cl + '\', \'' +data[i].prod_gen+ '\', \''+ data[i].dsn_id+'\', \'' + data[i].dsn_col + '\', \'' + data[i].prod_price+ '\', \'' + data[i].dsn_price + '\');" class="btn btn-flat waves-effect waves-blue" id="edit_dsn" style="top:20px;right:10px;"><i class="mdi-content-create blue-text"></i></a><a onclick="del_wish(' + data[i].id + ')" class="btn btn-flat waves-effect waves-blue" id="edit_dsn" style="bottom:20px;left:10px;"><i class="mdi-action-delete red-text"></i></a><a class="btn btn-flat black-text waves-effect waves-blue" id="edit_dsn" style="bottom:20px;right:10px;" href="http://localhost/!/logicgh/cmise.html#desn_studio?prod_id=' + data[i].prod_id + '&prod_cl=' + data[i].prod_cl + '&prod_gen=' +data[i].prod_gen+ '&dsn_id='+ data[i].dsn_id+'&dsn_col=' + data[i].dsn_col + '&prod_price=' + data[i].prod_price+ '&dsn_price=' + data[i].dsn_price + '" target="_blank" title="Download design"><i class="mdi-social-share green-text left"></i></a></div></div>');
			};
			$('#acc_profile>.row .saved_dsns').append('<div onclick="open_this(\'desn_studio\')" class="col m3 s12" style="border: 2px solid #efefef; width: 302px; height: 403px;"><div class="show_more_but center"><i class="mdi-content-add-circle grey-text text-lighten-2 large"></i></div></div>');
		};
		get_sql(sql);
	}
	get_wish_list = get_user_wish_list;

	function delete_wish_item(id){
		sql = 'DELETE FROM cart WHERE id = "' + id + '";';
		sql_call_back = function(data) {
			$('#acc_profile>.row>.row.saved_dsns>.col#item_' + id).fadeOut(1000, function() {
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
		$('#desn_studio>.row>.col>.canv_item img:nth-child(1)').attr('src', 'img/products/' + prod_gen + '/' + prod_id + '.jpg');
		$('#desn_studio>.row>.col>.canv_item img:nth-child(2)').attr('src', 'img/products/' + prod_gen + '/' + prod_id + '.png');
		$('#desn_studio>.row>.col>.brush_on .desn_contner').css('background-image', 'url(\'img/dsn/' + dsn_id + '.png\'');
		$('#desn_studio>.row>.col>.brush_on .desn_contner').css('background-position', parseInt((dsn_col % 5) * -150) + 'px ' + (parseInt(dsn_col / 5) * -150) + 'px');
		$('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background', prod_cl);
		
		$('#desn_studio>.row>.col>.canv_item').attr('gender', prod_gen);
		$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-col', dsn_col);
		$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id', dsn_id);
		$('#desn_studio>.row>.col>.canv_item').attr('price', prod_price);
		$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price', dsn_price);

		$('#gend_select>a:not(#' + prod_gen + ')').addClass('btn-flat');
		$('#gend_select>a#' + prod_gen).removeClass('btn-flat');

		$('#desn_studio .dsn_share').attr('href', 'http://localhost/!/logicgh/cmise.html#desn_studio?prod_id=' + prod_id+ '&prod_cl=' + prod_cl + '&prod_gen=' + prod_gen + '&dsn_id=' + dsn_id + '&dsn_col=' + dsn_col + '&prod_price=' + prod_price + '&dsn_price=' + dsn_price);

		open_this('desn_studio');
	}
	open_this_dsn = open_dsn_to_edit;
});
/* Buy item */
$( document ).ready(function(){ 
	var prod_info = {prod_id: '', prod_col: '', dsn_id: '', dsn_col: '', prod_gen: ''};
	function buy_item_now(){
		prod_info.prod_id = $('#desn_studio>.row>.col>.canv_item').attr('prod-id');
		prod_info.prod_col = $('#desn_studio>.row>.col>.canv_item img:nth-child(2)').css('background-color');
		prod_info.dsn_id = $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id');
		prod_info.dsn_col = $('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-col');
		prod_info.prod_gen = $('#desn_studio>.row>.col>.canv_item').attr('gender');

		price = parseInt($('#desn_studio>.row>.col>.canv_item').attr('prod-price')) + parseInt($('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price'));

		open_this('order_checkout');

		$('#order_checkout>.row>.col>table>tbody').html('<tr><td><div class="col l12 m12 s12"><div class="canv_item center"><img src="img/products/' + prod_info.prod_gen + '/' + prod_info.prod_id + '.jpg"><img src="img/products/' +prod_info.prod_gen + '/' + prod_info.prod_id + '.png" style="background-color: ' + prod_info.prod_col + '"></div><div class="brush_on"><div class="desn_contner" style="background-image: url(\'img/dsn/' + prod_info.dsn_id + '.png\'); background-position: ' +((prod_info.dsn_col % 5) * -75) + 'px ' + (parseInt(prod_info.dsn_col / 5) * -75) + 'px"></div></div></div></td><td>' + price + '</td><td><input id="quant" type="text" er-msg="Please Enter a quantity" class="validate col l4 m12 s12" value="1" onkeyup="calc_price(this.value, ' + price + ')"></td><td><select class="browser-default" id="size"><option value="M">Meduim</option><option value="L">Large</option><option value="XL">Extra Large</option></select></td><td><span class="red-text">GHS ' + price + '</span></td></tr>');
	}
	buy_now = buy_item_now;

	function calc_order_quantity_price(quant, price){
		$('#order_checkout>.row>.col>table>tbody>tr>td>span').html(' GHS ' + (quant * price));
	}
	calc_price = calc_order_quantity_price;

	function place_order_now(){
		var vals = ['','','','','','','', ''], con = $('#order_checkout>.row input, #order_checkout>.row textarea, #order_checkout>.row select');
		/* valiation */
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
			
			if($('#order_checkout>.row input#b_agree:checked').val() != 'on'){
				Materialize.toast('Please check the terms and conditions box', 3000);
				return false;			
			}

			if(user_data == ""){
				/* Register new user */
					$.ajax({
						type: "POST",
						url: "api/register_new_user.php",
						data: {fname: vals[2], lname: vals[3] ,city: vals[4],  phone_number: vals[5], email: vals[6], address: vals[7]},
						success: function(res){
							if(res !== ''){
								Materialize.toast('Please note your password: ' + res.pp);
								user_data = {user_id: res.user_id, fname:  vals[2], lname:  vals[3],phone_number:  vals[5], city:  vals[4], address:  vals[7],email:  vals[6], date_added: ''};
								set_profile_data();
								add_purchase_now();
							}else{
								Materialize.toast('Oops Error registering new user', 2000);
							}
						},
						error: function(){
							Materialize.toast('Oops Error registering new user', 2000);
							Materialize.toast('Pleasev verify your phone Number', 5000);
						}
					});
			}else{
				add_purchase_now();
			}
		return true;
	}
	place_order = place_order_now;

	function add_purchase_now() {
		sql = 'INSERT INTO purchases (size, quantity, prod_id, prod_gen, prod_cl, dsn_id, dsn_cl, user_id) VALUES ("' + $('#order_checkout>.row select#size').val() + '", "' + $('#order_checkout>.row input#quant').val() + '", "' + prod_info.prod_id + '", "' + prod_info.prod_gen + '", "' + prod_info.prod_col + '", "' + prod_info.dsn_id + '", "' + prod_info.dsn_col + '", "' + user_data.user_id + '");';
		sql_call_back = function(res){
			if($.isNumeric(res)){
				Materialize.toast('Purchase Successfull', 3000);
				open_this('order_tracking');
				get_orders();
			}else{
				Materialize.toast('Oops Error. Try again later.', 2000);	
			}
		}
		ins_sql(sql);
	}
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
				col = col.split(' ');
				inp_data = inp_data.split(' ');
				sql = 'UPDATE users SET ' + col[0] + ' = "' + inp_data[0] + '", ' + col[1] + ' = "' + inp_data[1] + '" WHERE users.user_id = "' + user_data.user_id + '";';
			}else{
				sql = 'UPDATE users SET ' + col + ' = "' + inp_data + '" WHERE users.user_id = "' + user_data.user_id + '";';
			}
			sql_call_back = function(data) {
				Materialize.toast('User Data Updated', 4000);
				/*update_live_data();*/
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
		user_data.address = $('#acc_profile>.row #addrs').html();

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
		$('#acc_profile>.row .col input, #acc_profile>.row .col textarea').removeAttr('disabled');
		Materialize.toast('User data editing enabled', 4000);
	}
	enable_edit = enable_user_data_edit;
});
/* init */
$( document ).ready(function(){
	$('.button-collapse').sideNav({
		menuWidth: 70, // Default is 240
		edge: 'left'
	});
	open_this(document.location.href.split('#')[1].split("?")[0]);

	if(document.location.href.split('#')[1].split("?").length > 1){
		vals = document.location.href.split('#')[1].split("?")[1].replace(/%20/g,' ');
		vals = vals.split("&");
		open_this_dsn(vals[0].split("=")[1], vals[1].split("=")[1], vals[2].split("=")[1], vals[3].split("=")[1], vals[4].split("=")[1], vals[5].split("=")[1], vals[6].split("=")[1]);		
	}

	/* Navigation */
		function check_log_in_nav(id){
			if(user_data !== ''){
				open_this(id); 
				return true;
			}else{
				Materialize.toast('<span>Please Login or Register to continue</span><a onclick="open_this(\'desn_studio\')" class="btn-flat red-text truncate"><i class="mdi-navigation-arrow-back left red-text"></i>Back</a>', 5000);
				open_this('login_page');
				return false;
			} 
		}
		check_nav = check_log_in_nav;

	/* Load studio elements */
		function load_dsn_elements(){
			/* Designs */
			sql = 'SELECT product_id, name, price from products where type = "1" order by product_id;';
			sql_call_back = function (data){			
				$('#desn_studio #ep2 .desn_list').html('');
				for (var i = data.length - 1; i >= 0; i--) {				
					$('#desn_studio #ep2 .desn_list').append('<div style="background-image: url(\'img/dsn/tm/' + data[i].product_id + '.png\')" title="' + data[i].name + '" onclick="ch_dsn_img(this)" dsn-id="'+ data[i].product_id +'" dsn-price="' + data[i].price + '"></div>');
				};
				if($('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id') == ''){
					$('#desn_studio>.row>.col>.brush_on .desn_contner').css('background-image', "url('img/dsn/" + data[0].product_id + ".png')");
					$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-id', data[0].product_id);
					$('#desn_studio>.row>.col>.brush_on .desn_contner').attr('dsn-price', data[0].price);					
				}
			};
			get_sql(sql);
		}
		load_dsn_elements();	
});