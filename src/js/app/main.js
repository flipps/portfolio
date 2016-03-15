(function() {

	$('nav').on('click', function(event){
		event.preventDefault();
		var target = event.target.id;

		if(target === 'about') {
			$('.jobs-container').fadeOut(function(){
				console.log('Jobs-container faded Out');
			});
		}
	})
})();