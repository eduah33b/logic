var ld_stats = {'blog': 0, 'msgs': 0, 'new_ord': 0, 'prod_ord': 0, 'track_en': 0};
/* User Data */
$( document ).ready(function(){
	function view_user_details(id){
		sql = 'SELECT * from users where users.user_id = ' + id + ' limit 1; SELECT COUNT(purchases.id) as pcnt from users, purchases where users.user_id = purchases.user_id and purchases.status = 0; SELECT COUNT(purchases.id) as pcnt from users, purchases where users.user_id = purchases.user_id and purchases.status = 1; SELECT COUNT(purchases.id) as pcnt from users, purchases where users.user_id = purchases.user_id and purchases.status = 2; SELECT COUNT(purchases.id) as pcnt from users, purchases where users.user_id = purchases.user_id and purchases.status = 3; SELECT COUNT(purchases.id) as pcnt from users, purchases where users.user_id = purchases.user_id and purchases.status = 4;';
		sql_call_back = function(data) {
			if(data.length > 0){
				var output = '<h1>' + data[0].lname + ', ' + data[0].fname + '</h1>';
				output += '<p><b>Phone number: </b>' + data[0].phone_number + '</p>';
				output += '<p><b>Email: </b>' + data[0].email + '</p>';
				output += '<p><b>City: </b>' + data[0].city + '</p>';
				output += '<p><b>Address: </b>' + data[0].address + '</p>';

				output += '<p><b>' + ord_st[0] + ': </b>' + data[1].pcnt + '</p>';
				output += '<p><b>' + ord_st[1] + ': </b>' + data[2].pcnt + '</p>';
				output += '<p><b>' + ord_st[2] + ': </b>' + data[3].pcnt + '</p>';
				output += '<p><b>' + ord_st[3] + ': </b>' + data[4].pcnt + '</p>';
				output += '<p><b>' + ord_st[4] + ': </b>' + data[5].pcnt + '</p>';

				$('#user_details #date_Added span').html(data[0].date_added);
				$('#user_details .modal-content').html(output);
				$('#user_details').openModal();
			}
		}
		get_sql(sql);
	}
	view_u_det = view_user_details;
});
/* Get orders */
$( document ).ready(function(){
	function get_new_orders(){
		var inps = $('.dy_page#new_orders .filters input');
		sql = 'SELECT purchases.*, designs.name as dsn, designs.price as dsp, products.name as prn, products.price as prp from purchases, designs, products where ';
		for (var i = inps.length - 1; i >= 0; i--) {
			if($(inps[i]).val().trim() !== '')
				sql += $(inps[i]).attr('cul') + ' LIKE "' + $(inps[i]).val() + '" and ';
		};
		sql += ' products.product_id = purchases.prod_id and designs.id = purchases.dsn_id and purchases.status = 0 and purchases.id > ' + ld_stats.new_ord + ' order by purchases.user_id;';
	  	
        
        sql_call_back = function(data) {
			if(ld_stats.new_ord == 0)
				$('.dy_page#new_orders .row#order_list').html('');
			for (var i = data.length - 1; i >= 0; i--) {
				output = '<div class="col l4 m6 s12" id="item_' + data[i].id + '"><div class="col s12">'
				output += '<div class="col s12"><b>Product: </b> '+ data[i].prn +' </div>';
				output += '<div class="col s12 center" style="background-color: ' + data[i].prod_cl + ';"><sub style="background-color: #fff;"> Product color: ' + data[i].prod_cl + ' </sub></div>';
				output += '<div class="col s12"><b>Design: </b>' + data[i].dsn + '</div>';
				output += '<div class="col s12 center" style="background-color: ' + data[i].dsn_cl + ';"><sub style="background-color: #fff;"> Design color: ' + data[i].dsn_cl + ' </sub></div>';
				output += '<div class="col s12"><b>Gender: </b>' + data[i].prod_gen + '</div>';
				output += '<div class="col s12"><b>Size: </b> ' + data[i].size + '</div>';
				output += '<div class="col s12" onclick="view_u_det('+ data[i].user_id +')"><a class="waves-effect waves-green col s12 btn white btn-flat"><b>User ID: </b> ' + data[i].user_id + ', View More</a></div>';
				output += '<div class="col s12"><a class="left btn-flat white btn" onclick="chg_ord_st(' + data[i].id+', 4, this);"><i class="red-text mdi-action-delete left"></i>Cancel</a> <a class="right btn-flat white btn" onclick="chg_ord_st(' + data[i].id+', 1, this);"><i class="green-text mdi-action-delete left"></i>Approve</a></div>';
				output += '</div></div>'
				$('.dy_page#new_orders .row#order_list').append(output);
			};
			if(data.length > 0)
				ld_stats.new_ord = data[data.length - 1].id;
		}
		get_sql(sql);
	}
	get_np = get_new_orders;

	function track_purchase_prod(){
		var inps = $('.dy_page#prod_tracking .filters input');
		sql = 'SELECT purchases.*, designs.name as dsn, designs.price as dsp, products.name as prn, products.price as prp from purchases, designs, products where ';
		for (var i = inps.length - 1; i >= 0; i--) {
			if($(inps[i]).val().trim() !== '')
				if($(inps[i]).val().trim() !== '')
					sql += $(inps[i]).attr('cul') + ' LIKE "' + $(inps[i]).val() + '" and ';
		};
		sql += ' products.product_id = purchases.prod_id and designs.id = purchases.dsn_id and purchases.status = 1 and purchases.id > ' + ld_stats.prod_ord + ' order by purchases.user_id;';

		sql_call_back = function(data) {
			if(ld_stats.prod_ord == 0)
				$('.dy_page#prod_tracking .row#order_list').html('');
			for (var i = data.length - 1; i >= 0; i--) {
				output = '<div class="col l4 m6 s12" id="item_' + data[i].id + '"><div class="col s12">'
				output += '<div class="col s12"><b>Product: </b> '+ data[i].prn +' </div>';
				output += '<div class="col s12 center" style="background-color: ' + data[i].prod_cl + ';"><sub style="background-color: #fff;"> Product color: ' + data[i].prod_cl + ' </sub></div>';
				output += '<div class="col s12"><b>Design: </b>' + data[i].dsn + '</div>';
				output += '<div class="col s12 center" style="background-color: ' + data[i].dsn_cl + ';"><sub style="background-color: #fff;"> Design color: ' + data[i].dsn_cl + ' </sub></div>';
				output += '<div class="col s12"><b>Gender: </b>' + data[i].prod_gen + '</div>';
				output += '<div class="col s12"><b>Size: </b> ' + data[i].size + '</div>';
				output += '<div class="col s12" onclick="view_u_det('+ data[i].user_id +')"><a class="waves-effect waves-green col s12 btn white btn-flat"><b>User ID: </b> ' + data[i].user_id + ', View More</a></div>';
				output += '<div class="col s12"><a class="left btn-flat white btn" onclick="chg_ord_st(' + data[i].id+', 4, this);"><i class="red-text mdi-action-delete left"></i>Cancel</a> <a class="right btn-flat white btn" onclick="chg_ord_st(' + data[i].id+', 2, this);"><i class="green-text mdi-action-delete left"></i>Production Done</a></div>';
				output += '</div></div>'
				$('.dy_page#prod_tracking .row#order_list').append(output);
			};
			if(data.length > 0)
				ld_stats.prod_ord = data[data.length - 1].id;
		}
		get_sql(sql);
	}
	track_or = track_purchase_prod;

	function track_purchase_enrout(){
		var inps = $('.dy_page#enroute_tracking .filters input');
		sql = 'SELECT purchases.*, designs.name as dsn, designs.price as dsp, products.name as prn, products.price as prp from purchases, designs, products, users where ';
		for (var i = inps.length - 1; i >= 0; i--) {
			if($(inps[i]).val().trim() !== '')
				if($(inps[i]).val().trim() !== '')
					sql += $(inps[i]).attr('cul') + ' LIKE "' + $(inps[i]).val() + '" and ';
		};
		sql += ' products.product_id = purchases.prod_id and designs.id = purchases.dsn_id and purchases.status = 1 and users.user_id = purchases.user_id and purchases.id > ' + ld_stats.track_en + ' order by purchases.user_id;';

		sql_call_back = function(data) {
			if(ld_stats.track_en == 0)
				$('.dy_page#enroute_tracking .row#order_list').html('');
			for (var i = data.length - 1; i >= 0; i--) {
				output = '<div class="col l4 m6 s12" id="item_' + data[i].id + '"><div class="col s12">'
				output += '<div class="col s12"><b>Product: </b> '+ data[i].prn +' </div>';
				output += '<div class="col s12 center" style="background-color: ' + data[i].prod_cl + ';"><sub style="background-color: #fff;"> Product color: ' + data[i].prod_cl + ' </sub></div>';
				output += '<div class="col s12"><b>Design: </b>' + data[i].dsn + '</div>';
				output += '<div class="col s12 center" style="background-color: ' + data[i].dsn_cl + ';"><sub style="background-color: #fff;"> Design color: ' + data[i].dsn_cl + ' </sub></div>';
				output += '<div class="col s12"><b>Gender: </b>' + data[i].prod_gen + '</div>';
				output += '<div class="col s12"><b>Size: </b> ' + data[i].size + '</div>';
				output += '<div class="col s12" onclick="view_u_det('+ data[i].user_id +')"><a class="waves-effect waves-green col s12 btn white btn-flat"><b>User ID: </b> ' + data[i].user_id + ', View More</a></div>';
				output += '<div class="col s12"><a class="left btn-flat white btn" onclick="chg_ord_st(' + data[i].id+', 4, this);"><i class="red-text mdi-action-delete left"></i>Cancel</a> <a class="right btn-flat white btn" onclick="chg_ord_st(' + data[i].id+', 3, this);"><i class="green-text mdi-action-delete left"></i>Production Done</a></div>';
				output += '</div></div>'
				$('.dy_page#enroute_tracking .row#order_list').append(output);
			};
			if(data.length > 0)
				ld_stats.track_en = data[data.length - 1].id;
		}
		get_sql(sql);
	}
	track_en = track_purchase_enrout;

	function get_deliveries(){
		sql = 'SELECT purchases.*, users.user_id as usid, users.address, designs.name as dsn, designs.price as dsp, products.name as prn, products.price as prp from purchases, users, designs, products where users.user_id = purchases.user_id and products.product_id = purchases.prod_id and designs.id = purchases.dsn_id and purchases.status = 3 order by purchases.user_id, purchases.date_added, purchases.quantity;';
		sql_call_back = function(data){
			var ouput = '';
			var tp = 0, p = 0;
			$('#deliveries  table>tbody').html('');
			for (var i = data.length - 1; i >= 0; i--) {
				p = parseInt((parseInt(data[i].prp) + parseInt(data[i].dsp)) * data[i].quantity);
				tp += p;
				ouput = '<tr id="item_' + data[i].id +'" >';
				ouput += '<td>' + data[i].usid+ '</td>';
				ouput += '<td>GH ' + p + '</td>';
				ouput += '<td>Gender: ' + data[i].prod_gen + ', Size: ' + data[i].size + ', Quantity: ' + data[i].quantity + '</td>';
				ouput += '<td style="background: ' + data[i].prod_cl + '">Product Name: ' + data[i].prn + '</td>'
				ouput += '<td style="background: ' + data[i].dsn_cl + '">Design Name: ' + data[i].dsn + '</td>';
				ouput += '</tr>';

				$('#deliveries table>tbody').append(ouput);
			};
			$('#deliveries #total_sales').html('Total Sales Volume: GH ' + tp);
			$('select').material_select();
		}
		get_sql(sql);
	}
	get_delv = get_deliveries;

	function change_order_st(id, val, el){
		sql = 'UPDATE purchases SET status = "' + val + '" WHERE id = "' + id + '";';
		sql_call_back = function () {
			Materialize.toast('Order status applied', 1000);
			$(el).closest('#item_' + id).fadeOut(1000, function() {
				$(el).closest('#item_' + id).remove();				
			});
		}
		ins_sql(sql);
	}
	chg_ord_st = change_order_st;
});
/* Messages */
$( document ).ready(function(){
	function get_feedback_msgs(){
		sql = 'SELECT * from msgs where id > ' + ld_stats.msgs + ' order by id limit 10;;';
		sql_call_back = function(data){
			var output = '';
			for (var i = data.length - 1; i >= 0; i--) {
				output = '<div class="col l3 m6 s12" id="item_' + data[i].id + '"><div class="col s12">'
				output += '<div class="col s12"><b>Name:</b> ' +data[i].name + '</div>';
				output += '<div class="col s12"><b>Email:</b> ' + data[i].email + '</div>';
				output += '<div class="col s12"><sup><b>Message</b></sup><p>' +data[i].msg+ '</p></div>';
				output += '<div class="col s12"><a class="right btn-flat white btn" onclick="delete_i(\'msgs\', ' + data[i].id + ', \'#user_messages>div.row>.col\')"><i class="red-text mdi-action-delete"></i></a></div>';
				output += '</div></div>'
				$('#user_messages>div.row').append(output);
			};
			if(data.length > 0)
			{
				ld_stats.msgs = data[data.length - 1].id;
				$('#user_messages #total_msg span').html( parseInt($('#user_messages #total_msg span').html()) + data.length);				
			}
		}
		get_sql(sql);
	}
	get_fb =  get_feedback_msgs;
});
/* Edit Blog */
$( document ).ready(function(){
	function update_sql(table, id, col, item){
		sql = 'UPDATE ' + table + ' SET ' + col + ' = "' + $(item).val() + '" WHERE id = "' + id + '";';
		sql_call_back = function() {
			Materialize.toast('Changes applied', 2000);
		}
		ins_sql(sql);
	}
	update_s = update_sql;
	function delete_item(table, id, place){
		sql = 'DELETE FROM ' + table + ' WHERE id = "' + id + '";';
		sql_call_back = function() {
			$(place + '#item_' + id).fadeOut(1000, function() {
				$(place + '#item_' + id).remove();				
			});
		}
		ins_sql(sql);
	}
	delete_i = delete_item;
});
/* Get Blog List */
$( document ).ready(function(){
	function get_blogs(){		
		var inps = $('.dy_page#view_blog .filters input');
		sql = 'SELECT * from blog where ';
		for (var i = inps.length - 1; i >= 0; i--) {
			if($(inps[i]).val().trim() !== '')
				sql += $(inps[i]).attr('cul') + ' LIKE "' + $(inps[i]).val() + '" and ';
		};
		sql += ' id > ' + ld_stats.blog + ' order by id asc limit 10';

		sql_call_back = function(data) {
			if(ld_stats.blog == 0)
				$('.dy_page#view_blog .row#blog_list').html('');
			for (var i = data.length - 1; i >= 0; i--) {
				output = '<div class="col l4 m6 s12" id="item_' + data[i].id + '"><div class="col s12">'
				output += '<div class="col s12"><b>Title:</b><input type="text" onchange="update_s(\'blog\', \'' +data[i].id + '\', \'title\', this)" value="' + data[i].title + '"></div>';
				output += '<div class="col s12"><b>Category:</b><input type="text" onchange="update_s(\'blog\', \'' +data[i].id + '\', \'cat\', this)" value="' + data[i].cat + '"></div>';
				output += '<div class="col s12"><sup><b>Post</b></sup><textarea onchange="update_s(\'blog\', \'' +data[i].id + '\', \'post\', this)" class="materialize-textarea">' + data[i].post + '</textarea></div>';
				if(data[i].media == ''){
					output += '<div class="col s12"><b>Media:</b> img/blog/' +data[i].id+ '.png</div>';
				}else{
					output += '<div class="col s12"><b>Media:</b> <input type="text" onchange="update_s(\'blog\', \'' +data[i].id + '\', \'media\', this)" value="' + data[i].media + '"></td>';
				}
				output += '<div class="col s12"><b>Date Added:</b> ' + data[i].date_added + '</div>';
				output += '<div class="col s12"><a class="right btn-flat white btn" onclick="delete_i(\'blog\', ' + data[i].id + ', \'.dy_page#view_blog .row#blog_list>.col\')"><i class="red-text mdi-action-delete"></i></a></div>';
				output += '</div></div>'
				$('.dy_page#view_blog .row#blog_list').append(output);
			};
			if(data.length > 0)
				ld_stats.blog = data[data.length - 1].id;
		}
		get_sql(sql);
	}
	get_b = get_blogs;
});
/* Publish Blog */
$( document ).ready(function(){
	media_img = '';
	function readImage(input) {
	    if(input.files && input.files[0] && input.files[0].type.match('image.*')) {
	        media_img = input.files[0];
	    }else{
	    	Materialize.toast('Pleae Upload an image file type', 2000);
	    }
	}
	get_i_base = readImage;

	function validate_blog_entry(){
		var ele = $('#add_blog input:not(#file_up, .file_up, #yout), #add_blog textarea, #add_blog select');
		for(var i = ele.length - 1; i >= 0; i--) {
			if($(ele[i]).val().trim() == ''){
				Materialize.toast($(ele[i]).attr('err-msg'), 2000);
				$(ele[i]).focus();
				return false;
			}
		};
		if(media_img == '' && $('#add_blog input#yout').val().trim() == ''){
			Materialize.toast('Please Upload a media file to accompany post');
			return false;
		}else{
			if(media_img != ''){
				sql = 'INSERT INTO blog (cat, title, post, media) VALUES ("' + $('#add_blog select#post_ty').val() + '", "' + $('#add_blog input#title').val() + '", "' + $('#add_blog textarea#post').val()+ '", "");';
			}else{
				sql = 'INSERT INTO blog (cat, title, post, media) VALUES ("' + $('#add_blog select#post_ty').val() + '", "' + $('#add_blog input#title').val() + '", "' + $('#add_blog textarea#post').val()+ '", "' + $('#add_blog input#yout').val().trim() + '");';
			}
			sql_call_back = function(data){
				if(media_img != ''){
					var formData = new FormData();
					formData.append('id', data);
					formData.append('dir', '../img/blog/');
					formData.append('file', media_img);
					sql_call_back = function(re){
						if(re == 1){
							Materialize.toast('File upload successfull', 1000);
						}else{
							Materialize.toast('File error', 1000);
						}
					}
					s_upload(formData);
				}
				Materialize.toast('Blog Uploaded successfully', 2000);
			}
			ins_sql(sql);
		}
	}
	val_blog = validate_blog_entry;
});
/* Sign in */
$( document ).ready(function(){
	open_this('log_in');

	function validate_log_in_data(){
		var email = $('#log_in input#email').val().trim();
		var pp = $('#log_in input#pword').val().trim();

		if(!val_email.test(email)){
			Materialize.toast('Please Enter a valid email address', 2000);
			return false;
		}
		if($('#log_in input#pword').val().length != 8){
			Materialize.toast('Please Enter a valid password', 2000);
			$('#log_in input#pword').focus();
			return false;
		}
		$('#preloader').removeClass('hide');
		que++;

		$.ajax({
			type: "POST",
			url: "api/log_in_user.php",
			data: {email: email, pword: pp},
			success: function(res){
				if(res !== '' && res.type == 1){
					user_data = res;
					get_counts();
					open_this('dash_board');
				}else{
					Materialize.toast('Invalid Login Credentials', 2000);
				}
				que--;
				if(que < 1){
		    		que = 0;
		    		$('#preloader').addClass('hide');
		    		$('#preloader p').html('Please Wait<br>Communicating with server<br>');
		    	}else{
		    		$('#preloader p').append('.');
		    	}
			},
			error: function(){
				Materialize.toast('Oops Error logging in', 2000);
				que--;
				if(que < 1){
		    		que = 0;
		    		$('#preloader').addClass('hide');
		    		$('#preloader p').html('Please Wait<br>Communicating with server<br>');
		    	}else{
		    		$('#preloader p').append('.');
		    	}
			}
		});
	}
	validate_log_in = validate_log_in_data;

	function get_dashcounts(){
		sql = 'SELECT COUNT(id) as cnt from blog; SELECT COUNT(id) as cnt from purchases where status = 0; SELECT COUNT(id) as cnt from purchases where status = 1; SELECT COUNT(id) as cnt from purchases where status = 2; SELECT COUNT(id) as cnt from purchases where status = 3; SELECT COUNT(id) as cnt from msgs;';
		sql_call_back = function(data) {
			var itm = $('#dash_board>.row>div.dash_opt>.count>span');
			for (var i = data.length - 1; i >= 0; i--) {
				$(itm[i]).html(data[i].cnt);
			};
			/*alert($('#dash_board>.row>div:nth-child(' + data[0].plc + ')>.count>span').html());
			*/
		}
		get_sql(sql);
		
	}
	get_counts = get_dashcounts;
});