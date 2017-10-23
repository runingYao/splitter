function MyCircle(param1, param2) {
    if (param1 == null || param1 == undefined) {
        param1 = null;
    }

    if (param2 == null || param2 == undefined) {
        param2 = 0;
    }

    //param1 = param1 || null;
    //param2 = param2 || 0;
    
    this.mCenter = param1;
    this.mRadius = param2;
}

MyCircle.prototype.getCenterIntersectAngle = function(param1)
{
    var p = new Vec2(param1.mX, param1.mY, param1.mW);
    return p.sub(this.mCenter).getAngle();
}

MyCircle.prototype.isInsideCircle = function(param1, param2)
{
    if (param2 == null || param2 == undefined) {
        param2 = 1.0E-6;
    }
    //console.log("%%%%%%%");
    //console.log(Math.abs(this.mCenter.distance(param1) - this.mRadius) + " " + param2);
    return Math.abs(this.mCenter.distance(param1) - this.mRadius) < param2;
}
      
/*
package com.qunhe.commons.math.geom
{
   public class Circle
   {
      
      private static const TOLERANCE:Number = 1.0E-6;
       
      
      private var m_radius:Number;
      
      private var m_center:Vec2;
      
      public function Circle(param1:Vec2 = null, param2:Number = 0)
      {
         super();
         this.m_center = param1;
         this.m_radius = param2;
      }
      
      public function contains(param1:Vec2, param2:Boolean = false) : Boolean
      {
         return !!param2?this.m_center.distance(param1) <= this.m_radius:this.m_center.distance(param1) < this.m_radius;
      }
      
      public function isInsideCircle(param1:Vec2, param2:Number = 1.0E-6) : Boolean
      {
         return Math.abs(this.m_center.distance(param1) - this.m_radius) < param2;
      }
      
      public function §-______-_--__§(param1:my2D_Edge, param2:Boolean = false) : Boolean
      {
         var _loc3_:Number = param1.getDistance(this.m_center,true);
         return !!param2?_loc3_ < this.m_radius + TOLERANCE:_loc3_ < this.m_radius - TOLERANCE;
      }
      
      public function curvePosByRatio(param1:Number) : Vec2
      {
         return Vec2.add(this.m_center,new Vec2(this.m_radius * Math.cos(param1),this.m_radius * Math.sin(param1)));
      }
      
      public function getCenterIntersectAngle(param1:Vec2) : Number
      {
         return param1.sub(this.m_center).angle;
      }
      
      public function §-----_--__-§(param1:Number, param2:Number, param3:int) : Vector.<Vec2>
      {
         var _loc6_:Number = NaN;
         var _loc4_:Vector.<Vec2> = new Vector.<Vec2>();
         var _loc5_:int = 0;
         while(_loc5_ <= param3)
         {
            _loc6_ = param1 + param2 * _loc5_ / param3;
            _loc4_.push(this.curvePosByRatio(_loc6_));
            _loc5_++;
         }
         return _loc4_;
      }
      
      public function get center() : Vec2
      {
         return this.m_center;
      }
      
      public function set center(param1:Vec2) : void
      {
         this.m_center = param1;
      }
      
      public function get radius() : Number
      {
         return this.m_radius;
      }
      
      public function set radius(param1:Number) : void
      {
         this.m_radius = param1;
      }
   }
}
*/