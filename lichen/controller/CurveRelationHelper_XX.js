function CurveRelationHelper_XX() {

}

/*
public static function getTheClosestCurve_ax(param1:Vec2, param2:Vector.<wallCurve>, param3:Boolean = false, param4:Number = 0.001, param5:Number = 6) : wallCurve
{
 var _loc8_:wallCurve = null;
 var _loc9_:Number = NaN;
 var _loc6_:wallCurve = null;
 var _loc7_:Number = Number.MAX_VALUE;
 for each(_loc8_ in param2)
 {
    _loc9_ = _loc8_.getTheCurveStartEndEdgeToPointDistance(param1,true);
    if(_loc9_ < _loc7_ && _loc9_ < param5)
    {
       _loc7_ = _loc9_;
       _loc6_ = _loc8_;
    }
 }
 if(!param3 && _loc6_ != null && (Vec2.isEqual(param1,_loc6_.start,param4) || Vec2.isEqual(param1,_loc6_.end,param4)))
 {
    return null;
 }
 return _loc6_;
}
*/


CurveRelationHelper_XX.getTheClosestCurve_ax = function(param1, param2, param3, param4, param5)
{
    if (param3 == null || param3 == undefined) {
        param3 = false;
    }
    if (param4 == null || param4 == undefined) {
        param4 = 0.001;
    }
    if (param5 == null || param5 == undefined) {
        param5 = 6;
    }
    var _loc8_ = null;
    var _loc9_ = NaN;
    var _loc6_ = null;
    var _loc7_ = Number.MAX_VALUE;
    //for each(_loc8_ in param2)
    for (var i = 0; i < param2.length; i++)
    {
        _loc9_ = param2[i].getTheCurveStartEndEdgeToPointDistance(param1,true);
        _loc9_ = Math.abs(_loc9_);
        if(_loc9_ < _loc7_ && _loc9_ < 0.0001)
        {
            _loc7_ = _loc9_;
            _loc6_ = param2[i];
        }
        /*
        
        _loc9_ = param2[i].getTheCurveStartEndEdgeToPointDistance(param1,true);
        if(_loc9_ < _loc7_ && _loc9_ < param5)
        {
            _loc7_ = _loc9_;
            _loc6_ = param2[i];
        }
        */
    }
    if(!param3 && _loc6_ != null && (Vec2.isEqual(param1,_loc6_.mStart.mPosition,param4) || Vec2.isEqual(param1,_loc6_.mEnd.mPosition,param4)))
    {
        return null;
    }
    return _loc6_;
}
/*
package §-_-_-___--_--§
{
   import §-_-___---__§.lineRelationHelper;
   import §-___--____-_--§.my_error_logger;
   import com.qunhe.commons.math.geom.my2D_Edge;
   import com.qunhe.commons.math.geom.Vec2;
   import com.qunhe.instdeco.model.decoration.curveBasicClass;
   import com.qunhe.instdeco.model.decoration.AreaFatherClass;
   import com.qunhe.instdeco.model.wall.wallcurveSon;
   import com.qunhe.instdeco.model.wall.wallAreas_Class;
   import com.qunhe.instdeco.model.wall.cornerSonClass;
   import com.qunhe.instdeco.model.wall.wallCurveSonClass_AH;
   import com.qunhe.instdeco.model.wall.wallCurve;
   import com.qunhe.instdeco.model.wall.enum.WallDesignCurveMovePriority;
   
   public class CurveRelationHelper_XX
   {
      
      private static const §-___-__--___§:Number = 10;
      
      private static const DISTANCE_TOLERANCE:Number = 0.001;
      
      private static const §-_--_-_-__-__§:Number = 6;
       
      
      public function CurveRelationHelper_XX()
      {
         super();
         throw new my_error_logger();
      }
      
      public static function §--_--__-_-___§(param1:wallCurve) : void
      {
         var _loc2_:AreaFatherClass = null;
         var _loc3_:curveBasicClass = null;
         for each(_loc2_ in param1.areas)
         {
            for each(_loc3_ in _loc2_.curves)
            {
               _loc3_.invalidateStructure();
            }
         }
      }
      
      public static function §-_-__---__--_§(param1:my2D_Edge, param2:Vector.<wallCurve>, param3:Boolean = false, param4:Number = 0.001) : Vector.<Vec2>
      {
         var _loc6_:wallCurve = null;
         var _loc5_:Vector.<Vec2> = new Vector.<Vec2>();
         for each(_loc6_ in param2)
         {
            _loc6_.§-___________--§(param1,_loc5_,param3,param4);
         }
         return _loc5_;
      }
      
      public static function §-----__---_--§(param1:my2D_Edge, param2:Vector.<wallCurve>, param3:Vector.<Vec2> = null, param4:Boolean = false, param5:Number = 0.001) : Boolean
      {
         var _loc7_:wallCurve = null;
         var _loc6_:Boolean = false;
         for each(_loc7_ in param2)
         {
            if(_loc7_.§-___________--§(param1,param3,param4,param5))
            {
               if(param3 == null)
               {
                  return true;
               }
               _loc6_ = true;
            }
         }
         return _loc6_;
      }
      
      public static function §-__-____-_---§(param1:my2D_Edge, param2:wallCurve) : Boolean
      {
         var _loc3_:my2D_Edge = null;
         if(param2 is wallcurveSon)
         {
            _loc3_ = (param2 as wallcurveSon).getTheStartEndEdge();
            if(lineRelationHelper.§--_-__-_---__§(param1,_loc3_,false,§-___-__--___§))
            {
               return true;
            }
         }
         return false;
      }
      
      public static function §--__-_-___-_-§(param1:my2D_Edge, param2:Vector.<wallCurve>) : Boolean
      {
         var _loc3_:wallCurve = null;
         for each(_loc3_ in param2)
         {
            if(§-__-____-_---§(param1,_loc3_))
            {
               return true;
            }
         }
         return false;
      }
      
      public static function §-____--_-_§(param1:wallCurve) : Boolean
      {
         var _loc2_:wallAreas_Class = wallAreas_Class.switchClassTypeTo(param1.§-_-__-_---_§());
         if(_loc2_ == null)
         {
            return false;
         }
         return _loc2_.path.isCurveInPath_not_sure(param1);
      }
      
      public static function §---__-__-_-_-§(param1:wallCurve) : Boolean
      {
         var _loc2_:wallAreas_Class = wallAreas_Class.switchClassTypeTo(param1.§-_________-_--§());
         var _loc3_:wallAreas_Class = wallAreas_Class.switchClassTypeTo(param1.§-_-__-_---_§());
         if(_loc2_ != null && _loc3_ != null)
         {
            return _loc2_.offset > _loc3_.offset;
         }
         return false;
      }
      
      public static function §--_-_-___-__§(param1:Vector.<wallCurve>) : Boolean
      {
         var _loc2_:wallCurve = null;
         for each(_loc2_ in param1)
         {
            if(_loc2_ is wallCurveSonClass_AH)
            {
               return true;
            }
         }
         return false;
      }
      
      public static function §--_--_-_-___§(param1:wallCurve) : Number
      {
         var _loc2_:Vector.<wallAreas_Class> = wallAreas_Class.cloneParameter(param1.areas);
         if(_loc2_.length == 0)
         {
            return 0;
         }
         if(_loc2_.length == 1)
         {
            return Math.abs(wallAreas_Class.switchClassTypeTo(param1.areas[0]).offset);
         }
         return Math.abs(_loc2_[0].offset - _loc2_[1].offset);
      }
      
      
      
      public static function §------_-__-_§(param1:Vector.<Vec2>, param2:Vector.<wallCurve>, param3:Boolean = false, param4:Number = 6) : wallCurve
      {
         var _loc5_:wallCurve = null;
         var _loc6_:Boolean = false;
         var _loc7_:Vec2 = null;
         do
         {
            for each(_loc5_ in param2)
            {
               _loc6_ = true;
               for each(_loc7_ in param1)
               {
                  if(!_loc5_.isInsideMyArea(_loc7_,param3,param4))
                  {
                     _loc6_ = false;
                     break;
                  }
               }
            }
            return null;
         }
         while(!_loc6_);
         
         return _loc5_;
      }
      
      public static function §-__--_§(param1:wallCurve) : Vector.<my2D_Edge>
      {
         var _loc5_:my2D_Edge = null;
         var _loc2_:Vector.<my2D_Edge> = new Vector.<my2D_Edge>();
         var _loc3_:Vector.<Vec2> = param1.switchOrder();
         if(_loc3_.length < 2)
         {
            return _loc2_;
         }
         var _loc4_:int = 1;
         while(_loc4_ < _loc3_.length)
         {
            _loc5_ = new my2D_Edge(_loc3_[_loc4_ - 1],_loc3_[_loc4_]);
            _loc2_.push(_loc5_);
            _loc4_++;
         }
         return _loc2_;
      }
      
      public static function §-_____---_____§(param1:String, param2:Vector.<wallCurve>) : wallCurve
      {
         var _loc3_:wallCurve = null;
         for each(_loc3_ in param2)
         {
            if(_loc3_.id == param1)
            {
               return _loc3_;
            }
         }
         return null;
      }
      
      public static function §---__-__-_-_§(param1:wallCurve) : WallDesignCurveMovePriority
      {
         var _loc2_:Boolean = false;
         var _loc3_:Boolean = false;
         if(param1.§--__---_---_§())
         {
            return WallDesignCurveMovePriority.WALL;
         }
         _loc2_ = cornerSonClass.switchClassTypeTo(param1.m_Start).§-_-____--_--_§();
         _loc3_ = cornerSonClass.switchClassTypeTo(param1.m_End).§-_-____--_--_§();
         if(_loc2_ && _loc3_)
         {
            return WallDesignCurveMovePriority.TWO_WALL_CORNER;
         }
         if(_loc2_ || _loc3_)
         {
            return WallDesignCurveMovePriority.ONE_WALL_CORNER;
         }
         return WallDesignCurveMovePriority.NORMAL;
      }
   }
}
*/