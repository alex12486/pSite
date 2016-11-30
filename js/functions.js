(function ($){

	var $designImgs = $('.design-img-link');
	var $hrefLinks = $('a[href^="#"]');
	var $articlesThumbs = $('.article-thumb');
	var $face = $('.face');
	var $body = $('html, body');
	var $articles = $('section.articles');
	var $faces = $('.faces');
	var $footer = $("footer a");
	var $defaultFace = $('.face:nth-child(3)');
	var $mobileNav = $('.mobile-nav');
	var $mobileBtn = $('.mobile-nav-toggle');
	var wScroll;

	var settings = {

		windowWidth : 640,
		bubbleTimeout : 300,
		smoothDuration : 1000,
		articleInterval : 4000,
		thumbsFadeIn : 200,
		footerTextMin : '20px',
		footerTextMax : '60px'

	};

	function userSelections() {

		$('img').attr({
			"ondrag":"return false",
			"ondragdrop":"return false",
			"ondragstart":"return false"
		});

	};

	function mentoringBubble() {

		$face.on('click', function(){

			var $this = $(this);
			var faceVerticalPosition = $this.position().top;
			var bubbleVertical = -(faceVerticalPosition - 230);
			var faceHorizontalPosition = $this.position().left;
			var width = $(window).width() / 2 - 40;
			var bubbleHorizontal = width - faceHorizontalPosition;

			if ($(window).width() > settings.windowWidth) {

				$this.parent().css('top', ''+ bubbleVertical +'px');

				setTimeout(function(){
					$this.addClass('bubble-opened').siblings().removeClass('bubble-opened');
				}, settings.bubbleTimeout);

			} else {

				$this.parent().css('left', ''+ bubbleHorizontal +'px');

				setTimeout(function(){
					$this.addClass('bubble-opened').siblings().removeClass('bubble-opened');
				}, settings.bubbleTimeout);

			}

		});

		if( $('.bubble-opened').length == 0 ){

			$defaultFace.trigger('click');

		}

	};

	function mobileNav() {

		$('.mobile-nav-toggle').on('click', function() {
			$mobileNav.toggleClass('is-open');
			$mobileBtn.toggleClass('is-open');

		});
		
	};

	function articleTada(){

		var randNum = Math.floor(Math.random() * $('.article-thumb').length) + 1;
		$articlesThumbs.eq(randNum).addClass('animated-article').siblings().removeClass('animated-article');

	};

	function designHover(){

		$designImgs.hover(function(){
			$(this).parent().parent().parent().css('background-color', $(this).data('color'));
		}, function() {
			$(this).parent().parent().parent().css('background-color', $(this).parent().data('origin-color'));
		});

	};

	function smoothScroll(){

		$hrefLinks.on('click', function(e) {
			var $this = $(this),
			href = $this.attr('href'),
			$target = $(href);

			$mobileNav.removeClass('is-open');
			$mobileBtn.removeClass('is-open');

			if ($target.length == 0)
				return;

			e.preventDefault();

			$body.animate({
				scrollTop: $target.offset().top
			}, settings.smoothDuration);
		});

	};

	function articleStart(wScroll){

		if($articles.offset().top - $(window).width()/2 < wScroll){
			$articlesThumbs.each(function(i){
				setTimeout(function(){
					$articlesThumbs.eq(i).addClass('is-visible')
				}, settings.thumbsFadeIn * i);
			});
		}

	};


	function resizeFaces(){

		$defaultFace.trigger('click');

		if ( $(window).width() < settings.windowWidth ) {
			$faces.css('top', '230px');
		} else {
			$faces.css('left', '0px');
		} 

	};

	$.fn.fitText = function( kompressor, options ) {

		var compressor = kompressor || 1,
		settings = $.extend({
			'minFontSize' : Number.NEGATIVE_INFINITY,
			'maxFontSize' : Number.POSITIVE_INFINITY
		}, options);

		return this.each(function(){

			var $this = $(this);

			var resizer = function () {
				$this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
			};

			resizer();

			$(window).on('resize.fittext orientationchange.fittext', resizer);

		});

	};

	$(document).ready(function() {

		userSelections();
		mobileNav();
		smoothScroll();
		mentoringBubble();
		designHover();
		setInterval(function(){articleTada()}, settings.articleInterval);

	});

	$(window).scroll(function(){

		wScroll = $(window).scrollTop();

		articleStart(wScroll);

	});

	$(window).resize(function(){

		$footer.fitText(1, { minFontSize: settings.footerTextMin, maxFontSize: settings.footerTextMax });
		resizeFaces();

	});

})(jQuery);

