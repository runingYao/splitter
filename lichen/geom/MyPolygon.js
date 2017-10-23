function MyPolygon(param1) {
    if(param1 == null || param1 == undefined)
    {
        this.mVertices = [];
    }
    else
    {
        this.mVertices = param1.concat();
    }
    this.m_IsClockWise;
}


MyPolygon.TOLERENCE = 1.0E-6;
MyPolygon.const_ONE = 1;
MyPolygon.CONST_0_01 = 0.01;

MyPolygon.getX_Intersections1 = function(param1, param2, param3, param4)
{
    //var polygon:my_polygon = null;
    if (param4 == null || param4 == undefined) {
        param4 = 1.0E-6;
    }
    //param4 = param4 || 1.0E-6;
    var polygons = param1;
    var y = param2;
    var includeEnds = param3;
    var tolerance = param4;
    var intersections = [];//:Vector.<Number> = new Vector.<Number>();
    //for each(polygon in polygons)
    for(var i = 0; i < polygons.length; i++)
    {
        ArrayHelperClass.ifHaveSameTheLaterOne(intersections,polygons[i].getX_Intersections1(y,includeEnds,tolerance));
    }
    intersections.sort(function(param1, param2)
    {
        return MyMath.sign(param1 - param2);
    });
    return intersections;
}

MyPolygon.isSamePixel = function(param1, param2)
{
    return param1.isClose(param2,1);
}

MyPolygon.getPolygonArea = function(param1)
{
    var _loc2_ = 0;
    var _loc3_ = param1.length;
    if(_loc3_ < 3)
    {
        return 0;
    }
    var _loc4_ = 0;
    var _loc5_ = 1;
    while(_loc4_ < _loc3_)
    {
        _loc2_ = _loc2_ + param1[_loc4_].mX * param1[_loc5_].mY - param1[_loc4_].mY * param1[_loc5_].mX;
        _loc4_++;
        _loc5_ = (_loc4_ + 1) % _loc3_;
    }
    return 0.5 * _loc2_;
}
/*
MyPolygon.§---____-__---§(param1:Vector.<Vec2>) : Number
{
return Math.abs(getPolygonArea(param1));
}
*/
MyPolygon.isDegenerate = function(param1)
{
    return MyPolygon.getPolygonArea(param1) == 0;
}

MyPolygon.isClockWise = function(param1)
{
    return MyPolygon.getPolygonArea(param1) < 0;
}

MyPolygon.isCountClockWise = function(param1)
{
    return MyPolygon.getPolygonArea(param1) > 0;
}

/*
MyPolygon.§-_-_-___-_--§(param1:Vector.<Vec2>, param2:Vec2) : Vector.<Vec2>
{
var _loc4_:Vec2 = null;
var _loc3_:Vector.<Vec2> = new Vector.<Vec2>();
for each(_loc4_ in param1)
{
_loc3_.push(Vec2.sub(_loc4_,param2));
}
return _loc3_;
}
*/
      
/*
MyPolygon.prototype.§-__--__-___§() : void
{
if(!this.isClockWise())
{
this.mVertices.reverse();
}
}

MyPolygon.prototype.§--_---___--_§() : void
{
if(this.isClockWise())
{
this.mVertices.reverse();
}
}
*/


MyPolygon.prototype.isClockWise = function()
{
    this.m_IsClockWise = MyPolygon.getPolygonArea(this.mVertices) < 0;
    return this.m_IsClockWise;
}

MyPolygon.prototype.isDegenerate = function()
{
    return MyPolygon.getPolygonArea(this.mVertices) == 0;
}

MyPolygon.prototype.clear = function()
{
    this.mVertices = [];
    this.mVertices.length = 0;
}

MyPolygon.prototype.getSize = function()
{
    return this.mVertices.length;
}

MyPolygon.prototype.addVertex = function(param1)
{
    ArrayHelperClass.addItem(this.mVertices,param1);
    return this;
}

