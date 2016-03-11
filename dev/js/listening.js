function Listening(phoneNo, startDate, endDate, musicUrl, questionContent,
		questionOption,hotRecomm) {
	this.phoneNo = phoneNo;
	this.startDate = startDate;
	this.endDate = endDate;
	this.musicUrl = musicUrl;
	this.questionContent = questionContent;
	this.questionOption = questionOption;
	this.hotRecomm = hotRecomm;
}

Listening.prototype={
		/**加载数据生成HTML*/
		loadData:function(){
			audio = document.getElementById("myAudio");
			//歌曲结束时 自动再次播放
//	        audio.addEventListener('ended',function(){
//	        	audio.play();
//	        },false);
			//获取答题内容及歌曲
			audio.src = this.musicUrl;
			var questionOption = [];//问题选项
			if(this.questionOption){
				questionOption = this.questionOption.split(",");
				var optionHTML = "";
				for(var i = 0; i< questionOption.length; i++) {
					if(i==2) optionHTML += '<br>';
					optionHTML += '<div class="items">';
					optionHTML += '<input type="radio"  name="answer" id="answer'+(i+1)+'" value="'+questionOption[i]+'">'
					optionHTML += '<label for="answer'+(i+1)+'"><span class="radiolabel"></span> '+questionOption[i]+'</label>';
					optionHTML += '</div>';
				}
				//问题内容
				$(".music_h").html(this.questionContent+"先听听再答！");
				//问题选项
				$(".dati_box").html(optionHTML);
			}
			var hotRecomm = "";//热门推荐
			if(this.hotRecomm){
				hotRecomm =  eval('('+this.hotRecomm+')');
				var hotHTML = "<ul>";
				for(var i = 0; i< hotRecomm.length; i++) {
					hotHTML += '<li class="moreitems">';
					hotHTML += '<a href="goToCaiLingAudition.do?contentId='+hotRecomm[i].contentId+'&imgUrl=activity/listeningtoanswer/images/cring/'+hotRecomm[i].id+'.jpg">';
					hotHTML += '<img src="activity/listeningtoanswer/images/cring/'+hotRecomm[i].id+'.jpg" alt="">';
					hotHTML += '<p class="t-over">'+hotRecomm[i].contentName+'</p>';
					hotHTML += '</a></li>';
				}
				hotHTML += "</ul>";
				//热门推荐
				$(".morelink").html(hotHTML);
			}
		},
		/**初始化按钮事件*/
		initBtnClick:function(){
			var listening = this;
			// 播放按钮 
			$(".playbtna").click(function(){
				if(audio.paused){ 
					//当前是暂停状态，play()设为播放
					audio.play();
					listening.audioStart(this);
					return;	
				}else{ 
					// 当前是播放状态，pause()设为暂停
					audio.pause();
					listening.audioPause(this);
				}
			});
			/** 答案选择 */
			$('.items label').click(function() {
				$(this).children("span").addClass("selected");
      			$(this).parents().siblings().find('span').removeClass("selected");
			});
			/** 提交答案*/
			$('.dati_sub_btn').bind('click', function() {
				//暂停播放
				audio.pause();
				$('.resultmask,.resultwrap,.waitresult').fadeIn();
				var option = $('input[name="answer"]:checked').val();
				if(!option){
					$('.txtresult.result4').fadeIn();
					return;
				}
				$.ajax({//抽奖
	   				url:'answerDrawing.do?t='+Math.random(),
	   				type: 'post',
	   				dataType: 'json',
	   				data: {
						"option":option
					},
	   				cache: false,
	   				timeout:15000,
	   				async: false,
	   			 	success:function(res){
	   			 		console.log("answer:"+res.retCode);
	   			 		if(res.success){
	   			 			$('.waitresult').css('display', 'none');
	   			 			if(res.retCode == 3000){//不在活动时间内
	   			 				$('.waitresult').fadeOut();
		   			 			$('.txtresult.result7').fadeIn();
			   			 		return;
	   			 			}else if(res.retCode == 2001) {//未登录
	   	   			 			window.location.href = res.retObj;
	   		   			 		return;
	   			 			}else if(res.retCode == 3004) {//当天已进行过抽奖
	   			 				$('.waitresult').fadeOut();
		   			 			$('.txtresult.result5').fadeIn();
			   			 		return;
	   			 			}else if(res.retCode == 1001) {//活动暂停
	   			 				$('.waitresult').fadeOut();
		   			 			$('.txtresult.result6').fadeIn();
			   			 		return;
	   			 			}else if(res.retCode == 3001) {//发大礼包
	   			 				$('.waitresult').fadeOut();
		   			 			$('.txtresult.result8').fadeIn();
			   			 		return;
	   			 			}else if(res.retCode == 3005) {//未中奖
	   			 				$('.waitresult').fadeOut();
		   			 			$('.txtresult.result2').fadeIn();
			   			 		return;
	   			 			}else if(res.retCode == 3003) {//回答错误
	   			 				$('.waitresult').fadeOut();
		   			 			$('.txtresult.result3').fadeIn();
			   			 		return;
	   			 			}else if(res.retCode == 1000) {//中奖
	   			 				$('.waitresult').fadeOut();
	   			 				$('.txtresult.result1').find(".jieguo_text").html(res.msg+"！记得明天再来哦！");
		   			 			$('.txtresult.result1').fadeIn();
			   			 		return;
	   			 			}
	   			 		}else{
	   			 			$('.waitresult').css('display', 'none');
		   			 		$('.txtresult.result6').fadeIn();
		   			 		return;
	   			 		}
	   			 	},
	   			 	error:function(){
	   			 		$('.waitresult').fadeOut();
	   			 		$('.txtresult.result6').fadeIn();
	   			 		return;
	   			 	}
				});	
			});
			/**确认按钮*/
			$('.confirm_btn').bind('click', function() {
				$('.resultmask').css('display', 'none');
				$('.resultwrap').fadeOut('fast');
				$('.txtresult').fadeOut('fast');
			});
			/**用户中心*/
			$("#userCenter").click(function(){
				window.location.href="userCenter.do";
			});
		},
		audioPause:function(obj){
			$(obj).css('background', 'url(activity/listeningtoanswer/images/playbtn.png)');
			$('.playwrap').css('background', 'url(activity/listeningtoanswer/images/mp3bg.png)');
			$('.musicmask').css('display', 'block');
			$('.player').css('visibility', 'hidden');
		},
		audioStart:function(obj){
			$(obj).css('background', 'url(activity/listeningtoanswer/images/pause.png) -3px 0');
			$('.playwrap').css('background', 'url(activity/listeningtoanswer/images/boxing.gif)');
			$('.musicmask').css('display', 'none');
			$('.player').css('visibility', 'visible');
		}
};