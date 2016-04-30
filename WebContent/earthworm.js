var earthworm	= earthworm || ( 
function (window)
{
	"use strict";
	
	var module		= null;
	
	// Global variable
	var background			= null,
		ground				= null,
		feed				= null,
		wormHead			= null,
		wormBody			= [],
		wormBodyLastTop		= 0,
		wormBodyLastLeft	= 0,
		score				= 0;
	
	var DIRECTION_TYPE	=	0,
		DIRECTION_UP	=	1,
		DIRECTION_RIGHT	=	2,
		DIRECTION_DOWN	=	3,
		DIRECTION_LEFT	=	4;
	
	var gameOption		= {
		size	:	500,
		speed	:	1
	};
	
	// Function
	var	_init,
		_makeBackground,
		_makeGround,
		_makeGameOption,
		_makeWorm,
		_makeFeed,
		_moveWorm,
		_addWormBody;
	
	_init	= function ()
	{
		DIRECTION_TYPE	= DIRECTION_RIGHT;
		_makeGameOption();
	};
	
	_makeBackground		= function ()
	{
		if (background !== null)
		{
			if (ground !== null)
			{
				background.removeChild(ground);
				ground	= null;
			}
			
			document.body.removeChild(background);
			background = null;
		}
		
		var scoreSpace		= document.createElement('div');
		var scoreLabel		= document.createElement('label');
		var scoreLabelText	= document.createTextNode('SCORE');
		var scoreText		= document.createElement('label');
		
		var resultSpace		= document.createElement('div');
		var resultLabel		= document.createElement('label');
		var resultLabelText	= document.createTextNode('C O L L I S I O N');
		
		background	= document.createElement('div');
		
		scoreText.setAttribute('id', 'score');
		scoreLabel.appendChild(scoreLabelText);
		scoreSpace.appendChild(scoreLabel);
		scoreSpace.appendChild(scoreText);
		
		resultLabel.setAttribute('id', 'result');
		resultLabel.appendChild(resultLabelText);
		resultSpace.appendChild(resultLabel);
		
		background.appendChild(scoreSpace);
		background.appendChild(resultSpace);
		document.body.appendChild(background);
		
		background.style.position		= "absolute";
		background.style.width			= gameOption.size + "px";
		background.style.height			= (gameOption.size + 50) + "px";
		background.style.top			= "50%";
		background.style.left			= "50%";
		background.style.marginLeft		= "-" + (parseInt(background.style.width) / 2) + "px";
		background.style.marginTop		= "-" + (parseInt(background.style.height) / 2) + "px";
		
		document.getElementById('score').innerText = score;
		
		scoreLabel.style.marginRight = "10px";
		
		resultLabel.style.position	= "absolute";
		resultLabel.style.bottom	= "0";
		resultLabel.style.textAlign	= "center";
		resultLabel.style.width		= "100%";
		resultLabel.style.fontWeight= "bold";
		resultLabel.style.fontSize	= "20px";
		resultLabel.style.color		= "red";
		resultLabel.style.display	= "none";
		
		_makeGround();
	};
	
	_makeGround	= function ()
	{
		if (ground !== null)
		{
			background.removeChild(ground);
			ground	= null;
		}
		
		ground	= document.createElement('div');
		
		ground.setAttribute('id', 'ground');
		
		ground.style.position		= "absolute";
		ground.style.width			= gameOption.size + "px";
		ground.style.height			= gameOption.size + "px";
		ground.style.top			= "50%";
		ground.style.left			= "50%";
		ground.style.marginLeft		= "-" + (parseInt(ground.style.width) / 2) + "px";
		ground.style.marginTop		= "-" + (parseInt(ground.style.height) / 2) + "px";
		ground.style.border			= "1px solid black";
		
		background.appendChild(ground);
	};
	
	_makeGameOption		= function ()
	{
		var optionSpace		= document.createElement('div');
		var optionLabel		= document.createElement('h2');
		var optionLabelText	= document.createTextNode('OPTION');
		var sizeSpace		= document.createElement('div');
		var sizeLabel		= document.createElement('label');
		var sizeLabelText	= document.createTextNode('크기');
		var sizeOption		= document.createElement('div');
		var sizeUl			= document.createElement('ul');
		var sizeLi1			= document.createElement('li');
		var sizeLi2			= document.createElement('li');
		var sizeLi3			= document.createElement('li');
		var sizeLiText1		= document.createTextNode('300');
		var sizeLiText2		= document.createTextNode('400');
		var sizeLiText3		= document.createTextNode('500');
		var speedSpace		= document.createElement('div');
		var speedOption		= document.createElement('div');
		var speedLabel		= document.createElement('label');;
		var speedLabelText	= document.createTextNode('속도');
		var speedUl			= document.createElement('ul');
		var speedLi1		= document.createElement('li');
		var speedLi2		= document.createElement('li');
		var speedLi3		= document.createElement('li');
		var speedLiText1	= document.createTextNode('x1');
		var speedLiText2	= document.createTextNode('x2');
		var speedLiText3	= document.createTextNode('x4');
		var startBtnSpace	= document.createElement('div');
		var startBtn		= document.createElement('button');
		var startBtnText	= document.createTextNode('S T A R T');
		
		var liTags		= document.getElementsByTagName('li');
		
		sizeLi1.appendChild(sizeLiText1);
		sizeLi2.appendChild(sizeLiText2);
		sizeLi3.appendChild(sizeLiText3);
		sizeUl.appendChild(sizeLi1);
		sizeUl.appendChild(sizeLi2);
		sizeUl.appendChild(sizeLi3);
		sizeOption.appendChild(sizeUl);
		
		speedLi1.appendChild(speedLiText1);
		speedLi2.appendChild(speedLiText2);
		speedLi3.appendChild(speedLiText3);
		speedUl.appendChild(speedLi1);
		speedUl.appendChild(speedLi2);
		speedUl.appendChild(speedLi3);
		speedOption.appendChild(speedUl);
		
		optionLabel.appendChild(optionLabelText);
		
		sizeLabel.appendChild(sizeLabelText);
		sizeSpace.appendChild(sizeLabel);
		sizeSpace.appendChild(sizeOption);
		speedLabel.appendChild(speedLabelText);
		speedSpace.appendChild(speedLabel);
		speedSpace.appendChild(speedOption);
		
		startBtn.appendChild(startBtnText);
		startBtnSpace.appendChild(startBtn);
		
		optionSpace.appendChild(optionLabel);
		optionSpace.appendChild(sizeSpace);
		optionSpace.appendChild(speedSpace);
		optionSpace.appendChild(startBtnSpace);
		
		document.body.appendChild(optionSpace);
		
		// 옵션창 스타일
		optionSpace.style.position		= "absolute";
		optionSpace.style.width			= "200px";
		optionSpace.style.height		= "250px";
		optionSpace.style.top			= "50%";
		optionSpace.style.left			= "50%";
		optionSpace.style.marginLeft	= "-" + parseInt(optionSpace.style.width) / 2 + "px";
		optionSpace.style.marginTop		= "-" + parseInt(optionSpace.style.height) / 2 + "px";
		optionSpace.style.background	= "#EAEAEA";
		optionSpace.style.borderRadius	= "10px 10px 10px 10px";
		optionSpace.style.boxShadow		= "0px 0px 15px";
		optionSpace.style.zIndex		= "999";
		optionLabel.style.textAlign		= "center";
		
		// 크기 옵션 스타일
		sizeSpace.style.width			= "80%";
		sizeSpace.style.margin			= "5px auto";
		sizeOption.style.width			= "100%";
		sizeOption.style.borderRadius	= "10px";
		sizeUl.style.padding			= "0px";
		sizeUl.style.margin				= "5px 0px";
		sizeUl.style.listStyle			= "none";
		
		// 속도 옵션 스타일
		speedSpace.style.width			= "80%";
		speedSpace.style.margin			= "5px auto";
		speedOption.style.width			= "100%";
		speedOption.style.borderRadius	= "10px";
		speedUl.style.padding			= "0px";
		speedUl.style.margin			= "5px 0px";
		speedUl.style.listStyle			= "none";
		
		for (var i = 0; i < liTags.length; i++)
		{
			liTags[i].style.display		= "inline-block";
			liTags[i].style.width		= "32%";
			liTags[i].style.textAlign	= "center";
			liTags[i].style.cursor		= "pointer";
			liTags[i].style.background	= "white";
			liTags[i].style.border		= "1px solid black";
			
			if (i < 3)
			{
				liTags[i].addEventListener('click', function(){
					gameOption.size		= parseInt(this.innerText);
					
					for (var j = 0; j < liTags.length / 2; j++)
					{
						liTags[j].style.background	= "white";
						liTags[j].style.color		= "black";
					}
					
					this.style.background		= "black";
					this.style.color			= "white";
					
					_makeBackground();
				});
			}
			else
			{
				liTags[i].addEventListener('click', function(){
					gameOption.speed	= parseInt(this.innerText.replace('x',''));
					
					for (var j = 3; j < liTags.length; j++)
					{
						liTags[j].style.background	= "white";
						liTags[j].style.color		= "black";
					}
					
					this.style.background		= "black";
					this.style.color			= "white";
				});
			}
			
			liTags[i].addEventListener('mouseover', function(){
				if (this.style.background !== 'black')
					this.style.background	= "gray";
			});
			liTags[i].addEventListener('mouseout', function(){
				if (this.style.background !== 'black')
					this.style.background	= "white";
			});
		}
		
		liTags[0].style.borderRadius	= "10px 0px 0px 10px";
		liTags[2].style.borderRadius	= "0px 10px 10px 0px";
		liTags[3].style.borderRadius	= "10px 0px 0px 10px";
		liTags[5].style.borderRadius	= "0px 10px 10px 0px";

		startBtnSpace.style.width		= "80%";
		startBtnSpace.style.margin		= "20px auto";
		startBtnSpace.style.textAlign	= "center";
		
		startBtn.style.cursor			= "pointer";
		startBtn.style.width			= "100px";
		startBtn.style.height			= "40px";
		startBtn.style.fontWeight		= "bold";
		
		startBtn.addEventListener('click', function(){
			
			if (background === null)
				_makeBackground();
			
			_makeWorm();
			_makeFeed();
			_moveWorm();
			wormHead.style.borderRadius	= "10px 10px 10px 10px";
			document.body.removeChild(optionSpace);
		});
	};
	
	_makeWorm	= function ()
	{
		var headDiv	= document.createElement('div');
		
		headDiv.setAttribute('id', 'wormHead');
		
		headDiv.style.position		= "absolute";
		headDiv.style.width			= "20px";
		headDiv.style.height		= "20px";
		headDiv.style.top			= (parseInt(ground.style.height) / 2 % 20) === 0 ?
										parseInt(ground.style.height) / 2 + "px" : (parseInt(ground.style.height) / 2 - parseInt(headDiv.style.height) / 2) + "px";
		headDiv.style.left			= (parseInt(ground.style.width) / 2 % 20) === 0 ?
										parseInt(ground.style.width) / 2 + "px" : (parseInt(ground.style.width) / 2 - parseInt(headDiv.style.width) / 2) + "px";
		headDiv.style.background	= "black";
		headDiv.style.zIndex		= "998";
		
		wormHead	= headDiv;
		
		ground.appendChild(wormHead);
		
		window.addEventListener("keydown", function(event){
			
			switch (event.keyCode)
			{
				case 37:		// left
					if (DIRECTION_TYPE !== DIRECTION_LEFT)
					{
						DIRECTION_TYPE	= DIRECTION_LEFT;
					}
					break;
				case 38:		// up
					if (DIRECTION_TYPE !== DIRECTION_UP)
					{
						DIRECTION_TYPE	= DIRECTION_UP;
					}
					break;
				case 39:		// right
					if (DIRECTION_TYPE !== DIRECTION_RIGHT)
					{
						DIRECTION_TYPE	= DIRECTION_RIGHT;
					}
					break;
				case 40:		// down
					if (DIRECTION_TYPE !== DIRECTION_DOWN)
					{
						DIRECTION_TYPE	= DIRECTION_DOWN;
					}
					break;
			}
		});
	};
	
	_makeFeed	= function ()
	{
		if (feed !== null)
		{
			ground.removeChild(feed);
			feed	= null;
		}
		
		feed	= document.createElement('div');
		var feedPosX	= 0;
		var feedPosY	= 0;
		
		var repeat		= true;
		
		while(repeat)
		{
			while (feedPosX <= 10 || feedPosX >= gameOption.size - 10)
				feedPosX	= Math.floor((Math.random() * gameOption.size));
			while (feedPosY <= 10 || feedPosY >= gameOption.size - 10)
				feedPosY	= Math.floor((Math.random() * gameOption.size));
			
			feedPosX		= feedPosX - (feedPosX % 10);
			feedPosX 		= feedPosX % 20 == 0 ? feedPosX : feedPosX - 10;
			
			feedPosY		= feedPosY - (feedPosY % 10);
			feedPosY 		= feedPosY % 20 == 0 ? feedPosY : feedPosY - 10;
			
			if (wormBody.length === 0)
				break;
			
			for (var i = 0; i < wormBody.length; i++)
			{
				if (feedPosX === parseInt(wormBody[i].style.left.replace("px","")) && feedPosY === parseInt(wormBody[i].style.top.replace("px","")))
				{
					repeat		= true;
					feedPosX	= 0;
					feedPosY	= 0;
					break;
				}
				repeat	= false;
			}
		}
		
		feed.setAttribute('id', 'feed');
		
		feed.style.position		= "absolute";
		feed.style.width		= "20px";
		feed.style.height		= "20px";
		feed.style.top			= feedPosY + "px";
		feed.style.left			= feedPosX + "px";
		feed.style.background	= "gold";
		
		ground.appendChild(feed);
		
	};
	
	_moveWorm	=	function ()
	{
		var groundWidth		= parseInt(ground.style.width.replace("px",""));
		var groundHeight	= parseInt(ground.style.height.replace("px",""));
		var collision		= false;
		
		var interval	= setInterval(function (){
			
			var wormHeadPosY	= parseInt(wormHead.style.top.replace("px",""));
			var wormHeadPosX	= parseInt(wormHead.style.left.replace("px",""));
			
			// 지렁이가 그라운드 밖을 벗어났을 때 정지
			if (0 > wormHeadPosX || wormHeadPosX >= groundWidth)
			{
				clearInterval(interval);
				document.getElementById('result').style.display		= 'block';
				return;
			}
			else if (0 > wormHeadPosY || wormHeadPosY >= groundHeight)
			{
				clearInterval(interval);
				document.getElementById('result').style.display		= 'block';
				return;
			}
			
			// 새로 생기는 몸통의 위치를 지정하기 위해 가장 마지막 몸통의 위치를 저장 
			if (wormBody.length === 0)
			{
				wormBodyLastTop		= wormHead.style.top;
				wormBodyLastLeft	= wormHead.style.left;
			}
			else
			{
				wormBodyLastTop		= wormBody[wormBody.length - 1].style.top;
				wormBodyLastLeft	= wormBody[wormBody.length - 1].style.left;
			}
			
			for (var i = 0; i < wormBody.length; i++)
			{
				if (parseInt(wormBody[i].style.top.replace("px","")) === wormHeadPosY && parseInt(wormBody[i].style.left.replace("px","")) === wormHeadPosX)
				{
					collision	= true;
					break;
				}
			}
			
			if (collision)
			{
				clearInterval(interval);
				document.getElementById('result').style.display		= 'block';
				return;
			}
			
			// 지렁이 마지막 몸통부터 순차적으로 바로 앞의 몸통의 위치로 이동
			for (var i = wormBody.length - 1; i >= 0; i--)
			{
				if (i === 0)
				{
					wormBody[i].style.top	= wormHead.style.top;
					wormBody[i].style.left	= wormHead.style.left;
				}
				else
				{
					wormBody[i].style.top	= wormBody[i - 1].style.top;
					wormBody[i].style.left	= wormBody[i - 1].style.left;
				}
			}
			
			// 지렁이 머리 이동
			switch (DIRECTION_TYPE)
			{
				case DIRECTION_UP:
					wormHead.style.top	= (parseInt(wormHead.style.top) - 20) + "px";
					break;
				case DIRECTION_RIGHT:
					wormHead.style.left	= (parseInt(wormHead.style.left) + 20) + "px";
					break;
				case DIRECTION_DOWN:
					wormHead.style.top	= (parseInt(wormHead.style.top) + 20) + "px";
					break;
				case DIRECTION_LEFT:
					wormHead.style.left	= (parseInt(wormHead.style.left) - 20) + "px";
					break;
			}
			
			
			// 지렁이 머리가 먹이를 먹으면
			if (wormHead.style.top === feed.style.top && wormHead.style.left === feed.style.left)
			{
				_makeFeed();
				_addWormBody();
				score += 1;
				document.getElementById('score').innerText = score;
			}
			
			
		}, 500 / gameOption.speed);
	};
	
	_addWormBody	=	function ()
	{
		var bodyDiv		= document.createElement('div');
		
		bodyDiv.style.position		= "absolute";
		bodyDiv.style.width			= "20px";
		bodyDiv.style.height		= "20px";
		bodyDiv.style.background	= "gray";
		bodyDiv.style.top			= wormBodyLastTop;
		bodyDiv.style.left			= wormBodyLastLeft;
		bodyDiv.style.borderRadius	= "10px 10px 10px 10px";
		
		wormBody.push(bodyDiv);
		
		ground.appendChild(wormBody[wormBody.length - 1]);
	};
	
	module	=	{
		init	: _init
	};

	return module;

})(window);