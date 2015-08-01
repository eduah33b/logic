$( document ).ready(function(){
	function change_desn_color_to(th){
		$('.shirt_canv .draggable:visible svg path').css('fill', $(th).css('background-color'));
		$('.shirt_canv .draggable:visible svg path').css('stroke', $(th).css('background-color'));
	}
	chang_d_to = change_desn_color_to;


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
		/*if($(this).html() == $('.sh_col').html())
			 Materialize.toast('Shirt Currently displayed', 2000);
		else*/
	    	$('.sh_col img:nth-child(1)').attr('src', $(this).attr('src'));
	    	$('.sh_col img:nth-child(2)').attr('src', $(this).attr('src').replace('.jpg', '.png'));
	});

	$('.shirt_opt_pane .color_pal>div').click(function(){
		$('.main_sh_pane .sh_col img:nth-child(2)').css('background-color', $(this).css('background-color').replace(')', ', 0.55)'));
	});	
});