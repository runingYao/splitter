function Vec2(param1, param2, param3) {
    if (param1 == null || param1 == undefined) {
        param1 = 0;
    }
    if (param2 == null || param2 == undefined) {
        param2 = 0;
    }
    if (param3 == null || param3 == undefined) {
        param3 = false;
    }
    this.mX = param1;
    this.mY = param2;
    this.mW = param3;//点 OR 向量
};

Vec2.THRESHOLD = 1.0E-6;
Vec2.CONST1 = 1;
Vec2.HASHCODEMULTI = 100;
Vec2.mXCONST = 0;
Vec2.mYCONST = 1;
Vec2.ONE = function (){
    return new Vec2(1, 1);
};

Vec2.ZERO = function (){
    return new Vec2(0, 0);
};

Vec2.MAXVALUE = function (){
    return new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
};

Vec2.MINVALUE = function() {
    return new Vec2(-Number.MAX_VALUE, -Number.MAX_VALUE);
};

Vec2.mXAXIS = function() {
    return new Vec2(1, 0, true);
};

Vec2.mYAXIS = function() {
    return new Vec2(0, 1, true);
};

//public static const §--------§:Vec2 = new Vec2().setValue(Number.MINVALUE);

Vec2.splitByAngle = function(param1, param2)
{
    return new Vec2(param1 * Math.cos(param2),param1 * Math.sin(param2));
}
      
Vec2.offset = function(param1, param2, param3)
{
    return param1.addBySplitAngle(param2,param3);
}
      
Vec2.distance = function(param1, param2)
{
    return Math.sqrt(Math.pow(param1.mX - param2.mX,2) + Math.pow(param1.mY - param2.mY,2));
}

Vec2.distanceSquare = function(param1, param2)
{
    return Math.pow(param1.mX - param2.mX,2) + Math.pow(param1.mY - param2.mY,2);
}

/*      
public static function §--------§(param1:Vec2, param2:Vec2) : Number
{
    return Math.pow(param1.mX - param2.mX,2) + Math.pow(param1.mY - param2.mY,2);
}
*/
      
Vec2.getAngle = function(param1)
{
    return Math.atan2(param1.mY,param1.mX);
}
      
Vec2.getAngleByTan = function(param1, param2)
{
    return Math.atan2(param2.mY - param1.mY,param2.mX - param1.mX);
}
/*
public static function §-------§(param1:Vec2, param2:Vec2) : Number
{
 return angle(param1) - angle(param2);
}

public static function §----§(param1:Vec2, param2:Vec2) : Number
{
 var loc3:Number = cross(param1,param2) / (param1.length * param2.length);
 return mymath.clamp(loc3,-1,1);
}

*/
Vec2.IncludedAngleValue = function(param1, param2)
{
    return Math.acos(Vec2.projectCosValue(param1,param2));
}

Vec2.projectCosValue = function(param1, param2)
{
    var loc3 = Vec2.dot(param1,param2) / (param1.getLength() * param2.getLength());
    return MyMath.clamp(loc3,-1,1);
}
      
Vec2.min = function(param1, param2)
{
    return new Vec2(Math.min(param1.mX,param2.mX),Math.min(param1.mY,param2.mY));
}

Vec2.max = function(param1, param2)
{
    return new Vec2(Math.max(param1.mX,param2.mX),Math.max(param1.mY,param2.mY));
}

Vec2.add = function(param1, param2)
{
    var res = new Vec2(param1.mX + param2.mX, param1.mY + param2.mY);
    return res;
}

Vec2.sub = function(param1, param2)
{
    return new Vec2(param1.mX - param2.mX,param1.mY - param2.mY);
}

Vec2.dot = function(param1, param2)
{
    return param1.mX * param2.mX + param1.mY * param2.mY;
}

Vec2.prototype.sub = function(param1)
{
    return new Vec2(this.mX - param1.mX,this.mY - param1.mY);
}

Vec2.prototype.mul = function(param1)
{
    return new Vec2(this.mX * param1,this.mY * param1);
}

Vec2.prototype.dot = function(param1)
{
    return this.mX * param1.mX + this.mY * param1.mY;
}

