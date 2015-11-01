var state_data = {'last_look_item': 0};
$( document ).ready(function(){
	function get_look_book(limit){
		sql = 'SELECT * from lookbook where id > '+ state_data.last_look_item +' order by id asc limit '+ limit +' ;';
		sql_call_back = function (data){			
			for (var i = data.length - 1; i >= 0; i--) {
				$('#look_book .loobbook_imgs').append('<div class="col l4 m6 s12 "><img class="materialboxed" data-caption="' + data[i].name + '" src="img/lookBook/' + data[i].id + '.jpg"></div>')
			}
			$('.materialboxed').materialbox();
			
			console.log(1);
			if(limit > data.length){
				$('#look_book #view_more_but').html('No more items left');
				$('#look_book #view_more_but').attr('onclick', 'Materialize.toast("No more items to display", 1000)')
			}else{
				state_data.last_look_item = data[data.length - 1].id;
			}
			sql_call_back = null;			
		}
		get_sql(sql);
	}
	view_more_lookbook = get_look_book;
	function send_new_msg(){
		var val = $('#contact_us #name').val().trim();
		if(val.length < 2){
			$('#contact_us #name').removeClass('valid').addClass('invalid');
			Materialize.toast($('#contact_us #name').attr('er-msg'), 3000);
			$('#contact_us #name').focus();
			return false;
		}
		sql = 'INSERT INTO msgs (name, email, msg) VALUES ("' + val + '", "';

		val = $('#contact_us #email').val().trim();
		if(!val_email.test(val)){
			$('#contact_us #email').removeClass('valid').addClass('invalid');
			Materialize.toast($('#contact_us #email').attr('er-msg'), 3000);
			$('#contact_us #email').focus();
			return false;
		}
		sql += val + '", "';

		val = $('#contact_us #msg').val().trim();
		if(val.length < 2 || val.length > 140){
			$('#contact_us #msg').removeClass('valid').addClass('invalid');
			Materialize.toast($('#contact_us #msg').attr('er-msg'), 3000);
			$('#contact_us #msg').focus();
			return false;
		}
		sql += val + '");';
		sql_call_back = function (data){			
			Materialize.toast('Message sent', 2000)
		};
		ins_sql(sql);
	}
	send_msg = send_new_msg;
});
$( document ).ready(function(){
	$('.button-collapse').sideNav({
	      menuWidth: 240, // Default is 240
	      edge: 'left', // Choose the horizontal origin
	      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	    }
	);
	
	if (document.location.href.split('#').length > 1)
		go_to(document.location.href.split('#')[1].split("?")[0]);
});