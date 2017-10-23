
function WallCurveOperation(param1) {
    this.mFloor = param1;
}

WallCurveOperation.prototype.onSplitCurve = function(param1)
{
    var _loc1_ = new MyCorner();
    _loc1_.mPosition = param1.getCenter();
    this.mFloor.checkDupAdd(_loc1_);
    param1.updateInfo(_loc1_);
    var analysis = new Analysis(this.mFloor);
    analysis.execute();
}

WallCurveOperation.prototype.onToLine = function(param1)
{
    
    var _loc6_ = null;
    var _loc7_ = param1.mStart;
    var _loc8_ = param1.mEnd

    _loc6_ = new SegmentController();
    _loc6_.mStart = _loc7_;
    _loc6_.mEnd = _loc8_;
    
    for (var i = 0; i < this.mFloor.mCurves.length; i++) {
        var curve = this.mFloor.mCurves[i];
        if (_loc6_.isIntersectWith(curve)) {
            console.warn("WARNING: INTERSECTED!!!");
            return false;
        }
    }
    
    _loc7_.removeSpecificCurve_AH(param1);
    _loc8_.removeSpecificCurve_AH(param1);
    
    this.mFloor.addONE_PART(_loc6_);
    this.mFloor.removeSpecificCurve_AH(param1);
    
    var analysis = new Analysis(this.mFloor);
    analysis.execute();
}

WallCurveOperation.prototype.onToArc = function(param1)
{

/*
    var _loc7_ = null;
    var _loc1_ = param1.mStart;
    var _loc2_ = param1.mEnd;
    _loc1_.removeSpecificCurve_AH(param1);
    _loc2_.removeSpecificCurve_AH(param1);
    _loc7_ = new CurveController();
    _loc7_.mStart = _loc1_;
    _loc7_.mEnd = _loc2_;
    var _loc4_ = 0.1;
    _loc7_.resetCurve(_loc4_);
    
    var _loc5_ = new CurveSplitClass([_loc7_], this.mFloor);
    var _loc6_ = 0;
    while(_loc6_ < 5)
    {
        _loc5_.execute();
        if(!_loc5_.mValid)
        {
            _loc4_ = _loc4_ * 0.5;
            _loc7_.resetCurve(_loc4_);
            _loc6_++;
            continue;
        }
        break;
    }
*/
    var _loc7_ = new CurveController();
    _loc7_.mStart = param1.mStart;;
    _loc7_.mEnd = param1.mEnd;;
    var _loc4_ = 0.1;
    _loc7_.resetCurve(_loc4_);
    
    for (var i = 0; i < this.mFloor.mCurves.length; i++) {
        var curve = this.mFloor.mCurves[i];
        if (_loc7_.isIntersectWith(curve)) {
            console.warn("WARNING: TOO NARROW!!!");
            return false;
        }
    }
    
    this.mFloor.addONE_PART(_loc7_);
    this.mFloor.removeSpecificCurve_AH(param1);
    
    var analysis = new Analysis(this.mFloor);
    analysis.execute();
    return true;
}


