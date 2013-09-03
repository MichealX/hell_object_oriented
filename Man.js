function Man(id, x, y, width, height, speed,hori_speed,ontype) {
	this._width = width;
	this._height = height;
	this._manDom = document.getElementById(id);
	this._speed = speed || 10;
	this._hori_speed=hori_speed || 10;
	this.moveXId = 0;
	this._isalive = true;
	this._isMove = false;
	this._man_status = "stop_0";
	this._x = x;
	this._y = y;
	//2013-04-27 徐灿在此加入ontype 用来获取碰撞方块类型
	this._ontype=ontype;
	window.addEvent(document, "keydown", this.keyboard_check());
}
Man.prototype = (function() {
	//Man的内部函数
	
	//alert(this.title+" in closure");
	return {
		_keyboard_check: function(e) {
			
			if (!e) e = window.event;
			var code= e.keyCode;
			var direction;
			switch (code) {
				case 37:
					direction = -1;
					//man_status = "left_1";
					//console.log("you pressed left arrow.");
					break;
				case 39:
					direction = 1;
					//man_status = "right_1";
					//console.log("you pressed right arrow.");
					break;
			}
			if(Math.abs(direction)===1)
				//this._x+= this._hori_speed * direction;
				/*if(this._isMove)return;
				this._isMove = true;*/
				this.moveLeftRight(direction);
			
		},
		keyboard_check:function(){
                        var self=this;
	                    return function()
	                    {
	                    	 self._keyboard_check.call(self);
	                    }
	          },
		collapse: function(brick) {
			var absX = Math.abs(this.getCenterX() - brick.getCenterX());
			var absY = Math.abs(this.getCenterY() - brick.getCenterY());
			var compareX = parseInt(this._width / 2) + parseInt(brick.getWidth() / 2);
			var compareY = parseInt(this._height / 2) + parseInt(brick.getHeight() / 2);
			//console.log("absX is " + absX + " absY is " + absY);
			//console.log("absX < compareX(" + compareX + ") is " + (absX < compareX));
			//console.log("absY < compareY(" + compareY + ") is " + (absY < compareY));
			if (absX <=compareX && absY <= compareY) return true;
			else return false;
		},
		move: function() {

			if (!this._isalive) return;
			this._y += this._speed;
		},
			
		moveLeftRight : function(direction){
			
			//var _this = this;
			
			//var process = function(){
				//玩家死了，清除移动循环ID
				//if(!_this.isaLive)clearInterval(_this.moveXId);
				//设置玩家的x坐标
				this._x+= this._hori_speed * direction;
				
				//右移动中，如果玩家走出右边界，停止移动
				/*if((_this._manDom.offsetLeft >= _this.scene.clientWidth - _this._manDom.clientWidth) && direction == 1){
					_this._manDom.style.left = _this.scene.clientWidth - _this._manDom.clientWidth + 'px';
					clearInterval(_this.moveXId);
				}*/
				//左移动中，如果玩家走出左边界，停止移动
				/*else if(_this._manDom.offsetLeft <= 0 && direction == -1){
					_this._manDom.style.left = 0 + 'px';
					clearInterval(_this.moveXId);
				}
			}*/
			
			//this.moveXId = setInterval(process,this.movesp);
		},
		draw: function() {
			this._manDom.style.width = this._width + "px";
			this._manDom.style.height = this._height + "px";
			this._manDom.style.top = this._y + "px";
			this._manDom.style.left = this._x + "px";
		},
		//键盘按下事件
		keydown : function(e){
			//移动中，退出事件
			if(this._isMove)return;
			//标识为移动中
			this._isMove = true;
			//左右移动
			this.moveLeftRight(e.keyCode==37?-1:1);
			
		},
		//键盘释放事件
		keyup : function(e){
			//标识为非移动中
			this._isMove = false;
			//清除左右移动循环
			//clearInterval(this.moveXId);
			//设置玩家为普通状态
			this.dom.className = 'player';
		},
		getY: function() {
			return this._y;
		},
		getHeight: function() {
			return this._height;
		},
		getWidth: function() {
			return this._width;
		},
		getIsalive: function() {
			return this._isalive;
		},
		setIsalive: function(isalive) {
			this._isalive = isalive;
		},
		setSpeed: function(speed) {
			this._speed = speed;
		},
		getCenterX: function() {
			return this._x + parseInt(this._width / 2);
		},
		getCenterY: function() {
			return this._y + parseInt(this._height / 2);
		},
        resetSpeed:function(){
            this._speed=5;
        },

		// 2013-04-27 徐灿  在此加入玩家死亡函数
		wasDead :function(){
			this._isalive=false;
			
			
		},
		getBottomY:function(){
        	return this._y + parseInt(this._height);
        }
		

	}
})();