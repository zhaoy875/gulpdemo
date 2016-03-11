// 20151219  by zhaoy


// 播放器 样式
				$(document).ready(function() {
					var audio1 = document.getElementById('myaudio');
					// 隐藏默认控件
				// audio1.removeAttribute('controls'); 
				// // 显示
				// audio1.controls = 'controls'; 

				//  每次试听前修改公共播放器地址为当前彩铃地址
			    	$('.cl_shiting').bind('click', function() {
			    	 	var thissrc=$(this).closest('.ringitems').find('.musicsrc').text();
			    	 	// 先判断当前状态为播放时不操作，否则暂停按钮会变成停止效果
			    	 	// 修改为当前地
			    	 	if (audio1.play) {
			    	 		if (audio1.src!==thissrc) {
			    	 		audio1.src=thissrc;
			    	 		};
			    	 	}; 	
			    	});
			    		 	
					// 点试听，播放
					$('.cl_shiting').bind('click', function() { 
						audio1.play();
						
			    	// 公用播放器  同时只允许一首歌播放，多首播放时互斥，点击每项的播放，
			    	// 先初始化停止其他项
			    		$('.albumpic').removeClass('rocketship');
			    		 
			    		 //初始化album和按钮
			    		 $('.cl_shiting').css('display', 'inline-block'); 
			    		 $('.cl_pause').css('display', 'none');
			    		 $('.albumpic').removeClass('rocketship');
			    		 // 操作当前
			    		
			    		 // 当前项对应album转动及按钮样式
			    		 $(this).css('display', 'none'); //切换样式
			    		$(this).siblings('.cl_pause').css('display', 'inline-block');
						$(this).closest('.rightring').siblings('.albumcover').children('.albumpic').addClass('rocketship');
					});
				
					// 点暂停
					$('.cl_pause').click(function() {
						audio1.pause();
						$(this).siblings('.cl_shiting').css('display', 'inline-block');
						$(this).css('display', 'none');
						$(this).closest('.rightring').siblings('.albumcover').children('.albumpic').removeClass('rocketship');
					});
				});

// 播放结束暂停转圈
var audio1 = document.getElementById('myaudio');
audio1.addEventListener("ended",function(){
	$('.albumpic').removeClass('rocketship');
	$('.cl_shiting').css('display', 'inline-block'); 
	$('.cl_pause').css('display', 'none');
},false);


 //播放器 音乐地址 需后台添加
		$(document).ready(function() {

			$.ajax({
				url: '/path/to/src-list', 
				// 彩铃src，对应左侧ablbum图src，name...
				type: 'default GET',
				dataType: 'default: json',
				data: {param1: 'value1'},
			})
			.done(function() {
				console.log("音乐地址表加载success");
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
					
		});


	// 设置彩铃

	// 执行
					function successed(){			//已开通状态
						$('.resultwrap,.result').css('display', 'block');
						returnResult();
						// setTimeout(returnResult(),1500);  //1.5秒后返回中奖结果
							console.log('返回结果1已被执行');	 
					}


					function returnResult(){
							if (SetCailingResult=='1') {    //后台返回的是结果1 设置成功并获得30M流量！
								$('.result11').css('display', 'block');
								console.log('结果1被执行了');
								$('.result22,.result33').css('display', 'none');
							};
							if (SetCailingResult=='2') {  //返回的是结果2,成功但没有流量！
								$('.result22').css('display', 'block');
								console.log('结果2被执行了');
								$('.result11,.result33').css('display', 'none');
							};
							if(SetCailingResult=='3'){    //返回的是结果3,其他原因。。设置失败！
								$('.result33').css('display', 'block');
								console.log('结果3被执行了');
								$('.result22,.result11').css('display', 'none');
							};

							$('.state_on').css('display', 'none');  //关闭提示资费
							console.log('提示窗口已被关闭');
						}


						successed();
					// -----------------successed END---------------------



		$(document).ready(function() {
				// first登录验证
				// 1.点击设置按钮 判断彩铃状态
				var setupBtn=$('.cl_set');
				setupBtn.click(function set() {
					
					// 初始化等待界面
					// console.log($(obj).text());
					$('.resultmask').css('display', 'block');

					$('.resultwrap,.waitresult').css('display', 'block');
					waitEnd=function(){
						$('.waitresult').css('display', 'none');
					}
					//看网速及响应自定义等待时间
					setTimeout(waitEnd,1500); 

					//后台先给出当前状态值on or off，前台再展现2种结果之一
					var cl_CurrentState='on';
					// 未开通彩铃提示开通后再来设置。
					// 已开通彩铃提示资费，并返回 中奖与否的3种结果

					// 定义  前台
					function failed(){				  //未开通状态
						var tip_failed = function() {
							$('.state_off').fadeIn(); 
						}		
						setTimeout(tip_failed,1500);  //1.5秒后提示设置失败
					}	
						// 定义
						// 下面是3种结果  显示每种结果对应的div即可  if里由后台判断
						var SetCailingResult='1';  //这里由后台返回并设置 结果值!
					// 根据获取的当前彩铃状态cl_CurrentState,展现结果
					if (cl_CurrentState!=='on') {    
						failed();
					} else{                         
						successed();
					};		
				});
				// set函数结束
			
				// 确认取消弹窗按钮
				$('.confirm_btn').bind('click', function() {
					$('.resultmask').css('display', 'none');
					$('.resultwrap').fadeOut('fast');
				});

			});



		
				
				