WallCurveOperation.prototype.onDelete = function(param1) {
    //var mergeEvent:WallAreaMergerEvent = null;
    //if(this.isWallCurve())
    //{
    //return;
    //}
    //this.§-_----__-____§();
    var adjacentAreas = param1.mAreas;
    
    //if(adjacentAreas.length == 2 /*&& !adjacentAreas[0].§--__-_-_-_--§(adjacentAreas[1])*/)
    //{
        //mergeEvent = new WallAreaMergerEvent(WallAreaMergerEvent.SHOW,true);
        //mergeEvent.curve = this.mCurve;
        //dispatchEvent(mergeEvent);
    //}
    //else
    //{
        //var _loc1_:§-----_-__----§ = null;
        //new §----_--__--__§(param1).execute();
        param1.dispose();
        var _loc0_ = param1.toCorners();
        
        for (var i = 0; i < _loc0_.length; i++) {
            var _loc2_ = null;
            var _loc3_ = null;
            var _loc4_ = null;
            var _loc5_ = null;
            var _loc1_ = _loc0_[i].mCurves;
            if(_loc1_.length == 2)
            {
               _loc2_ = _loc1_[0];
               _loc3_ = _loc1_[1];
               if(_loc2_ instanceof SegmentController && _loc3_ instanceof SegmentController)
               {
                  _loc4_ = _loc2_;
                  _loc5_ = _loc3_;
                  if(_loc4_.isValidAngleDiff(_loc5_))
                  {
                     _loc4_.setCornerStartAndEndButHasToBeSame(param1,_loc5_.getStartOrEndOrNull(param1));
                     //_loc4_.invalidate();
                     _loc5_.dispose();
                  }
               }
            }
        }
        
        var _loc1_ = null;
        var selectfunc = function (wall) {
            var _loc6_ = null;
            var _loc5_ = wall.mCorners;
            for(var i = 0; i < _loc5_.length; i++)
            //for each(_loc6_ in _loc5_)
            {
                _loc6_ = _loc5_[i];
                if(_loc6_.mCurves.length == 1)
                {
                   return _loc6_.mCurves[0];
                }
            }
            return null;
        };
        
        while((_loc1_ =  selectfunc(this.mFloor))!= null) {
            _loc1_.dispose();
        }
        
        var analysis = new Analysis(this.mFloor);
        analysis.execute();
        
        //for each(_loc1_ in wall.boundaries)
        //{
        //_loc1_.updatePosition();
        //}
    //}
}

/*
      
WallCurveOperation.prototype.onDelete(param1:MouseEvent) : void
{
    this.curveOperation.remove();
    close();
    §-___--_-__--_-§.push(§-_-__--_--_-§.§-__-__-__-_---§);
}
*/

