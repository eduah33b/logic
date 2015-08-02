$( document ).ready(function(){
	$('.button-collapse').sideNav({
	      	menuWidth: 300, // Default is 240
	      	edge: 'left', // Choose the horizontal origin
		  	closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	    }
	);
      
    $('.slider#home').slider({full_width: true, interval: 600000});
    $('.slider#comments').slider({full_width: true, indicators: false});

	$('.draggable.dropdown-button').dropdown({
		    inDuration: 1000,
		    outDuration: 4000,
		    constrain_width: true, // Does not change width of dropdown to that of the activator
		    hover: true, // Activate on hover
		    gutter: 0, // Spacing from edge
		    belowOrigin: true // Displays dropdown below the button
	    }
	);

    function go_to_this(id) {
		$('html, body').animate({ scrollTop: document.getElementById(id).offsetTop + 'px'}, 400);
	}
	go_to = go_to_this;        

	$( ".draggable" ).draggable({
		scroll: false,
		containment: "parent"
	});
});