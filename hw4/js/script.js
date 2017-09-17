$(document).ready(function(){
	var api = "https://api.twitch.tv/kraken/streams/";
	var game = "League%20of%20Legends" ;
	var client_id = "6515p95jb9xihs3dg4w1d05ck6vy8n";
	var limit = 20;
	var apiURL = api + "?game=" + game + "&client_id=" + client_id + "&limit=" + limit; 
	$.ajax({
		method: "GET",
		url: apiURL,
  		success: function(data) {
  			for(i=0;i<limit;i++){
  				var link = data.streams[i].channel.url;
  				var preview = data.streams[i].preview.medium;
  				var logo = data.streams[i].channel.logo;
  				var channel_name = data.streams[i].channel.status;
  				var display_name = data.streams[i].channel.display_name;
    			$('.row').append(
    				'<div class="broadcast">' +
    					'<a href="' + link + '" target="_blank">' +
							'<div class="channel">' +
								'<img src="' + preview +'">' +
							'</div>' +
							'<div class="twitcher">' +
								'<div class="pic_box">' +
									'<img src="' + logo + '">' +
								'</div>' +
								'<div class="info">' +
									'<div class="twitch_channel">' + channel_name + '</div>' +
									'<div class="twitcher_name">' + display_name + '</div>' +
								'</div>' +
							'</div>' +
						'</a>' +
					'</div>'	
    			);
    		}
    		$('.row').append('<div class="broadcast"></div>');
  		}
	});
});