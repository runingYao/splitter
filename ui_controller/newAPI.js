window.addEventListener("keyup", test);
canvas._canvas.addEventListener("mousedown", function(e) {
	tools.drawCrosshairs({
		x: e.offsetX,
		y: e.offsetY
	}, [{
		x: 0,
		y: 0
	}, {
		x: 800,
		y: 0
	}, {
		x: 800,
		y: 800
	}, {
		x: 0,
		y: 800
	}]);
	tools.drawCorner({
		mX: e.offsetX,
		mY: e.offsetY
	}, 10, "#a2a2a2", true);
});

function test(e) {
	if(e.keyCode == 49) {
		tools.drawDimensions({
			x: 50,
			y: 400
		}, {
			x: 300,
			y: 400
		},null, true, function(v) {
			alert(v)
		});

		tools.drawSegment({
			x: 200,
			y: 700
		}, {
			x: 500,
			y: 700
		});

		tools.drawDimensions({
			x: 600,
			y: 400
		}, {
			x: 700,
			y: 100
		});
		tools.drawDimensions({
			x: 50,
			y: 100
		}, {
			x: 500,
			y: 400
		});
	}
	if(e.keyCode == 89)
		tools.drawCorner({
			mX: 301,
			mY: -297
		});
	if(e.keyCode == 76) //L
		tools.drawCrosshairs({
			x: 401,
			y: 401
		}, [{
			x: 0,
			y: 0
		}, {
			x: 410,
			y: 0
		}, {
			x: 800,
			y: 800
		}, {
			x: 0,
			y: 800
		}]);
}

DrawingTools = function(ctx) {
	this.ctx = ctx;

	this._getIntersectionForBorder = function(sp, ep, borderPoints) {


		for(var i = 0, length = borderPoints.length; i < length; i++) {
			var next = borderPoints[(i + 1) % length];
			var p = this._segmentsIntr(borderPoints[i], next, sp, ep);
			if(p && this._equals(sp, ep, sp, p)) return p;
		}
	}
	this._equals = function(a, b, c, d) {
		var v1 = this._mormalize(a, b),
			v2 = this._mormalize(c, d);
		return(Math.abs(v1.x - v2.x) < 0.00001 && Math.abs(v1.y - v2.y) < 0.00001);
	}

	this._getPointsDistance = function(p0, p1) {
		var dx = p0.x - p1.x,
			dy = p0.y - p1.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	
	this._rotatePoint = function(a, o, angle) {
		return {
			mX: (a.x - o.mX) * Math.cos(angle) - (a.y - o.mY) * Math.sin(angle) + o.mX,
			mY: (a.x - o.mX) * Math.sin(angle) + (a.y - o.mY) * Math.cos(angle) + o.mY
		}
	}
	
	this._isClose = function(a, b) {
		return Math.abs(a.mX - b.mX) <= 1 && Math.abs(a.mY - b.mY) <= 1;
	}
	
	this._rotateVector = function(sp, vec, radian) {
		var q = new Quaternion();
		q.setFromAxisAngle(new Vector3(0, 0, 1), radian);
		var midVec = new Vector3(vec.x, vec.y, 0);
		midVec.applyQuaternion(q);
		midVec.normalize();
		return midVec;
	}
	
	this._segmentsIntr = function(a, b, c, d) {

		// 三角形abc 面积的2倍 
		var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
	
		// 三角形abd 面积的2倍 
		var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);
	
		// 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理); 
		//		if(area_abc * area_abd >= 0) {
		//			return false;
		//		}
	
		// 三角形cda 面积的2倍 
		var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
		// 三角形cdb 面积的2倍 
		// 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出. 
		var area_cdb = area_cda + area_abc - area_abd;
		if(area_cda * area_cdb >= 0) {
			return false;
		}
	
		//计算交点坐标 
		var t = area_cda / (area_abd - area_abc);
		var dx = t * (b.x - a.x),
			dy = t * (b.y - a.y);
		return {
			x: a.x + dx,
			y: a.y + dy
		};
	
	}

	this._mormalize = function(a, b) {
		var vec = {
			x: a.x - b.x,
			y: a.y - b.y
		};
		var scalar = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
		if(scalar !== 0) {
	
			var invScalar = 1 / scalar;
			vec.x *= invScalar;
			vec.y *= invScalar;
	
		} else {
	
			vec.x = 0;
			vec.y = 0;
		}
	
		return vec;
	}

	 this._isInPolygon = function(p, poly) {
		var px = p.x,
			py = p.y,
			flag = false;
	
		for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
			var sx = poly[i].x,
				sy = poly[i].y,
				tx = poly[j].x,
				ty = poly[j].y
	
			// 点与多边形顶点重合
			if((sx === px && sy === py) || (tx === px && ty === py)) {
				return true
			}
	
			// 判断线段两端点是否在射线两侧
			if((sy < py && ty >= py) || (sy >= py && ty < py)) {
				// 线段上与射线 Y 坐标相同的点的 X 坐标
				var x = sx + (py - sy) * (tx - sx) / (ty - sy)
	
				// 点在多边形的边上
				if(x === px) {
					return true
				}
	
				// 射线穿过多边形的边界
				if(x > px) {
					flag = !flag
				}
			}
		}
	
		// 射线穿过多边形边界的次数为奇数时点在多边形内
		return flag;
	}
	 
	this._computeAngle = function(p1, p2) {
		var x = Math.abs(p1.x - p2.x);
		var y = Math.abs(p1.y - p2.y);
		var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		var cos = y / z;
		var radina = Math.acos(cos); //用反三角函数求弧度
		var angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度
	
		if(p2.x > p1.x && p2.y > p1.y) { //鼠标在第四象限
			angle = 180 - angle;
		}
	
		if(p2.x == p1.x && p2.y > p1.y) { //鼠标在y轴负方向上
			angle = 180;
		}
	
		if(p2.x > p1.x && p2.y == p1.y) { //鼠标在x轴正方向上
			angle = 90;
		}
	
		if(p2.x < p1.x && p2.y > p1.y) { //鼠标在第三象限
			angle = 180 + angle;
		}
	
		if(p2.x < p1.x && p2.y == p1.y) { //鼠标在x轴负方向
			angle = 270;
		}
	
		if(p2.x < p1.x && p2.y < p1.y) { //鼠标在第二象限
			angle = 360 - angle;
		}
	
		return angle - 90;
	}
	
	this._makeTextInput = function(pos, value, callbackFun){
		var tt = document.createElement("input");
		tt.className = "editText";
		canvas._canvas.parentElement.appendChild(tt);
		tt.style.left = pos.x - 20 + "px";
		tt.style.top = pos.y - 10 + "px";
		if(value)
			tt.value = value;
		if(callbackFun) {
			tt.addEventListener("keyup", function(e) {
				if(e.keyCode == 13 && !isNaN(tt.value))
					callbackFun(parseInt(tt.value));
			});
		}
		return tt;
	}
};