/*
package com.qunhe.instdeco.wall.view.popup.operation
{
   import §---__--_-_-_-§.§---__-__--_--§;
   import §---__-_--__-§.§----__--_§;
   import §--_-----_-_§.PropertyPanelDataChangedEvent;
   import §--_-_-_-_----§.§-_-__--_--_-§;
   import §--_-__----_§.§-_--__----___§;
   import §-_---_-_-__-_§.§-_--_-----___§;
   import §-_--__-------§.WallCurveEvent;
   import §-_--__-------§.WallRecordEvent;
   import §-_-_--___-_-_§.§-----_____§;
   import §-_-_--___-_-_§.§----___--_--_§;
   import §-__--__-___--§.§--__--_-----_§;
   import §-__--__-___--§.§--_____--_-§;
   import §-__--__-___--§.§-__---_-__-_-§;
   import §-__--__-___--§.§-_________§;
   import §-__-_-----_§.§-___--_-_-__§;
   import §-__-_-_-___§.§-_-_-----__--§;
   import §-__-___-__--§.§-___--_-__--_-§;
   import com.qunhe.commons.lang.ArrayHelperClass;
   import com.qunhe.instdeco.decorationcommon.resource.LocaleManager;
   import com.qunhe.instdeco.model.wall.cornerSonClass;
   import com.qunhe.instdeco.model.wall.wallCurve;
   import com.qunhe.instdeco.wall.view.popup.operation.base.OperationComponent;
   import com.qunhe.uikit.flex.components.IconButton;
   import flash.events.MouseEvent;
   import flash.utils.getDefinitionByName;
   import mx.binding.Binding;
   import mx.binding.BindingManager;
   import mx.binding.IBindingClient;
   import mx.binding.IWatcherSetupUtil2;
   import mx.core.IFlexModuleFactory;
   import mx.core.mx_internal;
   import mx.events.PropertyChangeEvent;
   import spark.components.HGroup;
   
   use namespace mx_internal;
   
   public class WallCurveOperation extends OperationComponent implements IBindingClient
   {
      
      private static var _watcherSetupUtil:IWatcherSetupUtil2;
       
      
      private var _953493159copyBtn:IconButton;
      
      private var _358736719deleteBtn:IconButton;
      
      private var _1926636318splitBtn:IconButton;
      
      private var _2000389381toArcBtn:IconButton;
      
      private var _1486341427toLineBtn:IconButton;
      
      private var __moduleFactoryInitialized:Boolean = false;
      
      private var _1751572743isArcCurve:Boolean;
      
      private var _759145700hasBoundary:Boolean;
      
      mx_internal var _bindings:Array;
      
      mx_internal var _watchers:Array;
      
      mx_internal var _bindingsByDestination:Object;
      
      mx_internal var _bindingsBeginWithWord:Object;
      
      public function WallCurveOperation()
      {
         var target:Object = null;
         var watcherSetupUtilClass:Object = null;
         this._bindings = [];
         this._watchers = [];
         this._bindingsByDestination = {};
         this._bindingsBeginWithWord = {};
         super();
         mx_internal::_document = this;
         var bindings:Array = this._WallCurveOperation_bindingsSetup();
         var watchers:Array = [];
         target = this;
         if(_watcherSetupUtil == null)
         {
            watcherSetupUtilClass = getDefinitionByName("_com_qunhe_instdeco_wall_view_popup_operation_WallCurveOperationWatcherSetupUtil");
            watcherSetupUtilClass["init"](null);
         }
         _watcherSetupUtil.setup(this,function(param1:String):*
         {
            return target[param1];
         },function(param1:String):*
         {
            return WallCurveOperation[param1];
         },bindings,watchers);
         mx_internal::_bindings = mx_internal::_bindings.concat(bindings);
         mx_internal::_watchers = mx_internal::_watchers.concat(watchers);
         this.controlBarContent = [this._WallCurveOperation_HGroup1_c()];
         var i:uint = 0;
         while(i < bindings.length)
         {
            Binding(bindings[i]).execute();
            i++;
         }
      }
      
      public static function set watcherSetupUtil(param1:IWatcherSetupUtil2) : void
      {
         WallCurveOperation._watcherSetupUtil = param1;
      }
      
      override public function set moduleFactory(param1:IFlexModuleFactory) : void
      {
         var factory:IFlexModuleFactory = param1;
         super.moduleFactory = factory;
         if(this.__moduleFactoryInitialized)
         {
            return;
         }
         this.__moduleFactoryInitialized = true;
         if(!this.styleDeclaration)
         {
            this.styleDeclaration = new CSSStyleDeclaration(null,styleManager);
         }
         this.styleDeclaration.defaultFactory = function():void
         {
            this.cornerRadius = 0;
            this.borderVisible = false;
         };
      }
      
      override public function initialize() : void
      {
         super.initialize();
      }
      
      private function get curveOperation() : §-__---_-__-_-§
      {
         return object as §-__---_-__-_-§;
      }
      
      private function get arcCurveOperation() : §-_________§
      {
         return object as §-_________§;
      }
      
      private function get lineOperation() : §--_____--_-§
      {
         return object as §--_____--_-§;
      }
      
      override public function set object(param1:§--__--_-----_§) : void
      {
         var _loc2_:§-----_____§ = null;
         super.object = param1;
         invalidateSkinState();
         this.isArcCurve = param1 is §----___--_--_§;
         if(!this.isArcCurve)
         {
            _loc2_ = §-----_____§(param1);
            if(_loc2_)
            {
               this.hasBoundary = _loc2_.curve.§-_--_---___-_§().length > 0;
            }
            else
            {
               this.hasBoundary = false;
            }
            this.toArcBtn.visible = this.toArcBtn.includeInLayout = !this.hasBoundary;
         }
      }
      
      protected function onCopy(param1:MouseEvent) : void
      {
         var msg:String = null;
         var event:MouseEvent = param1;
         var copyEvent:WallCurveEvent = new WallCurveEvent(WallCurveEvent.COPY_PROPERTIES);
         copyEvent.curve = this.curveOperation.curve;
         dispatchEvent(copyEvent);
         close();
         msg = LocaleManager.getString("msg.copyProperty.tip");
         if(!(§-_-_-----__--§.getCookie(msg) && §-_-_-----__--§.getCookie(msg) == true.toString()))
         {
            §-_--_-----___§.§-___-_-_-_-__§(msg,LocaleManager.getString("msg.ignore.btn"),null,function(param1:§-_--_-----___§):void
            {
               param1.close();
               §-_-_-----__--§.setCookie(msg,true.toString(),new Date().time + §-___--_-_-__§.§-__-__---__---§);
            });
         }
         §-___--_-__--_-§.push(§-_-__--_--_-§.§-______-_---§);
      }
      
      protected function onSplitCurve(param1:MouseEvent) : void
      {
         this.curveOperation.§--____-_-_-__§();
         §-___--_-__--_-§.push(§-_-__--_--_-§.§-__--___-__-§);
      }
      
      protected function onToLine(param1:MouseEvent) : void
      {
         var _loc2_:wallCurve = null;
         var _loc3_:cornerSonClass = null;
         var _loc4_:cornerSonClass = null;
         var _loc5_:Vector.<wallCurve> = null;
         _loc2_ = this.curveOperation.curve;
         _loc3_ = cornerSonClass.switchClassTypeTo(_loc2_.m_Start);
         _loc4_ = cornerSonClass.switchClassTypeTo(_loc2_.m_End);
         this.arcCurveOperation.toLine();
         _loc5_ = wallCurve.cloneParameter(_loc3_.§---__-____---§(_loc4_));
         var _loc6_:§---__-__--_--§ = new §---__-__--_--§(_loc5_);
         _loc6_.execute();
         if(!_loc6_.isValid)
         {
            dispatchEvent(new WallRecordEvent(WallRecordEvent.UNDO));
            §-_--_-----___§.§-__-_-_-__----§(LocaleManager.getString("msg.toLine.fail"));
            this.arcCurveOperation.§-_----__-____§();
         }
         var _loc7_:wallCurve = wallCurve.switchClassTypeTo(_loc3_.§---__-____---§(_loc4_)[0]);
         var _loc8_:§-----_____§ = §----__--_§.§-__-___-_-_--_§.§--_--____--__§(_loc7_);
         if(_loc8_)
         {
            _loc8_.setFocus();
            this.object = _loc8_;
            dispatchEvent(PropertyPanelDataChangedEvent.change(object));
            §-___--_-__--_-§.push(§-_-__--_--_-§.§-_--_--__--§,{"value":"line"});
         }
      }
      
      protected function onToArc(param1:MouseEvent) : void
      {
         var _loc2_:wallCurve = null;
         var _loc3_:cornerSonClass = null;
         var _loc4_:cornerSonClass = null;
         var _loc5_:Vector.<wallCurve> = null;
         var _loc6_:Vector.<wallCurve> = null;
         var _loc7_:wallCurve = null;
         var _loc8_:§----___--_--_§ = null;
         if(this.lineOperation != null)
         {
            _loc2_ = this.curveOperation.curve;
            _loc3_ = cornerSonClass.switchClassTypeTo(_loc2_.m_Start);
            _loc4_ = cornerSonClass.switchClassTypeTo(_loc2_.m_End);
            _loc5_ = wallCurve.cloneParameter(_loc3_.§---__-____---§(_loc4_));
            this.lineOperation.§-__----_-_-_-§();
            _loc6_ = wallCurve.cloneParameter(_loc3_.§---__-____---§(_loc4_));
            ArrayHelperClass.deleteSameValues(_loc6_,_loc5_);
            _loc7_ = _loc6_[0];
            _loc8_ = §----__--_§.§--___-§.§--_--____--__§(_loc7_);
            if(_loc8_)
            {
               _loc8_.setFocus();
               this.object = _loc8_;
               dispatchEvent(PropertyPanelDataChangedEvent.change(object));
               §-___--_-__--_-§.push(§-_-__--_--_-§.§-_--_--__--§,{"value":"arc"});
            }
         }
      }
      
      protected function onDelete(param1:MouseEvent) : void
      {
         this.curveOperation.remove();
         close();
         §-___--_-__--_-§.push(§-_-__--_--_-§.§-__-__-__-_---§);
      }
      
      protected function onStopPropagation(param1:MouseEvent) : void
      {
         param1.stopPropagation();
      }
      
      private function _WallCurveOperation_HGroup1_c() : HGroup
      {
         var _loc1_:HGroup = new HGroup();
         _loc1_.height = 40;
         _loc1_.y = -50;
         _loc1_.verticalAlign = "middle";
         _loc1_.depth = 10;
         _loc1_.mouseEnabled = false;
         _loc1_.styleName = "operation-control-bar";
         _loc1_.mxmlContent = [this._WallCurveOperation_IconButton1_i(),this._WallCurveOperation_IconButton2_i(),this._WallCurveOperation_IconButton3_i(),this._WallCurveOperation_IconButton4_i(),this._WallCurveOperation_IconButton5_i()];
         _loc1_.addEventListener("mouseDown",this.___WallCurveOperation_HGroup1_mouseDown);
         if(!_loc1_.document)
         {
            _loc1_.document = this;
         }
         return _loc1_;
      }
      
      private function _WallCurveOperation_IconButton1_i() : IconButton
      {
         var _loc1_:IconButton = new IconButton();
         _loc1_.width = 34;
         _loc1_.height = 34;
         _loc1_.addEventListener("click",this.__copyBtn_click);
         _loc1_.id = "copyBtn";
         if(!_loc1_.document)
         {
            _loc1_.document = this;
         }
         this.copyBtn = _loc1_;
         BindingManager.executeBindings(this,"copyBtn",this.copyBtn);
         return _loc1_;
      }
      
      public function __copyBtn_click(param1:MouseEvent) : void
      {
         this.onCopy(param1);
      }
      
      private function _WallCurveOperation_IconButton2_i() : IconButton
      {
         var _loc1_:IconButton = new IconButton();
         _loc1_.width = 34;
         _loc1_.height = 34;
         _loc1_.addEventListener("click",this.__splitBtn_click);
         _loc1_.id = "splitBtn";
         if(!_loc1_.document)
         {
            _loc1_.document = this;
         }
         this.splitBtn = _loc1_;
         BindingManager.executeBindings(this,"splitBtn",this.splitBtn);
         return _loc1_;
      }
      
      public function __splitBtn_click(param1:MouseEvent) : void
      {
         this.onSplitCurve(param1);
      }
      
      private function _WallCurveOperation_IconButton3_i() : IconButton
      {
         var _loc1_:IconButton = new IconButton();
         _loc1_.width = 34;
         _loc1_.height = 34;
         _loc1_.addEventListener("click",this.__toArcBtn_click);
         _loc1_.id = "toArcBtn";
         if(!_loc1_.document)
         {
            _loc1_.document = this;
         }
         this.toArcBtn = _loc1_;
         BindingManager.executeBindings(this,"toArcBtn",this.toArcBtn);
         return _loc1_;
      }
      
      public function __toArcBtn_click(param1:MouseEvent) : void
      {
         this.onToArc(param1);
      }
      
      private function _WallCurveOperation_IconButton4_i() : IconButton
      {
         var _loc1_:IconButton = new IconButton();
         _loc1_.width = 34;
         _loc1_.height = 34;
         _loc1_.addEventListener("click",this.__toLineBtn_click);
         _loc1_.id = "toLineBtn";
         if(!_loc1_.document)
         {
            _loc1_.document = this;
         }
         this.toLineBtn = _loc1_;
         BindingManager.executeBindings(this,"toLineBtn",this.toLineBtn);
         return _loc1_;
      }
      
      public function __toLineBtn_click(param1:MouseEvent) : void
      {
         this.onToLine(param1);
      }
      
      private function _WallCurveOperation_IconButton5_i() : IconButton
      {
         var _loc1_:IconButton = new IconButton();
         _loc1_.width = 34;
         _loc1_.height = 34;
         _loc1_.addEventListener("click",this.__deleteBtn_click);
         _loc1_.id = "deleteBtn";
         if(!_loc1_.document)
         {
            _loc1_.document = this;
         }
         this.deleteBtn = _loc1_;
         BindingManager.executeBindings(this,"deleteBtn",this.deleteBtn);
         return _loc1_;
      }
      
      public function __deleteBtn_click(param1:MouseEvent) : void
      {
         this.onDelete(param1);
      }
      
      public function ___WallCurveOperation_HGroup1_mouseDown(param1:MouseEvent) : void
      {
         this.onStopPropagation(param1);
      }
      
      private function _WallCurveOperation_bindingsSetup() : Array
      {
         var result:Array = [];
         result[0] = new Binding(this,function():Object
         {
            return §-_--__----___§.§---___--__§;
         },function(param1:Object):void
         {
            copyBtn.setStyle("icon",param1);
         },"copyBtn.icon");
         result[1] = new Binding(this,function():String
         {
            var _loc1_:* = "@top|" + LocaleManager.getString("operation.copyParam");
            return _loc1_ == undefined?null:String(_loc1_);
         },null,"copyBtn.toolTip");
         result[2] = new Binding(this,function():Object
         {
            return §-_--__----___§.§----_--_-_---§;
         },function(param1:Object):void
         {
            splitBtn.setStyle("icon",param1);
         },"splitBtn.icon");
         result[3] = new Binding(this,function():String
         {
            var _loc1_:* = "@top|" + LocaleManager.getString("operation.split");
            return _loc1_ == undefined?null:String(_loc1_);
         },null,"splitBtn.toolTip");
         result[4] = new Binding(this,function():Object
         {
            return §-_--__----___§.§---_-__--_-_§;
         },function(param1:Object):void
         {
            toArcBtn.setStyle("icon",param1);
         },"toArcBtn.icon");
         result[5] = new Binding(this,function():String
         {
            var _loc1_:* = "@top|" + LocaleManager.getString("operation.toArc");
            return _loc1_ == undefined?null:String(_loc1_);
         },null,"toArcBtn.toolTip");
         result[6] = new Binding(this,function():Boolean
         {
            return !isArcCurve;
         },null,"toArcBtn.visible");
         result[7] = new Binding(this,function():Boolean
         {
            return !isArcCurve;
         },null,"toArcBtn.includeInLayout");
         result[8] = new Binding(this,function():Object
         {
            return §-_--__----___§.§----__-__-__-§;
         },function(param1:Object):void
         {
            toLineBtn.setStyle("icon",param1);
         },"toLineBtn.icon");
         result[9] = new Binding(this,function():String
         {
            var _loc1_:* = "@top|" + LocaleManager.getString("operation.toLine");
            return _loc1_ == undefined?null:String(_loc1_);
         },null,"toLineBtn.toolTip");
         result[10] = new Binding(this,function():Boolean
         {
            return isArcCurve;
         },null,"toLineBtn.visible");
         result[11] = new Binding(this,function():Boolean
         {
            return isArcCurve;
         },null,"toLineBtn.includeInLayout");
         result[12] = new Binding(this,function():Object
         {
            return §-_--__----___§.§--__--_-_§;
         },function(param1:Object):void
         {
            deleteBtn.setStyle("icon",param1);
         },"deleteBtn.icon");
         result[13] = new Binding(this,function():String
         {
            var _loc1_:* = "@top|" + LocaleManager.getString("operation.delete");
            return _loc1_ == undefined?null:String(_loc1_);
         },null,"deleteBtn.toolTip");
         return result;
      }
      
      [Bindable(event="propertyChange")]
      public function get copyBtn() : IconButton
      {
         return this._953493159copyBtn;
      }
      
      public function set copyBtn(param1:IconButton) : void
      {
         var _loc2_:Object = this._953493159copyBtn;
         if(_loc2_ !== param1)
         {
            this._953493159copyBtn = param1;
            if(this.hasEventListener("propertyChange"))
            {
               this.dispatchEvent(PropertyChangeEvent.createUpdateEvent(this,"copyBtn",_loc2_,param1));
            }
         }
      }
      
      [Bindable(event="propertyChange")]
      public function get deleteBtn() : IconButton
      {
         return this._358736719deleteBtn;
      }
      
      public function set deleteBtn(param1:IconButton) : void
      {
         var _loc2_:Object = this._358736719deleteBtn;
         if(_loc2_ !== param1)
         {
            this._358736719deleteBtn = param1;
            if(this.hasEventListener("propertyChange"))
            {
               this.dispatchEvent(PropertyChangeEvent.createUpdateEvent(this,"deleteBtn",_loc2_,param1));
            }
         }
      }
      
      [Bindable(event="propertyChange")]
      public function get splitBtn() : IconButton
      {
         return this._1926636318splitBtn;
      }
      
      public function set splitBtn(param1:IconButton) : void
      {
         var _loc2_:Object = this._1926636318splitBtn;
         if(_loc2_ !== param1)
         {
            this._1926636318splitBtn = param1;
            if(this.hasEventListener("propertyChange"))
            {
               this.dispatchEvent(PropertyChangeEvent.createUpdateEvent(this,"splitBtn",_loc2_,param1));
            }
         }
      }
      
      [Bindable(event="propertyChange")]
      public function get toArcBtn() : IconButton
      {
         return this._2000389381toArcBtn;
      }
      
      public function set toArcBtn(param1:IconButton) : void
      {
         var _loc2_:Object = this._2000389381toArcBtn;
         if(_loc2_ !== param1)
         {
            this._2000389381toArcBtn = param1;
            if(this.hasEventListener("propertyChange"))
            {
               this.dispatchEvent(PropertyChangeEvent.createUpdateEvent(this,"toArcBtn",_loc2_,param1));
            }
         }
      }
      
      [Bindable(event="propertyChange")]
      public function get toLineBtn() : IconButton
      {
         return this._1486341427toLineBtn;
      }
      
      public function set toLineBtn(param1:IconButton) : void
      {
         var _loc2_:Object = this._1486341427toLineBtn;
         if(_loc2_ !== param1)
         {
            this._1486341427toLineBtn = param1;
            if(this.hasEventListener("propertyChange"))
            {
               this.dispatchEvent(PropertyChangeEvent.createUpdateEvent(this,"toLineBtn",_loc2_,param1));
            }
         }
      }
      
      [Bindable(event="propertyChange")]
      private function get isArcCurve() : Boolean
      {
         return this._1751572743isArcCurve;
      }
      
      private function set isArcCurve(param1:Boolean) : void
      {
         var _loc2_:Object = this._1751572743isArcCurve;
         if(_loc2_ !== param1)
         {
            this._1751572743isArcCurve = param1;
            if(this.hasEventListener("propertyChange"))
            {
               this.dispatchEvent(PropertyChangeEvent.createUpdateEvent(this,"isArcCurve",_loc2_,param1));
            }
         }
      }
      
      [Bindable(event="propertyChange")]
      private function get hasBoundary() : Boolean
      {
         return this._759145700hasBoundary;
      }
      
      private function set hasBoundary(param1:Boolean) : void
      {
         var _loc2_:Object = this._759145700hasBoundary;
         if(_loc2_ !== param1)
         {
            this._759145700hasBoundary = param1;
            if(this.hasEventListener("propertyChange"))
            {
               this.dispatchEvent(PropertyChangeEvent.createUpdateEvent(this,"hasBoundary",_loc2_,param1));
            }
         }
      }
   }
}
*/
