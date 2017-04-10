var audio;
var repeat = false;
var shuffle = false;
var skip = 0;

//Hide Pause Button
$('#pause').hide();

//Initialize Audio
initAudio($('#playlist li:first-child'));

//Initializer Function
function initAudio(element){
	var song = element.attr('song');
	var title = element.attr('song-name');
	var cover = element.attr('cover');
	var artist = element.attr('artist');

	//Create Audio Object
	audio = new Audio('media/' + song);

	if (!audio.currentTime){
		$('#duration').html('0:00');
	}

	$('#player-body .title').text(title);
	$('#player-body .artist').text(artist);

	//Cover
	$('img.cover').attr('src','images/covers/' + cover);

	$('#playlist li').removeClass('active');
	element.addClass('active');
}

//Play Button
$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
});

//Pause Button
$('#pause').click(function(){
	audio.pause();
	$('#pause').hide();
	$('#play').show();
});

//Forward Button
$('#forward').click(function (){
	audio.pause();
	var next = $('#playlist li.active').next();

	if (next.length == 0){
		next = $('#playlist li:first-child');
	}

	$('#play').hide();
	$('#pause').show();

	initAudio(next);
	audio.play();
	showDuration();
});

//Back Button
$('#previous').click(function(){
	audio.pause();
	var prev = $('#playlist li.active').prev();

	if (prev.length == 0){
		prev = $('#playlist li:last-child');
	}

	$('#play').hide();
	$('#pause').show();

	initAudio(prev);
	audio.play();
	showDuration();
});

//Repeat Button
$('#repeat').click(function(){
	if (repeat){
		repeat = false;
		$('#repeat').css('color','#FFF');
	} else{
		repeat = true;
		$('#repeat').css('color','#E3E3E3');
	}
});

//Shuffle Button
$('#shuffle').click(function(){
	if (shuffle){
		shuffle = false;
		$('#shuffle').css('color','#FFF');
		skip = 0;
	} else{
		shuffle = true;
		$('#shuffle').css('color','#E3E3E3');
		skip = Math.random()*8;
	}
});

//Duration
function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get time
		var sec = parseInt(audio.currentTime % 60);
		var min = parseInt((audio.currentTime) / 60) % 60;

		if (sec < 10){
				sec = '0' + sec;
		}
		$('#duration').html(min + ':' + sec);

		var val = 0;
		if (audio.currentTime > 0){
			val = Math.floor((100/audio.duration)*audio.currentTime);
		}
		$('#progress:after').css('width',val+'%');
		$('#player-knot').css('margin-left',val+'%');

		if (val >= 100){
			nextSong();
		}
	});	
}

//Function that is called when the current song is finished
function nextSong(){
	var next;
	if (!repeat){
		next = $('#playlist li.active').next();
	} else {
		next = $('#playlist li.active')
	}

	if (next.length == 0){
		next = $('#playlist li:first-child');
	}

	$('#play').hide();
	$('#pause').show();

	initAudio(next);
	audio.play();
	showDuration();
}