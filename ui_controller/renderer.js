/**
 * Created by ÇÃ´úÂëµÄºº×Ó on 2017/8/25.
 */
Renderer = function () {

    this.init = function (canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    this._drawDash = function(p0, p1) {
        var dashLen = 5,
            xpos = p1.x - p0.x,
            ypos = p1.y - p0.y,
            numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
        for (var i = 0; i < numDashes; i++) {
            if (i % 2 === 0) {
                this.ctx.moveTo(p0.x + (xpos / numDashes) * i, p0.y + (ypos / numDashes) * i);
            } else {
                this.ctx.lineTo(p0.x + (xpos / numDashes) * i, p0.y + (ypos / numDashes) * i);
            }
        }
    }
    
    this.drawLine = function (edge, isDash, color, isFocus) {
        var p0 = {x: edge.mStart.mX, y: edge.mStart.mY};
        var p1 = {x: edge.mEnd.mX, y: edge.mEnd.mY};
        
        this.ctx.beginPath();
        if (isDash) {
            this._drawDash(p0, p1);
        } else {
            this.ctx.moveTo(p0.x, p0.y);
            this.ctx.lineTo(p1.x, p1.y);
        }
        
        if (isFocus) {
            this.ctx.strokeStyle = "blue";
        } else if(color){
            this.ctx.strokeStyle = color;
        } else {
            this.ctx.strokeStyle = "black";
        }
        //this.ctx.strokeStyle = isFocus != undefined ? "blue" : color;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    this.drawRect = function (edge/*, isDash*/) {
        var leftUp = { x : edge.mStart.mX,
                       y : edge.mStart.mY};
        
        var rightBottom = {x : edge.mEnd.mX,
                           y : edge.mEnd.mY
                           };
        
        this.ctx.beginPath();
        //if (isDash) {
            this._drawDash(leftUp, {x: rightBottom.x, y: leftUp.y});
            this._drawDash({x: rightBottom.x, y: leftUp.y}, rightBottom);
            this._drawDash(rightBottom, {x: leftUp.x, y: rightBottom.y});
            this._drawDash({x: leftUp.x, y: rightBottom.y}, leftUp);
        //} else {
        //    this.ctx.moveTo(leftUp.x, leftUp.y);
        //    this.ctx.lineTo(rightBottom.x, leftUp.y);
        //    this.ctx.lineTo(rightBottom.x, rightBottom.y);
        //    this.ctx.lineTo(leftUp.x, rightBottom.y);
        //    this.ctx.lineTo(leftUp.x, leftUp.y);
        //}
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.closePath();
    }

    this.drawCircle = function (edge) {
        var center = {x : edge.mStart.mX,
                      y : edge.mStart.mY};
                      
        var radius = edge.getLength()
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'black';
        this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    this.drawArc = function (edge, isFocus) {
        var center = {x : edge.mCenter.mX,
                      y : edge.mCenter.mY}
        var radius = edge.mRadius;
        var start  = edge.mStartAngle;
        var end    = edge.mStartAngle + edge.mArcAngle;
        
        var clock = Math.sign(edge.mArcAngle);
        
        var start_normal = start;
        var end_normal = end;
        while (start_normal > Math.PI * 2) {
            start_normal -= Math.PI * 2;
        }
        
        while (start_normal < 0) {
            start_normal += Math.PI * 2;
        }
        
        while (end_normal > Math.PI * 2) {
            end_normal -= Math.PI * 2;
        }
        
        while (end_normal < 0) {
            end_normal += Math.PI * 2;
        }
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = !!isFocus ? "blue" : 'black';
        this.ctx.arc(center.x, center.y, radius, start, end, clock < 0 ? true : false);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    this.drawDashLine = function (p0, p1) {
        this.ctx.beginPath();
        var dashLen = 5,
            xpos = p1.x - p0.x,
            ypos = p1.y - p0.y,
            numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
        for (var i = 0; i < numDashes; i++) {
            if (i % 2 === 0) {
                this.ctx.moveTo(p0.x + (xpos / numDashes) * i, p0.y + (ypos / numDashes) * i);
            } else {
                this.ctx.lineTo(p0.x + (xpos / numDashes) * i, p0.y + (ypos / numDashes) * i);
            }
        }
        this.ctx.strokeStyle = 'black';
        this.ctx.closePath();
    }
    
    this.clear = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}