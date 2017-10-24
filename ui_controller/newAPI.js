var polytree;
window.addEventListener("keyup", test);
var index = 0;
function test(e) {
    if (e.keyCode == 49) {
        if (index >= canvas._outputResult.length)
            index = 0;
        drawArea(canvas._outputResult[index]);
        index++;
    }
    else if (e.keyCode == 89)
        drawCorner({mX: 400, mY: 400});
}
//point包含x和y坐标，要求画一个蓝色的实心圆，以表示角落点
function drawCorner(point, radius) {
    if (radius == undefined)radius = 10;
    var ctx = canvas._renderer.ctx;
    ctx.beginPath();
    ctx.arc(point.mX, point.mY, 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "#000";
    ctx.fill();
}
/*
 //画一个高亮的区域，

 //polytree结构定义如下：
 function MyPoint() {
 this.mX; //number
 this.mY; //number
 }

 function MyEdge() {
 this.mStart; //MyPoint
 this.mEnd;   //MyPoint
 }

 function MyCurve() {
 this.mCenter;       //MyPoint
 this.mRadius;       //number
 this.mStartAngle;   //number
 this.mArcAngle;     //number
 }

 var polytree = {
 mOutline : [],           // 一维数组
 mHoles   : [[],[],[]]    // 二维数组
 }

 一个polytree包含一个外边框mOutline，为一维数组，每一项都是MyEdge或者MyCurve中的某一项,可以理解成一个polygon
 而其中的mHoles则为一个二维数组，其中每一项都是一个polygon，包含一列边，可以任意为MyEdge或者MyCurve
 其中要保证每一个Edge的尾部和下一个Edge的头部是一致的，且关系为闭合的（由数学库保证）
 */

function drawArea(output) {

    var ctx = canvas._renderer.ctx;
    //console.log(output);

    ctx.beginPath();
    var prevPoint;
    var counterclockwise;
    for (var i = 0, length = output.mOutline.edges.length; i < length; i++) {
        var edge = output.mOutline.edges[i],
            next = output.mOutline.edges[(i + 1) % length],
            nextSP = next.mStart,
            nextEP = next.mEnd,
            p = undefined;

        if (next.constructor == MyCurve) {
            nextSP = rotatePoint({
                x: next.mCenter.mX + next.mRadius,
                y: next.mCenter.mY
            }, next.mCenter, next.mStartAngle);
            nextEP = rotatePoint({
                x: next.mCenter.mX + next.mRadius,
                y: next.mCenter.mY
            }, next.mCenter, next.mStartAngle + next.mArcAngle);
        }

        if (edge.constructor == MyEdge) {


            if (prevPoint) {
                if (isClose(edge.mStart, prevPoint))
                    p = edge.mEnd;
                else
                    p = edge.mStart;
            } else {
                if (isClose(edge.mStart, nextSP) || isClose(edge.mStart, nextEP))
                    p = edge.mStart;
                else if (isClose(edge.mEnd, nextEP) || isClose(edge.mEnd, nextSP))
                    p = edge.mEnd;
            }

            if (p) {
                prevPoint = p;
                if (i == 0)
                    ctx.moveTo(p.mX, p.mY);
                else
                    ctx.lineTo(p.mX, p.mY);
            }
        } 
        else if (edge.constructor == MyCurve) {
            var sp = rotatePoint({
                    x: edge.mCenter.mX + edge.mRadius,
                    y: edge.mCenter.mY
                }, edge.mCenter, edge.mStartAngle),
                ep = rotatePoint({
                    x: edge.mCenter.mX + edge.mRadius,
                    y: edge.mCenter.mY
                }, edge.mCenter, edge.mStartAngle + edge.mArcAngle);
            var endAngle = edge.mArcAngle + edge.mStartAngle;
            if (prevPoint) {
                if (isClose(prevPoint, sp)) {
                    ctx.arc(edge.mCenter.mX, edge.mCenter.mY, edge.mRadius, edge.mStartAngle, endAngle, endAngle > edge.mStartAngle ? false : true);//false,endAngle < 0 ? true:false
                    prevPoint = ep;
                }
                else {
                    ctx.arc(edge.mCenter.mX, edge.mCenter.mY, edge.mRadius, endAngle, edge.mStartAngle, endAngle > edge.mStartAngle ? true : false);//true,endAngle < 0 ? false:true
                    prevPoint = sp;
                }
            } else {
                if (!isClose(ep, nextSP) && !isClose(ep, nextEP)) {
                    ctx.arc(edge.mCenter.mX, edge.mCenter.mY, edge.mRadius, endAngle, edge.mStartAngle, endAngle > edge.mStartAngle ? true : false);//true,endAngle < 0 ? false:true
                    prevPoint = sp;
                } else {
                    ctx.arc(edge.mCenter.mX, edge.mCenter.mY, edge.mRadius, edge.mStartAngle, endAngle, endAngle > edge.mStartAngle ? false : true);//false,endAngle < 0 ? true:false
                    prevPoint = ep;
                }
            }
        }
    }
    ctx.fillStyle = 'rgba(2,100,30,0.5)';
    ctx.fill();
    ctx.closePath();

    if (output.mHoles.length > 0) {

        ctx.globalCompositeOperation = "destination-out";
        for (var i = 0; i < output.mHoles.length; i++) {
            var prevPos=undefined, next, nextSP, nextEP;
            var hole = output.mHoles[i];
            var isCurves = isAllCurves(hole.edges);
            ctx.beginPath();
            for (var j = 0; j < hole.edges.length; j++) {
                var hedge = hole.edges[j];
                next = hole.edges[(j + 1) % hole.edges.length];
                nextSP = next.mStart;
                nextEP = next.mEnd;

                if (next.constructor == MyCurve) {
                    nextSP = rotatePoint({
                        x: next.mCenter.mX + next.mRadius,
                        y: next.mCenter.mY
                    }, next.mCenter, next.mStartAngle);
                    nextEP = rotatePoint({
                        x: next.mCenter.mX + next.mRadius,
                        y: next.mCenter.mY
                    }, next.mCenter, next.mStartAngle + next.mArcAngle);
                }

                if (hedge.constructor == MyEdge) {
                    if (j == 0) ctx.moveTo(hedge.mStart.mX, hedge.mStart.mY);
                    else ctx.lineTo(hedge.mStart.mX, hedge.mStart.mY);
                    ctx.lineTo(hedge.mEnd.mX, hedge.mEnd.mY);
                    prevPos = hedge.mEnd;
                    //if (j == hole.edges.length - 1) ctx.lineTo(hedge.mEnd.mX, hedge.mEnd.mY);
                } else if (hedge.constructor == MyCurve) {
                    var sp = rotatePoint({
                            x: hedge.mCenter.mX + hedge.mRadius,
                            y: hedge.mCenter.mY
                        }, hedge.mCenter, hedge.mStartAngle),
                        ep = rotatePoint({
                            x: hedge.mCenter.mX + hedge.mRadius,
                            y: hedge.mCenter.mY
                        }, hedge.mCenter, hedge.mStartAngle + hedge.mArcAngle);
                    var endAngle = hedge.mArcAngle + hedge.mStartAngle;
                    var counterclockwise = endAngle < 0 ? true : false;
                    if (!isCurves) counterclockwise = endAngle > edge.mStartAngle ? true : false;

                    if ((prevPos != undefined && !isClose(prevPos, sp)) ){//|| (prevPos == undefined && !isClose(ep, nextSP) && !isClose(ep, nextEP))
                        ctx.arc(hedge.mCenter.mX, hedge.mCenter.mY, hedge.mRadius, endAngle, hedge.mStartAngle, false);
                        prevPos = sp;
                    }
                    else {
                        ctx.arc(hedge.mCenter.mX, hedge.mCenter.mY, hedge.mRadius, hedge.mStartAngle, endAngle, false);//endAngle > edge.mStartAngle ? true:false
                        prevPos = ep;
                    }
                }
            }

            ctx.fillStyle = '#FFF';
            ctx.fill();
            ctx.closePath();

        }
        ctx.globalCompositeOperation = "source-over";
    }

}

function rotatePoint(a, o, angle) {
    return {
        mX: (a.x - o.mX) * Math.cos(angle) - (a.y - o.mY) * Math.sin(angle) + o.mX,
        mY: (a.x - o.mX) * Math.sin(angle) + (a.y - o.mY) * Math.cos(angle) + o.mY
    }
}
function isClose(a, b) {
    return Math.abs(a.mX - b.mX) <= 1 && Math.abs(a.mY - b.mY) <= 1;
}
function isAllCurves(edges) {
    for (var j = 0; j < edges.length; j++) {
        if (edges[j].constructor == MyEdge)return false;
    }
    return true;
}