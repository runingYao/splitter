function SideEnum() {

}

SideEnum.RIGHT = true;
SideEnum.LEFT  = false;


function GeoHelpSomeClass() {
    
}
//public static function getPolygonFromAreaPath(param1:wallAreas_Class) : my_polygon
GeoHelpSomeClass.getPolygonFromAreaPath = function(param1)
{
    /*
    var _loc8_:polyLine_Class = null;
    var _loc9_:wallCurve = null;
    var _loc10_:SideEnum = null;
    var _loc11_:Vector.<§-----_-__----§> = null;
    var _loc2_:my_polygon = new my_polygon();
    var _loc3_:m_pathOrMyPathClass = param1.path;
    var _loc4_:Vector.<wallCurve> = wallCurve.cloneParameter(_loc3_.curves);
    var _loc5_:Vector.<cornerSonClass> = cornerSonClass.cloneParameter(_loc3_.corners);
    var _loc6_:int = _loc4_.length;
    var _loc7_:int = 0;
    while(_loc7_ < _loc6_)
    {
        _loc9_ = _loc4_[_loc7_];
        _loc10_ = !!_loc9_.isStart(_loc5_[_loc7_])?SideEnum.RIGHT:SideEnum.LEFT;
        _loc11_ = _loc9_.§-_______--__--§(_loc10_);
        if(_loc11_.length > 0)
        {
            _loc8_ = _loc11_[_loc11_.length - 1].§-___---_-_-_-_§(_loc10_);
            _loc2_.addVertices(_loc8_.§-_-_-__-__---§());
        }
        else
        {
            _loc2_.addVertices(_loc9_.switchOrder(_loc9_.isEnd(_loc5_[_loc7_])));
        }
        _loc7_++;
    }
    _loc2_.polygonRemoveSame();
    return _loc2_;
    */
    var _loc8_ = null;
    var _loc9_ = null;
    //var _loc10_:SideEnum = null;
    //var _loc11_:Vector.<§-----_-__----§> = null;
    var _loc2_ = new MyPolygon();
    var _loc3_ = param1.mPath;
    var _loc4_ = _loc3_.mCurves;
    var _loc5_ = _loc3_.mCorners;
    var _loc6_ = _loc4_.length;
    var _loc7_ = 0;
    while(_loc7_ < _loc6_)
    {
        _loc9_ = _loc4_[_loc7_];
        _loc10_ = !!_loc9_.isStart(_loc5_[_loc7_]) ? SideEnum.RIGHT:SideEnum.LEFT;
        //_loc11_ = _loc9_.§-_______--__--§(_loc10_);
        
        //if(_loc11_.length > 0)
        //{
        //    _loc8_ = _loc11_[_loc11_.length - 1].§-___---_-_-_-_§(_loc10_);
        //    _loc2_.addVertices(_loc8_.§-_-_-__-__---§());
        //}
        //else
        //{
            _loc2_.addVertices(_loc9_.switchOrder(_loc9_.isEnd(_loc5_[_loc7_])));
        //}
        _loc7_++;
    }
    _loc2_.polygonRemoveSame();
    return _loc2_;
}


