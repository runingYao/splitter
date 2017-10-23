function ArrayHelperClass() {
    
}

ArrayHelperClass.isEmpty = function(param1)
{
    return param1 == null || param1.length == 0;
}

ArrayHelperClass.isNotEmpty = function(param1)
{
    return !ArrayHelperClass.isEmpty(param1);
}

ArrayHelperClass.ifHasAndSave = function(param1, param2)
{
    if(param1 != null)
    {
        if(param1.indexOf(param2) == -1)
        {
            param1.push(param2);
            return true;
        }
        return false;
    }
    return false;
}
      
ArrayHelperClass.ifHaveSameTheLaterOne = function(param1, param2)
{
    var _loc3_ = null;
    if(param1 != null && param2 != null)
    {
        for (var i = 0; i < param2.length; i++)
        {
            ArrayHelperClass.ifHasAndSave(param1,param2[i]);
        }
    }
}

ArrayHelperClass.addItem = function(param1, param2)
{
    if(!(param1 == null || param1 == undefined))
    {
        param1.push(param2);
    }
}

ArrayHelperClass.addItems = function(param1, param2)
{
    //var _loc3_:Object = null;
    if(param1 != null && param2 != null)
    {
        //for each(_loc3_ in param2)
        for(var i = 0; i < param2.length; i++)
        {
            param1.push(param2[i]);
        }
    }
}

ArrayHelperClass.removeItemAt = function(param1, param2)
{
    if(ArrayHelperClass.isNotEmpty(param1) && param2 < param1.length)
    {
        param1.splice(param2,1);
    }
}

ArrayHelperClass.deleteSameValues = function(param1, param2)
{
    var _loc3_ = null;
    var _loc4_ = 0;
    if(ArrayHelperClass.isNotEmpty(param1) && ArrayHelperClass.isNotEmpty(param2))
    {
        //for each(_loc3_ in param2)
        for (var i = 0; i < param2.length; i++)
        {
            var _loc3_ = param2[i];
            _loc4_ = param1.indexOf(_loc3_);
            if(_loc4_ != -1)
            {
                param1.splice(_loc4_,1);
            }
        }
    }
}
      
ArrayHelperClass.removeItem = function(param1, param2)
{
    //Assert.notNull(param1);
    var _loc3_ = param1.indexOf(param2);
    if(_loc3_ != -1)
    {
        param1.splice(_loc3_,1);
        return true;
    }
    return false;
}


