let index = 0
let isLoading = false;
let default_lang = '';

/*抓資料*/
function getApi(language,call_back,){
	const api = "https://api.twitch.tv/kraken/streams/";
	const game = "League%20of%20Legends" ;
	const client_id = "6515p95jb9xihs3dg4w1d05ck6vy8n";
	const limit = 9;
	const lang = language;
	const apiURL = api + "?game=" + game + "&client_id=" + client_id + "&limit=" + limit + "&offset=" + index + "&language=" + language; 
	isLoading = true;
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
function getdata(language){
	getApi(language,function(err,data){
		if(err)
			console.log(err);
		else{
			for(i=0;i<data.streams.length;i++){
			    $('.row').append(getBroadcast(data));
			}
		}
		index+=9;
		isLoading = false;
	});
}


/*append到html*/
function getBroadcast(data){
	var link = data.streams[i].channel.url;
  	var preview = data.streams[i].preview.medium;
  	var logo = data.streams[i].channel.logo;
  	var channel_name = data.streams[i].channel.status;
  	var display_name = data.streams[i].channel.display_name;
	return '<div class="broadcast">' +
    			'<a href="' + link + '" target="_blank">' +
					'<div class="channel">' +
						'<img src="' + preview + '" onload="this.style.opacity=1" />' +
					'</div>' +
					'<div class="twitcher">' +
						'<div class="pic_box">' +
							'<img src="' + logo + '" onload="this.style.opacity=1"/>' +
						'</div>' +
						'<div class="info">' +
							'<div class="twitch_channel">' + channel_name + '</div>' +
							'<div class="twitcher_name">' + display_name + '</div>' +
						'</div>' +
					'</div>' +
				'</a>' +
			'</div>';
}

function changelang(language)
{
	if(language==='')
		$('.head_text').text("全部的Twitch頻道")
	else
		$('.head_text').text(window.I18N[language].TITLE);
	default_lang = language;
	$('.broadcast').remove();
	index=0
	getdata(default_lang);
}

/*infinite scroll*/
$(function(){
	getdata(default_lang);
	$(window).scroll(function() {
   		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       		if(!isLoading){
       			getdata(default_lang);
       		}
   		}
   	});
});