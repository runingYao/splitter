function MyCornerBasic () {
    this.mPosition = new Vec2();
    this.mCurves = [];

}

MyCornerBasic.CONST_15_DEGREE_ARC = 0.2617993877991494;

MyCornerBasic.prototype.initialize = function()
{
    this.mPosition = new Vec2();
    this.mCurves = [];//new Vector.<curveBasicClass>();
}

MyCornerBasic.prototype.dispose = function()
{
    //var _loc1_ = null;
    //super.dispose();
    //for each(_loc1_ in this.mCurves)
    for(var i = 0; i < this.mCurves.length; i++)
    {
        this.mCurves[i].setCornerStartAndEndButHasToBeSame(this,null);
    }
}
/*
MyCornerBasic.prototype.§-_-__--____--§(param1:Vec2) : void
{
 if(param1 != null)
 {
    this.§--_-----_--§(this.mPosition.add(param1));
 }
}

MyCornerBasic.prototype.§--_-----_--§(param1:Vec2) : void
{
 if(param1 != null)
 {
    this.mPosition.copy(param1);
    this.invalidate();
 }
}
*/
MyCornerBasic.prototype.addONE_PART = function(param1)
{
    return ArrayHelperClass.ifHasAndSave(this.mCurves,param1);
}

MyCornerBasic.prototype.removeSpecificCurve_AH = function(param1)
{
    return ArrayHelperClass.removeItem(this.mCurves,param1);
}
/*
MyCornerBasic.prototype.validateDisplay = function()
{
    this.m_isValidShowOrNotFlag = false;
}

MyCornerBasic.prototype.invalidateDisplay = function()
{
    this.m_isValidShowOrNotFlag = true;
}

MyCornerBasic.prototype.isDisplayStateValid() : Boolean
{
 return this.m_isValidShowOrNotFlag == false;
}
*/
MyCornerBasic.prototype.invalidate = function()
{
    //var _loc1_:curveBasicClass = null;
    //this.invalidateDisplay();
    //for each(_loc1_ in this.mCurves)
    //{
    //    _loc1_.invalidate();
    //}
}

/*
MyCornerBasic.prototype.§-____------_-§(param1:curveBasicClass) : Vector.<curveBasicClass>
{
 var _loc3_:curveBasicClass = null;
 var _loc4_:Vector.<curveBasicClass> = null;
 var _loc5_:int = 0;
 var _loc2_:int = this.mCurves.length;
 if(_loc2_ <= 1)
 {
    return new Vector.<curveBasicClass>(2);
 }
 if(_loc2_ == 2)
 {
    _loc3_ = this.mCurves[0] == param1?this.mCurves[1]:this.mCurves[0];
    return Vector.<curveBasicClass>([_loc3_,_loc3_]);
 }
 _loc4_ = this.§---_-_-____--§();
 _loc5_ = _loc4_.indexOf(param1);
 return Vector.<curveBasicClass>([_loc4_[my_math.§-_-_--___---_§(_loc5_ + 1,_loc2_)],_loc4_[my_math.§-_-_--___---_§(_loc5_ - 1,_loc2_)]]);
}

MyCornerBasic.prototype.§---_-_-____--§() : Vector.<curveBasicClass>
{
 var curve:curveBasicClass = null;
 var size:int = 0;
 var i:int = 0;
 var angle:Number = NaN;
 var ordered:Vector.<Object> = new Vector.<Object>();
 for each(curve in this.mCurves)
 {
    angle = curve.§--_-__-_-_§(this);
    ordered.push({
       "curve":curve,
       "angle":angle
    });
 }
 ordered.sort(function(param1:Object, param2:Object):int
 {
    return my_math.sign(param1.angle - param2.angle);
 });
 size = this.mCurves.length;
 i = 0;
 while(i < size)
 {
    this.mCurves[i] = ordered[i].curve;
    i++;
 }
 return this.mCurves;
}

MyCornerBasic.prototype.§-____-------_§(param1:curveBasicClass) : Vector.<curveBasicClass>
{
 var _loc2_:Vector.<curveBasicClass> = this.mCurves.concat();
 ArrayHelperClass.removeItem(_loc2_,param1);
 return _loc2_;
}

MyCornerBasic.prototype.§---__-____---§(param1:cornerBasicClass) : Vector.<curveBasicClass>
{
 var _loc3_:curveBasicClass = null;
 var _loc2_:Vector.<curveBasicClass> = new Vector.<curveBasicClass>();
 for each(_loc3_ in this.mCurves)
 {
    if(_loc3_.§-----_-_____§(param1))
    {
       _loc2_.push(_loc3_);
    }
 }
 return _loc2_;
}
*/
/*
MyCornerBasic.prototype.get x() : Number
{
 return this.mPosition.x;
}

MyCornerBasic.prototype.set x(param1:Number) : void
{
 this.mPosition.x = param1;
 this.invalidate();
}

MyCornerBasic.prototype.get y() : Number
{
 return this.mPosition.y;
}

MyCornerBasic.prototype.set y(param1:Number) : void
{
 this.mPosition.y = param1;
 this.invalidate();
}

MyCornerBasic.prototype.get position() : Vec2
{
 return this.mPosition.clone();
}

MyCornerBasic.prototype.set position(param1:Vec2) : void
{
 if(param1 != null)
 {
    this.mPosition.copy(param1);
    this.invalidate();
 }
}

MyCornerBasic.prototype.get curves() : Vector.<curveBasicClass>
{
 return this.mCurves;
}

MyCornerBasic.prototype.set curves(param1:Vector.<curveBasicClass>) : void
{
 this.mCurves = param1;
}
*/