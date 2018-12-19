// @codekit-prepend '../vendor/smooth-scroll.polyfills.min.js'
// @codekit-prepend '../vendor/modals.min.js'
// @codekit-prepend '../vendor/aos.min.js'
// @codekit-prepend '../vendor/dripping-paint.js'

jQuery(function($) {

	var ss = new SmoothScroll('[data-scroll]');

	modals.init({ backspaceClose: false });

	AOS.init();

	// if ($('#wpsl-wrap').length) {
	// 	var $originalBtn = $('#wpsl-search-btn');
	// 	$originalBtn.after('<button type="submit" id="wpsl-search-btn" class="btn btn-blue"><span class="btn-inner">Search</span></button>');
	// 	$originalBtn.remove();

	// 	setTimeout(function() {
	// 		$('.wpsl-dropdown select').on('change', function() {
	// 			var $this = $(this);
	// 			var $dropdown = $this.closest('.wpsl-dropdown');
	// 			var $item = $dropdown.find('.wpsl-selected-item');
	// 			var optionValue = $this.find('option:selected').val();

	// 			$dropdown.find('li').removeClass('wpsl-selected-dropdown')
	// 			$dropdown.find('li[data-value="' + optionValue + '"]').addClass('wpsl-selected-dropdown');

	// 			$item.attr('data-value', optionValue);
	// 		});
	// 	}, 500);
	// }

	$('.folder:not(#folder-last):not(.nested)').on('click', function() {
		console.log('first click');
		var $this = $(this).closest('.folder:not(.nested)');
		var $open = $('.folder.-open:not(.nested)');

		if ($this[0] != $open[0]) {
			$open.removeClass('-open');
			$this.addClass('-open');

			setTimeout(function() {
				ss.animateScroll($this.offset().top - 20);
			}, 200);
		}
	});

	$('.folder.nested:not(#folder-last)').on('click', function() {
		console.log('second click');
		var $this = $(this).closest('.folder.nested');
		var $open = $('.folder.nested.-open');

		if ($this[0] != $open[0]) {
			$open.removeClass('-open');
			$this.addClass('-open');

			setTimeout(function() {
				ss.animateScroll($this.offset().top - 20);
			}, 200);
		}
	});

	Drip.init($('.slime-drip')[0]);

	setTimeout(function() {
		$('.folder').each(function() {
			console.log('second click');
			console.log($(this).offset().top);
		});
	}, 2000);

});
