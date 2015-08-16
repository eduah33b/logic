$( document ).ready(function(){
	$('.button-collapse').sideNav({
      	menuWidth: 70, // Default is 240
      	edge: 'left'
    });

	/* Shirt Manip*/
	$('#ep1 .col_pal>div').click(function(){ //change product color
		$('.canv_item img:nth-child(2)').css('background', $(this).css('background-color').replace(')', ', 0.55)').replace('rgb(','rgba('));
	});

	$('.play_bd .canv_item_list>div>img').click(function(){ //change product
		if($('.canv_item img:nth-child(2)').attr('src') == $(this).attr('src')){

			 Materialize.toast('Product Currently displayed', 2000);

		}else{

	    	$('.canv_item img:nth-child(2)').attr('src', $(this).attr('src'));
	    	$('.canv_item img:nth-child(1)').attr('src', $(this).attr('src').replace('.png', '.jpg'));

	    }
	});	
});