MyPolygon.prototype.addVertices = function(param1)
{
    ArrayHelperClass.addItems(this.mVertices,param1);
    return this;
}
/*
MyPolygon.prototype.§-_--___-___-§ = function(param1:Vec2) : void
{
var _loc2_:Vec2 = null;
for each(_loc2_ in this.mVertices)
{
if(isSamePixel(_loc2_,param1))
{
return;
}
}
this.mVertices.push(param1);
}

MyPolygon.prototype.§-__-----___-_§ = function(param1:int) : Vec2
{
return this.mVertices[MyMath.§-_-_--___---_§(param1,this.getSize())];
}

MyPolygon.prototype.§-__-_-_-_----_§(param1:int) : Number
{
var _loc2_:Vec2 = Vec2.sub(this.§-__-----___-_§(param1 - 1),this.§-__-----___-_§(param1));
var _loc3_:Vec2 = Vec2.sub(this.§-__-----___-_§(param1 + 1),this.§-__-----___-_§(param1));
var _loc4_:Number = Angle.sub(Vec2.angle(_loc3_),Vec2.angle(_loc2_));
if(this.m_IsClockWise == false)
{
_loc4_ = Math.PI * 2 - _loc4_;
}
return _loc4_;
}

MyPolygon.prototype.§-__-_--_--_-_-§ = function(param1:int) : MyEdge
{
return new MyEdge(this.§-__-----___-_§(param1),this.§-__-----___-_§(param1 + 1));
}

MyPolygon.prototype.§-_--_____-§(param1:int) : Number
{
var _loc2_:Vec2 = this.§-__-----___-_§(param1);
var _loc3_:Vec2 = this.§-__-----___-_§(param1 + 1);
return _loc2_.distance(_loc3_);
}
*/

MyPolygon.prototype.getBoundingBox = function()
{
    if(this.mVertices == null || this.getSize() == 0)
    {
        return null;
    }
    var _loc1_ = new MyRect();
    _loc1_.includeValues(this.mVertices);
    return _loc1_;
}
/*

*/

MyPolygon.prototype.getGravity = function()
{
    var _loc8_ = NaN;
    var _loc1_ = 0;
    var _loc2_ = 0;
    var _loc3_ = this.mVertices.concat();
    var _loc4_ = MyPolygon.getPolygonArea(_loc3_);
    var _loc5_ = _loc3_.length;
    if(_loc5_ < 3)
    {
        return new Vec2();
    }
    var _loc6_ = 0;
    var _loc7_ = 1;
    while(_loc6_ < _loc5_)
    {
        _loc8_ = _loc3_[_loc6_].mX * _loc3_[_loc7_].mY - _loc3_[_loc7_].mX * _loc3_[_loc6_].mY;
        _loc1_ = _loc1_ + (_loc3_[_loc6_].mX + _loc3_[_loc7_].mX) * _loc8_;
        _loc2_ = _loc2_ + (_loc3_[_loc6_].mY + _loc3_[_loc7_].mY) * _loc8_;
        _loc6_++;
        _loc7_ = (_loc6_ + 1) % _loc5_;
    }
    return new Vec2(_loc1_,_loc2_).mulBy(1 / (_loc4_ * 6));
}

MyPolygon.prototype.getPolyCenter = function()
{
    return edgePointHelperClass.getCenter(this.mVertices);
}

MyPolygon.prototype.getValidGravityCenter = function()
{
    //var line = null;
    var longestPart = null;
    var i = 0;
    var x = NaN;
    var interval = null;
    var gravity = this.getGravity();
    
    if(this.containsExclusive(gravity))
    {
        return gravity;
    }
    
    var intersects = [];//:Vector.<Number> = new Vector.<Number>();
    var y = gravity.mY;
    
    var edges = this.getEdges();
    for(var j = 0; j < edges.length; j++){
        x = edges[j].getXFromY(y);
        if(!isNaN(x))
        {
            intersects.push(x);
        }
    }
    
    intersects.sort(function(param1, param2)
    {
        return MyMath.sign(param1 - param2);
    });
    
    longestPart = null;
    i = 0;
    while(i < intersects.length - 1)
    {
        if(intersects[i] != intersects[i + 1])
        {
            interval = new Interval(intersects[i],intersects[i + 1]);
            if(longestPart == null || interval.getLength() > longestPart.getLength())
            {
                longestPart = interval;
            }
        }
        i = i + 2;
    }
    if(longestPart == null)
    {
        return this.getPolyCenter();
    }
    return new Vec2(longestPart.getCenter(),gravity.mY);
}

