package com.qunhe.commons.lang
{
   import §--__--__-_-__§.§--------__--_§;
   
   public class ObjectIndex extends §-__-_-_-_-__--§ implements §--------__--_§
   {
      
      public static function ID_EXTRACTOR(param1:§--------__--_§):String
      {
         return param1.id;
      } 
      
      protected var mId:String;
      
      public function ObjectIndex()
      {
         super();
      }
      
      public static function extractIds(param1:Object) : Vector.<String>
      {
         var _loc3_:§--------__--_§ = null;
         var _loc2_:Vector.<String> = new Vector.<String>();
         for each(_loc3_ in param1)
         {
            _loc2_.push(_loc3_.id);
         }
         return _loc2_;
      }
      
      public function assignUniqueId() : String
      {
         var _loc1_:int = §--__---____-§.§-__---_-__-§();
         var _loc2_:String = _loc1_.toString();
         this.mId = _loc2_;
         return _loc2_;
      }
      
      public function toString() : String
      {
         return className + "<" + this.mId + ">";
      }
      
      override public function equals(param1:Object) : Boolean
      {
         return this.mId == param1.id;
      }
      
      public function get id() : String
      {
         return !!this.mId?this.mId:this.assignUniqueId();
      }
      
      public function set id(param1:String) : void
      {
         this.mId = param1;
         §--__---____-§.§--___-----_-_§(parseInt(param1));
      }
   }
}