/**
 * 绘制圆点
 * @param {Object} point 坐标
 * @param {Object} radius 半径
 * @param {Object} color 填充颜色
 * @param {Object} isHollow 是否为空心，默认为实心
 */
DrawingTools.prototype.drawCorner = function(point, radius, color, isHollow) {
	color = color || "#000";
	if(radius == undefined) radius = 10;

	this.ctx.strokeStyle = color;
	this.ctx.beginPath();
	this.ctx.arc(point.mX || point.x, point.mY || point.y, 5, 0, Math.PI * 2, true);

	if(!isHollow) {
		this.ctx.closePath();
		this.ctx.fillStyle = color;
		this.ctx.fill();
	} else
		this.ctx.stroke();
}

/***
 * 绘制多边形
 * @param {Object} output
 */
DrawingTools.prototype.drawArea = function(output) {
	return;
	this.ctx.beginPath();
	var prevPoint;
	var counterclockwise;
	for(var i = 0, length = output.mOutline.edges.length; i < length; i++) {
		var edge = output.mOutline.edges[i],
			next = output.mOutline.edges[(i + 1) % length],
			nextSP = next.mStart,
			nextEP = next.mEnd,
			p = undefined;

		if(next.constructor == MyCurve) {
			nextSP = this._rotatePoint({
				x: next.mCenter.mX + next.mRadius,
				y: next.mCenter.mY
			}, next.mCenter, next.mStartAngle);
			nextEP = this._rotatePoint({
				x: next.mCenter.mX + next.mRadius,
				y: next.mCenter.mY
			}, next.mCenter, next.mStartAngle + next.mArcAngle);
		}

		if(edge.constructor == MyEdge) {
			//			if(!this._isClose(edge.mStart,nextSP) && !this._isClose(edge.mEnd,nextSP) && !this._isClose(edge.mStart,nextEP) && !this._isClose(edge.mEnd,nextEP))
			//              continue;

			if(prevPoint) {
				if(this._isClose(edge.mStart, prevPoint))
					p = edge.mEnd;
				else
					p = edge.mStart;
			} else {
				if(this._isClose(edge.mStart, nextSP) || this._isClose(edge.mStart, nextEP))
					p = edge.mStart;
				else if(this._isClose(edge.mEnd, nextEP) || this._isClose(edge.mEnd, nextSP))
					p = edge.mEnd;
			}

			if(p) {
				prevPoint = p;
				if(i == 0)
					this.ctx.moveTo(p.mX, p.mY);
				else
					this.ctx.lineTo(p.mX, p.mY);
			}
		} else if(edge.constructor == MyCurve) {
			var sp = this._rotatePoint({
					x: edge.mCenter.mX + edge.mRadius,
					y: edge.mCenter.mY
				}, edge.mCenter, edge.mStartAngle),
				ep = this._rotatePoint({
					x: edge.mCenter.mX + edge.mRadius,
					y: edge.mCenter.mY
				}, edge.mCenter, edge.mStartAngle + edge.mArcAngle);

			if(!this._isClose(sp, nextSP) && !this._isClose(ep, nextSP) && !this._isClose(sp, nextEP) && !this._isClose(ep, nextEP))
				continue;
			var endAngle = edge.mArcAngle + edge.mStartAngle;
			if(prevPoint) {
				if(this._isClose(prevPoint, sp)) {
					this.ctx.arc(edge.mCenter.mX, edge.mCenter.mY, edge.mRadius, edge.mStartAngle, endAngle, endAngle > edge.mStartAngle ? false : true); //false,endAngle < 0 ? true:false
					prevPoint = ep;
				} else {
					this.ctx.arc(edge.mCenter.mX, edge.mCenter.mY, edge.mRadius, endAngle, edge.mStartAngle, endAngle > edge.mStartAngle ? true : false); //true,endAngle < 0 ? false:true
					prevPoint = sp;
				}
			} else {
				if(!this._isClose(ep, nextSP) && !this._isClose(ep, nextEP)) {
					this.ctx.arc(edge.mCenter.mX, edge.mCenter.mY, edge.mRadius, endAngle, edge.mStartAngle, endAngle > edge.mStartAngle ? true : false); //true,endAngle < 0 ? false:true
					prevPoint = sp;
				} else {
					this.ctx.arc(edge.mCenter.mX, edge.mCenter.mY, edge.mRadius, edge.mStartAngle, endAngle, endAngle > edge.mStartAngle ? false : true); //false,endAngle < 0 ? true:false
					prevPoint = ep;
				}
			}
		}
	}
	this.ctx.fillStyle = 'rgba(2,100,30,0.5)';
	this.ctx.fill();
	this.ctx.closePath();

	if(output.mHoles.length > 0) {

		this.ctx.globalCompositeOperation = "destination-out";
		for(var i = 0; i < output.mHoles.length; i++) {
			var prevPos = undefined,
				next, nextSP, nextEP;
			var hole = output.mHoles[i];
			this.ctx.beginPath();
			for(var j = 0; j < hole.edges.length; j++) {
				var hedge = hole.edges[j];
				next = hole.edges[(j + 1) % hole.edges.length];
				nextSP = next.mStart;
				nextEP = next.mEnd;

				if(next.constructor == MyCurve) {
					nextSP = this._rotatePoint({
						x: next.mCenter.mX + next.mRadius,
						y: next.mCenter.mY
					}, next.mCenter, next.mStartAngle);
					nextEP = this._rotatePoint({
						x: next.mCenter.mX + next.mRadius,
						y: next.mCenter.mY
					}, next.mCenter, next.mStartAngle + next.mArcAngle);
				}

				if(hedge.constructor == MyEdge) {
					if(j == 0) this.ctx.moveTo(hedge.mStart.mX, hedge.mStart.mY);
					else this.ctx.lineTo(hedge.mStart.mX, hedge.mStart.mY);
					this.ctx.lineTo(hedge.mEnd.mX, hedge.mEnd.mY);
					prevPos = hedge.mEnd;
					//if (j == hole.edges.length - 1) this.ctx.lineTo(hedge.mEnd.mX, hedge.mEnd.mY);
				} else if(hedge.constructor == MyCurve) {
					var sp = this._rotatePoint({
							x: hedge.mCenter.mX + hedge.mRadius,
							y: hedge.mCenter.mY
						}, hedge.mCenter, hedge.mStartAngle),
						ep = this._rotatePoint({
							x: hedge.mCenter.mX + hedge.mRadius,
							y: hedge.mCenter.mY
						}, hedge.mCenter, hedge.mStartAngle + hedge.mArcAngle);
					if(!this._isClose(sp, nextSP) && !this._isClose(ep, nextSP) && !this._isClose(sp, nextEP) && !this._isClose(ep, nextEP))
						continue;
					var endAngle = hedge.mArcAngle + hedge.mStartAngle;

					if((prevPos != undefined && !this._isClose(prevPos, sp))) { //|| (prevPos == undefined && !this._isClose(ep, nextSP) && !this._isClose(ep, nextEP))
						this.ctx.arc(hedge.mCenter.mX, hedge.mCenter.mY, hedge.mRadius, endAngle, hedge.mStartAngle, endAngle > hedge.mStartAngle ? true : false);
						prevPos = sp;
					} else {
						this.ctx.arc(hedge.mCenter.mX, hedge.mCenter.mY, hedge.mRadius, hedge.mStartAngle, endAngle, false); //endAngle > edge.mStartAngle ? true:false
						prevPos = ep;
					}
				}
			}

			this.ctx.fillStyle = '#FFF';
			this.ctx.fill();
			this.ctx.closePath();

		}
		this.ctx.globalCompositeOperation = "source-over";
	}

}
/**
 * 绘制制定点的十字线并标记与区域的边界的距离
 * @param {Object} point
 * @param {Array} borderPoints 边界点集合
 */
