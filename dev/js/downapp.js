// 下应用

$(document).ready(function() {

		// 弹窗

		$('.downloadapp').click(function() {
			$('.resultmask,.resultwrap,.waitresult').css('display', 'block');
				var waitend=function(){
					$('.waitresult').css('display', 'none');
					$('.result_1').fadeIn();   //result_1 or result_2 
				}
				setTimeout(waitend,1500);
		});


		$('.tomore').click(function() {
					var mh='max-height';
					$(this).siblings('.appdetails').css(mh, '1000px');
					$(this).css('display', 'none');
					$(this).siblings('.tomore1').css('display', 'block');
				$('.tomore1').click(function() {
					$(this).siblings('.appdetails').css(mh, '44px');
					$(this).css('display', 'none');
					$(this).siblings('.tomore').css('display', 'block');
				});

		});
		// 确认
		$('.confirm_btn').bind('click', function() {
			$('.resultmask').css('display', 'none');
			$('.resultwrap').fadeOut('fast');
		});
				
})