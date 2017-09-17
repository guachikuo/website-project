$(document).ready(function(){
	/*抓資料*/
	function getApi(call_back){
		var api = "https://api.twitch.tv/kraken/streams/";
		var game = "League%20of%20Legends" ;
		const client_id = "6515p95jb9xihs3dg4w1d05ck6vy8n";
		var limit = 20;
		var apiURL = api + "?game=" + game + "&client_id=" + client_id + "&limit=" + limit; 
		$.ajax({
			method: "GET",
			url: apiURL,
	  		success: function(data) {
	  			call_back(null,data);
	  		},
	  		error: function(err){
				call_back(err,null);
	  		}
		});
	}

	/*做處理*/
	getApi(function(err,data){
		if(err)
			console.log(err);
		else{
			for(i=0;i<data.streams.length;i++){
		    	$('.row').append(getBroadcast(data));
		    }
		    $('.row').append('<div class="broadcast"></div>');
		}
	});

	/*append到html*/
	function getBroadcast(data){
		const link = data.streams[i].channel.url;
  		const preview = data.streams[i].preview.medium;
  		const logo = data.streams[i].channel.logo;
  		const channel_name = data.streams[i].channel.status;
  		const display_name = data.streams[i].channel.display_name;
		return '<div class="broadcast">' +
    					'<a href="' + link + '" target="_blank">' +
							'<div class="channel">' +
								'<img src="' + preview +'"/>' +
							'</div>' +
							'<div class="twitcher">' +
								'<div class="pic_box">' +
									'<img src="' + logo + '"/>' +
								'</div>' +
								'<div class="info">' +
									'<div class="twitch_channel">' + channel_name + '</div>' +
									'<div class="twitcher_name">' + display_name + '</div>' +
								'</div>' +
							'</div>' +
						'</a>' +
					'</div>';
	}
});