DrawingTools.prototype.drawCrosshairs = function(point, borderPoints) {
	if(!this._isInPolygon(point, borderPoints))
		return;
	var hsp = this._getIntersectionForBorder(point, {
			x: point.x - 1000,
			y: point.y
		}, borderPoints),
		hep = this._getIntersectionForBorder(point, {
			x: point.x + 1000,
			y: point.y
		}, borderPoints),
		vsp = this._getIntersectionForBorder(point, {
			x: point.x,
			y: point.y - 1000
		}, borderPoints),
		vep = this._getIntersectionForBorder(point, {
			x: point.x,
			y: point.y + 1000
		}, borderPoints);

	this.ctx.strokeStyle = '#717070'
	this.ctx.moveTo(hsp.x, hsp.y + 0.5);
	this.ctx.lineTo(hep.x, hep.y + 0.5);
	this.ctx.stroke();

	this.ctx.moveTo(vsp.x + 0.5, vsp.y);
	this.ctx.lineTo(vep.x + 0.5, vep.y);
	this.ctx.stroke();

	var ll = point.x - hsp.x,
		rl = hep.x - point.x,
		tl = point.y - vsp.y,
		bl = vep.y - point.y;
	//this.ctx.fillStyle = '#FFF';
	this.ctx.strokeStyle = '#000'; //设置笔触的颜色
	this.ctx.font = "bold 14px 微软雅黑"; //设置字体
	this.ctx.textBaseline = 'middle'; //在绘制文本时使用的当前文本基线
	this.ctx.textAlign = 'center';
	this.ctx.fillText(ll, hsp.x + ll / 2, point.y); //设置文本内容
	this.ctx.fillText(rl, point.x + rl / 2, point.y); //设置文本内容
	this.ctx.fillText(tl, point.x, vsp.y + tl / 2); //设置文本内容
	this.ctx.fillText(bl, point.x, point.y + bl / 2); //设置文本内容

}