Vec2.prototype.cross = function(param1)
{
    return this.mX * param1.mY - this.mY * param1.mX;
}

Vec2.prototype.scale = function(param1)
{
    return new Vec2(this.mX * param1.mX,this.mY * param1.mY);
}

Vec2.prototype.divide = function(param1)
{
    return new Vec2(this.mX / param1.mX,this.mY / param1.mY);
}

Vec2.prototype.rotate = function(param1, param2)
{
    if(param2 == null || param2 == undefined)
    {
        param2 = new Vec2(0,0);
    }
    var loc3 = Math.cos(param1);
    var loc4 = Math.sin(param1);
    var loc5 = Vec2.sub(this,param2);
    var loc6 = loc5.mX * loc3 - loc5.mY * loc4 + param2.mX;
    var loc7 = loc5.mX * loc4 + loc5.mY * loc3 + param2.mY;
    return new Vec2(loc6,loc7);
}

Vec2.cross = function(param1, param2)
{
    return param1.mX * param2.mY - param1.mY * param2.mX;
}

Vec2.clone = function(param1)
{
    return !!param1 ? new Vec2(param1.mX,param1.mY) : null;
}

Vec2.mul = function(param1, param2)
{
    return new Vec2(param1.mX * param2,param1.mY * param2);
}

Vec2.scale = function(param1, param2)
{
    return new Vec2(param1.mX * param2.mX,param1.mY * param2.mY);
}

Vec2.divide = function(param1, param2)
{
    return new Vec2(param1.mX / param2.mX,param1.mY / param2.mY);
}

Vec2.middle = function(param1, param2)
{
    return Vec2.interpolate(param1,param2,0.5);
}

Vec2.crossByPoint  = function(param1, param2, param3)
{
    return (param2.mX - param1.mX) * (param3.mY - param1.mY) - (param3.mX - param1.mX) * (param2.mY - param1.mY);
}

Vec2.interpolate = function(param1, param2, param3)
{
    if (param3 == null || param3 == undefined) {
        param3 = 0.5;
    }
    //param3 = param3 || 0.5;
    return new Vec2(param1.mX + (param2.mX - param1.mX) * param3,param1.mY + (param2.mY - param1.mY) * param3);
}

Vec2.isEqual = function(param1, param2, param3)
{
    if (param3 == null || param3 == undefined) {
        param3 = 1.0E-6;
    }
    //param3 = param3 || 1.0E-6;
    var loc4 = param1.mX - param2.mX;
    var loc5 = param1.mY - param2.mY;
    return loc4 * loc4 + loc5 * loc5 <= param3 * param3;
}
/*
public static function §-----§(param1:Vec2, param2:Vec2, param3:Number = 1) : Boolean
{
 var loc4:Number = §----------§(param1,param2);
 var loc5:Number = Angle.toDegrees(loc4);
 return loc5 < param3 || 180 - loc5 < param3;
}

public static function §----§(param1:Vec2, param2:Vec2, param3:Number = 1) : Boolean
{
 var loc4:Number = §----------§(param1,param2);
 return Angle.toDegrees(Math.PI - loc4) < param3;
}

public static function §------§(param1:Vec2) : Boolean
{
 return mynumber.isEqual(param1.length,1);
}

public static function §-------§(param1:Vec2, param2:Vec2, param3:Vec2) : Boolean
{
 return Vec2.cross(param2.sub(param1),param3.sub(param1)) > 0;
}

public static function §---------§(param1:Vec2, param2:Vec2, param3:Number = 1) : Boolean
{
 return Angle.§---------§(getAngleByTan(param1,param2),param3);
}
*/

