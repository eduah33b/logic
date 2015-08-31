$( document ).ready(function(){
	/* navigation */
		function go_to_this(id) {
			$('html, body').animate({ scrollTop: document.getElementById(id).offsetTop + 'px'}, 200);
		}
		go_to = go_to_this;
		
		function open_and_go_to(id){
			$('.dy_page:not(#' + id + ')').fadeOut(0, function() {
				$('.dy_pages #'+ id).fadeIn(0, function() {
						$('html, body').animate({ scrollTop: '0px'}, 1);
					}
				);
			});
			going_here.back = going_here.here;
			going_here.here = id;
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
			    	alert('): Oops!! Error Adding Data To DB');
			    }
			});
	    }
	    ins_sql = ins_sq_data;
	    function get_sq_data(sql){
	    	$.ajax({
			    type: "POST",
			    url: "api/get_sql.php",
			    data: {sql: sql},
			    success: function(res){
			    	sql_call_back(res);
			    },
			    error: function(){
			    	alert('): Oops!! Error retriving data');
			    }
			});
	    }
	    get_sql = get_sq_data;
});