/**
 * 绘制距离标记线
 * @param {Object} p0 起始点
 * @param {Object} p1 结束点
 * @param {Object} color 线条颜色，默认为灰色
 * @param {Object} editable 是否可编辑，默认为不可编辑
 * @param {Object} callbackFun 编辑回调函数
 */
DrawingTools.prototype.drawDimensions = function(p0, p1,color, editable, callbackFun) {
	color = color || '#a2a2a2';
	var lines = [
		[p0, p1]
	];
	var sp = new Vector3(p0.x, p0.y, 0),
		ep = new Vector3(p1.x, p1.y, 0),
		vec0 = new Vector3().subVectors(sp, ep).normalize(),
		vec1 = new Vector3().subVectors(ep, sp).normalize();

	//端点垂直线
	lines.push([this._rotateVector(sp, vec0, Math.PI / 2).multiplyScalar(10).add(sp), this._rotateVector(sp, vec0, -Math.PI / 2).multiplyScalar(10).add(sp)]);
	lines.push([this._rotateVector(sp, vec1, Math.PI / 2).multiplyScalar(10).add(ep), this._rotateVector(sp, vec1, -Math.PI / 2).multiplyScalar(10).add(ep)]);
	//端点斜线
	lines.push([this._rotateVector(sp, vec0, -Math.PI / 4).multiplyScalar(10).add(sp), this._rotateVector(sp, vec0, -Math.PI / 4).multiplyScalar(-10).add(sp)]);
	lines.push([this._rotateVector(sp, vec0, -Math.PI / 4).multiplyScalar(10).add(ep), this._rotateVector(sp, vec0, -Math.PI / 4).multiplyScalar(-10).add(ep)]);

	this.ctx.strokeStyle = color;
	for(var i = 0; i < lines.length; i++) {
		lines[i][0].x = Math.round(lines[i][0].x);
		lines[i][0].y = Math.round(lines[i][0].y);
		lines[i][1].x = Math.round(lines[i][1].x);
		lines[i][1].y = Math.round(lines[i][1].y);
		if(lines[i][0].x % 2 == 0)
			lines[i][0].x += 0.5;
		if(lines[i][0].y % 2 == 0)
			lines[i][0].y += 0.5;
		if(lines[i][1].x % 2 == 0)
			lines[i][1].x += 0.5;
		if(lines[i][1].y % 2 == 0)
			lines[i][1].y += 0.5;
		this.ctx.moveTo(lines[i][0].x, lines[i][0].y);
		this.ctx.lineTo(lines[i][1].x, lines[i][1].y)

	}

	this.ctx.stroke();
	var center = {
			x: (p0.x + p1.x) / 2,
			y: (p0.y + p1.y) / 2
		},
		length = Math.round(this._getPointsDistance(p0, p1));
	if(!editable) {
		var ctx = this.ctx,
		scope = this;
		setTimeout(function() {
			ctx.save();
			ctx.translate(center.x, center.y);
			ctx.rotate(scope._computeAngle(p0, p1) * Math.PI / 180);
			//长度
			ctx.fillStyle = "#FFF";
			ctx.fillRect(-ctx.measureText(length).width / 2, -6, ctx.measureText(length).width, 12);
			ctx.fillStyle = '#000';
			ctx.font = "12px 微软雅黑";
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';
			ctx.fillText(length, 0, 0);
			ctx.restore();
			ctx.translate(0, 0);

		}, 20);
	} else {
		var tt = this._makeTextInput(center, length, callbackFun);
		return tt;
	}
}

