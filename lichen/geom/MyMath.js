//DONE

function MyMath() {
    
};

MyMath.TOLERANCE = 1.0E-6;


MyMath.sign = function(param1) {
    return param1 > 0?1:param1 < 0?-1:0;
};

MyMath.clamp = function(param1, param2, param3) {
    var loc4;
    if(param2 > param3)
    {
        loc4 = param2;
        param2 = param3;
        param3 = loc4;
    }
    
    return param1 < param2?Number(param2):param1 > param3?Number(param3):Number(param1);
    
};

MyMath.min = function(param1) {
    var loc2 = Number.MAX_VALUE
    
    for(var i = 0; i < param1.length; i++) {
        loc2 = Math.min(loc2, param1[i]);
    }
    return loc2;
};

MyMath.max = function(param1) {
    var loc2 = -Number.MAX_VALUE
    
    for(var i = 0; i < param1.length; i++) {
        loc2 = Math.max(loc2, param1[i]);
    }
    return loc2;
};

MyMath.nextIndex = function(param1, param2) {
    return (param1 + 1) % param2;
};

MyMath.acos = function (param1)
{
    param1 = Math.round(param1 * 1000000) * 1.0e-6;
    if(param1 > 1 || -1 > param1)
    {
        console.warn("acos paramater must be in [-1,1]!");
    }
    return Math.acos(param1);
};
MyMath.clamp_0_1 = function(param1)
{
    return param1 < 0 ? 0 : param1 > 1 ? 1 : param1;
}

/*
//求开三次方
public static function §-_--_----___-§(param1:Number) : Number
{
 return param1 == 0?Number(0):param1 > 0?Number(Math.pow(param1,1 / 3)):Number(Math.pow(param1 * -1,1 / 3) * -1);
}
*/

/*
//限制在0-1之间
public static function clamp_0_1(param1:Number) : Number
{
 return param1 < 0?Number(0):param1 > 1?Number(1):Number(param1);
}
*/

/*
public static function §-_---__-__§(param1:Number) : Number
{
 var _loc2_:Number = Math.ceil(Math.log(param1) / Math.LN2);
 return 1 << _loc2_;
}
*/

/*
preIndex
public static function §-____-_--___§(param1:int, param2:uint) : uint
{
 return (param1 - 1 + param2) % param2;
}
*/
/*
public static function §-_-_--___---_§(param1:int, param2:uint) : uint
{
 if(param1 < 0)
 {
    return param2 + param1;
 }
 if(param1 >= param2)
 {
    return param1 % param2;
 }
 return param1;
}

public static function §-____---_____-§(param1:int, param2:int, param3:int) : int
{
 var _loc4_:int = param3 - param2 + 1;
 if(param1 < param2)
 {
    param1 = param1 + _loc4_ * ((param2 - param1) / _loc4_ + 1);
 }
 return param2 + (param1 - param2) % _loc4_;
}

public static function §-__-__-__-----§(param1:int, param2:int, param3:Vector.<int> = null) : int
{
 var _loc5_:int = 0;
 var _loc6_:int = 0;
 if(param1 < param2)
 {
    _loc5_ = param1;
    param1 = param2;
    param2 = _loc5_;
 }
 var _loc4_:int = Math.floor(Math.random() * (param1 - param2) + param2);
 if(param3 != null && param3.length < param1 - param2)
 {
    _loc6_ = 100000;
    while(param3.indexOf(_loc4_) != -1)
    {
       _loc4_ = Math.round(Math.random() * (param1 - param2) + param2);
       if(_loc6_-- < 0)
       {
          return NaN;
       }
    }
    return _loc4_;
 }
 return _loc4_;
}

public static function §-___-_--_---__§(param1:int, param2:int, param3:int, param4:Vector.<int> = null, param5:Boolean = true) : Vector.<int>
{
 var _loc6_:Vector.<int> = null;
 var _loc9_:int = 0;
 var _loc10_:int = 0;
 if(param1 < param2)
 {
    _loc9_ = param1;
    param1 = param2;
    param2 = _loc9_;
 }
 if(param4)
 {
    if(param1 - param2 <= param4.length || param5 && param1 - param2 - _loc6_.length < param3)
    {
       return null;
    }
    _loc6_ = _loc6_.concat();
 }
 else
 {
    if(param5 && param1 - param2 < param3)
    {
       return null;
    }
    _loc6_ = new Vector.<int>();
 }
 var _loc7_:Vector.<int> = new Vector.<int>();
 var _loc8_:int = 0;
 while(_loc8_ < param3)
 {
    _loc10_ = §-__-__-__-----§(param1,param2,_loc6_);
    if(isNaN(_loc10_))
    {
       break;
    }
    if(param5 && _loc6_.indexOf(_loc10_) == -1)
    {
       _loc6_.push(_loc10_);
    }
    _loc7_.push(_loc10_);
    _loc8_++;
 }
 if(_loc7_.length != param3)
 {
    return null;
 }
 return _loc7_;
}

public static function §-__--__--_-__§(param1:Number, param2:Number, param3:Vector.<Number> = null) : Number
{
 var _loc5_:Number = NaN;
 var _loc6_:int = 0;
 if(param1 < param2)
 {
    _loc5_ = param1;
    param1 = param2;
    param2 = _loc5_;
 }
 var _loc4_:Number = Math.random() * (param1 - param2) + param2;
 if(param3 != null)
 {
    _loc6_ = 100000;
    while(param3.indexOf(_loc4_) != -1)
    {
       _loc4_ = Math.random() * (param1 - param2) + param2;
       if(_loc6_-- < 0)
       {
          return NaN;
       }
    }
    return _loc4_;
 }
 return _loc4_;
}
*/






