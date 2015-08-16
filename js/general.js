$( document ).ready(function(){
	$('.parallax').parallax();
	$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

        
/* navigation */
	function go_to_this(id) {
		$('html, body').animate({ scrollTop: document.getElementById(id).offsetTop + 'px'}, 1100);
	}
	go_to = go_to_this;

	function open_and_go_to(id){
		$('.dy_page:not(#' + id + ')').fadeOut(0, function() {
			$('.dy_pages #'+ id).fadeIn(
				function() {
					$('html, body').animate({ scrollTop: document.getElementById(id).offsetTop + 'px'}, 1100);
				}
			);
		});
		
	}
	open_this = open_and_go_to;
});