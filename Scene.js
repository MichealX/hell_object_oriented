function Scene(id, width, height, man) {
	this._width = width;
	this._height = height;
	this._sceneDom = document.getElementById(id);
	this._man = man;
	this._bricks = [];
	this._needGenerateBricks = true;
	this._score = 0;
	
}
Scene.prototype = (function() {
	var _is_larger_than = function(a, b) {
		return a > b;
	};
	
	//alert(this.title+" in closure");
	return {
		draw: function() {
			this._sceneDom.style.width = this._width + "px";
			this._sceneDom.style.height = this._height + "px";
		},
		_heartbeat: function() {
			
			if (_is_larger_than(this._man.getY(), this._height - this._man.getHeight()) || _is_larger_than(0,this._man.getY())) {
				this._man.setIsalive(false);
				
				this._gallery_collect();
			} else {
                var is_collpased = false;
				this.addScore();
				for (var i = 0; i < this._bricks.length; i++) {
					var _brick=this._bricks[i];
					
					if ((this._man.getBottomY()<_brick.getBottomY()
					      && this._man.getBottomY() > _brick.getY()
                        )
						&&this._man.collapse(_brick)) {
                        is_collpased = true;
                        //2013-04-26 徐灿 小人碰到类型为1的砖块死亡
                        /*if(_brick.getType()==6)
                        {
                        	this._man.setIsalive(false);
                        	this._gallery_collect();
                        	//2013-05-03 basilwang 必须返回防止执行setTimeout
                        	return;
                        }
                        this._man.setSpeed(_brick.getSpeed());*/
						switch(_brick.getType()){
                        	case 0:;
							case 1:;
							case 2:;
							case 3:;
							case 4:
								this._man.setSpeed(_brick.getSpeed());
								
								break;
							case 5:;
							case 6:
								this._man.setIsalive(false);
								this._gallery_collect();
								return;
								break;
							case 7:;
							case 8:
								this._man.setSpeed(_brick.getSpeed()*32);
								
								break;
							case 9:;
							case 10:
							this._man.setSpeed(_brick.getSpeed());	
							window.setTimeout(function(){this._man.setSpeed(_brick.getSpeed()*-16);},500);
							
								break;
						}
					}
					
					if (_is_larger_than(-_brick.getHeight(), _brick.getY()))  {
						//2013-04-24 basilwang 此时不再需要生成砖块了
						//this._needGenerateBricks = false;
						
						_brick.setIsalive(false);
						this._bricks.splice(i,1);
						/*var random_left = Math.random() * ( this._width-160);
						random_left = parseInt(random_left);
						this._bricks[i].setX(random_left);
						this._bricks[i].setY(this._height);
						this._bricks[i].setIsalive(true);*/
					}

					this._bricks[i].move();
					this._bricks[i].draw();
				}
                if (!is_collpased) {
                    this._man.resetSpeed();
					
                }
				this._man.move();
				this._man.draw();
				setTimeout(this.heartbeat(), 60);
			}

		},
		heartbeat: function() {
			var self = this;
			return function() {
				self._heartbeat.call(self);
			}
		},
		_generate_bricks: function() {
			
			if (this._needGenerateBricks) {

				var random_left = Math.random() *( this._width-120);
				random_left = parseInt(random_left);		
				var random_type = Math.random() * 10;
				random_type = parseInt(random_type);
				
				
				var brick = new Brick(random_left, this._height, random_type);
			
				brick.setSpeed(-5);
				
				this._bricks.push(brick);
				this._sceneDom.appendChild(brick.getBrickDom());
				setTimeout(this.generate_bricks(), 2000);
				//var timer=window.setInterval("this._bricks["+(this._bricks.length-1)+"].move()",2000);
//				nBlocks[nBlocks.length-1].timer=timer;
				
				

		} else {
			clearTimeout(this.generate_bricks);
		}

	},
	_gallery_collect:function()
		{
          
		    this._needGenerateBricks = false;
		    clearTimeout(this.heartbeat);
		    alert("你挂了！！");

		},
	
	generate_bricks: function() {
		var self = this;
		
		return function() {
			self._generate_bricks.call(self);
		}
	},
	//键盘按下事件
	keydown : function(e){
		
		e = e || window.event;
		//阻止浏览器默认事件
		if(e.keyCode == 37 || e.keyCode == 39){
			
			if(e.preventDefault)e.preventDefault();
			else e.returnValue = false;
			
			this.Man.keydown(e);
		}
	},
	//键盘释放事件
	keyup : function(e){
		
		e = e || window.event;
		
		if (e.keyCode == 37 || e.keyCode == 39) {
			this.Man.keyup(e);
		}
	},
	addScore : function(){
		this._score += 1;
		document.getElementById('score').innerHTML = Math.floor(this._score/33);
		
	},
	start: function() {
		document.getElementById('startBtn').style.display = 'none';
		document.getElementById('bat').style.display = 'none';
		document.getElementById('man').style.display = 'block';
		document.getElementById('wall').style.display = 'block';
		document.getElementById('thorn').style.display = 'block';
		this.draw();
		
		//document.body.onkeydown = function(e){Scene.keydown();};
		//document.body.onkeyup = function(e){Scene.keyup();};
		(this.generate_bricks())();
		(this.heartbeat())();

	}

}

})();