/*
package §-__-_-__-__§
{
   import §-____------_-_§.m_pathOrMyPathClass;
   import com.qunhe.commons.lang.ArrayHelperClass;
   import com.qunhe.commons.math.geom.my_polygon;
   import com.qunhe.commons.math.geom.polyLine_Class;
   import com.qunhe.commons.math.geom.Vec2;
   import com.qunhe.instdeco.model.types.enum.EndEnum;
   import com.qunhe.instdeco.model.types.enum.SideEnum;
   import com.qunhe.instdeco.model.wall.§-----_-__----§;
   import com.qunhe.instdeco.model.wall.wallAreas_Class;
   import com.qunhe.instdeco.model.wall.cornerSonClass;
   import com.qunhe.instdeco.model.wall.§--___----_-§;
   import com.qunhe.instdeco.model.wall.wallCurve;
   import org.as3commons.logging.api.ILogger;
   import org.as3commons.logging.api.getLogger;
   
   public class GeoHelpSomeClass
   {
      
      private static const LOG:ILogger = getLogger(GeoHelpSomeClass);
       
      
      public function GeoHelpSomeClass()
      {
         super();
      }
      
      public static function getPolygonFromAreaPath(param1:wallAreas_Class) : my_polygon
      {
         var _loc8_:polyLine_Class = null;
         var _loc9_:wallCurve = null;
         var _loc10_:SideEnum = null;
         var _loc11_:Vector.<§-----_-__----§> = null;
         var _loc2_:my_polygon = new my_polygon();
         var _loc3_:m_pathOrMyPathClass = param1.path;
         var _loc4_:Vector.<wallCurve> = wallCurve.cloneParameter(_loc3_.curves);
         var _loc5_:Vector.<cornerSonClass> = cornerSonClass.cloneParameter(_loc3_.corners);
         var _loc6_:int = _loc4_.length;
         var _loc7_:int = 0;
         while(_loc7_ < _loc6_)
         {
            _loc9_ = _loc4_[_loc7_];
            _loc10_ = !!_loc9_.isStart(_loc5_[_loc7_])?SideEnum.RIGHT:SideEnum.LEFT;
            _loc11_ = _loc9_.§-_______--__--§(_loc10_);
            if(_loc11_.length > 0)
            {
               _loc8_ = _loc11_[_loc11_.length - 1].§-___---_-_-_-_§(_loc10_);
               _loc2_.addVertices(_loc8_.§-_-_-__-__---§());
            }
            else
            {
               _loc2_.addVertices(_loc9_.switchOrder(_loc9_.isEnd(_loc5_[_loc7_])));
            }
            _loc7_++;
         }
         _loc2_.polygonRemoveSame();
         return _loc2_;
      }
      
      public static function §--_-_-_-__---§(param1:wallAreas_Class) : void
      {
         var _loc7_:SideEnum = null;
         var _loc8_:Vector.<§-----_-__----§> = null;
         var _loc9_:§-----_-__----§ = null;
         var _loc2_:m_pathOrMyPathClass = param1.path;
         var _loc3_:Vector.<wallCurve> = wallCurve.cloneParameter(_loc2_.curves);
         var _loc4_:Vector.<cornerSonClass> = cornerSonClass.cloneParameter(_loc2_.corners);
         var _loc5_:int = 0;
         var _loc6_:int = _loc3_.length;
         while(_loc5_ < _loc6_)
         {
            _loc7_ = !!_loc3_[_loc5_].isStart(_loc4_[_loc5_])?SideEnum.RIGHT:SideEnum.LEFT;
            _loc8_ = _loc3_[_loc5_].§-_______--__--§(_loc7_);
            if(_loc8_.length > 0)
            {
               for each(_loc9_ in _loc8_)
               {
                  _loc9_.dispose();
               }
            }
            _loc5_++;
         }
      }
      
      public static function §-__-_____--___§(param1:wallAreas_Class) : void
      {
         var _loc8_:wallCurve = null;
         var _loc9_:Boolean = false;
         var _loc10_:SideEnum = null;
         var _loc11_:§-----_-__----§ = null;
         var _loc2_:m_pathOrMyPathClass = param1.path;
         var _loc3_:Vector.<wallCurve> = wallCurve.cloneParameter(_loc2_.curves);
         var _loc4_:Vector.<cornerSonClass> = cornerSonClass.cloneParameter(_loc2_.corners);
         var _loc5_:Vector.<§-----_-__----§> = new Vector.<§-----_-__----§>();
         var _loc6_:int = 0;
         var _loc7_:int = _loc3_.length;
         while(_loc6_ < _loc7_)
         {
            _loc8_ = _loc3_[_loc6_];
            _loc9_ = _loc8_.isStart(_loc4_[_loc6_]);
            _loc10_ = !!_loc9_?SideEnum.RIGHT:SideEnum.LEFT;
            _loc11_ = new §-----_-__----§(_loc8_,_loc10_);
            _loc11_.wall = param1.wall;
            _loc11_.§-__-_-__------§ = !!_loc9_?EndEnum.START:EndEnum.END;
            _loc8_.addBoundary(_loc11_);
            _loc5_.push(_loc11_);
            _loc6_++;
         }
         param1.wall.§--_----___---§(_loc5_);
      }
      
      public static function §-__-__-----_--§(param1:wallAreas_Class, param2:Vector.<§-----_-__----§>) : Vector.<§-----_-__----§>
      {
         var _loc9_:wallCurve = null;
         var _loc10_:Boolean = false;
         var _loc11_:SideEnum = null;
         var _loc12_:Vector.<§-----_-__----§> = null;
         var _loc13_:§-----_-__----§ = null;
         var _loc3_:m_pathOrMyPathClass = param1.path;
         var _loc4_:Vector.<wallCurve> = wallCurve.cloneParameter(_loc3_.curves);
         var _loc5_:Vector.<cornerSonClass> = cornerSonClass.cloneParameter(_loc3_.corners);
         var _loc6_:Vector.<§-----_-__----§> = new Vector.<§-----_-__----§>();
         var _loc7_:int = 0;
         var _loc8_:int = _loc5_.length - 1;
         while(_loc7_ < _loc8_)
         {
            _loc9_ = _loc4_[_loc7_];
            _loc10_ = _loc9_.isStart(_loc5_[_loc7_]);
            _loc11_ = !!_loc10_?SideEnum.RIGHT:SideEnum.LEFT;
            _loc12_ = §-___-__--___-§(_loc9_,param2,_loc11_);
            if(_loc12_.length > 0)
            {
               for each(_loc13_ in _loc12_)
               {
                  _loc13_.§-__-_-__------§ = !!_loc10_?EndEnum.START:EndEnum.END;
                  _loc13_.wall = _loc9_.wall;
                  _loc9_.addBoundary(_loc13_);
                  ArrayHelperClass.addItem(_loc6_,_loc13_);
               }
            }
            else
            {
               LOG.info("curve no boundaries");
            }
            _loc7_++;
         }
         return _loc6_;
      }
      
      private static function §-___-__--___-§(param1:wallCurve, param2:Vector.<§-----_-__----§>, param3:SideEnum) : Vector.<§-----_-__----§>
      {
         var _loc7_:§-----_-__----§ = null;
         var _loc4_:Number = 0.001;
         var _loc5_:Vector.<§-----_-__----§> = new Vector.<§-----_-__----§>();
         var _loc6_:Vec2 = param1.§--___-_-__-__§().getCenter();
         for each(_loc7_ in param2)
         {
            if(_loc6_ && _loc7_.position)
            {
               if(Vec2.isEqual(_loc6_,_loc7_.position,_loc4_) && param3.equals(_loc7_.side))
               {
                  ArrayHelperClass.addItem(_loc5_,_loc7_);
                  ArrayHelperClass.removeItem(param2,_loc7_);
               }
               else
               {
                  LOG.info("point {0} position {1}",[_loc6_,_loc7_.position]);
               }
            }
            else
            {
               LOG.info("point or boundary position is null");
            }
         }
         return _loc5_;
      }
      
      public static function §-_---___---__§(param1:Vector.<§-----_-__----§>, param2:§--___----_-§) : void
      {
         var _loc3_:§-----_-__----§ = null;
         for each(_loc3_ in param1)
         {
            _loc3_.style = param2.clone();
         }
      }
   }
}
*/