/*
package com.qunhe.commons.lang
{
   import §-___--____-_--§.my_error_logger;
   import org.as3commons.collections.Map;
   import org.as3commons.logging.api.ILogger;
   import org.as3commons.logging.api.getLogger;
   
   public class ArrayHelperClass
   {
      
      private static const LOG:ILogger = getLogger(ArrayHelperClass);
       
      
      public function ArrayHelperClass()
      {
         super();
         throw new my_error_logger();
      }
      
      public static function §-_-------_-__§(param1:Object, param2:Object) : Array
      {
         var _loc4_:int = 0;
         var _loc3_:Array = [];
         if(isNotEmpty(param1))
         {
            _loc4_ = 0;
            while(_loc4_ < param1.length)
            {
               if(param1[_loc4_] === param2)
               {
                  _loc3_.push(_loc4_);
               }
               _loc4_++;
            }
         }
         return _loc3_;
      }
      
      public static function toArray(param1:Object) : Array
      {
         var _loc3_:Object = null;
         var _loc2_:Array = [];
         if(isNotEmpty(param1))
         {
            for each(_loc3_ in param1)
            {
               _loc2_.push(_loc3_);
            }
         }
         return _loc2_;
      }
      
      public static function toMap(param1:Object, param2:Function) : Map
      {
         var _loc4_:Object = null;
         Assert.notNull(param1);
         var _loc3_:Map = new Map();
         if(isNotEmpty(param1))
         {
            for each(_loc4_ in param1)
            {
               _loc3_.add(param2(_loc4_),_loc4_);
            }
         }
         return _loc3_;
      }
      
      public static function start(param1:Object) : *
      {
         if(isNotEmpty(param1))
         {
            return param1[0];
         }
         return null;
      }
      
      public static function end(param1:Object) : *
      {
         if(isNotEmpty(param1))
         {
            return param1[param1.length - 1];
         }
         return null;
      }
      
      public static function max(param1:Object, param2:Function) : *
      {
         var _loc3_:Object = null;
         var _loc4_:int = 0;
         var _loc5_:Object = null;
         if(isNotEmpty(param1))
         {
            _loc3_ = param1[0];
            _loc4_ = 1;
            while(_loc4_ < param1.length)
            {
               _loc5_ = param1[_loc4_];
               if(param2(_loc5_,_loc3_) > 0)
               {
                  _loc3_ = _loc5_;
               }
               _loc4_++;
            }
            return _loc3_;
         }
         return null;
      }
      
      public static function min(param1:Object, param2:Function) : *
      {
         var _loc3_:Object = null;
         var _loc4_:int = 0;
         var _loc5_:Object = null;
         if(isNotEmpty(param1))
         {
            _loc3_ = param1[0];
            _loc4_ = 1;
            while(_loc4_ < param1.length)
            {
               _loc5_ = param1[_loc4_];
               if(param2(_loc5_,_loc3_) < 0)
               {
                  _loc3_ = _loc5_;
               }
               _loc4_++;
            }
            return _loc3_;
         }
         return null;
      }
      
      public static function §--__-----_-__§(param1:Array, param2:Class) : *
      {
         var _loc3_:Class = ClassUtils.§---__-_--_---§(param2);
         return _loc3_(param1);
      }
      
      public static function removeDuplicatePointsInHelper(param1:Object) : void
      {
         var _loc3_:int = 0;
         var _loc2_:int = 0;
         while(_loc2_ < param1.length - 1)
         {
            _loc3_ = _loc2_ + 1;
            while(_loc3_ < param1.length)
            {
               if(param1[_loc2_] === param1[_loc3_])
               {
                  param1.splice(_loc3_,1);
               }
               else
               {
                  _loc3_++;
               }
            }
            _loc2_++;
         }
      }
      
      public static function §-_--_--_-__-§(param1:Object) : Boolean
      {
         var _loc4_:int = 0;
         var _loc2_:int = param1.length;
         var _loc3_:int = 0;
         while(_loc3_ < _loc2_ - 1)
         {
            _loc4_ = _loc3_ + 1;
            while(_loc4_ < _loc2_)
            {
               if(param1[_loc3_] === param1[_loc4_])
               {
                  return true;
               }
               _loc4_++;
            }
            _loc3_++;
         }
         return false;
      }
      
      public static function isNotEmpty(param1:Object) : Boolean
      {
         return !isEmpty(param1);
      }
      
      public static function isEmpty(param1:Object) : Boolean
      {
         return param1 == null || param1.length == 0;
      }
      
      public static function contains(param1:Object, param2:Object) : Boolean
      {
         return param1.indexOf(param2) != -1;
      }
      
      public static function getLength(param1:Object) : int
      {
         if(isNotEmpty(param1))
         {
            return param1.length;
         }
         return 0;
      }
      
      public static function addItem(param1:Object, param2:Object) : void
      {
         if(param1 != null)
         {
            param1.push(param2);
         }
      }
      
      public static function addItems(param1:Object, param2:Object) : void
      {
         var _loc3_:Object = null;
         if(param1 != null && param2 != null)
         {
            for each(_loc3_ in param2)
            {
               param1.push(_loc3_);
            }
         }
      }
      
      public static function ifHasAndSave(param1:Object, param2:Object) : Boolean
      {
         if(param1 != null)
         {
            if(param1.indexOf(param2) == -1)
            {
               param1.push(param2);
               return true;
            }
            return false;
         }
         return false;
      }
      
      public static function ifHaveSameTheLaterOne(param1:Object, param2:Object) : void
      {
         var _loc3_:Object = null;
         if(param1 != null && param2 != null)
         {
            for each(_loc3_ in param2)
            {
               ifHasAndSave(param1,_loc3_);
            }
         }
      }
      
      public static function addItemAt(param1:Object, param2:Object, param3:int) : void
      {
         if(param1 != null)
         {
            param1.splice(param3,0,param2);
         }
      }
      
      public static function §--_-_--_§(param1:Object, param2:Object, param3:int) : void
      {
         var _loc4_:Object = null;
         if(param1 != null && isNotEmpty(param2))
         {
            for each(_loc4_ in param2)
            {
               param1.splice(param3++,0,_loc4_);
            }
         }
      }
      
      public static function removeAll(param1:Object) : void
      {
         if(isNotEmpty(param1))
         {
            param1.splice(0,param1.length);
         }
      }
      
      public static function removeItem(param1:Object, param2:Object) : Boolean
      {
         Assert.notNull(param1);
         var _loc3_:int = param1.indexOf(param2);
         if(_loc3_ != -1)
         {
            param1.splice(_loc3_,1);
            return true;
         }
         return false;
      }
      
      public static function deleteSameValues(param1:Object, param2:Object) : void
      {
         var _loc3_:Object = null;
         var _loc4_:int = 0;
         if(isNotEmpty(param1) && isNotEmpty(param2))
         {
            for each(_loc3_ in param2)
            {
               _loc4_ = param1.indexOf(_loc3_);
               if(_loc4_ != -1)
               {
                  param1.splice(_loc4_,1);
               }
            }
         }
      }
      
      public static function removeItemAt(param1:Object, param2:int) : void
      {
         if(isNotEmpty(param1) && param2 < param1.length)
         {
            param1.splice(param2,1);
         }
      }
      
      public static function getItemAt(param1:Object, param2:int, param3:* = null) : *
      {
         if(isNotEmpty(param1) && param1.length > param2)
         {
            return param1[param2];
         }
         return param3;
      }
      
      public static function getItemIndex(param1:Object, param2:Object) : int
      {
         if(isNotEmpty(param1))
         {
            return param1.indexOf(param2);
         }
         return -1;
      }
      
      public static function §-___-_-___---§(param1:Object, param2:*, param3:int) : void
      {
         if(isNotEmpty(param1) && contains(param1,param2))
         {
            param1.splice(param1.indexOf(param2),1);
            param1.splice(param3,0,param2);
         }
      }
      
      public static function §---__----___-§(param1:Object, param2:Object, param3:Object) : void
      {
         var _loc4_:int = 0;
         var _loc5_:int = 0;
         if(param2 === param3)
         {
            return;
         }
         if(isNotEmpty(param1) && contains(param1,param2) && contains(param1,param2))
         {
            _loc4_ = param1.indexOf(param2);
            _loc5_ = param1.indexOf(param3);
            param1[_loc4_] = param3;
            param1[_loc5_] = param2;
         }
      }
      
      public static function §--__--___-_§(param1:Object, param2:int, param3:int) : void
      {
         var _loc4_:Object = null;
         var _loc5_:Object = null;
         if(param2 == param3)
         {
            return;
         }
         if(isNotEmpty(param1) && param2 < param1.length && param3 < param1.length)
         {
            _loc4_ = param1[param2];
            _loc5_ = param1[param3];
            param1[param2] = _loc5_;
            param1[param3] = _loc4_;
         }
      }
      
      public static function §---__-_-___§(param1:Object, param2:int, param3:int) : *
      {
         var _loc4_:int = 0;
         if(isNotEmpty(param1))
         {
            _loc4_ = param1.length;
            param2 = (param2 + _loc4_) % _loc4_;
            param3 = (param3 + _loc4_) % _loc4_;
            if(param2 <= param3)
            {
               return param1.slice(param2,param3 + 1);
            }
            return param1.slice(param2,_loc4_).concat(param1.slice(0,param3 + 1));
         }
         return param1;
      }
   }
}

*/