MyPolygon.prototype.getX_Intersections1 = function(param1, param2, param3)
{
    if (param3 == null || param3 == undefined) {
        param3 = 1.0E-6;
    }
    //param3 = param3 || 1.0E-6;
    var start = null;
    var end = null;
    var xValue = NaN;
    var y = param1;
    var includeEnds = param2;
    var tolerance = param3;
    var points = this.mVertices;
    var pointSize = points.length;
    var intersections = [];//:Vector.<Number> = new Vector.<Number>();
    var i = 0;
    while(i < pointSize)
    {
        start = points[i];
        end = points[(i + 1) % pointSize];
        xValue = MyEdge.getXFromY(start,end,y,includeEnds,tolerance);
        if(!isNaN(xValue))
        {
            ArrayHelperClass.ifHasAndSave(intersections,xValue);
        }
        i++;
    }
    intersections.sort(function(param1, param2)
    {
        return MyMath.sign(param1 - param2);
    });
    return intersections;
}
//////////////////////////////////////////
MyPolygon.prototype.getX_Intersections2 = function(param1, param2, param3)
{
    if (param3 == null || param3 == undefined) {
        param3 = 1.0E-6;
    }
    //param3 = param3 || 1.0E-6;
    var start = null;
    var end = null;
    var xValue = NaN;
    var y = param1;
    var includeEnds = param2;
    var tolerance = param3;
    var points = this.mVertices;
    var pointSize = points.length;
    var intersections = []; //:Vector.<Number> = new Vector.<Number>();
    var i = 0;
    while(i < pointSize)
    {
        start = points[i];
        end = points[(i + 1) % pointSize];
        xValue = MyEdge.getXFromY(start,end,y,includeEnds,tolerance);
        if(!isNaN(xValue))
        {
            ArrayHelperClass.ifHasAndSave(intersections,xValue);
        }
        i++;
    }
    intersections.sort(function(param1, param2)
    {
        return MyMath.sign(param1 - param2);
    });
    
    var j = intersections.length - 1;
    while(j - 1 >= 0)
    {
        if(MyNumber.isEqual(intersections[j],intersections[j - 1],0.0001))
        {
            ArrayHelperClass.removeItemAt(intersections,j);
        }
        j--;
    }
    return intersections;
}
/*
MyPolygon.prototype.§---_--_-_-_--§ = function(param1:Vector.<my_polygon>) : Vec2
{
var _loc3_:Boolean = false;
var _loc4_:my_polygon = null;
var _loc8_:Number = NaN;
var _loc9_:Number = NaN;
var _loc2_:Vec2 = this.getValidGravityCenter();
for each(_loc4_ in param1)
{
if(_loc4_.contains(_loc2_))
{
_loc3_ = true;
break;
}
}
if(!_loc3_)
{
return _loc2_;
}
var _loc5_:Number = _loc2_.mY;
var _loc6_:Number = my_polygon.getX_Intersections1(param1,_loc5_,true)[0];
var _loc7_:Vector.<Number> = this.getX_Intersections1(_loc5_,true);
for each(_loc9_ in _loc7_)
{
if(_loc9_ >= _loc6_)
{
break;
}
_loc8_ = _loc9_;
}
if(isNaN(_loc8_))
{
LOG.error("getRealCentroidExclusive error");
return _loc2_;
}
return new Vec2(0.5 * (_loc8_ + _loc6_),_loc5_);
}

MyPolygon.prototype.§-_____--_____§() : Number
{
return §---____-__---§(this.mVertices);
}
*/
MyPolygon.prototype.getSignedArea = function()
{
    return MyPolygon.getPolygonArea(this.mVertices);
}

