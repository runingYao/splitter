function Angle() {
    
};

Angle.Epsolon = 1.0E-5;
Angle.CONST_1 = 1;
Angle.PI      = 3.141592653589793;
Angle.HALF_PI = 1.5707963267948966;
Angle.CONST_2_PI = 6.283185307179586;
Angle.PI_QUATER  = 0.7853981633974483;
Angle.CONST_180_DEVIDE_PI = 57.29577951308232;
Angle.CONST_PI_DEVIDE_180 = 0.017453292519943295;
/*
public static function §-_-__-_--__§(param1:Vector.<Number>) : Vector.<§-__---_-_§>
{
    var _loc2_:int = param1.length;
    var _loc3_:Vector.<§-__---_-_§> = new Vector.<§-__---_-_§>(_loc2_);
    var _loc4_:int = 0;
    while(_loc4_ < _loc2_)
    {
        if(!Angle.§--__---_-__-_§(param1[_loc4_]))
        {
            _loc3_.push(new §-__---_-_§(_loc4_,param1[_loc4_]));
        }
        _loc4_++;
    }
    return _loc3_;
}

public static function §-_--__--_--_§(param1:Vector.<Number>) : Vector.<§-__---_-_§>
{
    var _loc2_:int = param1.length;
    var _loc3_:Vector.<§-__---_-_§> = new Vector.<§-__---_-_§>();
    var _loc4_:int = 0;
    while(_loc4_ < _loc2_)
    {
        if(!Angle.§-__-__---____-§(param1[_loc4_]))
        {
            _loc3_.push(new §-__---_-_§(_loc4_,param1[_loc4_]));
        }
        _loc4_++;
    }
    return _loc3_;
}

public static function §--___--___-__§(param1:Number) : Boolean
{
    if(param1 < HALF_PI - Epsolon && param1 >= 0)
    {
        return true;
    }
    return false;
}

public static function §--__---_-__-_§(param1:Number) : Boolean
{
    if(Math.abs(param1 - HALF_PI) < Epsolon)
    {
        return true;
    }
    return false;
}

public static function §--_-----_--_§(param1:Number) : Boolean
{
    if(param1 > PI / 2 + Epsolon && param1 < PI - Epsolon)
    {
        return true;
    }
    return false;
}

public static function §-__-__---____-§(param1:Number) : Boolean
{
    if(Math.abs(param1 - PI) < Epsolon)
    {
        return true;
    }
    return false;
}

public static function §-_-_---_----§(param1:Number) : Boolean
{
    if(param1 > PI + Epsolon && param1 < CONST_2_PI - Epsolon)
    {
        return true;
    }
    return false;
}

public static function §----___-_§(param1:Number) : Boolean
{
    if(Math.abs(param1 - CONST_2_PI) < Epsolon)
    {
        return true;
    }
    return false;
}

public static function §-----_---_-§(param1:Number, param2:Number = 1) : Boolean
{
    return Angle.toDegrees(Math.abs(Math.abs(param1) - 0.5 * Math.PI)) < param2 || Angle.toDegrees(Math.abs(Math.abs(param1) - 0.5 * Math.PI * 3)) < param2;
}
*/

Angle.isHorizontal = function(param1, param2) {
    return Angle.toDegrees(Math.abs(param1)) < param2 || Angle.toDegrees(Math.abs(Math.abs(param1) - Math.PI)) < param2;
};

Angle.isEqual = function(param1, param2, param3) {
    if (param3 == null || param3 == undefined) {
        param3 = 1.0E-5;
    }
    //param3 = param3 || 1.0E-5;
    
    return Math.abs(Angle.normalize(param1) - Angle.normalize(param2)) < param3;
};

Angle.add = function(param1, param2)
{
    return Angle.normalize(param1 + param2);
};

Angle.sub = function(param1, param2)
{
    return Angle.normalize(param1 - param2);
};

Angle.normalize = function(param1)
{
    while(param1 > Angle.CONST_2_PI) {
        param1 -= Angle.CONST_2_PI;
    }
    
    while(param1 < -Angle.CONST_2_PI) {
        param1 += Angle.CONST_2_PI;
    }
    if (Math.abs(param1) < 0.0001) {
        param1 = 0;
    }
    return param1 >= 0 ? param1 : param1 + Angle.CONST_2_PI;
}

Angle.reverse = function(param1)
{
    return Angle.normalize(param1 + Math.PI);
}

Angle.toRadians = function(param1)
{
    return param1 * Angle.CONST_PI_DEVIDE_180;
}

Angle.toDegrees = function(param1)
{
    return param1 * Angle.CONST_180_DEVIDE_PI;
}
/*
public static function §-__--__-___§(param1:Number, param2:Number) : Number
{
    return param1 - param2;
}

public static function §--_-__-__-_-§(param1:Number, param2:Number) : Number
{
    return param1 + param2;
}

public static function §-___-_____-_--§(param1:Number, param2:Number, param3:Number = 1.0E-5) : Boolean
{
    var _loc4_:Number = normalize(Math.abs(param1 - param2));
    return Math.abs(_loc4_ - PI) < param3 || _loc4_ < param3;
}

public static function §--_-_---_-_--§(param1:Number, param2:Number, param3:Number = 1.0E-5) : Boolean
{
    var _loc4_:Number = normalize(param1 - param2);
    return Math.abs(_loc4_ - HALF_PI) < param3 || Math.abs(_loc4_ - 3 * HALF_PI) < param3;
}

public static function §-----__-_---_§(param1:Number, param2:Number) : Number
{
    var _loc3_:Number = sub(param1,param2);
    if(_loc3_ <= PI_QUATER || _loc3_ >= PI + HALF_PI + PI_QUATER)
    {
        param1 = param2;
    }
    else if(_loc3_ <= HALF_PI + PI_QUATER)
    {
        param1 = param2 + HALF_PI;
    }
    else if(_loc3_ <= PI + PI_QUATER)
    {
        param1 = param2 + PI;
    }
    else
    {
        param1 = param2 - HALF_PI;
    }
    return normalize(param1);
}

public static function §-_-_-_-__-_-_§(param1:Number) : Boolean
{
    param1 = normalize(param1);
    return !(param1 > Math.PI / 4 && param1 < Math.PI * 3 / 4 || param1 > Math.PI * 5 / 4 && param1 < Math.PI * 7 / 4);
}
*/
