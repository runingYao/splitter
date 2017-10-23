function MyCorner(param1) {
    if (param1 == null || param1 == undefined) {
        param1 = null;
    }
    //param1 = param1 || null;
    this.mWall = param1;
    this.mPosition = new Vec2();
    this.mCurves = [];
    this.initialize();
    this.mId = ID.assignUniqueId();
    
}

//MyCorner.prototype = new MyCornerBasic();


MyCorner.prototype.initialize = function()
{
    //super.initialize();
    this.mPosition = new Vec2();
    this.mCurves = [];//new Vector.<curveBasicClass>();
    mPosition = new Vec2();
}

MyCorner.prototype.dispose = function()
{
    //super.dispose();
    for(var i = 0; i < this.mCurves.length; i++)
    {
        this.mCurves[i].setCornerStartAndEndButHasToBeSame(this,null);
    }
    if(this.mWall != null)
    {
        this.mWall.removeCorner(this);
    }
}

MyCorner.prototype.clone = function()
{
    var _loc1_ = new MyCorner(this.mWall);
    _loc1_.mCurves = this.mCurves.concat();
    _loc1_.mPosition = this.mPosition;
    return _loc1_;
}
MyCorner.prototype.addONE_PART = function(param1)
{
    return ArrayHelperClass.ifHasAndSave(this.mCurves,param1);
}

MyCorner.prototype.removeSpecificCurve_AH = function(param1)
{
    return ArrayHelperClass.removeItem(this.mCurves,param1);
}


/*
MyCorner.switchClassTypeTo(param1:cornerBasicClass) : MyCorner
{
    return param1 as MyCorner;
}
*/
/*
MyCorner.cloneParameter(param1:Vector.<cornerBasicClass>) : Vector.<MyCorner>
{
 return Vector.<MyCorner>(param1);
}

MyCorner.cloneAreas(param1:Vector.<MyCorner>) : Vector.<cornerBasicClass>
{
 return Vector.<cornerBasicClass>(param1);
}
*/

/*
public function §-_-____--_--_§() : Boolean
{
var _loc1_:wallCurve = null;
for each(_loc1_ in m_curves)
{
if(_loc1_.§--__---_---_§())
{
return true;
}
}
return false;
}

public function get wall() : my_xx_wall
{
return this.mWall;
}

public function set wall(param1:my_xx_wall) : void
{
this.mWall = param1;
}
*/