MyPolygon.prototype.getEdges = function()
{
    var _loc4_ = 0;
    var _loc1_ = [];//:Vector.<MyEdge> = new Vector.<MyEdge>();
    var _loc2_ = this.getSize();
    var _loc3_ = 0;
    while(_loc3_ < _loc2_)
    {
        _loc4_ = (_loc3_ + 1) % _loc2_;
        _loc1_.push(new MyEdge(this.mVertices[_loc3_],this.mVertices[_loc4_]));
        _loc3_++;
    }
    return _loc1_;
}
/*
MyPolygon.prototype.§-_-_____-_-_-§ = function() : Vector.<Number>
{
this.isClockWise();
var _loc1_:Vector.<Number> = new Vector.<Number>();
var _loc2_:int = this.getSize();
var _loc3_:int = 0;
while(_loc3_ < _loc2_)
{
_loc1_.push(this.§-__-_-_-_----_§(_loc3_));
_loc3_++;
}
return _loc1_;
}
*/
MyPolygon.prototype.polygonRemoveSame = function()
{
    edgePointHelperClass.removeSamePoint(this.mVertices, 1);
    return this;
}

MyPolygon.prototype.contains = function(param1)
{
    var _loc2_ = 0;
    var _loc3_ = 0;
    var _loc4_ = false;
    var _loc5_ = this.mVertices.length;
    _loc2_ = 0;
    _loc3_ = _loc5_ - 1;
    while(_loc2_ < _loc5_)
    {
        if( this.mVertices[_loc2_].mY > param1.mY != this.mVertices[_loc3_].mY > param1.mY && 
            param1.mX < (this.mVertices[_loc3_].mX - this.mVertices[_loc2_].mX) * (param1.mY - this.mVertices[_loc2_].mY) / (this.mVertices[_loc3_].mY - this.mVertices[_loc2_].mY) + this.mVertices[_loc2_].mX)
        {
            _loc4_ = !_loc4_;
        }
        _loc3_ = _loc2_++;
    }
    return _loc4_;
}

MyPolygon.prototype.containsInclusive = function(param1, param2)
{
    if (param2 == null || param2 == undefined) {
        param2 = 1.0E-6;
    }
    //param2 = param2 || 1.0E-6;
    var _loc5_ = 0;
    var _loc3_ = this.getSize();
    var _loc4_ = 0;
    while(_loc4_ < _loc3_)
    {
        _loc5_ = (_loc4_ + 1) % _loc3_;
        if(MyEdge.distanceSmallThan(this.mVertices[_loc4_],this.mVertices[_loc5_],param1,param2))
        {
            return true;
        }
        _loc4_++;
    }
    return this.contains(param1);
}

