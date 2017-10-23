package com.qunhe.instdeco.model.wall
{
   import §---_-__-----_§.getSetWallInterface;
   import §--_-__-_§.resourceGetSetInterface;
   import §-___--____-_--§.SomeError;
   import com.qunhe.commons.lang.ArrayHelperClass;
   import com.qunhe.commons.math.geom.my2D_Edge;
   import com.qunhe.commons.math.geom.MY_VEC4;
   import com.qunhe.commons.math.geom.Vec2;
   import com.qunhe.instdeco.model.decoration.§---___-_---_-§;
   import com.qunhe.instdeco.model.decoration.curveBasicClass;
   import com.qunhe.instdeco.model.decoration.§--__-_----__-§;
   import com.qunhe.instdeco.model.decoration.enum.DecoMoldingPlacement;
   import com.qunhe.instdeco.model.decoration.enum.DecoSideType;
   import com.qunhe.instdeco.model.decoration.resource.DecoMoldingTileAsset;
   import com.qunhe.instdeco.model.decoration.resource.DecoResourceSet;
   import com.qunhe.instdeco.model.types.enum.EndEnum;
   import com.qunhe.instdeco.model.types.enum.SideEnum;
   import com.qunhe.instdeco.model.wall.enum.WallCurveType;
   import com.qunhe.instdeco.model.wall.resource.ResourceSet;
   
   public class wallCurve extends curveBasicClass implements getSetWallInterface, resourceGetSetInterface
   {
      
      public static const WIRED_THRESHOLD:Number = 0.9216000000000001;
      
      protected static const TOLERANCE:Number = 1.0E-6;
       
      
      protected var §---_-_-_-____§:§--__-_----__-§;
      
      protected var §-__-_--____-§:§--__-_----__-§;
      
      protected var mType:WallCurveType;
      
      protected var §--__--__-___§:§---___--__---§;
      
      protected var §--_-____-_--§:§---__-_---__§;
      
      protected var mWall:my_xx_wall;
      
      protected var mBoundaries:Vector.<§-----_-__----§>;
      
      private var mTileType:String;
      
      public function wallCurve(param1:my_xx_wall = null)
      {
         super();
         this.mWall = param1;
         this.initialize();
         assignUniqueId();
      }
      
      public static function switchClassTypeTo(param1:curveBasicClass) : wallCurve
      {
         return param1 as wallCurve;
      }
      
      public static function cloneParameter(param1:Vector.<curveBasicClass>) : Vector.<wallCurve>
      {
         return Vector.<wallCurve>(param1);
      }
      
      public static function cloneAreas(param1:Vector.<wallCurve>) : Vector.<curveBasicClass>
      {
         return Vector.<curveBasicClass>(param1);
      }
      
      override protected function initialize() : void
      {
         super.initialize();
         this.profile = new §---___--__---§();
         this.elevation = new §---__-_---__§();
         this.mType = WallCurveType.DEFAULT_LINE;
         this.mBoundaries = new Vector.<§-----_-__----§>();
         this.§---_-_-_-____§ = new §--__-_----__-§(this,DecoSideType.LEFT);
         this.§-__-_--____-§ = new §--__-_----__-§(this,DecoSideType.RIGHT);
      }
      
      override public function dispose() : void
      {
         super.dispose();
         if(this.mWall != null)
         {
            this.mWall.removeSpecificCurve_AH(this);
         }
         var _loc1_:int = this.mBoundaries.length - 1;
         while(_loc1_ > -1)
         {
            this.mBoundaries[_loc1_].dispose();
            _loc1_--;
         }
      }
      
      public function cloneProperties(param1:*) : void
      {
         var _loc2_:wallCurve = param1 as wallCurve;
         this.mWall = _loc2_.wall;
         this.mType = _loc2_.type;
         this.§--__--__-___§ = _loc2_.profile.deepClone();
         this.§--__--__-___§.curve = this;
         this.§--_-____-_--§.cloneProperties(_loc2_.elevation);
         this.§---_-_-_-____§.cloneProperties(_loc2_.§-__-____---_--§);
         this.§-__-_--____-§.cloneProperties(_loc2_.§---____-__--§);
         this.§--___-__-_-_§(param1);
      }
      
      private function §--___-__-_-_§(param1:wallCurve) : void
      {
         var _loc3_:§-----_-__----§ = null;
         var _loc4_:§-----_-__----§ = null;
         var _loc2_:Vector.<§-----_-__----§> = param1.§-_--_---___-_§();
         if(_loc2_.length > 0)
         {
            this.mBoundaries = new Vector.<§-----_-__----§>();
            for each(_loc3_ in _loc2_)
            {
               _loc4_ = _loc3_.clone();
               this.addBoundary(_loc4_);
               this.wall.addBoundary(_loc4_);
            }
         }
      }
      
      public function addDecoLine(param1:§--__-_----__-§) : Boolean
      {
         if(param1.side == DecoSideType.LEFT && this.§---_-_-_-____§ != param1)
         {
            this.§-__-____---_--§ = param1;
            return true;
         }
         if(param1.side == DecoSideType.RIGHT && this.§-__-_--____-§ != param1)
         {
            this.§---____-__--§ = param1;
            return true;
         }
         return false;
      }
      
      public function §-_-__-----_§(param1:cornerSonClass) : wallCurve
      {
         throw new SomeError();
      }
      
      public function §-_-__--____--§(param1:Vec2) : void
      {
      }
      
      public function §--_-----_--§(param1:my2D_Edge) : void
      {
         var _loc2_:Vec2 = param1.start.sub(start);
         mm_start.§--_-----_--§(param1.start);
         mm_end.§--_-----_--§(param1.end);
         this.§-_-__--____--§(_loc2_);
         this.invalidate();
      }
      
      override public function invalidateStructure() : void
      {
         if(this.§---_-_-_-____§ != null)
         {
            this.§---_-_-_-____§.invalidateStructure();
         }
         if(this.§-__-_--____-§ != null)
         {
            this.§-__-_--____-§.invalidateStructure();
         }
         this.§--__--__-___§.invalidateStructure();
         this.§--_----_---_-§();
      }
      
      override public function invalidate() : void
      {
         super.invalidate();
         if(this.§--_-____-_--§ != null)
         {
            this.§--_-____-_--§.invalidate();
         }
      }
      
      public function §-___-___-_--__§() : Vector.<wallAreas_Class>
      {
         var _loc2_:wallAreas_Class = null;
         var _loc1_:Vector.<wallAreas_Class> = new Vector.<wallAreas_Class>();
         for each(_loc2_ in this.wall.areas)
         {
            if(_loc2_.§--__-_---_--_§(this))
            {
               _loc1_.push(_loc2_);
            }
         }
         return _loc1_;
      }
      
      public function §--__---_---_§() : Boolean
      {
         return this.mType.equals(WallCurveType.BORDER_LINE);
      }
      
      public function §-____--_-__-__§(param1:MY_VEC4) : Vec2
      {
         throw new SomeError();
      }
      
      public function §-__-__-_----§(param1:Vec2) : MY_VEC4
      {
         throw new SomeError();
      }
      
      public function §-____-_--_---§(param1:MY_VEC4) : Vec2
      {
         throw new SomeError();
      }
      
      public function getResources() : DecoResourceSet
      {
         var _loc4_:§--__---_-__§ = null;
         var _loc1_:ResourceSet = null;
         var _loc2_:ResourceSet = new ResourceSet();
         var _loc3_:§---___-_---_-§ = this.§--__--__-___§.topMolding;
         if(_loc3_ != null && !_loc3_.isEmpty())
         {
            _loc2_.addProfile(_loc3_.§--_---_-__--_§);
            _loc2_.addTexture(_loc3_.textureAsset);
         }
         if(this.§--__--__-___§ is §--__---_-__§)
         {
            _loc4_ = this.§--__--__-___§ as §--__---_-__§;
            _loc3_ = _loc4_.§--_----_-__-§;
            if(_loc3_ != null && !_loc3_.isEmpty())
            {
               _loc2_.addProfile(_loc3_.§--_---_-__--_§);
               _loc2_.addTexture(_loc3_.textureAsset);
            }
            _loc3_ = _loc4_.§-_-____-__-_§;
            if(_loc3_ != null && !_loc3_.isEmpty())
            {
               _loc2_.addProfile(_loc3_.§--_---_-__--_§);
               _loc2_.addTexture(_loc3_.textureAsset);
            }
         }
         if(this.§--_-____-_--§ != null)
         {
            _loc1_ = this.§--_-____-_--§.getResources() as ResourceSet;
            _loc2_.union(_loc1_);
         }
         if(this.§---_-_-_-____§ != null && !this.§---_-_-_-____§.isEmpty())
         {
            _loc2_.addTexture(this.§---_-_-_-____§.textureAsset);
            _loc2_.addProfile(this.§---_-_-_-____§.§--_---_-__--_§);
         }
         if(this.§-__-_--____-§ != null && !this.§-__-_--____-§.isEmpty())
         {
            _loc2_.addTexture(this.§-__-_--____-§.textureAsset);
            _loc2_.addProfile(this.§-__-_--____-§.§--_---_-__--_§);
         }
         return _loc2_;
      }
      
      public function setResources(param1:DecoResourceSet) : void
      {
         var _loc2_:DecoMoldingTileAsset = null;
         var _loc4_:§--__---_-__§ = null;
         var _loc5_:§---___-_---_-§ = null;
         this.§--_-____-_--§.setResources(param1);
         var _loc3_:§---___-_---_-§ = this.§--__--__-___§.topMolding;
         if(_loc3_ != null && !_loc3_.isEmpty())
         {
            _loc3_.§--_---_-__--_§ = param1.getProfile(_loc3_.profileId);
            _loc3_.textureAsset = param1.getTextureById(_loc3_.textureId);
            if(_loc3_.§----____--_--§())
            {
               _loc2_ = param1.getMoldingTileByBrandGoodId(_loc3_.brandGoodId);
               _loc3_.§--_---_-__--_§ = _loc2_.profileData;
               _loc3_.textureAsset = _loc2_.textureData;
            }
         }
         if(this.§--__--__-___§ is §--__---_-__§)
         {
            _loc4_ = this.§--__--__-___§ as §--__---_-__§;
            _loc5_ = _loc4_.§--_----_-__-§;
            if(_loc5_ != null && !_loc5_.isEmpty())
            {
               _loc5_.§--_---_-__--_§ = param1.getProfile(_loc5_.profileId);
               _loc5_.textureAsset = param1.getTextureById(_loc5_.textureId);
               if(_loc5_.§----____--_--§())
               {
                  _loc2_ = param1.getMoldingTileByBrandGoodId(_loc5_.brandGoodId);
                  _loc5_.§--_---_-__--_§ = _loc2_.profileData;
                  _loc5_.textureAsset = _loc2_.textureData;
               }
            }
            _loc5_ = _loc4_.§-_-____-__-_§;
            if(_loc5_ != null && !_loc5_.isEmpty())
            {
               _loc5_.§--_---_-__--_§ = param1.getProfile(_loc5_.profileId);
               _loc5_.textureAsset = param1.getTextureById(_loc5_.textureId);
               if(_loc5_.§----____--_--§())
               {
                  _loc2_ = param1.getMoldingTileByBrandGoodId(_loc5_.brandGoodId);
                  _loc5_.§--_---_-__--_§ = _loc2_.profileData;
                  _loc5_.textureAsset = _loc2_.textureData;
               }
            }
         }
         this.§---_-_-_-____§.§--_---_-__--_§ = param1.getProfile(this.§---_-_-_-____§.profileId);
         this.§---_-_-_-____§.textureAsset = param1.getTextureById(this.§---_-_-_-____§.textureId);
         this.§-__-_--____-§.§--_---_-__--_§ = param1.getProfile(this.§-__-_--____-§.profileId);
         this.§-__-_--____-§.textureAsset = param1.getTextureById(this.§-__-_--____-§.textureId);
      }
      
      public function addBoundary(param1:§-----_-__----§) : void
      {
         param1.curve = this;
         ArrayHelperClass.ifHasAndSave(this.mBoundaries,param1);
      }
      
      public function §-__-___--___-_§(param1:§-----_-__----§) : void
      {
         param1.curve = null;
         ArrayHelperClass.removeItem(this.mBoundaries,param1);
      }
      
      public function §-___--__-___-_§() : void
      {
         var _loc1_:§-----_-__----§ = null;
         for each(_loc1_ in this.mBoundaries)
         {
            _loc1_.updatePosition();
         }
      }
      
      public function §--_----_---_-§() : void
      {
         var _loc1_:§-----_-__----§ = null;
         for each(_loc1_ in this.mBoundaries)
         {
            _loc1_.§--__---___-_§();
         }
      }
      
      public function §---____-____-§() : Vector.<wallCurve>
      {
         var _loc1_:Vector.<wallCurve> = new Vector.<wallCurve>();
         if(m_Start)
         {
            ArrayHelperClass.addItems(_loc1_,m_Start.curves);
         }
         if(m_End)
         {
            ArrayHelperClass.ifHaveSameTheLaterOne(_loc1_,m_End.curves);
         }
         return _loc1_;
      }
      
      public function §-_--_---___-_§() : Vector.<§-----_-__----§>
      {
         return this.mBoundaries;
      }
      
      public function §-_______--__--§(param1:SideEnum) : Vector.<§-----_-__----§>
      {
         var _loc3_:§-----_-__----§ = null;
         var _loc2_:Vector.<§-----_-__----§> = new Vector.<§-----_-__----§>();
         for each(_loc3_ in this.mBoundaries)
         {
            if(_loc3_.side.equals(param1))
            {
               _loc2_.push(_loc3_);
            }
         }
         return _loc2_;
      }
      
      public function §-___----__-_-_§(param1:EndEnum) : cornerSonClass
      {
         return !!param1.isStart()?cornerSonClass.switchClassTypeTo(mm_start):cornerSonClass.switchClassTypeTo(mm_end);
      }
      
      public function §-___-__-___-_§(param1:cornerSonClass) : Number
      {
         var _loc2_:EndEnum = this.§----__-_____-§(param1);
         return this.§-_---____---_§(_loc2_);
      }
      
      public function §-_---____---_§(param1:EndEnum) : Number
      {
         return Vec2.angle(this.§-_-_-__-___--§(param1));
      }
      
      public function §-_-_-__-___--§(param1:EndEnum) : Vec2
      {
         return !!param1.isStart()?Vec2.sub(end,start):Vec2.sub(start,end);
      }
      
      public function §----__-_____-§(param1:cornerSonClass) : EndEnum
      {
         return !!isStart(param1)?EndEnum.START:!!isEnd(param1)?EndEnum.END:null;
      }
      
      public function §-----_-_-_---§(param1:cornerSonClass) : Vec2
      {
         var _loc2_:EndEnum = this.§----__-_____-§(param1);
         return this.§-_-_-__-___--§(_loc2_);
      }
      
      public function §--___-_-__-__§() : my2D_Edge
      {
         return new my2D_Edge(start,end);
      }
      
      public function getOverlookMoldings() : Vector.<§-___-__---_-__§>
      {
         return this.§--__--__-___§.getOverlookMoldings();
      }
      
      override public function getMoldingByPlacement(param1:DecoMoldingPlacement) : §---___-_---_-§
      {
         return this.§--__--__-___§.getMoldingByPlacement(param1);
      }
      
      override public function getMoldingPlacement(param1:§---___-_---_-§) : DecoMoldingPlacement
      {
         return this.§--__--__-___§.getMoldingPlacement(param1);
      }
      
      public function get type() : WallCurveType
      {
         return this.mType;
      }
      
      public function set type(param1:WallCurveType) : void
      {
         this.mType = param1;
      }
      
      public function get profile() : §---___--__---§
      {
         return this.§--__--__-___§;
      }
      
      public function set profile(param1:§---___--__---§) : void
      {
         if(this.§--__--__-___§ != null)
         {
            this.§--__--__-___§.curve = null;
         }
         this.§--__--__-___§ = param1;
         if(this.§--__--__-___§ != null)
         {
            this.§--__--__-___§.curve = this;
         }
      }
      
      public function get elevation() : §---__-_---__§
      {
         return this.§--_-____-_--§;
      }
      
      public function set elevation(param1:§---__-_---__§) : void
      {
         if(this.§--_-____-_--§ != null)
         {
            this.§--_-____-_--§.curve = null;
         }
         this.§--_-____-_--§ = param1;
         if(this.§--_-____-_--§ != null)
         {
            this.§--_-____-_--§.curve = this;
         }
      }
      
      public function set §-__-____---_--§(param1:§--__-_----__-§) : void
      {
         if(this.§---_-_-_-____§ != null)
         {
            this.§---_-_-_-____§.curve = null;
         }
         this.§---_-_-_-____§ = param1;
         if(this.§---_-_-_-____§ != null)
         {
            this.§---_-_-_-____§.curve = this;
         }
      }
      
      override public function get §-__-____---_--§() : §--__-_----__-§
      {
         return this.§---_-_-_-____§;
      }
      
      public function set §---____-__--§(param1:§--__-_----__-§) : void
      {
         if(this.§-__-_--____-§ != null)
         {
            this.§-__-_--____-§.curve = null;
         }
         this.§-__-_--____-§ = param1;
         if(this.§-__-_--____-§ != null)
         {
            this.§-__-_--____-§.curve = this;
         }
      }
      
      override public function get §---____-__--§() : §--__-_----__-§
      {
         return this.§-__-_--____-§;
      }
      
      public function get wall() : my_xx_wall
      {
         return this.mWall;
      }
      
      public function set wall(param1:my_xx_wall) : void
      {
         this.mWall = param1;
      }
      
      public function get tileType() : String
      {
         return this.mTileType;
      }
      
      public function set tileType(param1:String) : void
      {
         this.mTileType = param1;
      }
   }
}