/***
 * 绘制带端点的线段
 * @param {Object} p0 起始点
 * @param {Object} p1 结束点
 * @param {Object} callbackFun 编辑回调函数
 */
DrawingTools.prototype.drawSegment = function(p0, p1, callbackFun) {
	this.drawDashLine(p0, p1);
	this.drawCorner(p0, 5, "#a2a2a2");
	this.drawCorner(p1, 5, "#a2a2a2", true);
	var center = new Vector3((p0.x+p1.x)/2, (p0.y+p1.y)/2, 0);
	var pos = this._rotateVector(center,new Vector3().subVectors(new Vector3(p0.x,p0.y,0),center).normalize(),Math.PI / 2).multiplyScalar(20).add(center);
	var tt = this._makeTextInput(pos, Math.round(this._getPointsDistance(p0, p1)), callbackFun);
	return tt;
}

/**
 * 绘制虚线
 * @param {Object} p0 起始点
 * @param {Object} p1 结束点
 */
DrawingTools.prototype.drawDashLine = function(p0, p1) {
	var dashLen = 5,
		xpos = p1.x - p0.x,
		ypos = p1.y - p0.y,
		numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
	for(var i = 0; i < numDashes; i++) {
		if(i % 2 === 0) {
			this.ctx.moveTo(p0.x + (xpos / numDashes) * i, p0.y + (ypos / numDashes) * i);
		} else {
			this.ctx.lineTo(p0.x + (xpos / numDashes) * i, p0.y + (ypos / numDashes) * i);
		}
	}
	this.ctx.stroke();
}







Vector3 = function(x, y, z) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

};
Vector3.prototype = {
	subVectors: function(a, b) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	},
	applyQuaternion: function(q) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;

		// calculate quat * vector

		var ix = qw * x + qy * z - qz * y;
		var iy = qw * y + qz * x - qx * z;
		var iz = qw * z + qx * y - qy * x;
		var iw = -qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

		return this;

	},
	normalize: function() {
		var scalar = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(scalar !== 0) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;

		}

		return this;
	},
	applyQuaternion: function(q) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;

		// calculate quat * vector

		var ix = qw * x + qy * z - qz * y;
		var iy = qw * y + qz * x - qx * z;
		var iz = qw * z + qx * y - qy * x;
		var iw = -qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

		return this;

	},
	multiplyScalar: function(scalar) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	},
	add: function(v, w) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	}
};

Quaternion = function(x, y, z, w) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = (w !== undefined) ? w : 1;

	this.setFromAxisAngle = function(axis, angle) {
		var halfAngle = angle / 2,
			s = Math.sin(halfAngle);

		this.x = axis.x * s;
		this.y = axis.y * s;
		this.z = axis.z * s;
		this.w = Math.cos(halfAngle);
		return this;

	}

};


var tools = new DrawingTools(canvas._renderer.ctx);
