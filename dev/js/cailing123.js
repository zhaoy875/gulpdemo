
		var startDate ='20160105';
		var endDate ='20160131';
		var awardInfo = '';
		var showHtml;
		var misicId;
		var misicName;
		var misicOverTime;
		$(function(){
			//如果奖品不为空,直接显示中奖信息
			if(awardInfo!="" && awardInfo.length>0 && awardInfo!=undefined){
				//清空内容
     			$("#infoResult").empty();
    			$("#openInfo").empty();
    			showHtml="<div class='resu_txt' style='height:125px;'><div class='face'></div><p class='jieguo_p1'></p><p class='jieguo_text'>"+awardInfo+"<br></p></div>";
				showHtml+="<div class='confirm'><a href='javascript:void(0);' class='confirm_btn' onclick='infoSure()'>确定</a></div>";
				$("#infoResult").append(showHtml);
				$('#infoResult,.resultwrap').css('display', 'block');
				$(".resultmask").show();
				console.log('奖品不为空,显示中奖信息');
			}
			//获取彩铃列表
			var musicList=$.parseJSON('[{"contentBqid":"63681000366","contentId":"600907000007480543","contentName":"依赖","contentPlayUrl":"http://tyst.migu.cn/public/ringmaker01/dailyring03/vsftp/ywq/public/ringmaker01/dailyring03/2015/11/2015%E5%B9%B411%E6%9C%8823%E6%97%A509%E7%82%B950%E5%88%86%E7%B4%A7%E6%80%A5%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E5%8C%97%E4%BA%AC%E5%B0%91%E5%9F%8E1%E9%A6%96/%E5%BD%A9%E9%93%83/6_mp3-128kbps/%E4%BE%9D%E8%B5%96-%E5%BC%A0%E9%9D%93%E9%A2%96.mp3?channelid=08&msisdn=a3ac8432-b581-4315-8ab8-8bf2ca42d408","contentPrice":"200","contentSinger":"张靓颖 ","contentYxq":"2017-11-22","contetnFfsj":" 2015-11-23","createTime":"","id":8},{"contentBqid":"63793702241","contentId":"600907000006695083","contentName":"如果我变成一首歌(电影杜拉拉追婚记主题曲)","contentPlayUrl":"http://tyst.migu.cn/public/ringmaker01/dailyring03/vsftp/ywq/public/ringmaker01/dailyring03/2015/10/2015%E5%B9%B410%E6%9C%8808%E6%97%A510%E7%82%B901%E5%88%86%E7%B4%A7%E6%80%A5%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E5%8D%8E%E8%8D%A3%E6%96%87%E5%8C%96%E9%A2%84%E7%95%991%E9%A6%96/%E5%BD%A9%E9%93%83/6_mp3-128kbps/%E5%A6%82%E6%9E%9C%E6%88%91%E5%8F%98%E6%88%90%E4%B8%80%E9%A6%96%E6%AD%8C%28%E7%94%B5%E5%BD%B1%E6%9D%9C%E6%8B%89%E6%8B%89%E8%BF%BD%E5%A9%9A%E8%AE%B0%E4%B8%BB%E9%A2%98%E6%9B%B2%29-%E6%9E%97%E5%AE%A5%E5%98%89.mp3?channelid=08&msisdn=13a293d4-98e1-437f-b6f1-f7ff293b537f","contentPrice":"200","contentSinger":"林宥嘉","contentYxq":"2018-09-30","contetnFfsj":"2015-10-08","createTime":"","id":28},{"contentBqid":"6005750X5AK","contentId":"600907000007321583","contentName":"爱情原来","contentPlayUrl":"http://tyst.migu.cn/public/ringmaker01/dailyring03/vsftp/ywq/public/ringmaker01/dailyring03/2015/11/2015%E5%B9%B411%E6%9C%8813%E6%97%A509%E7%82%B920%E5%88%86%E7%B4%A7%E6%80%A5%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E5%8D%8E%E7%BA%B38%E9%A6%96/%E5%BD%A9%E9%93%83/6_mp3-128kbps/%E7%88%B1%E6%83%85%E5%8E%9F%E6%9D%A5-%E9%BB%84%E5%B0%8F%E7%90%A5.mp3?channelid=08&msisdn=c68e5ece-e53e-4712-b657-daf3e3b156a6","contentPrice":"200","contentSinger":"黄小琥","contentYxq":"2016-12-31","contetnFfsj":"2015-11-13","createTime":"","id":60}]');
			//图片存放地址
			var imgPath="activity/listeningtoanswer/images/cring/";
			//彩铃页面
			var playHtml=[];
			for(var i=0;i<musicList.length;i++){
		 		//获取ID
				var id=musicList[i].id;
				playHtml.push('<div class="ringitems clearfix"><div class="albumcover stage"><div class="albumpic"><img src="'+imgPath+id+'.jpg'+'"></div></div>');
				playHtml.push('<div class="rightring"><div class="musicinfo">《<span class="m_name">'+musicList[i].contentName+'</span>》<span>-</span><span class="m_author">'+musicList[i].contentSinger+'</span>');
				playHtml.push('<span class="musicsrc" style="width:0;height:0;overflow:hidden;display:none">'+musicList[i].contentPlayUrl+'</span></div>');
				playHtml.push('<div class="ring_set clearfix"><ul><li class="cl_shiting"><span></span>试听</li><li class="cl_pause" style="display:none"><span></span>暂停</li>');
				playHtml.push('<li class="cl_set" onclick="setConfig(\''+musicList[i].contentId+'\',\''+musicList[i].contentName+'\',\''+musicList[i].contentYxq+'\')"><span></span>设置</li></ul></div></div></div>');
			}
			$("#playDiv").after(playHtml.join(' '));
			var audio1 = document.getElementById('myaudio');

			// 隐藏默认控件
			// audio1.removeAttribute('controls');
			// // 显示
			// audio1.controls = 'controls';
			
			
			//单歌曲播放完后,使播放图片停止转动
			audio1.addEventListener("ended",function(){
			$('.albumpic').removeClass('rocketship');
			$(".albumpic").css("height",$(".albumpic").width()+"px");
			$('.cl_shiting').css('display', 'inline-block'); 
			$('.cl_pause').css('display', 'none');
			console.log('音乐播放结束');
			},false);

			
			
			
			 
			// 每次试听前修改公共播放器地址为当前彩铃地址
			$('.cl_shiting').bind('click',
				function() {
					var thissrc = $(this).closest('.ringitems').find(
							'.musicsrc').text();
					// 先判断当前状态为播放时不操作，否则暂停按钮会变成停止效果
					// 修改为当前地
					if (audio1.play) {
						if (audio1.src !== thissrc) {
							audio1.src = thissrc;
						}
						;
					}
					;
				});

			// 点试听，播放
			$('.cl_shiting').bind(
					'click',
					function() {
						audio1.play();
						console.log('音乐播放中');

						// 公用播放器 同时只允许一首歌播放，多首播放时互斥，点击每项的播放，
						// 先初始化停止其他项
						$('.albumpic').removeClass('rocketship');

						// 初始化album和按钮
						$('.cl_shiting').css('display', 'inline-block');
						$('.cl_pause').css('display', 'none');
						$('.albumpic').removeClass('rocketship');
						// 操作当前

						// 当前项对应album转动及按钮样式
						$(this).css('display', 'none'); // 切换样式
						$(this).siblings('.cl_pause').css('display',
								'inline-block');
						$(this).closest('.rightring').siblings('.albumcover')
								.children('.albumpic').addClass('rocketship');
					});

			// 点暂停
			$('.cl_pause').click(
				function() {
					audio1.pause();
					console.log('暂停');
					$(this).siblings('.cl_shiting').css('display',
							'inline-block');
					$(this).css('display', 'none');
					$(this).closest('.rightring').siblings('.albumcover')
							.children('.albumpic')
							.removeClass('rocketship');
			});
		});
		//设置
		function setConfig(clID,name,overtime){
			$("#infoResult").empty();
			$("#openInfo").empty();
			var cDate=getMonthDay();
			if(cDate>this.endDate||cDate<this.startDate){
				showHtml="<div class='resu_txt'><div class='face smile'></div><p class='jieguo_p1'>sorry!</p><p class='jieguo_text'>目前不在活动时间，请到活动时间再来吧！<br></p></div>";
				showHtml+="<div class='confirm'><a href='javascript:void(0);' class='confirm_btn' onclick='infoSure()'>确定</a></div>";
				$("#infoResult").append(showHtml);
				$('#infoResult,.resultwrap').css('display', 'block');
				$(".resultmask").show();
				return;
				console.log('设置彩铃');
			}
			showHtml="<div><div class='txtresult'><div class='resu_cl'><p class='jieguo_p1'>您即将设置彩铃《"+name+"》,有效期是:"+overtime+"</p><p class='jieguo_text'>原价2元，咪咕特级会员享受7折优惠哦！<br></p></div>";
			showHtml+="</div><div class='clearfix bottomline'><div class='confirm1'><a href='javascript:void(0);' class='confirm_btn1' onclick='orderCl()'>确定</a></div>";
			showHtml+="<div class='cancel'><a href='javascript:void(0);' onclick='canel()' class='cancel_btn'>取消</a></div></div></div>";
			$("#openInfo").append(showHtml);
			$('#openInfo,.resultwrap').css('display', 'block');
			$(".resultmask").show(); 
			misicId=clID;
			misicName = name;
			misicOverTime = overtime;
		} 
		
		//取消
		function canel(){
			$('#openInfo,#infoResult.resultwrap').css('display', 'none');
			$(".resultmask").css('display', 'none');
		}
		//获取时间
		function getMonthDay(){
			var date=new Date();
			var year=date.getFullYear()+"";
			var month=(date.getMonth()+1)<=9?("0"+(date.getMonth()+1)+""):(date.getMonth()+1+"");
			var day=date.getDate()<=9?("0"+date.getDate()+""):(date.getDate()+"");
			return parseInt(year+month+day);
		}
		
		
		function infoSure(){
			$('#infoResult,.resultwrap').css('display', 'none');
			$(".resultmask").hide();
		}
		
		//彩铃订购
		function orderCl(){
			var r = /^\+?[1-9][0-9]*$/;
			if(r.test(misicId)){
				$.ajax({
					url : 'listnOrderCl.do',
	         		type : 'post',
	         		dataType : 'json',
	         		cache : false,
	         		async : false,
	         		data : {
	         			"crid" : misicId
	         		},
	         		success : function(res) {
	         			//清空内容
	         			$("#infoResult").empty();
	        			$("#openInfo").empty();
	         			if (res != null) {
	         				if (res.retCode == "1000") {
	    						showHtml="<div class='resu_txt'><div class='face smile'></div><p class='jieguo_p1'>彩铃订购成功!</p><p class='jieguo_text'>"+res.msg+"</p></div>";
	    						showHtml+="<div class='confirm'><a href='javascript:void(0);' class='confirm_btn' onclick='infoSure()'>确定</a></div>";
	       						$("#infoResult").append(showHtml);
	       						$('#infoResult,.resultwrap').css('display', 'block');
	       						$(".resultmask").show();
	         				} else {
	             				if(res.retCode=="1002"){
	             					setTimeout(login,2000);
	             				}else if(res.retCode=="2001"){
	           						showHtml="<div class='resu_txt'><div class='face cry'></div><p class='jieguo_p1'>订购失败!</p><p class='jieguo_text'>您已经订购过该彩铃,请勿重复订购</p></div>";
		    						showHtml+="<div class='confirm'><a href='javascript:void(0);' class='confirm_btn' onclick='infoSure()'>确定</a></div>";
	           						$("#infoResult").append(showHtml);
	           						$('#infoResult,.resultwrap').css('display', 'block');
	           						$(".resultmask").show();
	                 			}else if(res.retCode=="2002"){
	                     			showHtml="<div><div class='txtresult'><div class='resu_cl'><p class='jieguo_p1'>您未开通彩铃功能!</p><p class='jieguo_text'>是否立即去开通彩铃功能?<br></p></div>";
	                    			showHtml+="</div><div class='clearfix bottomline'><div class='confirm1'><a href='javascript:void(0);' class='confirm_btn1' onclick='ktCl()'>确定</a></div>";
	                    			showHtml+="<div class='cancel'><a href='javascript:void(0);' onclick='canel()' class='cancel_btn'>取消</a></div></div></div>";
	                    			$("#openInfo").append(showHtml);
	                    			$('#openInfo,.resultwrap').css('display', 'block');
	                    			$(".resultmask").show(); 
	                         	}else if(res.retCode=="1001"){
	                         		showHtml="<div class='resu_txt'><div class='face cry'></div><p class='jieguo_p1'>彩铃设置失败!</p><p class='jieguo_text'>请重新去设置</p></div>";
		    						showHtml+="<div class='confirm'><a href='javascript:void(0);' class='confirm_btn' onclick='infoSure()'>确定</a></div>";
		       						$("#infoResult").append(showHtml);
		       						$('#infoResult,.resultwrap').css('display', 'block');
		       						$(".resultmask").show();
	                         	}
	         				}
	         			} else {
	         				showHtml="<div class='resu_txt'><div class='face cry'></div><p class='jieguo_p1'>请求失败!</p><p class='jieguo_text'></p></div>";
    						showHtml+="<div class='confirm'><a href='javascript:void(0);' class='confirm_btn' onclick='infoSure()'>确定</a></div>";
       						$("#infoResult").append(showHtml);
       						$('#infoResult,.resultwrap').css('display', 'block');
       						$(".resultmask").show();
	         			}
	         		},
	         		error:function() {
	         			//清空内容
	         			$("#infoResult").empty();
	        			$("#openInfo").empty();
	         			showHtml="<div class='resu_txt'><div class='face'></div><p class='jieguo_p1'>网络异常,请等待!</p><p class='jieguo_text'></p></div>";
						showHtml+="<div class='confirm'><a href='javascript:void(0);' class='confirm_btn' onclick='infoSure()'>确定</a></div>";
   						$("#infoResult").append(showHtml);
   						$('#infoResult,.resultwrap').css('display', 'block');
   						$(".resultmask").show();
	         		}
	    		});
			}
		}
		//彩铃开通
		function ktCl(){
			$.ajax({
				url : 'kaiTongListeningCl.do',
         		type : 'post',
         		dataType : 'json',
         		cache : false,
         		async : true,
         		success : function(res) {
         			//清空内容
         			$("#infoResult").empty();
        			$("#openInfo").empty();
         			if (res != null) {
         				if (res.retCode == 1000) {
         					showHtml="<div class='resu_txt'><div class='face smile'></div><p class='jieguo_p1'>恭喜，您已成功开通彩铃功能！</p><p class='jieguo_text'>彩铃功能开通费用，全球通、神州行套餐为5元/月，动感地带3元/月！具体扣费已账单为准！<br></p></div>";
    						showHtml+="<div class='confirm'><a href='javascript:void(0);' class='confirm_btn' onclick='infoSure()'>确定</a></div>";
       						$("#infoResult").append(showHtml);
       						$('#infoResult,.resultwrap').css('display', 'block');
       						$(".resultmask").show();
         				} else {
             				if(res.retCode==-101){
                        		setTimeout(login,2000);
             				}else{
             					showHtml="<div class='resu_txt'><div class='face smile'></div><p class='jieguo_p1'>不好意思！</p><p class='jieguo_text'>彩铃功能开通失败<br></p></div>";
        						showHtml+="<div class='confirm'><a href='javascript:void(0);' class='confirm_btn' onclick='infoSure()'>确定</a></div>";
           						$("#infoResult").append(showHtml);
           						$('#infoResult,.resultwrap').css('display', 'block');
           						$(".resultmask").show();
                         	}
         				}
         			} else {
         				showHtml="<div class='resu_txt'><div class='face smile'></div><p class='jieguo_p1'>不好意思！</p><p class='jieguo_text'>彩铃功能开通失败<br></p></div>";
						showHtml+="<div class='confirm'><a href='javascript:void(0);' class='confirm_btn' onclick='infoSure()'>确定</a></div>";
   						$("#infoResult").append(showHtml);
   						$('#infoResult,.resultwrap').css('display', 'block');
   						$(".resultmask").show();
         			}
         		},
         		error : function() {
         			//清空内容
         			$("#infoResult").empty();
        			$("#openInfo").empty();
        			showHtml="<div class='resu_txt'><div class='face'></div><p class='jieguo_p1'>不好意思！</p><p class='jieguo_text'>网络异常<br></p></div>";
					showHtml+="<div class='confirm'><a href='javascript:void(0);' class='confirm_btn' onclick='infoSure()'>确定</a></div>";
					$("#infoResult").append(showHtml);
					$('#infoResult,.resultwrap').css('display', 'block');
					$(".resultmask").show();
         		}
			});
		}
		
		
		function login(){
			tologin('/clktdtIndex.do');
		}
		
	