MyPolygon.prototype.containsExclusive = function(param1, param2)
{
    if (param2 == null || param2 == undefined) {
        param2 = 1.0E-6;
    }
    //param2 = param2 || 1.0E-6;
    var _loc5_ = 0;
    var _loc3_ = this.getSize();
    var _loc4_ = 0;
    while(_loc4_ < _loc3_)
    {
        _loc5_ = (_loc4_ + 1) % _loc3_;
        if(MyEdge.distanceSmallThan(this.mVertices[_loc4_],this.mVertices[_loc5_],param1,param2))
        {
            return false;
        }
        _loc4_++;
    }
    return this.contains(param1);
}
/*
MyPolygon.prototype.isIncludedPolygon = function(param1:my_polygon) : Boolean
{
var _loc2_:Vec2 = null;
var _loc3_:int = 0;
var _loc4_:int = 0;
var _loc5_:int = 0;
var _loc6_:MyEdge = null;
var _loc7_:int = 0;
var _loc8_:MyEdge = null;
for each(_loc2_ in param1.vertices)
{
if(!this.containsInclusive(_loc2_))
{
return false;
}
}
_loc3_ = param1.getSize();
_loc4_ = this.getSize();
_loc5_ = 0;
while(_loc5_ < _loc3_)
{
_loc6_ = new MyEdge(param1.vertices[_loc5_],param1.vertices[(_loc5_ + 1) % _loc3_]);
if(!this.containsInclusive(_loc6_.getCenter()))
{
return false;
}
_loc7_ = 0;
while(_loc7_ < _loc4_)
{
_loc8_ = new MyEdge(this.mVertices[_loc7_],this.mVertices[(_loc7_ + 1) % _loc4_]);
if(lineRelationHelper.isInterSect(_loc6_,_loc8_,false))
{
return false;
}
_loc7_++;
}
_loc5_++;
}
return true;
}
*/
MyPolygon.prototype.isIncludedPolygon = function(param1)
{
    var _loc2_ = null;
    var _loc3_ = 0;
    var _loc4_ = 0;
    var _loc5_ = 0;
    var _loc6_ = null;
    var _loc7_ = 0;
    var _loc8_ = null;
    for (var i = 0; i < param1.mVertices.length; i++)
    //for each(_loc2_ in param1.mVertices)
    {
        if(!this.containsInclusive(param1.mVertices[i]))
        {
            return false;
        }
    }
    
    _loc3_ = param1.getSize();
    _loc4_ = this.getSize();
    _loc5_ = 0;
    while(_loc5_ < _loc3_)
    {
        _loc6_ = new MyEdge(param1.mVertices[_loc5_],param1.mVertices[(_loc5_ + 1) % _loc3_]);
        if(!this.containsInclusive(_loc6_.getCenter()))
        {
            return false;
        }
        _loc7_ = 0;
        while(_loc7_ < _loc4_)
        {
            _loc8_ = new MyEdge(this.mVertices[_loc7_],this.mVertices[(_loc7_ + 1) % _loc4_]);
            if(lineRelationHelper.isInterSect(_loc6_,_loc8_,false))
            {
                return false;
            }
            _loc7_++;
        }
        _loc5_++;
    }
    return true;
}
/*
MyPolygon.prototype.§-_---__--§ = function(param1:MyEdge) : Boolean
{
var _loc4_:int = 0;
var _loc5_:MyEdge = null;
if(!this.containsInclusive(param1.start) || !this.containsInclusive(param1.end))
{
return false;
}
var _loc2_:int = this.getSize();
var _loc3_:int = 0;
while(_loc3_ < _loc2_)
{
_loc4_ = (_loc3_ + 1) % _loc2_;
_loc5_ = new MyEdge(this.mVertices[_loc3_],this.mVertices[_loc4_]);
if(lineRelationHelper.isInterSect(_loc5_,param1,false))
{
return false;
}
_loc3_++;
}
return true;
}



MyPolygon.prototype.§--_--__-__-_-§ = function() : Boolean
{
var _loc1_:Vector.<Number> = this.§-_-_____-_-_-§();
var _loc2_:Vector.<§-__---_-_§> = Angle.§-_--__--_--_§(_loc1_);
if(_loc2_.length != 3)
{
return false;
}
return true;
}

MyPolygon.prototype.§-______---_--_§ = function() : Boolean
{
var _loc3_:§-__---_-_§ = null;
var _loc1_:Vector.<Number> = this.§-_-_____-_-_-§();
var _loc2_:Vector.<§-__---_-_§> = Angle.§-_--__--_--_§(_loc1_);
if(_loc2_.length != 4)
{
return false;
}
for each(_loc3_ in _loc2_)
{
if(!Angle.§--__---_-__-_§(_loc3_.angle))
{
return false;
}
}
return true;
}

MyPolygon.prototype.§----__-_--__-§ = function() : Boolean
{
var _loc4_:MyEdge = null;
var _loc5_:MyEdge = null;
var _loc6_:int = 0;
var _loc7_:MyEdge = null;
var _loc8_:MyEdge = null;
var _loc1_:int = 0;
while(_loc1_ < this.mVertices.length - 1)
{
if(this.mVertices[_loc1_].equals(this.mVertices[_loc1_ + 1]))
{
this.mVertices.splice(_loc1_ + 1,1);
_loc1_--;
}
_loc1_++;
}
var _loc2_:int = this.mVertices.length;
if(_loc2_ < 3)
{
return false;
}
if(_loc2_ == 3)
{
_loc4_ = new MyEdge(this.mVertices[0],this.mVertices[1]);
_loc5_ = new MyEdge(this.mVertices[0],this.mVertices[2]);
return lineRelationHelper.§--_-__-_---__§(_loc4_,_loc5_,true);
}
var _loc3_:int = 0;
while(_loc3_ < _loc2_)
{
_loc6_ = _loc3_ + 2;
while(_loc6_ < _loc2_ && (_loc6_ + 1) % _loc2_ != _loc3_)
{
_loc7_ = new MyEdge(this.mVertices[_loc3_],this.mVertices[(_loc3_ + 1) % _loc2_]);
_loc8_ = new MyEdge(this.mVertices[_loc6_],this.mVertices[(_loc6_ + 1) % _loc2_]);
if(lineRelationHelper.isIntersectedInHelper(_loc7_,_loc8_,true))
{
return true;
}
_loc6_++;
}
_loc3_++;
}
return false;
}
*/
MyPolygon.prototype.isIntersected = function(param1)
{
    var _loc7_ = null;
    var _loc8_ = 0;
    var _loc9_ = null;
    var _loc2_ = this.getBoundingBox();
    var _loc3_ = param1.getBoundingBox();
    if(_loc2_ == null || _loc3_ == null || !_loc2_.isIntersected(_loc3_))
    {
        return false;
    }
    if(this.containsInclusive(param1.vertices[0]) || param1.containsInclusive(this.vertices[0]))
    {
        return true;
    }
    var _loc4_ = this.getSize();
    var _loc5_ = param1.getSize();
    var _loc6_ = 0;
    while(_loc6_ < _loc4_)
    {
        _loc7_ = new MyEdge(this.mVertices[_loc6_],this.mVertices[(_loc6_ + 1) % _loc4_]);
        _loc8_ = 0;
        while(_loc8_ < _loc5_)
        {
            _loc9_ = new MyEdge(param1.vertices[_loc8_],param1.vertices[(_loc8_ + 1) % _loc5_]);
            if(_loc7_.length != 0 && _loc9_.length != 0 && lineRelationHelper.isIntersectedInHelper(_loc7_,_loc9_,true, 0.01))
            {
                return true;
            }
            _loc8_++;
        }
        _loc6_++;
    }
    return false;
}
/*
MyPolygon.prototype.§-__-_---__--§ = function(param1:my_polygon, param2:Number = 0.01) : Boolean
{
var _loc8_:MyEdge = null;
var _loc9_:int = 0;
var _loc10_:MyEdge = null;
var _loc3_:my_Rect = this.getBoundingBox();
var _loc4_:my_Rect = param1.getBoundingBox();
if(_loc3_ == null || _loc4_ == null || !_loc3_.§-__-_---__--§(_loc4_,param2))
{
return false;
}
if(this.containsExclusive(param1.vertices[0],param2) || param1.containsExclusive(this.vertices[0],param2))
{
return true;
}
var _loc5_:int = this.getSize();
var _loc6_:int = param1.getSize();
var _loc7_:int = 0;
while(_loc7_ < _loc5_)
{
_loc8_ = new MyEdge(this.mVertices[_loc7_],this.mVertices[(_loc7_ + 1) % _loc5_]);
_loc9_ = 0;
while(_loc9_ < _loc6_)
{
_loc10_ = new MyEdge(param1.vertices[_loc9_],param1.vertices[(_loc9_ + 1) % _loc6_]);
if(_loc8_.length != 0 && _loc10_.length != 0 && lineRelationHelper.isIntersectedInHelper(_loc8_,_loc10_,false,param2))
{
return true;
}
_loc9_++;
}
_loc7_++;
}
return false;
}

MyPolygon.prototype.§---------____§ = function(param1:Vec2, param2:Number = 1.0E-6) : Boolean
{
var _loc3_:int = this.getSize();
var _loc4_:int = 0;
while(_loc4_ < _loc3_)
{
if(MyEdge.distanceSmallThan(this.mVertices[_loc4_],this.mVertices[(_loc4_ + 1) % _loc3_],param1,param2))
{
return true;
}
_loc4_++;
}
return false;
}

MyPolygon.prototype.§-----__-_-_--§ = function() : Number
{
var _loc5_:int = 0;
var _loc1_:Vector.<Vec2> = this.vertices;
var _loc2_:Number = _loc1_.length;
var _loc3_:Number = 0;
var _loc4_:int = 0;
while(_loc4_ < _loc2_)
{
_loc5_ = (_loc4_ + 1) % _loc2_;
_loc3_ = _loc3_ + _loc1_[_loc4_].distance(_loc1_[_loc5_]);
_loc4_++;
}
return _loc3_;
}
*/
/*
MyPolygon.prototype.copySimplyPolygon() : my_polygon
{
var _loc4_:§-__---_-_§ = null;
var _loc1_:Vector.<Number> = this.§-_-_____-_-_-§();
var _loc2_:Vector.<§-__---_-_§> = Angle.§-_--__--_--_§(_loc1_);
var _loc3_:Vector.<Vec2> = new Vector.<Vec2>();
for each(_loc4_ in _loc2_)
{
_loc3_.push(this.§-__-----___-_§(_loc4_.index));
}
return new my_polygon(_loc3_);
}

MyPolygon.prototype.§--_-_----__-_§ = function() : void
{
var _loc4_:§-__---_-_§ = null;
var _loc1_:Vector.<Number> = this.§-_-_____-_-_-§();
var _loc2_:Vector.<§-__---_-_§> = Angle.§-_--__--_--_§(_loc1_);
var _loc3_:Vector.<Vec2> = new Vector.<Vec2>();
for each(_loc4_ in _loc2_)
{
_loc3_.push(this.§-__-----___-_§(_loc4_.index));
}
this.mVertices = _loc3_;
}
*/
MyPolygon.prototype.clone = function()
{
    var _loc2_ = null;
    var _loc1_ = new MyPolygon();
    for(var i = 0; i < this.mVertices.length; i++)
    //for each(_loc2_ in this.mVertices)
    {
        _loc1_.addVertex(this.mVertices[i].clone());
    }
    return _loc1_;
}