Vec2.isHorizontal = function(param1, param2, param3)
{
    if (param3 == null || param3 == undefined) {
        param3 = 1;
    }
    //param3 = param3 || 1;
    return Angle.isHorizontal(Vec2.getAngleByTan(param1,param2),param3);
}
/*
public static function §-------§(param1:MYVEC4) : Vec2
{
 return new Vec2(param1.mX,param1.mY);
}

public static function §--------§(param1:Point) : Vec2
{
 return new Vec2(param1.mX,param1.mY);
}

public static function §---------§(param1:Vec2, param2:Number) : Vec2
{
 var loc3:Number = 2 * Math.PI * Math.random();
 var loc4:Number = param2 * Math.random();
 return param1.add(new Vec2(loc4 * Math.cos(loc3),loc4 * Math.sin(loc3)));
}

public static function §-----------§(param1:Vec2, param2:Vec2) : Number
{
 var loc3:Number = §----------§(param1,param2);
 return (Vec2.cross(param1,param2) < 0?2 * Math.PI - loc3:loc3) % (2 * Math.PI);
}

public static function §-----§(param1:Vec2, param2:Vec2) : Vec2
{
 return param1.rotate(Vec2.§-----------§(param1,param2) / 2).normalize();
}

Vec2.§-----------§() : Number
{
 return this.mX + this.mY;
}

Vec2.§---------§(param1:int = 6) : Vec2
{
 this.mX = mynumber.toFixed(this.mX,param1);
 this.mY = mynumber.toFixed(this.mY,param1);
 return this;
}
*/

Vec2.prototype.set = function(param1, param2)
{
    if (param1 == null || param1 == undefined) {
        param1 = 0;
    }
    if (param2 == null || param2 == undefined) {
        param2 = 0;
    }

    param1 = param1;
    param2 = param2;
    this.mX = param1;
    this.mY = param2;
    return this;
}
/*
Vec2.§-------§(param1:int) : Number
{
 if(param1 == XCONST)
 {
    return this.mX;
 }
 if(param1 == YCONST)
 {
    return this.mY;
 }
 return NaN;
}

Vec2.§--§(param1:Number, param2:int) : void
{
 if(param2 == 0)
 {
    this.mX = param1;
 }
 else if(param2 == 1)
 {
    this.mY = param1;
 }
}
*/



Vec2.prototype.setValue = function(param1)
{
    this.mX = this.mY = param1;
    return this;
}

Vec2.prototype.setZero = function()
{
    this.mX = this.mY = 0;
    return this;
}

/*
Vec2.§------§() : Vec2
{
 this.mX = this.mY = 1;
 return this;
}
*/

Vec2.prototype.copy = function(param1)
{
    this.mX = param1.mX;
    this.mY = param1.mY;
    return this;
}

Vec2.prototype.add = function(param1)
{
    this.mX = this.mX + param1.mX;
    this.mY = this.mY + param1.mY;
    return this;
}

Vec2.prototype.add = function(param1)
{
 return new Vec2(this.mX + param1.mX,this.mY + param1.mY);
}

Vec2.prototype.sub = function(param1)
{
    this.mX = this.mX - param1.mX;
    this.mY = this.mY - param1.mY;
    return this;
}

Vec2.prototype.scaleBy = function(param1)
{
    this.mX = this.mX * param1.mX;
    this.mY = this.mY * param1.mY;
    return this;
}

/*
Vec2.§------§(param1:Vec2) : Vec2
{
 this.mX = this.mX / param1.mX;
 this.mY = this.mY / param1.mY;
 return this;
}
*/

Vec2.prototype.mulBy = function(param1)
{
    this.mX = this.mX * param1;
    this.mY = this.mY * param1;
    return this;
}

Vec2.prototype.rotateBy = function(param1, param2)
{
    if(param2 == null || param2 == undefined){
        param2 = new Vec2(0,0);
    }
    var loc3 = Math.cos(param1);
    var loc4 = Math.sin(param1);
    var loc5 = Vec2.sub(this,param2);
    this.mX = loc5.mX * loc3 - loc5.mY * loc4 + param2.mX;
    this.mY = loc5.mX * loc4 + loc5.mY * loc3 + param2.mY;
    return this;
}

Vec2.prototype.translate = function(param1, param2)
{
    this.mX = this.mX + param1;
    this.mY = this.mY + param2;
    return this;
}

Vec2.prototype.invert = function()
{
    this.mX = 1 / this.mX;
    this.mY = 1 / this.mY;
    return this;
}

