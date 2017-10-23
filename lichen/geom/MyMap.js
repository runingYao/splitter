function MyMap() {
    this._stringMap = {};
    this._keys = {};
    this._items = {};
    this._size = 0;   
}

MyMap.prototype.removeAll = function(param1)
{
    var _loc2_ = 0;
    
    for (var _loc3_ in this._stringMap) {
        if (this._stringMap[_loc3_]  == param1) {
            delete this._stringMap[_loc3_];
            this._size--;
            //itemRemoved(_loc3_,param1);
            _loc2_++;
        }
    }
    
    for (var _loc4_ in this._items) {
        if(_items[_loc4_] === param1)
        {
            delete this._keys[_loc4_];
            delete this._items[_loc4_];
            this._size--;
            //itemRemoved(_loc3_,param1);
            _loc2_++;
        }
    }
    
    return _loc2_;
}

MyMap.prototype.getSize = function()
{
    return this._size;
}

MyMap.prototype.keysToArray = function()
{
    //var _loc2_:* = null;
    //var _loc3_:* = undefined;
    var _loc1_ = [];
    for (var _loc2_ in this._stringMap)
    //for(_loc2_ in _stringMap)
    {
        _loc1_.push(_loc2_);
    }
    
    for (var _loc3_ in this._keys)
    {
        _loc1_.push(this._keys[_loc3_]);
    }
    return _loc1_;
}

MyMap.prototype.clear = function()
{
    if(!this._size)
    {
        return false;
    }
    this._keys = {};//new Dictionary();
    this._items = {};//new Dictionary();
    this._stringMap = {};//new Object();
    this._size = 0;
    return true;
}

MyMap.prototype.count = function(param1)
{
    //var _loc3_:* = undefined;
    var _loc2_ = 0;
    for (var _loc3_ in this._stringMap)
    {
        if(this._stringMap[_loc3_] === param1)
        {
            _loc2_++;
        }
    }
    for (var _loc3_ in this._items)
    {
        if(this._items[_loc3_] === param1)
        {
            _loc2_++;
        }
    }
    return _loc2_;
}

MyMap.prototype.has = function(param1)
{
    //var _loc2_:* = undefined;
    for (var _loc2_ in this._stringMap)
    {
        if(this._stringMap[_loc2_] === param1)
        {
            return true;
        }
    }
    
    for (var _loc2_ in this._items)
    {
        if(this._items[_loc2_] === param1)
        {
            return true;
        }
    }
    return false;
}

MyMap.prototype.remove = function(param1)
{
    //var _loc2_ = null;
    //var _loc3_:* = undefined;
    for(var _loc2_ in this._stringMap)
    {
        if(this._stringMap[_loc2_] === param1)
        {
            delete this._stringMap[_loc2_];
            this._size--;
            //itemRemoved(_loc2_,param1);
            return true;
        }
    }
    for(var _loc3_ in this._items)
    {
        if(this._items[_loc3_] === param1)
        {
            delete this._keys[_loc3_];
            delete this._items[_loc3_];
            this._size--;
            //itemRemoved(_loc2_,param1);
            return true;
        }
    }
    return false;
}

/*
MyMap.prototype.toArray() : Array
{
    var _loc2_:* = undefined;
    var _loc1_:Array = new Array();
    for each(_loc2_ in _stringMap)
    {
        _loc1_.push(_loc2_);
    }
    for each(_loc2_ in _items)
    {
        _loc1_.push(_loc2_);
    }
    return _loc1_;
}
*/

MyMap.prototype.add = function(param1, param2)
{
    if(param1 instanceof String)
    {
        if(this._stringMap[param1] !== undefined)
        {
            return false;
        }
        this._stringMap[param1] = param2;
    }
    else
    {
        if (this.hasKey(param1))
        //if(this._keys[param1] !== undefined)
        {
            return false;
        }
        this._keys[this._size] = param1;
        this._items[this._size] = param2;
    }
    this._size++;
    return true;
}

