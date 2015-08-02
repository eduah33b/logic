$( document ).ready(function(){

	$('.dsn_opt .color_pal>div').click(function(){
		$('.shirt_canv .draggable:visible svg path').css('fill', $(this).css('background-color'));
		$('.shirt_canv .draggable:visible svg path').css('stroke', $(this).css('background-color'));
	});

	function place_this(dsn) {
		$('.shirt_canv .draggable:visible').html($(dsn).html());
		$('.shirt_canv .draggable:visible svg').css('width', '128px');
		$('.shirt_canv .draggable:visible svg').css('height','96px');
	}
	place = place_this;

	function remove_design() {
		$('.shirt_canv .draggable:visible').html('');
	}
	rm_desn = remove_design;

	$('.alt_list.shirt_l>div>img').click(function(){
		if($('.sh_col img:nth-child(1)').attr('src') == $(this).attr('src'))
			 Materialize.toast('Shirt Currently displayed', 2000);
		else
	    	$('.sh_col img:nth-child(1)').attr('src', $(this).attr('src'));
	    	$('.sh_col img:nth-child(2)').attr('src', $(this).attr('src').replace('.jpg', '.png'));
	});

	$('.shirt_opt_pane .color_pal>div').click(function(){
		$('.main_sh_pane .sh_col img:nth-child(2)').css('background-color', $(this).css('background-color').replace(')', ', 0.55)'));
	});	
});