Vec2.prototype.negtive = function()
{
    this.mX = this.mX * -1;
    this.mY = this.mY * -1;
    return this;
}

/*
Vec2.§------§() : Vec2
{
 this.mX = this.mX * -1;
 return this;
}
*/

Vec2.prototype.negateYAxis = function()
{
    this.mY = this.mY * -1;
    return this;
}
/*
Vec2.§-------§() : Vec2
{
 if(this.mX < 0)
 {
    this.mX = -this.mX;
 }
 if(this.mY < 0)
 {
    this.mY = -this.mY;
 }
 return this;
}
*/
Vec2.prototype.normalize = function()
{
    var loc1 = this.mX * this.mX + this.mY * this.mY;
    if(loc1 == 1)
    {
        return this;
    }
    loc1 = Math.sqrt(loc1);
    if(loc1 < Vec2.THRESHOLD)
    {
        return this;
    }
    loc1 = 1 / loc1;
    this.mX = this.mX * loc1;
    this.mY = this.mY * loc1;
    return this;
}

Vec2.prototype.addBySplitAngle = function(param1, param2)
{
    return this.add(Vec2.splitByAngle(param1,param2));
}

/*
Vec2.§------§(param1:Vec2) : Vec2
{
 var loc2:Number = this.dot(param1) / param1.§----§;
 return param1.mul(loc2);
}

Vec2.reflect(param1:Vec2) : Vec2
{
 var loc2:Number = 2 * §----------§(this,param1);
 if(param1.§-------§(this) < 0)
 {
    loc2 = loc2 * -1;
 }
 return this.rotate(loc2);
}
*/

Vec2.prototype.transform = function(param1, param2, param3)
{
    return this.scale(param1).rotateBy(param2).add(param3);
}

/*
cross direction
Vec2.§-------§(param1:Vec2) : int
{
    return MyMath.sign(this.mX * -param1.mY + this.mY * param1.mX);
}
*/

Vec2.prototype.distance = function(param1)
{
 return Math.sqrt(Math.pow(this.mX - param1.mX,2) + Math.pow(this.mY - param1.mY,2));
}
/*
Vec2.§--------§(param1:Vec2) : Number
{
 return Math.pow(this.mX - param1.mX,2) + Math.pow(this.mY - param1.mY,2);
}
*/

Vec2.prototype.distanceSquare = function(param1)
{
 return Math.pow(this.mX - param1.mX,2) + Math.pow(this.mY - param1.mY,2);
}

Vec2.prototype.rotate_90_degree = function()
{
    return new Vec2(-this.mY,this.mX);
}

Vec2.prototype.rotate_minus_90_degree = function()
{
    return new Vec2(this.mY,-this.mX);
}
      
Vec2.prototype.clone = function()
{
    return new Vec2(this.mX,this.mY);
}
/*
//是否垂直
Vec2.normals = function(param1:Vec2) : Boolean
{
    return this.dot(param1) === 0;
}
*/

Vec2.prototype.equals = function(param1)
{
    return MyNumber.isEqual(this.mX,param1.mX,Vec2.THRESHOLD) && MyNumber.isEqual(this.mY,param1.mY,Vec2.THRESHOLD);
}
      
Vec2.prototype.isClose = function(param1, param2)
{
    if(param2 == null || param2 == undefined){
        param2 = 1.0E-6;
    }
    //param2 = param2 || 1.0E-6;
    var loc3 = this.mX - param1.mX;
    var loc4 = this.mY - param1.mY;
    return loc3 * loc3 + loc4 * loc4 <= param2 * param2;
}

Vec2.isZeroOrOrigin = function()
{
    return this.mX == 0 && this.mY == 0;
}
/*
Vec2.§-----§() : Boolean
{
 return this.mX == 1 && this.mY == 1;
}

Vec2.§----------§(param1:Number = 1.0E-6) : Boolean
{
 return Math.abs(this.mX - this.mY) < param1;
}

Vec2.§------§() : Vec2
{
 return new Vec2(mymath.sign(this.mX),mymath.sign(this.mY));
}
*/