MyPolygon.prototype.equals = function(param1)
{
    var _loc6_ = 0;
    var _loc7_ = 0;
    var _loc2_ = this.getSize();
    var _loc3_ = param1.getSize();
    var _loc4_ = this.vertices;
    var _loc5_ = param1.vertices;
    if(_loc2_ != _loc3_)
    {
        return false;
    }
    var _loc8_ = -1;
    var _loc9_ = -1;
    _loc6_ = 0;
    while(_loc6_ < _loc2_)
    {
        _loc7_ = 0;
        while(_loc7_ < _loc3_)
        {
            if(MyPolygon.isSamePixel(_loc4_[_loc6_],_loc5_[_loc7_]))
            {
                _loc8_ = _loc6_;
                _loc9_ = _loc7_;
                break;
            }
            _loc7_++;
        }
        _loc6_++;
    }
    if(_loc8_ < 0 || _loc9_ < 0)
    {
        return false;
    }
    _loc6_ = (_loc8_ + 1) % _loc2_;
    _loc7_ = (_loc9_ + 1) % _loc3_;
    while(!(_loc6_ == _loc8_ || _loc7_ == _loc9_))
    {
        if(!MyPolygon.isSamePixel(_loc4_[_loc6_],_loc5_[_loc7_]))
        {
            return false;
        }
        _loc6_ = (_loc6_ + 1) % _loc2_;
        _loc7_ = (_loc7_ + 1) % _loc3_;
    }
    return true;
}

MyPolygon.prototype.move = function(param1)
{
    var _loc4_ = null;
    var _loc2_ = this.getPolyCenter();
    var _loc3_ = Vec2.sub(param1,_loc2_);
    //for each(_loc4_ in this.mVertices)
    for(var i = 0; i < this.mVertices.length; i++)
    {
        this.mVertices[i].add(_loc3_);
    }
}

MyPolygon.prototype.translate = function(param1)
{
    var _loc2_ = null;
    for(var i = 0; i < this.mVertices.length; i++)
    //for each(_loc2_ in this.mVertices)
    {
        this.mVertices[i].add(param1);
    }
}

MyPolygon.prototype.rotate = function(param1, param2)
{
    param2 = param2 || null;
    var _loc4_ = null;
    var _loc3_ = !!param2 ? param2:this.getPolyCenter();
    //for each(_loc4_ in this.mVertices)
    for(var i = 0; i < this.mVertices.length; i++)
    {
        this.mVertices[i].rotateBy(param1,_loc3_);
    }
}

MyPolygon.prototype.getVertices = function()
{
    return this.mVertices;
}
/*
MyPolygon.prototype.set vertices(param1:Vector.<Vec2>) : void
{
    this.mVertices = param1;
}
*/
