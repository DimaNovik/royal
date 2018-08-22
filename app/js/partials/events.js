jQuery(document).ready(function () {
	jQuery('.main_video .overlay').click(function () {
		if (player) {
			jQuery(this).hide();
			player.playVideo();
		}
	});

	jQuery('.seo_text_toggle').click(function (e) {
		e.preventDefault();

		var seoText = jQuery('.seo_text');
		if (seoText.hasClass('open')) {
			seoText.removeClass('open').outerHeight(250);
		} else {
			var seoHeight = 0;
			seoText.children().each(function () {
				seoHeight += jQuery(this).outerHeight(true);
			});
			seoText.addClass('open').height(seoHeight);

		}

	});

	jQuery('.to_top').click(function () {
		jQuery("html, body").stop().animate({
			scrollTop: 0
		}, 500);
	});

	jQuery('.inspiration_nav_link').mouseenter(function (e) {
		jQuery(this).addClass('hover').siblings().addClass('no_hover');
	});
	jQuery('.inspiration_nav_link').mouseleave(function (e) {
		jQuery(this).removeClass('hover').siblings().removeClass('no_hover');
	});
	jQuery('.inspiration_nav_link').click(function (e) {
		e.preventDefault();
		jQuery(this).addClass('active').siblings().removeClass('active');
	});

	jQuery('.header_menu a').mouseenter(function (e) {
		jQuery(this).addClass('hover').parent().siblings().children().addClass('no_hover');
	});
	jQuery('.header_menu a').mouseleave(function (e) {
		jQuery(this).removeClass('hover').parent().siblings().children().removeClass('no_hover');
	});

	if (jQuery('#map').length)
		initMap();
}) //END ready