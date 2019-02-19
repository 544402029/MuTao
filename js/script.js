$(function(){

	// 登录注册弹出层	
	// 登录
	$('.loginLink').click(function(){
		$(this).addClass('focus');
		$('.reginLink').removeClass('focus');
		let loginHtml=$('.loginHtml').html();
		showLayer(loginHtml);

		$(".login .submit").click(function(){
			let username = $("input[name='username']").val();
			let password = $("input[name='password']").val();
			if(username>=11){
				alert("登录成功");
				hideLayer();
			}else{
				alert('必须输入手机号');
			}
		});

	})
	
	// 注册
	$('.reginLink').click(function(){
		$('.reginLink').addClass('focus');
		$('.loginLink').removeClass('focus');
		let reginHtml=$('.reginHtml').html();
		showLayer(reginHtml);

		$(".regin .submit").click(function(){
			let username = $("input[name='username']").val();
			let password = $("input[name='password']").val();
			let repassword = $("input[name='repassword']").val();
			if(password >=6 && password==repassword){
				alert("注册成功");
				hideLayer();
			}else{
				alert('必须输入六位数密码');
			}
		});

	})
	// 回调函数(显示)
	function showLayer(html){
		$('.layer-mask').show();
		$('.layer-pop').show();
		$('.layer-content').html(html);
		$('.layer-close').click(function(){
			hideLayer();
			
		});
	};
	// 回调函数(隐藏)
	function hideLayer(){
		$('.layer-mask').hide();
		$('.layer-pop').hide();
	};
	
	


	
	//logo    购物车
	// 滑入显示内容,滑出隐藏
	let shop=$('.shop'),
		shopContent=$('.shop-content'),
		shopItem=$('.shop-content-item'),
		shopClose=$('.arror20'),
		numTxt=$('#num');
	shop.mouseover(function(){
		shopContent.show();
	})
	shop.mouseout(function(){
		shopContent.hide();
	})
	shopContent.mouseover(function(){
		$(this).show();
	})
	shopContent.mouseout(function(){
		$(this).hide();
	})
	
	// 点击删除按钮删除对应DOM节点,并计算此时商品数量
	for(let i=0;i<shopItem.length;i++){
		shopClose.eq(i).click(function(){
			shopItem.eq(i).remove();
			let shopNum=shopContent.find('.shop-content-item').length;
			numTxt.text(shopNum);
		})
	}



	



	
//banner轮播图
	let index=0,
	timer=0,
	main=$('.banner-rotation'),
	pics=$('.banner-slide'),
	long=pics.length,
	dots=$('.dots span'),
	prev=$('.banner-rotation .prev'),
	next=$('.banner-rotation .next');
	// 设置轮播图动画
	function start(){
		// 点入轮播图查看信息时清除计时器
		main.mouseover(function(){
			if (timer) clearInterval(timer);
		})
		// 离开轮播图开始每2秒更换轮播图,当轮播图到最后一张,重新返回第一张
		main.mouseout(function(){
			timer=setInterval(function(){
				index++;
				if(index>=long) index=0;
				changeImg()
			},2000)
		})
		// 进入网页页面轮播图自动播放,(直接触发了离开轮播图的函数)
		main.mouseout();
		// 点击轮播图下方小圆点切换对应的轮播图
		dots.click(function(){
		 index=$(this).index();
		 changeImg();
		})
		// 点击上一张下一张切换轮播图
		prev.click(function(){
			index--;
			if (index<0) index=long;
			changeImg()
		})
		next.click(function(){
			index++;
			if (index>=long) index=0;
			changeImg();
		})
	}
	// 切换轮播图画面函数
	function changeImg(){
		// 图片
		pics.eq(index)
		.addClass('active')
		.siblings()
		.removeClass('active');

		// 圆点
		dots.eq(index)
		.addClass('focus')
		.siblings()
		.removeClass('focus');
	}
	// 启动轮播图
	start();
	
	



	// 导航商品列表
	//点击商品列表显示右边内容,离开时隐藏
	//滑过右边内容显示,离开时隐藏
	
	//商品列表
	let lis=$('.menu-item'),
	menuBOX=$('.menu-box'),
	innerBox=$('.menu-box-content');
	// 循环商品列表
	for (let i=0;i<lis.length;i++) {
		// 直接进入页面商品列表右边隐藏
		innerBox.hide();
		// 进入商品列表显示右边详情,它的兄弟元素是隐藏的
		lis.eq(i).mouseover(function(){
			innerBox.eq(i).show().siblings().hide();
		})
		// 进入右边详情是要显示详情的
		innerBox.eq(i).mouseover(function(){
			$(this).show();
		})
		// 离开详情页就是隐藏得
		innerBox.eq(i).mouseout(function(){
			$(this).hide();
		})
		// 离开商品列表项也是隐藏的
		lis.eq(i).mouseout(function(){
			innerBox.eq(i).hide();
		})
	}
	




		//今日推荐
		let up=$('#today .prev'),
		down=$('#today .next'),
		recommend=$('#today-product'),
		widt=0;
		// 点击上一张
		up.eq(0).click(function(e){
			width=++widt*240;
			if(widt>=1){
				recommend.css('left',-2160);
				widt=-9;
			}else{
				recommend.css('left',width);
			}
		})	
			
		// 点击下一张
		down.eq(0).click(function(e){
			width=--widt*240;
			if(widt>=-10){
				recommend.css('left',width);
			}else{
				widt=-1;
				console.log(width)
				recommend.css('left',-240);
			}
		})

		// 自动播放今日推荐图片
		let segmentWidth=0,
			recommendItem=$('.product-item'),
			todayBox=$('#today-box'),
			todayProduct=$('#today-box #today-product');
		// 计算现所有的图片宽度
		recommendItem.each(function(){
			segmentWidth+=$(this).outerWidth(true);
		})
		// 再克隆一份以完成无缝连接
		recommendItem.clone().appendTo(todayProduct);
		// 24秒循环播放完
		run(24000);
		function run (interval){
			todayProduct.animate({"left":-segmentWidth},interval,"linear",function(){
				todayProduct.css('left',0);
				run(24000);
			});
		}
		// 如果划入停止播放，离开开始
		todayBox.mouseover(function(){
			todayProduct.stop();
		}).mouseout(function(){
			// 计算离开时候left的值,然后再计算剩下的还需要几秒播放完,再去调用循环
			let Course=-parseInt(todayProduct.css("left")),
				time=24000*(1-Course/segmentWidth);
				run(time);
		});
		
	



	
	//楼层区
	// 楼层选择品类时应切换到对应内容
	let Caption=$('.toggle-caption'),
	   Content=$('.commond-content');

	
	for(let i=0;i<Caption.length;i++){
		Caption.eq(i).mouseover(function(){
			Caption.eq(i)
			.css('color','#f01414')
			.parent()
			.siblings()
			.find('.toggle-caption')
			.css('color','#000');

			
			Content.eq(i)
			.addClass('active')
			.parent()
			.siblings()
			.find('.commond-content')
			.removeClass('active');
		})
	}





	// 楼层左侧导航
	let  navigation=$('.navigation'),
		 storey=$('#left-storey'),
		 region=$('.commond-region');
	
	// 判断鼠标滚动事件
	$(window).scroll(function(){
		let pageTop=$(this).scrollTop();
		// 判断在什么情况显示楼层导航	
		if(pageTop>300 && pageTop<3100){
			storey.fadeIn('slow');
		}else{
			storey.fadeOut('slow');
		}

		// 判断鼠标滚动的位置,决定在哪一个楼层导航显示当前楼层导航文字,并且加选择时的背景
		if(pageTop>400 && pageTop<900){
			navigation.eq(0).text('1F');

			navigation.eq(0)
			.css('background','#828286e5')
			.siblings()
			.css('background','#fff');

		}else if(pageTop>900 && pageTop<1700){
			navigation.eq(1).text('2F');

			navigation.eq(1)
			.css('background','#828286e5')
			.siblings()
			.css('background','#fff');
		}else if(pageTop>1700 && pageTop<2100){
			navigation.eq(2).text('3F');

			navigation.eq(2)
			.css('background','#828286e5')
			.siblings().
			css('background','#fff');

		}else if(pageTop>2100 && pageTop<2600){
			navigation.eq(3).text('4F');

			navigation.eq(3)
			.css('background','#828286e5')
			.siblings()
			.css('background','#fff');
		}else if(pageTop>2600 && pageTop<3100){
			navigation.eq(4).text('5F');
			navigation.eq(4)
			.css('background','#828286e5')
			.siblings()
			.css('background','#fff');
		};
	})


	for(let i=0;i<navigation.length;i++){
		// 点击楼层导航跳到对应的显示区域
		navigation.eq(i).click(function(){
			switch(i){
				case 0:
				$(window).scrollTop(800);
				break;
				case 1:
				$(window).scrollTop(1400);
				break;
				case 2:
				$(window).scrollTop(1900);
				break;
				case 3:
				$(window).scrollTop(2400);
				break;
				case 4:
				$(window).scrollTop(2900);
				break;
		};
		});

		// // 鼠标滑过楼层导航时显示文字,离开是重新显示数字
		// navigation.eq(i).mouseover(function(){
		// 	let txt=$(this).text();
		// 	change.call(this,txt);

		// 	// 显示选择时的背影,选择时自身显示灰色,兄弟元素为默认的白色
		// 	navigation.eq(i)
		// 	.css('background','#828286e5')
		// 	.siblings()
		// 	.css('background','#fff');
		// });
		// // 离开
		// navigation.eq(i).mouseout(function(){
		// 	let txt=$(this).text();
		// 	change.call(this,txt)
		// });


	// 鼠标滑过楼层导航时显示文字,离开是重新显示数字
	navigation.eq(i).mouseout(function(){
		let txt=$(this).text();
		switch(txt){
			case '1F':
			$(this).text('服装')
			break;
			case '美妆':
			$(this).text('2F')
			break;
			case '个护':
			$(this).text('3F')
			break;
			case '电器':
			$(this).text('4F')
			break;
			default:
			$(this).text('5F')
		};
	});
	};
	
	
	navigation.eq(0).mouseover(function(){
		$(this).text('1F');
	})
	navigation.eq(0).mouseout(function(){
		$(this).text('服装');
	})

	navigation.eq(1).mouseover(function(){
		$(this).text('美妆');
	})
	navigation.eq(1).mouseout(function(){
		$(this).text('2F');
	})

	navigation.eq(2).mouseover(function(){
		$(this).text('手机');
	})
	navigation.eq(2).mouseout(function(){
		$(this).text('3F');
	})

	navigation.eq(3).mouseover(function(){
		$(this).text('电器');
	})
	navigation.eq(3).mouseout(function(){
		$(this).text('4F');
	})

	navigation.eq(4).mouseover(function(){
		$(this).text('数码');
	})
	navigation.eq(4).mouseout(function(){
		$(this).text('5F');
	})
	
	
	
	



	// 右侧导航
	// 滑到导航项图标滑出来对应的文字,滑出隐藏文字
	let toolbarItem=$('.tool-bar-item');

	for(let i=0;i<toolbarItem.length;i++){
		toolbarItem.eq(i).mouseover(function(){
			$(this).stop()
			.animate({'width':'100px'})
			.find('.tab-text')
			.show();	
		})	
		toolbarItem.eq(i).mouseout(function(){
		  	$(this).stop()
			.animate({'width':'32px'})
			.find('.tab-text')
			.hide();	
		})
	}

	// 点击后返回顶部
	let backTop=$('.backtop'),
		times=null;
	backTop.click(function(){
		// $(window).scrollTop(0)
		// 页面顶部的话清除定时器
		cancelAnimationFrame(times);
		// 开启定时器,向上滑
		times = requestAnimationFrame(function fn(){
			// 此时离页面顶部的距离
			let oTop = document.body.scrollTop || document.documentElement.scrollTop;
			// 距离只要大于0,开始向上滑
			if(oTop > 0){
				document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
				// 递归,每次50px的向上滑
				times = requestAnimationFrame(fn);
				console.log(document.documentElement.scrollTop )  
			}else{
				// 顶部清除定时器
				cancelAnimationFrame(times);
			}  
			
		});
	});

	
});