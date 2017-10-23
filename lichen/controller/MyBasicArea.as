/*
package com.qunhe.instdeco.model.decoration
{
   import §--_-__-_§.§-----_----__-§;
   import §--_-__-_§.AssetShowHideControlInterface;
   import §-___--____-_--§.SomeError;
   import §-____------_-_§.curveCornerHelperClass;
   import §-____------_-_§.m_pathOrMyPathClass;
   import com.qunhe.commons.lang.ArrayHelperClass;
   import com.qunhe.commons.lang.ObjectIndex;
   import com.qunhe.commons.math.geom.my_polygon;
   import com.qunhe.commons.math.geom.my_Rect;
   import com.qunhe.commons.math.geom.my_PolyTree;
   import com.qunhe.commons.math.geom.Vec2;
   import com.qunhe.instdeco.model.decoration.enum.DecoAlignment;
   import org.as3commons.logging.api.ILogger;
   import org.as3commons.logging.api.getLogger;
   
   public class AreaFatherClass extends ObjectIndex implements AssetShowHideControlInterface, §-----_----__-§
   {
      
      private static const LOG:ILogger = getLogger(AreaFatherClass);
      
      private static const TOLERANCE:Number = 0.001;
       
      
      protected var mAreaNotUnderstand:AreaFatherClass;//整块的大属性？
      
      protected var m_Decorations:Vector.<AreaFatherClass>;//里面好多块的属性？
      
      protected var m_curves:Vector.<curveBasicClass>;
      
      protected var mAlignment:DecoAlignment;
      
      protected var mRotation:Number;
      
      protected var m_mmPath:m_pathOrMyPathClass;
      
      private var m_isValidShowOrNotFlag:Boolean = true;
      
      public function AreaFatherClass()
      {
         super();
      }
      
      override protected function initialize() : void
      {
         this.m_curves = new Vector.<curveBasicClass>();
         this.m_Decorations = new Vector.<AreaFatherClass>();
      }
      
      public function cloneProperties(param1:*) : void
      {
      }
      
      public function addCurve_xxx(param1:Vector.<curveBasicClass>) : void
      {
         var _loc2_:curveBasicClass = null;
         for each(_loc2_ in param1)
         {
            this.addONE_PART(_loc2_);
         }
      }
      
      public function addONE_PART(param1:curveBasicClass) : Boolean
      {
         return ArrayHelperClass.ifHasAndSave(this.m_curves,param1);
      }
      
      public function removeSpecificCurve_AH(param1:curveBasicClass) : Boolean
      {
         return ArrayHelperClass.removeItem(this.m_curves,param1);
      }
      
      public function tryAddDectationAndSetNode(param1:AreaFatherClass) : Boolean
      {
         var _loc2_:Boolean = ArrayHelperClass.ifHasAndSave(this.m_Decorations,param1);
         if(_loc2_)
         {
            param1.funcGetAreaNotUnderStand = this;
         }
         return _loc2_;
      }
      
      public function §----_--_--___§(param1:AreaFatherClass) : Boolean
      {
         var _loc2_:Boolean = ArrayHelperClass.removeItem(this.m_Decorations,param1);
         if(_loc2_)
         {
            param1.funcGetAreaNotUnderStand = null;
         }
         return _loc2_;
      }
      
      public function §-----_--_-_--§(param1:Vec2, param2:Number = 0.001) : Boolean
      {
         var _loc3_:curveBasicClass = null;
         for each(_loc3_ in this.m_curves)
         {
            if(_loc3_.isInsideMyArea(param1,true,param2))
            {
               return true;
            }
         }
         return false;
      }
      
      public function §--__-_---_--_§(param1:curveBasicClass) : Boolean
      {
         return ArrayHelperClass.contains(this.m_curves,param1);
      }
      
      public function containsPoint(param1:Vec2, param2:Boolean = false, param3:Number = 0.001) : Boolean
      {
         var _loc4_:AreaFatherClass = null;
         if(param2)
         {
            if(!this.polygon_Get_Or_Parameter.containsInclusive(param1,param3))
            {
               return false;
            }
         }
         else if(!this.polygon_Get_Or_Parameter.containsExclusive(param1,param3))
         {
            return false;
         }
         for each(_loc4_ in this.m_Decorations)
         {
            if(_loc4_.containsPoint(param1,!param2,param3))
            {
               return false;
            }
         }
         return true;
      }
      
      public function isIncludedPolygon(param1:my_polygon) : Boolean
      {
         var _loc2_:AreaFatherClass = null;
         if(!this.polygon_Get_Or_Parameter.isIncludedPolygon(param1))
         {
            return false;
         }
         for each(_loc2_ in this.m_Decorations)
         {
            if(param1.isIncludedPolygon(param1))
            {
               return false;
            }
         }
         return true;
      }
      
      public function §---__---__-__§() : Boolean
      {
         throw new SomeError();
      }
      
      public function §-__--_----___§(param1:§---________§) : Boolean
      {
         throw new SomeError();
      }
      
      public function §-----_--__--_§(param1:my_polygon) : Boolean
      {
         var _loc2_:AreaFatherClass = null;
         var _loc3_:my_polygon = null;
         if(!this.polygon_Get_Or_Parameter.isIntersected(param1))
         {
            return false;
         }
         for each(_loc2_ in this.m_Decorations)
         {
            _loc3_ = _loc2_.polygon_Get_Or_Parameter;
            if(_loc3_.isIncludedPolygon(param1))
            {
               return false;
            }
         }
         return true;
      }
      
      public function §-___-_-_-----_§(param1:§---________§) : void
      {
         throw new SomeError();
      }
      
      public function §--_-__-_--__§() : §---________§
      {
         throw new SomeError();
      }
      
      public function validateDisplay() : void
      {
         this.m_isValidShowOrNotFlag = false;
      }
      
      public function invalidateDisplay() : void
      {
         this.m_isValidShowOrNotFlag = true;
      }
      
      public function isDisplayStateValid() : Boolean
      {
         return this.m_isValidShowOrNotFlag == false;
      }
      
      public function invalidate() : void
      {
         var _loc1_:curveBasicClass = null;
         for each(_loc1_ in this.m_curves)
         {
            _loc1_.invalidate();
            _loc1_.invalidateStructure();
         }
         this.invalidateDisplay();
      }
      
      override public function dispose() : void
      {
         var _loc1_:curveBasicClass = null;
         for each(_loc1_ in this.m_curves)
         {
            _loc1_.wallDleleteSame(this);
         }
      }
      
      public function getBoundingBox() : my_Rect
      {
         return this.polygon_Get_Or_Parameter.getBoundingBox();
      }
      
      public function generatePolyTree() : my_PolyTree
      {
         return new my_PolyTree(this.polygon_Get_Or_Parameter,this.clonePolygons());
      }
      
      public function §-___---_-_-__-§() : my_PolyTree
      {
         var pathFinder:curveCornerHelperClass = null;
         var borderCurves:Vector.<curveBasicClass> = null;
         var tmpPaths:Vector.<m_pathOrMyPathClass> = null;
         var tmpPath:m_pathOrMyPathClass = null;
         var outline:my_polygon = null;
         var holes:Vector.<my_polygon> = null;
         var child:AreaFatherClass = null;
         try
         {
            pathFinder = new curveCornerHelperClass(this.m_curves);
            borderCurves = this.removeCurvesFromDecrationsWithClass();
            tmpPaths = pathFinder.getPathesFromCurve(borderCurves[0]);
            tmpPath = m_pathOrMyPathClass.getClockWisePaths(tmpPaths)[0];
            outline = tmpPath.polygon;
            holes = new Vector.<my_polygon>();
            for each(child in this.m_Decorations)
            {
               borderCurves = child.removeCurvesFromDecrationsWithClass();
               tmpPaths = pathFinder.getPathesFromCurve(borderCurves[0]);
               tmpPath = m_pathOrMyPathClass.getClockWisePaths(tmpPaths)[0];
               holes.push(tmpPath.polygon);
            }
            return new my_PolyTree(outline,holes);
         }
         catch(e:Error)
         {
            LOG.error(e.message);
            return generatePolyTree();
         }
         return null;
      }
      
      public function getCornerAveragePos() : Vec2
      {
         var _loc3_:cornerBasicClass = null;
         var _loc1_:Vector.<cornerBasicClass> = this.cloneCurve();
         var _loc2_:Vec2 = new Vec2(0,0);
         for each(_loc3_ in _loc1_)
         {
            _loc2_.add(_loc3_.position);
         }
         return _loc2_.mulBy(1 / _loc1_.length);
      }
      
      public function getAbsArea() : Number
      {
         return Math.abs(this.polygon_Get_Or_Parameter.getSignedArea());
      }
      
      public function cloneCurve() : Vector.<cornerBasicClass>
      {
         var _loc2_:curveBasicClass = null;
         var _loc1_:Vector.<cornerBasicClass> = new Vector.<cornerBasicClass>();
         for each(_loc2_ in this.m_curves)
         {
            ArrayHelperClass.ifHaveSameTheLaterOne(_loc1_,_loc2_.cloneCurve());
         }
         return _loc1_;
      }
      
      public function removeCurvesFromDecrationsWithClass() : Vector.<curveBasicClass>
      {
         var _loc2_:AreaFatherClass = null;
         var _loc1_:Vector.<curveBasicClass> = this.m_curves.concat();
         for each(_loc2_ in this.m_Decorations)
         {
            ArrayHelperClass.deleteSameValues(_loc1_,_loc2_.curves);
         }
         return _loc1_;
      }
      
      public function clonePolygons() : Vector.<my_polygon>
      {
         var _loc2_:AreaFatherClass = null;
         var _loc1_:Vector.<my_polygon> = new Vector.<my_polygon>();
         for each(_loc2_ in this.m_Decorations)
         {
            _loc1_.push(_loc2_.polygon_Get_Or_Parameter);
         }
         return _loc1_;
      }
      
      public function getGravityCenter_XX() : Vec2
      {
         if(this.polygon_Get_Or_Parameter == null)
         {
            return null;
         }
         return this.generatePolyTree().getValidGravityCenter();
      }
      
      public function get getPolygon() : my_polygon
      {
         if(this.m_mmPath == null)
         {
            return null;
         }
         return this.m_mmPath.polygon;
      }
      
      public function get polygon_Get_Or_Parameter() : my_polygon
      {
         if(this.m_mmPath == null)
         {
            return null;
         }
         return this.m_mmPath.polygon;
      }
      
      public function get funcGetAreaNotUnderStand() : AreaFatherClass
      {
         return this.mAreaNotUnderstand;
      }
      
      public function set funcGetAreaNotUnderStand(param1:AreaFatherClass) : void
      {
         this.mAreaNotUnderstand = param1;
      }
      
      public function get getDectorationFunc() : Vector.<AreaFatherClass>
      {
         return this.m_Decorations;
      }
      
      public function set getDectorationFunc(param1:Vector.<AreaFatherClass>) : void
      {
         this.m_Decorations = param1;
      }
      
      public function get path() : m_pathOrMyPathClass
      {
         return this.m_mmPath;
      }
      
      public function set path(param1:m_pathOrMyPathClass) : void
      {
         this.m_mmPath = param1;
      }
      
      public function get curves() : Vector.<curveBasicClass>
      {
         return this.m_curves;
      }
      
      public function set curves(param1:Vector.<curveBasicClass>) : void
      {
         this.m_curves = param1;
      }
   }
}
*/