MyMap.prototype.hasKey = function(param1)
{
    if (param1 instanceof String) {
        return this._stringMap[param1] !== undefined;
    } else {
        for(var _loc3_ in this._keys) {
            if (this._keys[_loc3_] == param1) {
                 return true;
            }
        }
    }
    return false;
}
/*
MyMap.prototype.iterator(param1:* = undefined) : IIterator
{
return new MapIterator(this);
}

protected function itemRemoved(param1:*, param2:*) : void
{
}

MyMap.prototype.keyIterator() : IIterator
{
return new ArrayIterator(keysToArray());
}
*/
MyMap.prototype.replaceFor = function(param1, param2)
{
    if(param1 instanceof String)
    {
        if(this._stringMap[param1] === undefined)
        {
            return false;
        }
        if(this._stringMap[param1] === param2)
        {
            return false;
        }
        this._stringMap[param1] = param2;
    }
    else
    {
        if (this.hasKey(param1)) {
            for(var _loc3_ in this._keys) {
                if (this._keys[_loc3_] == param1) {
                     if (this._items[_loc3_] == param2) {
                         return false;
                     }
                     else {
                         this._items[_loc3_] = param2;
                         return true;
                     }
                }
            }
        } else {
            return false;
        }
    }
    return true;
}

MyMap.prototype.removeKey = function(param1)
{
    var _loc2_ = undefined;
    if(param1 instanceof String)
    {
        if(this._stringMap[param1] === undefined)
        {
            return undefined;
        }
        _loc2_ = this._stringMap[param1];
        delete _stringMap[param1];
    }
    else
    {
        if (this.hasKey(param1)) {
            for(var _loc3_ in this._keys) {
                if (this._keys[_loc3_] == param1) {
                    _loc2_ = this._items[_loc3_];
                    delete this._keys[_loc3_];
                    delete this._items[_loc3_];
                    break;
                }
            }
        } else
        {
            return undefined;
        }
    }
    this._size--;
    return _loc2_;
}

MyMap.prototype.itemFor = function(param1)
{
    if(param1 instanceof String)
    {
        return this._stringMap[param1];
    }
    if (this.hasKey(param1)) {
        for(var _loc3_ in this._keys) {
            if (this._keys[_loc3_] == param1) {
                return this._items[_loc3_];
            }
        }
    } 
}