Vec2.prototype.mirrorByminus1minus1 = function()
{
    return new Vec2(-this.mY,this.mX);
}
/*
Vec2.§--------§() : Vec2
{
 return new Vec2(this.mY,-this.mX);
}

Vec2.§---§() : Vec2
{
 return new Vec2(this.mX,this.mY).normalize();
}

Vec2.§------§() : Vec2
{
 return new Vec2(-this.mX,-this.mY);
}

Vec2.§-------§() : Vec2
{
 return new Vec2(-this.mX,this.mY);
}

Vec2.§--------§() : Vec2
{
 return new Vec2(this.mX,-this.mY);
}

Vec2.§-------§() : Vec2
{
 return new Vec2(this.mX,this.mY).§-------§();
}

Vec2.§-----§() : Point
{
 return new Point(this.mX,this.mY);
}

Vec2.§------§(param1:Array) : Vec2
{
 this.mX = param1[0];
 this.mY = param1[1];
 return this;
}
*/

Vec2.toArray = function()
{
    return [this.mX,this.mY];
}
/*
Vec2.§----§(param1:Number = 0) : MYVEC4
{
 return new MYVEC4(this.mX,this.mY,param1);
}
*/
Vec2.toJSON = function(param1)
{
    return {
        "x":this.mX,
        "y":this.mY
    };
}

Vec2.toString = function()
{
    return "Vec2(" + this.mX + "," + this.mY + ")";
}
/*
Vec2.toStringForHashCode = function(param1:int = 4, param2:String = "") 
{
 var loc3:§------§ = new §------§();
 var loc4:Number = Math.pow(10,param1);
 loc3.append(Math.round(this.mX * loc4));
 loc3.append(Math.round(this.mY * loc4));
 return loc3.join(param2);
}

Vec2.hashCode() : int
{
 var loc1:int = 7;
 loc1 = 13 * loc1 + Math.round(this.mX * HASHCODEMULTI);
 loc1 = 13 * loc1 + Math.round(this.mY * HASHCODEMULTI);
 return loc1;
}
*/
Vec2.prototype.getAngle = function()
{
    return Math.atan2(this.mY,this.mX);
}

Vec2.prototype.setAngle = function(param1)
{
    param1 = !!isNaN(param1)? 0 : param1;
    var loc2 = Math.sqrt(Math.pow(this.mX,2) + Math.pow(this.mY,2));
    this.mX = loc2 * Math.cos(param1);
    this.mY = loc2 * Math.sin(param1);
}

Vec2.prototype.getLength = function()
{
    return Math.sqrt(Math.pow(this.mX,2) + Math.pow(this.mY,2));
}

Vec2.prototype.setLength = function(param1)
{
    var loc3;
    param1 = !!isNaN(param1)? 0 : param1;
    var loc2 = Math.sqrt(Math.pow(this.mX,2) + Math.pow(this.mY,2));
    if(loc2 < Vec2.THRESHOLD)
    {
        this.mX = param1;
        this.mY = 0;
    }
    else
    {
        loc3 = param1 / loc2;
        this.mX = this.mX * loc3;
        this.mY = this.mY * loc3;
    }
}
/*
Vec2.get §----§() : Number
{
 return Math.pow(this.mX,2) + Math.pow(this.mY,2);
}

Vec2.get x() : Number
{
 return this.mX;
}

Vec2.set x(param1:Number) : void
{
 if(this.mW)
 {
    throw new §---------§();
 }
 this.mX = param1;
}

Vec2.get y() : Number
{
 return this.mY;
}

Vec2.set y(param1:Number) : void
{
 if(this.mW)
 {
    throw new §---------§();
 }
 this.mY = param1;
}

Vec2.get §--------§() : Boolean
{
 return this.mW;
}

Vec2.§--§() : Vec2
{
 this.mW = true;
 return this;
}

Vec2.§---------§(param1:Function, .. rest) : *
{
 var loc3:* = undefined;
 if(this.mW)
 {
    this.mW = false;
    loc3 = param1.apply(this,rest);
    this.mW = true;
    return loc3;
 }
 return param1.apply(this,rest);
}
*/