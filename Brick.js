function Brick(x, y, type) {
	this._type = type || 0;
	this._brickDom = document.createElement("img");
	this._brickDom.style.zIndex=100;
	this._brickDom.style.position="absolute";
	//2013-04-24 basilwang 防止左上角闪烁
	this._brickDom.style.top="-999px";
	this._brickDom.style.left="-999px";
	switch (type) {
       
		case 0:;
		case 1:;
		case 2:;
		case 3:;
		case 4:;
			this._brickDom.src="normal_brick.png";
		    this._width = 120;
	        this._height = 15;
			
			break;
		case 5:;
		case 6:	
            this._brickDom.src="thorn_brick.png";
            this._width = 120;
            this._height = 15;
			
            break;
		case 7:;
		case 8:
			this._brickDom.src="flip_brick.png";
			this._width = 120;
			this._height = 15;
			break;
		case 9:	;
		case 10:
			this._brickDom.src="miss_brick.png";
		    this._width = 120;
	        this._height = 15;
			break;
	}

	this._speed = 0;
	this._isalive = true;

	this._x = x;
	this._y = y;
}
Brick.prototype = (function() {
	//Man的内部函数
	var _move = function() {


	};
	//王华杰 不能在此处应用this
	//alert(this.title+" in closure");
	return {
		move: function() {

				this._y  += this._speed ;



		},
		draw: function() {
			this._brickDom.style.width = this._width + "px";
			this._brickDom.style.height = this._height + "px";
			this._brickDom.style.top = this._y + "px";
			this._brickDom.style.left = this._x + "px";
		},
		getY: function() {
			return this._y;
		},
		getHeight: function() {
			return this._height;
		},
        getWidth:function(){
            return this._width;
        },
		getIsalive: function() {
			return this._isalive;
		},
		setIsalive: function(isalive) {
			this._isalive = isalive;
		},
		setX:function(x){
        	this._x=x;
        },
        setY:function(y){
        	this._y=y;
        },
        setSpeed:function(speed)
        {
        	this._speed=speed;
        },
        getSpeed:function()
        {
          return this._speed;
        },
        getBrickDom:function()
        {
        	return this._brickDom;
        },
        getCenterX:function(){
            return this._x + parseInt(this._width / 2);
        },
        getCenterY:function(){
            return this._y + parseInt(this._height / 2);
        },
		getBottomY:function(){
            return this._y + parseInt(this._height);
        },
        //2013-04-26 徐灿 增加砖块类型
        getType:function(){
        	return this._type;
        }

	}
})();