/*
package org.as3commons.collections
{
   import flash.utils.Dictionary;
   import org.as3commons.collections.framework.IIterator;
   import org.as3commons.collections.framework.IMap;
   import org.as3commons.collections.framework.core.MapIterator;
   import org.as3commons.collections.iterators.ArrayIterator;
   
   public class Map implements IMap
   {
       
      
      protected var _items:Dictionary;
      
      protected var _stringMap:Object;
      
      protected var _keys:Dictionary;
      
      protected var _size:uint = 0;
      
      public function Map()
      {
         super();
         _items = new Dictionary();
         _keys = new Dictionary();
         _stringMap = new Object();
      }
      
      public function get size() : uint
      {
         return _size;
      }
      
      public function keysToArray() : Array
      {
         var _loc2_:* = null;
         var _loc3_:* = undefined;
         var _loc1_:Array = new Array();
         for(_loc2_ in _stringMap)
         {
            _loc1_.push(_loc2_);
         }
         for each(_loc3_ in _keys)
         {
            _loc1_.push(_loc3_);
         }
         return _loc1_;
      }
      
      public function clear() : Boolean
      {
         if(!_size)
         {
            return false;
         }
         _keys = new Dictionary();
         _items = new Dictionary();
         _stringMap = new Object();
         _size = 0;
         return true;
      }
      
      public function count(param1:*) : uint
      {
         var _loc3_:* = undefined;
         var _loc2_:uint = 0;
         for each(_loc3_ in _stringMap)
         {
            if(_loc3_ === param1)
            {
               _loc2_++;
            }
         }
         for each(_loc3_ in _items)
         {
            if(_loc3_ === param1)
            {
               _loc2_++;
            }
         }
         return _loc2_;
      }
      
      public function has(param1:*) : Boolean
      {
         var _loc2_:* = undefined;
         for each(_loc2_ in _stringMap)
         {
            if(_loc2_ === param1)
            {
               return true;
            }
         }
         for each(_loc2_ in _items)
         {
            if(_loc2_ === param1)
            {
               return true;
            }
         }
         return false;
      }
      
      public function remove(param1:*) : Boolean
      {
         var _loc2_:* = null;
         var _loc3_:* = undefined;
         for(_loc2_ in _stringMap)
         {
            if(_stringMap[_loc2_] === param1)
            {
               delete _stringMap[_loc2_];
               _size--;
               itemRemoved(_loc2_,param1);
               return true;
            }
         }
         for(_loc3_ in _items)
         {
            if(_items[_loc3_] === param1)
            {
               delete _keys[_loc3_];
               delete _items[_loc3_];
               _size--;
               itemRemoved(_loc2_,param1);
               return true;
            }
         }
         return false;
      }
      
      public function removeAll(param1:*) : uint
      {
         var _loc3_:* = null;
         var _loc4_:* = undefined;
         var _loc2_:uint = 0;
         for(_loc3_ in _stringMap)
         {
            if(_stringMap[_loc3_] === param1)
            {
               delete _stringMap[_loc3_];
               _size--;
               itemRemoved(_loc3_,param1);
               _loc2_++;
            }
         }
         for(_loc4_ in _items)
         {
            if(_items[_loc4_] === param1)
            {
               delete _keys[_loc4_];
               delete _items[_loc4_];
               _size--;
               itemRemoved(_loc3_,param1);
               _loc2_++;
            }
         }
         return _loc2_;
      }
      
      public function toArray() : Array
      {
         var _loc2_:* = undefined;
         var _loc1_:Array = new Array();
         for each(_loc2_ in _stringMap)
         {
            _loc1_.push(_loc2_);
         }
         for each(_loc2_ in _items)
         {
            _loc1_.push(_loc2_);
         }
         return _loc1_;
      }
      
      public function add(param1:*, param2:*) : Boolean
      {
         if(param1 is String)
         {
            if(_stringMap[param1] !== undefined)
            {
               return false;
            }
            _stringMap[param1] = param2;
         }
         else
         {
            if(_keys[param1] !== undefined)
            {
               return false;
            }
            _keys[param1] = param1;
            _items[param1] = param2;
         }
         _size++;
         return true;
      }
      
      public function hasKey(param1:*) : Boolean
      {
         return param1 is String?_stringMap[param1] !== undefined:_keys[param1] !== undefined;
      }
      
      public function iterator(param1:* = undefined) : IIterator
      {
         return new MapIterator(this);
      }
      
      protected function itemRemoved(param1:*, param2:*) : void
      {
      }
      
      public function keyIterator() : IIterator
      {
         return new ArrayIterator(keysToArray());
      }
      
      public function replaceFor(param1:*, param2:*) : Boolean
      {
         if(param1 is String)
         {
            if(_stringMap[param1] === undefined)
            {
               return false;
            }
            if(_stringMap[param1] === param2)
            {
               return false;
            }
            _stringMap[param1] = param2;
         }
         else
         {
            if(_keys[param1] === undefined)
            {
               return false;
            }
            if(_items[param1] === param2)
            {
               return false;
            }
            _items[param1] = param2;
         }
         return true;
      }
      
      public function removeKey(param1:*) : *
      {
         var _loc2_:* = undefined;
         if(param1 is String)
         {
            if(_stringMap[param1] === undefined)
            {
               return undefined;
            }
            _loc2_ = _stringMap[param1];
            delete _stringMap[param1];
         }
         else
         {
            if(_keys[param1] === undefined)
            {
               return undefined;
            }
            _loc2_ = _items[param1];
            delete _keys[param1];
            delete _items[param1];
         }
         _size--;
         return _loc2_;
      }
      
      public function itemFor(param1:*) : *
      {
         if(param1 is String)
         {
            return _stringMap[param1];
         }
         return _items[param1];
      }
   }
}
*/