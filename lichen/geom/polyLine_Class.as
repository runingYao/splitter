package com.qunhe.commons.math.geom
{
   import §-_-___---__§.edgePointHelperClass;
   import §-_-___---__§.my_math;
   import §-___--____-_--§.IllegalArgumentError;
   import §-_____--____-§.§---_--§;
   import §-_____--____-§.§--__-_-__-__-§;
   import §-_____--____-§.§-_-_-__--_-_§;
   import §-_____--____-§.§-_-__-__-__-§;
   import org.as3commons.logging.api.ILogger;
   import org.as3commons.logging.api.getLogger;
   
   public class polyLine_Class
   {
      
      private static const LOG:ILogger = getLogger(polyLine_Class);
      
      private static const TOLERANCE:Number = 1;
       
      
      private var §-_-_-____---_§:Vector.<§-_-_-__--_-_§>;
      
      private var §-___-_------_-§:Vector.<§-_-__-__-__-§>;
      
      private var m_bbox:my_Rect;
      
      public function polyLine_Class(param1:Vector.<Vec2>)
      {
         super();
         if(param1.length < 2)
         {
            throw new IllegalArgumentError("Polyline must has more than one valid Point.");
         }
         this.§---__----§(param1.concat());
      }
      
      private function §---__----§(param1:Vector.<Vec2>) : void
      {
         var _loc5_:Vec2 = null;
         var _loc6_:Vec2 = null;
         var _loc7_:Vec2 = null;
         var _loc8_:Vec2 = null;
         edgePointHelperClass.§-_-_-_-___---§(param1);
         this.m_bbox = my_Rect.include_into_my_range(param1);
         this.§-_-_-____---_§ = new Vector.<§-_-_-__--_-_§>();
         this.§-___-_------_-§ = new Vector.<§-_-__-__-__-§>();
         var _loc2_:int = param1.length;
         if(_loc2_ == 1)
         {
            this.§-_-_-____---_§.push(new §-_-_-__--_-_§(param1[0],new Vec2(),0));
            LOG.error("Polyline must has more than one valid Point.");
            return;
         }
         var _loc3_:Number = 0;
         var _loc4_:int = 0;
         while(_loc4_ < _loc2_)
         {
            _loc5_ = param1[_loc4_];
            _loc6_ = _loc4_ != 0?param1[_loc4_ - 1]:null;
            _loc7_ = _loc4_ < _loc2_ - 1?param1[_loc4_ + 1]:null;
            if(_loc6_ != null)
            {
               _loc3_ = _loc3_ + _loc6_.distance(_loc5_);
            }
            if(_loc6_ == null)
            {
               _loc8_ = Vec2.sub(_loc7_,_loc5_).rotate_minus_90_degree().normalize();
            }
            else if(_loc7_ == null)
            {
               _loc8_ = Vec2.sub(_loc5_,_loc6_).rotate_minus_90_degree().normalize();
            }
            else
            {
               _loc8_ = Vec2.§-___-__-___--§(Vec2.sub(_loc6_,_loc5_),Vec2.sub(_loc7_,_loc5_));
            }
            this.§-_-_-____---_§.push(new §-_-_-__--_-_§(_loc5_,_loc8_,_loc3_));
            if(_loc6_ != null)
            {
               this.§-___-_------_-§.push(new §-_-__-__-__-§(this.§-_-_-____---_§[_loc4_ - 1],this.§-_-_-____---_§[_loc4_],_loc4_ == 1,_loc4_ == _loc2_ - 1));
            }
            _loc4_++;
         }
      }
      
      public function getExpanded(param1:Number, param2:Number) : polyLine_Class
      {
         var _loc3_:Interval = Interval.fromValues(param1,param2);
         var _loc4_:polyLine_Class = new polyLine_Class(this.§-_---_-_-_-_§(_loc3_));
         return param1 > param2?_loc4_.reverse():_loc4_;
      }
      
      public function §-_---_-_-_-_§(param1:Interval) : Vector.<Vec2>
      {
         var _loc2_:Interval = param1.mul(this.getLength());
         var _loc3_:Vector.<Vec2> = new Vector.<Vec2>();
         _loc3_.push(this.getSplitPosByRatio(param1.min));
         var _loc4_:int = 0;
         while(_loc4_ < this.getSize())
         {
            if(this.§-____----____§(_loc4_) > _loc2_.max)
            {
               break;
            }
            if(this.§-____----____§(_loc4_) > _loc2_.min)
            {
               _loc3_.push(this.§-___-_---___--§(_loc4_));
            }
            _loc4_++;
         }
         _loc3_.push(this.getSplitPosByRatio(param1.max));
         edgePointHelperClass.§-_-_-_-___---§(_loc3_);
         return _loc3_;
      }
      
      public function §-___-_-____§() : Vector.<Number>
      {
         var _loc3_:Number = NaN;
         var _loc1_:Vector.<Number> = new Vector.<Number>();
         var _loc2_:Number = this.getLength();
         for each(_loc3_ in this.§-__-__-___-___§())
         {
            _loc1_.push(_loc3_ / _loc2_);
         }
         return _loc1_;
      }
      
      public function getSplitPosByRatio(param1:Number) : Vec2
      {
         if(param1 == 0)
         {
            return this.§---__--_-_--§();
         }
         if(param1 == 1)
         {
            return this.§--_---___-_--§();
         }
         var _loc2_:Number = param1 * this.getLength();
         var _loc3_:int = this.getSize();
         var _loc4_:int = _loc3_ - 1;
         var _loc5_:int = 0;
         while(_loc5_ < _loc3_)
         {
            if(this.§-____----____§(_loc5_) >= _loc2_)
            {
               _loc4_ = _loc5_;
               break;
            }
            _loc5_++;
         }
         if(_loc4_ == 0)
         {
            _loc4_++;
         }
         var _loc6_:Number = this.§-----__--§(_loc4_ - 1).getAlphaByValue(_loc2_);
         return this.§--__-_-_____-§(_loc4_ - 1).interpolate(_loc6_);
      }
      
      public function §---_-_-_-_§(param1:Number) : Vec2
      {
         return this.§--_-___--_§(param1).rotate_90_degree();
      }
      
      public function §--_-___--_§(param1:Number) : Vec2
      {
         var _loc2_:Number = param1 * this.getLength();
         return this.§--___§(_loc2_);
      }
      
      public function §--___§(param1:Number) : Vec2
      {
         var _loc4_:Number = NaN;
         var _loc2_:int = this.getSize();
         var _loc3_:int = 1;
         while(_loc3_ < _loc2_)
         {
            if(this.§-____----____§(_loc3_) > param1)
            {
               _loc4_ = (param1 - this.§-____----____§(_loc3_ - 1)) / (this.§-____----____§(_loc3_) - this.§-____----____§(_loc3_ - 1));
               return Vec2.interpolate(this.§----____-§(_loc3_ - 1),this.§----____-§(_loc3_),_loc4_);
            }
            _loc3_++;
         }
         return this.§----____-§(_loc2_ - 1);
      }
      
      public function §-____--_-_-_-§(param1:Vec2, param2:Boolean = false) : Number
      {
         var _loc4_:int = 0;
         var _loc5_:Number = NaN;
         var _loc6_:int = 0;
         var _loc7_:my2D_Edge = null;
         var _loc8_:Interval = null;
         var _loc9_:Number = NaN;
         var _loc10_:Number = NaN;
         var _loc11_:my2D_Edge = null;
         var _loc12_:Vec2 = null;
         var _loc13_:Number = NaN;
         var _loc3_:int = this.getSize();
         if(_loc3_ >= 2)
         {
            _loc4_ = 0;
            _loc5_ = Number.MAX_VALUE;
            _loc6_ = 0;
            while(_loc6_ < _loc3_ - 1)
            {
               _loc11_ = this.§--__-_-_____-§(_loc6_);
               _loc12_ = _loc11_.getClosestPoint(param1,true);
               _loc13_ = Vec2.distanceSquare(param1,_loc12_);
               if(_loc13_ < _loc5_)
               {
                  _loc4_ = _loc6_;
                  _loc5_ = _loc13_;
               }
               _loc6_++;
            }
            _loc7_ = this.§--__-_-_____-§(_loc4_);
            _loc8_ = this.§-----__--§(_loc4_);
            _loc9_ = _loc7_.§-____--_-_-_-§(param1,false);
            if(!param2)
            {
               _loc9_ = my_math.clamp_0_1(_loc9_);
            }
            else if(_loc4_ == 0 && _loc3_ > 2)
            {
               _loc9_ = _loc9_ > 1?Number(1):Number(_loc9_);
            }
            else if(_loc4_ == _loc3_ - 2 && _loc3_ > 2)
            {
               _loc9_ = _loc9_ < 0?Number(0):Number(_loc9_);
            }
            _loc10_ = _loc8_.interpolate(_loc9_);
            return _loc10_ / this.getLength();
         }
         return 0;
      }
      
      public function §-_-_---_-__-_§(param1:polyLine_Class, param2:Number = 1) : Vector.<Vec2>
      {
         if(!this.m_bbox.§-_--__---____§(param1.m_bbox,2 * param2))
         {
            return new Vector.<Vec2>();
         }
         return this.§---____-_-_--§(param1,true).§-_-___-___---§(param2);
      }
      
      public function §---____-_-_--§(param1:polyLine_Class, param2:Boolean) : §---_--§
      {
         var _loc7_:§-_-__-__-__-§ = null;
         var _loc8_:int = 0;
         var _loc9_:§-_-__-__-__-§ = null;
         var _loc10_:§--__-_-__-__-§ = null;
         var _loc11_:Vec2 = null;
         var _loc12_:Number = NaN;
         var _loc13_:Number = NaN;
         var _loc3_:§---_--§ = new §---_--§(new Vec2(this.getLength(),param1.getLength()));
         if(!param2 && !this.m_bbox.isIntersected(param1.m_bbox))
         {
            return _loc3_;
         }
         var _loc4_:Vector.<§-_-__-__-__-§> = this.§-___-_------_-§;
         var _loc5_:Vector.<§-_-__-__-__-§> = param1.§-___-_------_-§;
         var _loc6_:int = 0;
         while(_loc6_ < _loc4_.length)
         {
            _loc7_ = _loc4_[_loc6_];
            _loc8_ = 0;
            while(_loc8_ < _loc5_.length)
            {
               _loc9_ = _loc5_[_loc8_];
               _loc10_ = _loc7_.getIntersection(_loc9_,param2);
               if(_loc10_ != null)
               {
                  _loc11_ = _loc10_.point;
                  _loc12_ = _loc7_.§-__---__§.§-____--_-_-_-§(_loc11_);
                  _loc13_ = _loc9_.§-__---__§.§-____--_-_-_-§(_loc11_);
                  if(!param2)
                  {
                     _loc3_.§-_--_----_-_§(_loc10_);
                  }
                  else if(_loc6_ != 0 && _loc6_ != _loc4_.length - 1 && _loc8_ != 0 && _loc8_ != _loc5_.length - 1 && _loc12_ >= 0 && _loc12_ <= 1 && _loc13_ >= 0 && _loc13_ <= 1)
                  {
                     _loc3_.§-_--_----_-_§(_loc10_);
                  }
                  else if(_loc6_ == 0 && _loc12_ <= 1 || _loc6_ == _loc4_.length - 1 && _loc12_ >= 0 || _loc8_ == 0 && _loc13_ <= 1 || _loc8_ == _loc5_.length - 1 && _loc13_ >= 0)
                  {
                     _loc3_.§-_--_----_-_§(_loc10_);
                  }
               }
               _loc8_++;
            }
            _loc6_++;
         }
         return _loc3_;
      }
      
      public function §-_-__-___--__§(param1:Number) : Vector.<Vec2>
      {
         var _loc2_:Vector.<Vec2> = new Vector.<Vec2>();
         var _loc3_:int = this.getSize();
         var _loc4_:int = 0;
         while(_loc4_ < _loc3_)
         {
            _loc2_.push(Vec2.add(this.§-___-_---___--§(_loc4_),this.§----____-§(_loc4_).mul(param1)));
            _loc4_++;
         }
         return _loc2_;
      }
      
      public function §---__--_-_--§() : Vec2
      {
         return this.§-___-_---___--§(0);
      }
      
      public function §--_---___-_--§() : Vec2
      {
         return this.§-___-_---___--§(this.getSize() - 1);
      }
      
      public function §-_-_-__-__---§() : Vector.<Vec2>
      {
         var _loc2_:§-_-_-__--_-_§ = null;
         var _loc1_:Vector.<Vec2> = new Vector.<Vec2>();
         for each(_loc2_ in this.§-_-_-____---_§)
         {
            _loc1_.push(_loc2_.point);
         }
         return _loc1_;
      }
      
      public function §------_---__§() : Vector.<Vec2>
      {
         var _loc2_:§-_-_-__--_-_§ = null;
         var _loc1_:Vector.<Vec2> = new Vector.<Vec2>();
         for each(_loc2_ in this.§-_-_-____---_§)
         {
            _loc1_.push(_loc2_.normal);
         }
         return _loc1_;
      }
      
      public function §-__-__-___-___§() : Vector.<Number>
      {
         var _loc2_:§-_-_-__--_-_§ = null;
         var _loc1_:Vector.<Number> = new Vector.<Number>();
         for each(_loc2_ in this.§-_-_-____---_§)
         {
            _loc1_.push(_loc2_.length);
         }
         return _loc1_;
      }
      
      public function §-___-_---___--§(param1:int) : Vec2
      {
         return this.§-_-_-____---_§[param1].point;
      }
      
      public function §----____-§(param1:int) : Vec2
      {
         return this.§-_-_-____---_§[param1].normal;
      }
      
      public function §-____----____§(param1:int) : Number
      {
         return this.§-_-_-____---_§[param1].length;
      }
      
      public function §--__-_-_____-§(param1:int) : my2D_Edge
      {
         return this.§-___-_------_-§[param1].§-__---__§;
      }
      
      public function §-----__--§(param1:int) : Interval
      {
         return this.§-___-_------_-§[param1].§-__-__-___--§;
      }
      
      public function getLength() : Number
      {
         return this.§-____----____§(this.getSize() - 1);
      }
      
      public function getSize() : int
      {
         return this.§-_-_-____---_§.length;
      }
      
      public function toString() : String
      {
         return "Polyline" + "(" + this.§-_-_-__-__---§() + ")";
      }
      
      public function reverse() : polyLine_Class
      {
         if(this.§-_-_-____---_§)
         {
            this.§-_-_-____---_§.reverse();
         }
         return this;
      }
   }
}
