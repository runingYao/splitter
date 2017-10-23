package §-__---_-_--_-§
{
   import com.qunhe.commons.math.geom.Vec2;
   import com.qunhe.commons.math.types.Line2DIntersectionStatus;
   
   public class my_edge_collide_class
   {
       
      
      private var mStatus:Line2DIntersectionStatus;
      
      private var §-__-_-_-___-_-§:Vec2;
      
      private var §-__--_-_--_§:Vec2;
      
      private var m_Point_OO:Vec2;
      
      public function my_edge_collide_class()
      {
         super();
      }
      
      public function get status() : Line2DIntersectionStatus
      {
         return this.mStatus;
      }
      
      public function set status(param1:Line2DIntersectionStatus) : void
      {
         this.mStatus = param1;
      }
      
      public function get point() : Vec2
      {
         return this.m_Point_OO;
      }
      
      public function set point(param1:Vec2) : void
      {
         this.m_Point_OO = param1;
      }
      
      public function get ratio1() : Vec2
      {
         return this.§-__-_-_-___-_-§;
      }
      
      public function set ratio1(param1:Vec2) : void
      {
         this.§-__-_-_-___-_-§ = param1;
      }
      
      public function get ratio2() : Vec2
      {
         return this.§-__--_-_--_§;
      }
      
      public function set ratio2(param1:Vec2) : void
      {
         this.§-__--_-_--_§ = param1;
      }
   }
}
