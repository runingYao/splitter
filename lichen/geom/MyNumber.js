
function MyNumber() {

};
MyNumber.toFixed = function(param1, param2)
{
    if (param2 == null || param2 == undefined) {
        param2 = 6;
    }
    //param2 = param2 || 6;
    var loc3 = Math.pow(10,param2);
    return Math.round(param1 * loc3) / loc3;
}
MyNumber.isEqual = function(param1, param2, param3)
{
    if (param3 == null || param3 == undefined) {
        param3 = 1.0E-6;
    }
    //param3 = param3 || 1.0E-6;
    return Math.abs(param1 - param2) < param3;
}
MyNumber.isZeroOrOrigin = function(param1, param2)
{
    if (param2 == null || param2 == undefined) {
        param2 = 1.0E-6;
    }
    //param2 = param2 || 1.0E-6;
    return Math.abs(param1) < param2;
}

MyNumber.getYourSelf = function(param1)
{
    if(MyNumber.isEqual(param1,1))
    {
        return 1;
    }
    if(MyNumber.isEqual(param1,0))
    {
        return 0;
    }
    return param1;
}
/*


public static function getYourSelf(param1:Number) : Number
{
if(isEqual(param1,1))
{
return 1;
}
if(isEqual(param1,0))
{
return 0;
}
return param1;
}



public static function §-__-_----_-§(param1:Number, param2:Number, param3:Number = 1.0E-6) : Boolean
{
return param1 < param2 - param3;
}

public static function §---_-___§(param1:Number, param2:Number, param3:Number = 1.0E-6) : Boolean
{
return param1 <= param2 + param3;
}

public static function §-____-----_§(param1:Number, param2:Number, param3:Number = 1.0E-6) : Boolean
{
return param1 > param2 + param3;
}

public static function §-__-____-__--§(param1:Number, param2:Number, param3:Number = 1.0E-6) : Boolean
{
return param1 >= param2 - param3;
}

public static function §-__----______§(param1:Number, param2:Number, param3:Number, param4:Number = 1.0E-6) : Boolean
{
return §-____-----_§(param1,Math.min(param2,param3),param4) && §-__-_----_-§(param1,Math.max(param2,param3),param4);
}



public static function §-----_-____-§(param1:Number, param2:Number = 1.0E-6) : Boolean
{
return Math.abs(param1) < param2 || Math.abs(1 - param1) < param2;
}
*/

