package §-__--__-__---§
{
   import §-_-___---__§.my_number;
   import §-_-___---__§.my_math;
   import §-___--____-_--§.SomeError;
   import §-___--____-_--§.IllegalStateError;
   import §-____------_-_§.curveCornerHelperClass;
   import §-____------_-_§.m_pathOrMyPathClass;
   import com.qunhe.commons.lang.ArrayHelperClass;
   import com.qunhe.commons.lang.StopWatch;
   import com.qunhe.commons.lang.StringUtils;
   import com.qunhe.commons.math.geom.my_polygon;
   import com.qunhe.commons.math.geom.my_PolyTree;
   import com.qunhe.commons.math.geom.Vec2;
   import com.qunhe.instdeco.model.decoration.curveBasicClass;
   import com.qunhe.instdeco.model.decoration.AreaFatherClass;
   
   public class my_Clip_Father
   {
      
      private static const TOLERANCE:Number = 1.0E-4;
       
      
      protected var mAreas:Vector.<AreaFatherClass>;
      
      protected var m_curves:Vector.<curveBasicClass>;
      
      protected var mAreaPick:Vector.<AreaFatherClass>;
      
      protected var m_CornerCurveHelper:curveCornerHelperClass;
      
      protected var isValidInCliperFater:Boolean;
      
      public function my_Clip_Father()
      {
         super();
      }
      
      public static function polygonContainsAnyPoint(param1:AreaFatherClass, param2:Vector.<Vec2>) : Boolean
      {
         var _loc4_:Vec2 = null;
         var _loc3_:my_polygon = param1.polygon_Get_Or_Parameter;
         for each(_loc4_ in param2)
         {
            if(_loc3_.containsExclusive(_loc4_,TOLERANCE))
            {
               return true;
            }
         }
         return false;
      }
      
      public static function isSameCurveInClipFather(param1:AreaFatherClass, param2:curveBasicClass) : Boolean
      {
         var _loc4_:curveBasicClass = null;
         var _loc3_:Vector.<curveBasicClass> = param1.curves;
         for each(_loc4_ in _loc3_)
         {
            if(_loc4_.start.equals(param2.start) && _loc4_.end.equals(param2.end) || _loc4_.start.equals(param2.end) && _loc4_.end.equals(param2.start))
            {
               return true;
            }
         }
         return false;
      }
      
      public function execute() : void
      {
         var _loc1_:StopWatch = StopWatch.start();
         this.calculateAreaAndCurves();
         this.prepare();
         this.clearAreas();
         this.seperateAreasInClip();
         this.setBackAreaAndCurvesToWall();
         this.correctAreas();
         this.calculateAreaAndCurves();
         this.copyProperties();
         this.setBackAreaAndCurvesToWall();
         this.diagnose();
         _loc1_.§--_----___--_§("Generate decoration areas");
      }
      
      protected function calculateAreaAndCurves() : void
      {
         throw new SomeError();
      }
      
      private function prepare() : void
      {
         var _loc1_:curveBasicClass = null;
         this.m_CornerCurveHelper = new curveCornerHelperClass(this.m_curves);
         this.mAreaPick = this.mAreas.concat();
         for each(_loc1_ in this.m_curves)
         {
            _loc1_.initialCurveAreas();
            _loc1_.invalidate();
            _loc1_.invalidateStructure();
         }
      }
      
      private function clearAreas() : void
      {
         ArrayHelperClass.removeAll(this.mAreas);
      }
      
      private function seperateAreasInClip() : void
      {
         var area:AreaFatherClass = null;
         var item:AreaFatherClass = null;
         var curves:Vector.<curveBasicClass> = null;
         var path:m_pathOrMyPathClass = null;
         var i:int = 0;
         var tmpCurve:curveBasicClass = null;
         var j:int = 0;
         var tmpArea:AreaFatherClass = null;
         var polygonWithHole:my_PolyTree = null;
         
         var paths:Vector.<m_pathOrMyPathClass> = this.m_CornerCurveHelper.getPaths_eh();
         var clockwisePaths:Vector.<m_pathOrMyPathClass> = m_pathOrMyPathClass.getClockWisePaths(paths);
         var areas:Vector.<AreaFatherClass> = this.mAreas;
         //取出顺时针的area
         for each(path in clockwisePaths)
         {
            curves = path.curves;
            area = this.generateWallAreasByWall();
            area.path = path;
            this.addNotHoleParts(area,curves);
            areas.push(area);
         }
         //根据面积从小到大排列
         areas.sort(function(param1:AreaFatherClass, param2:AreaFatherClass):int
         {
            return my_math.sign(param1.getAbsArea() - param2.getAbsArea());
         });

         i = 0;
         while(i < areas.length - 1)
         {
            area = areas[i];
            j = i + 1;
            while(j < areas.length)
            {
               item = areas[j];

               if(polygonContainsAnyPoint(item,area.polygon_Get_Or_Parameter.vertices))
               {
                  item.tryAddDectationAndSetNode(area);
                  this.addNotHoleParts(item,area.removeCurvesFromDecrationsWithClass());
                  break;
               }
               j++;
            }
            i++;
         }

         for each(tmpCurve in this.m_curves)
         {
            if(tmpCurve.areas.length == 0)
            {
               for each(tmpArea in areas)
               {
                  polygonWithHole = tmpArea.generatePolyTree();
                  if(polygonWithHole.contains(tmpCurve.getCenter()))
                  {
                     tmpCurve.isHasAndSaveOnCurve(tmpArea);
                     tmpArea.addONE_PART(tmpCurve);
                  }
               }
            }
         }
      }
      
      private function copyProperties() : void
      {
         var _loc2_:AreaFatherClass = null;
         var _loc3_:AreaFatherClass = null;
         var _loc4_:int = 0;
         var _loc5_:int = 0;
         var _loc1_:Vector.<AreaFatherClass> = this.mAreas.concat();
         _loc4_ = _loc1_.length - 1;
         while(_loc4_ >= 0)
         {
            _loc5_ = this.mAreaPick.length - 1;
            while(_loc5_ >= 0)
            {
               _loc2_ = _loc1_[_loc4_];
               _loc3_ = this.mAreaPick[_loc5_];
               if(this.isSamePolygonInClipFather(_loc2_,_loc3_))
               {
                  _loc2_.id = _loc3_.id;
                  _loc2_.cloneProperties(_loc3_);
                  ArrayHelperClass.removeItem(_loc1_,_loc2_);
                  ArrayHelperClass.removeItem(this.mAreaPick,_loc3_);
                  break;
               }
               _loc5_--;
            }
            _loc4_--;
         }
         //剩下的 就是不一样的了：新增的，分裂的，再看相互关系
         var _loc6_:int = 0;
         var _loc7_:int = 0;
         var _loc8_:AreaFatherClass = null;
         _loc4_ = _loc1_.length - 1;
         
         while(_loc4_ >= 0)
         {
            _loc6_ = 0;
            _loc8_ = null;
            _loc2_ = _loc1_[_loc4_];
            _loc5_ = this.mAreaPick.length - 1;
            while(_loc5_ >= 0)
            {
               _loc3_ = this.mAreaPick[_loc5_];
               _loc7_ = this.getSameCurveNumber(_loc2_,_loc3_);
               if(_loc7_ > _loc6_)
               {
                  _loc6_ = _loc7_;
                  _loc8_ = _loc3_;
               }
               _loc5_--;
            }
            if(_loc8_ != null)
            {
               _loc2_.id = _loc8_.id;
               _loc2_.cloneProperties(_loc8_);
               ArrayHelperClass.removeItem(_loc1_,_loc2_);
               ArrayHelperClass.removeItem(this.mAreaPick,_loc8_);
            }
            _loc4_--;
         }
         
         this.isValidInCliperFater = _loc1_.length > 0;
      }
      
      private function isSamePolygonInClipFather(param1:AreaFatherClass, param2:AreaFatherClass) : Boolean
      {
         if(param2.polygon_Get_Or_Parameter)
         {
            if(param1.polygon_Get_Or_Parameter.copySimplyPolygon().equals(param2.polygon_Get_Or_Parameter.copySimplyPolygon()))
            {
               return true;
            }
         }
         return false;
      }
      
      protected function correctAreas() : void
      {
         throw new SomeError();
      }
      
      protected function setBackAreaAndCurvesToWall() : void
      {
         throw new SomeError();
      }
      
      private function diagnose() : void
      {
         var _loc3_:AreaFatherClass = null;
         var _loc4_:curveBasicClass = null;
         var _loc1_:Vector.<AreaFatherClass> = this.mAreas;
         var _loc2_:Vector.<curveBasicClass> = this.m_curves;
         for each(_loc3_ in _loc1_)
         {
            if(_loc3_.cloneCurve().length == 0)
            {
               throw new IllegalStateError(StringUtils.format("{0} contains no corner",_loc3_));
            }
            if(_loc3_.curves.length == 0)
            {
               throw new IllegalStateError(StringUtils.format("{0} contains no curve",_loc3_));
            }
            if(my_number.isEqual(_loc3_.getAbsArea(),0))
            {
               throw new IllegalStateError(StringUtils.format("{0} unsigned area is 0",_loc3_));
            }
         }
         for each(_loc4_ in _loc2_)
         {
            if(_loc4_.areas.length > 2)
            {
               throw new IllegalStateError(StringUtils.format("{0} number of areas exceeds 2",_loc4_));
            }
            if(_loc4_.cloneCurve().length < 2)
            {
               throw new IllegalStateError(StringUtils.format("{0} number of corners less than 2!",_loc4_));
            }
         }
      }
      
      private function addNotHoleParts(param1:AreaFatherClass, param2:Vector.<curveBasicClass>) : void
      {
         var _loc3_:curveBasicClass = null;
         for each(_loc3_ in param2)
         {
            if(_loc3_.areas.length < 2)
            {
               _loc3_.isHasAndSaveOnCurve(param1);
               param1.addONE_PART(_loc3_);
            }
         }
      }
      
      private function getSameCurveNumber(param1:AreaFatherClass, param2:AreaFatherClass) : int
      {
         var _loc5_:curveBasicClass = null;
         var _loc3_:int = 0;
         var _loc4_:Vector.<curveBasicClass> = param1.curves;
         for each(_loc5_ in _loc4_)
         {
            if(isSameCurveInClipFather(param2,_loc5_))
            {
               _loc3_++;
            }
         }
         return _loc3_;
      }
      
      protected function generateWallAreasByWall() : AreaFatherClass
      {
         throw new SomeError();
      }
      
      public function get §---____---_§() : Boolean
      {
         return this.isValidInCliperFater;
      }
   }
}
