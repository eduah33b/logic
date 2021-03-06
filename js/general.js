var user_data = '', sql_call_back, sql;
var val_email = /\S+@\S+\.\S+/;
var que = 0;
var going_here = {back: 'acc_profile', here: 'acc_profile'};
var ord_st = ['Your order is pending appoval', 'Your Design is in production', 'You design is enroute to you', 'Product has been delivered', 'Order canceled'];

$( document ).ready(function(){

	/* navigation */
		function go_to_this(id) {
			$('html, body').animate({ scrollTop: document.getElementById(id).offsetTop + 'px'}, 2000);
		}
		go_to = go_to_this;
		
		function open_and_go_to(id){
			if(id != going_here.here){
				$('.dy_page:not(#' + id + ')').fadeOut(0, function() {
					$('.dy_pages #'+ id).fadeIn(0, function() {
							$('html, body').animate({ scrollTop: '0px'}, 1);
						}
					);
				});
				going_here.back = going_here.here;
				going_here.here = id;
			}
		}
		open_this = open_and_go_to;		

	/* Gen Ajax*/
		function ins_sq_data(sql) {			
	    	$.ajax({
			    type: "POST",
			    url: "api/ins_sql.php",
			    data: {sql: sql},
			    success: function(id){
			    	sql_call_back(id);			    	
			    },
			    error: function(){
			    	Materialize.toast('): Oops!! Error Adding Data To DB', 5000);

			    }
			});
	    }
	    ins_sql = ins_sq_data;
	    function get_sq_data(sql){
	    	$('#preloader').removeClass('hide');
			que++;
	    	$.ajax({
			    type: "POST",
			    url: "api/get_sql.php",
			    data: {sql: sql},
			    success: function(res){
			    	sql_call_back(res);
			    	que--;
			    	if(que < 1){
			    		que = 0;
			    		$('#preloader').addClass('hide');
			    		$('#preloader p').html('Loading ...<br>');
			    	}else{
			    		$('#preloader p').append('.');
			    	}			    				    	
			    },
			    error: function(){
			    	Materialize.toast('): Oops!! Error retriving data', 5000);
			    	que--;
			    	if(que < 1){
			    		que = 0;
			    		$('#preloader').addClass('hide');
			    		$('#preloader p').html('Loading ...<br>');
			    	}else{
			    		$('#preloader p').append('.');
			    	}
			    }
			});
	    }
	    get_sql = get_sq_data;

	    function send_upload(formdata) {
	    	$.ajax({
		        url : 'api/img_upload.php',
		       	type : 'POST',
		       	data : formdata,
		       	processData: false,  // tell jQuery not to process the data
		       	contentType: false,  // tell jQuery not to set contentType
		        success: function(data, textStatus, jqXHR)
		        {
		            sql_call_back(data);
		        },
		        error: function(jqXHR, textStatus, errorThrown)
		        {
		            Materialize.toast('Error uploading file', 2000)
		        }
		    });
	    }
	    s_upload = send_upload;

	/* String conversions */
		String.prototype.toProperCase = function () {
		    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		};
});