(function($){

	$.fn.dropList = function(options){

		var element = this;

		var defaults = {
			style: "white",
			width: 200,
			speed: 500,
			target: "self"
		};

		var options = $.extend(defaults, options);

		var supportedStyles = ["white", "blue", "green", "magenta", "orange", "black"];

		for(var i = 0; i < supportedStyles.length; i++)
		{
			if(options.style == supportedStyles[i]){
				var style = options.style;
				break;
			}
			else{
				var style = "white";
			}
		}

		var layout = $('<div class="dropList-layout '+style+'"></div>').css({width: options.width});

		var title = element.attr("title");
		element.attr("title","");

		var box = $('<div class="dropList-box"></div>').html(title);

		element.css({width: options.width});

		layout.insertAfter(element);
		layout.prepend(box).append(element);


		element.find("a").each(function(){

			if(options.target == "blank"){
				$(this).attr("target", "_blank");
			}

			else if(options.target == "self" || options.target != "blank"){
				$(this).attr("target", "_self");
			}

		});


		element.find("a[href=#]").each(function(){

			var bullet = $('<div class="dropList-bullet"></div>');
			$(this).append(bullet);

		});


	
		var mouseInElement = false;

		element.hover(
			function(){mouseInElement = true;},
			function(){mouseInElement = false;}
		);

		$(document).mouseup(function(){
			if(!mouseInElement){
				slidingEffect("hide");
			}
		});


		element.find("a").click(function(e){

			if(element.is(":animated") || element.find("ul").is(":animated")){return false;}

			if($(this).attr("href") == "#"){
				e.preventDefault();

				var ul = $(this).next();

				if((ul.is("ul") && ul.is(":visible"))){
					ul.slideUp(options.speed);
					return false;
				}
				else if((ul.is("ul") && !ul.is(":visible"))){
					element.find("ul").filter(":visible").slideUp(options.speed);
					ul.slideDown(options.speed);
					return false;
				}

			}

		});


		element.find("ul li a").hover(
			function(){$(this).animate({paddingLeft:30}, {queue:false});},
			function(){$(this).animate({paddingLeft:10}, {queue:false});}
		);


		if ($.browser.msie  && parseInt($.browser.version) == 8){

			var fixEl = element.find("li a[href=#]").next("ul");

			fixEl.find("li:first").find("a").css({borderTop:"1px solid #ddd"});
			fixEl.find("li:last").find("a").css({borderBottom:"0 none"});

		}


	}

})(jQuery);
