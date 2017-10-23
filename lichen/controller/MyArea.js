function MyArea(param1) {
    if (param1 == null || param1 == undefined) {
        param1 = null;
    }

    //param1 = param1 || null;
    this.mAreaNotUnderstand;//整块的大属性？
    //this.m_Decorations:Vector.<MyBasicArea>;//里面好多块的属性？
    this.mCurves;
    this.mWall = param1;
    //protected var mAlignment:DecoAlignment;
    //protected var mRotation:Number;
    this.mPath; // m_pathOrMyPathClass
      
    this.initialize();
    this.mId = ID.assignUniqueId();
}

MyArea.outputStructure = function(param1) {
    var res = {
        edges : []
    };
    
    if (param1 instanceof MyArea) {
        for (var i = 0; i < param1.mCurves.length; i++) {
            if (param1.mCurves[i] instanceof CurveController) {
                var curve = param1.mCurves[i].getCurveFromController();
                res.edges.push(curve);
            } else if (param1.mCurves[i] instanceof SegmentController) {
                var edge = param1.mCurves[i].getTheStartEndEdge();
                res.edges.push(edge);
            }
        }
    } else if (param1 instanceof Array) {
        for (var i = 0; i < param1.length; i++) {
            if (param1[i] instanceof CurveController) {
                var curve = param1[i].getCurveFromController();
                res.edges.push(curve);
            }
            if (param1[i] instanceof SegmentController) {
                var edge = param1[i].getTheStartEndEdge();
                res.edges.push(edge);
            }
        }
    }
    
    return res;
    
}

function MyOutput (outline) {
    this.mOutline = outline;
    this.mHoles = [];
}

MyArea.outputStructures = function(param1, param2) {
    var outline = MyArea.outputStructure(param1);
    
    res = new MyOutput(outline);

    if (param2.length == 0) {
        return res;
    } else if (param2.length == 1){
        res.mHoles.push(MyArea.outputStructure(param2[0]));
        return res;
    } else {
        //TODO: 排除重复，然后继续取边界
        var curves = [];
        
        for (var i = 0; i < param2.length; i++) {
            for (var j = 0; j < param2[i].mCurves.length; j++) {
                var curve = param2[i].mCurves[j];
                var index = curves.indexOf(curve);
                if (index != -1) {
                    curves.splice(index, 1);
                } else {
                    curves.push(curve)
                }
            }
        }
        var helper = new curveCornerHelperClass(curves);
        var paths = helper.getPaths_eh();
        
        var clockwisePaths = MyPath.getClockWisePaths(paths);
        
        for (var i = 0; i < clockwisePaths.length; i++) {
            res.mHoles.push(MyArea.outputStructure(clockwisePaths[i].mCurves));
        }
        
        return res;
    }
    
}

MyArea.outputStructures2 = function(param1, param2) {
    var outline = param1.getPathPolygon();
    
    res = new MyPolytree(outline);

    if (param2.length == 0) {
        return res;
    } else {
        res.mHoles = [];
        for (var i = 0; i < param2.length; i++) {
            res.mHoles.push(param2[i].getPathPolygon());
        }
        return res;
    }
    
}

/*
MyArea.prototype.tryAddDectationAndSetNode(param1)
{
    var _loc2_:Boolean = ArrayHelperClass.ifHasAndSave(this.m_Decorations,param1);
    if(_loc2_)
    {
    param1.funcGetAreaNotUnderStand = this;
    }
    return _loc2_;
}
*/
      
      
/*
public static function switchClassTypeTo(param1:AreaFatherClass) : wallAreas_Class
      {
         return param1 as wallAreas_Class;
      }
      
      public static function cloneParameter(param1:Vector.<AreaFatherClass>) : Vector.<wallAreas_Class>
      {
         return Vector.<wallAreas_Class>(param1);
      }
      
      public static function cloneAreas(param1:Vector.<wallAreas_Class>) : Vector.<AreaFatherClass>
      {
         return Vector.<AreaFatherClass>(param1);
      }
*/
MyArea.prototype.initialize = function()
{
    //super.initialize();
    this.mCurves = [];//new Vector.<curveBasicClass>();
    //this.m_Decorations = [];//new Vector.<MyBasicArea>();

    this.mOffset = 0;
    //mRotation = 0;
    //this.mTiles = new Vector.<AnglePosElementSon>();
    //mAlignment = DecoAlignment.TOP_LEFT;
    this.mMap = new MyMap();
    this.IsNotGetPolygonOnce = true;
    this.mPatternOffset = new Vec2();
}

MyArea.prototype.getPolygon = function() //getPolygon() : my_polygon
{
    if(this.mPath == null)
    {
        return null;
    }
    return this.mPath.getPolygon();
}

MyArea.prototype.tryCalculatePolygon = function()
{
    if(this.IsNotGetPolygonOnce == true)
    {
        this.GetPolygonFromSelf();
        this.IsNotGetPolygonOnce = false;
    }
}

MyArea.prototype.addONE_PART = function(param1)
{
    return ArrayHelperClass.ifHasAndSave(this.mCurves,param1);
}
      
MyArea.prototype.dispose = function()
{
    var _loc1_ = null;
    for (var i = 0; i < this.mCurves.length; i++)
    //for each(_loc1_ in this.m_curves)
    {
        this.mCurves[i].wallDleleteSame(this);
    }
    if(this.mWall)
    {
        this.mWall.wallDleleteSame(this);
    }
}
MyArea.prototype.getPolygonFunc_EH = function()
{
    this.tryCalculatePolygon();
    return this.mPolygon;
}

//get holes!!!!!!!!!!!!!!!!!!!!!
MyArea.prototype.clonePolygons = function()
{
    return [];
}
      
MyArea.prototype.generateElementDiscribeUnit = function()
{
    return new MyPolytree(this.getPolygonFunc_EH(),this.clonePolygons());
}

MyArea.prototype.generatePolyTree = function()
{
    return new MyPolytree(this.getPolygon(),this.clonePolygons());
}


MyArea.prototype.isIncludedArea = function(param1)
{
    if(!this.getPathPolygon().isIncludedPolygon(param1.getPathPolygon()))
    {
        return false;
    }
    return true;
}


MyArea.prototype.isIncludedPolygon = function(param1)
{
    //var _loc2_:AreaFatherClass = null;
    if(!this.getPathPolygon().isIncludedPolygon(param1))
    {
        return false;
    }
    /*
    for each(_loc2_ in this.m_Decorations)
    {
        if(param1.isIncludedPolygon(param1))
        {
            return false;
        }
    }
    */
    return true;
}

MyArea.prototype.getPathPolygon = function()
{
    if(this.mPath == null)
    {
        return null;
    }
    return this.mPath.mPolygon;
}


/*


public function §-____-_-----_§(param1:AnglePosElementSon) : void
{
invalidateDisplay();
this.§--_-_--_-----§();
this.mWallTile = param1;
}

public function changeTexture(param1:§-___-_-_-_-__-§) : void
{
invalidateDisplay();
this.§--_-_--_-----§();
this.§----_-___-§ = param1;
}

public function §-___--__----__§(param1:TileAreaPattern, param2:§--_---_-_---§) : void
{
invalidateDisplay();
this.§--_-_--_-----§();
this.§---_--__-_--_§ = param1;
if(!this.§--________§)
{
this.§--________§ = param2;
}
}

public function §----__--_-__§(param1:§--_-__-_-__-§) : void
{
invalidateDisplay();
if(this.§-__--_--_-_--§ == null)
{
this.§--__----__§();
}
this.§--_-_--_-----§();
this.§-__--_--_-_--§ = param1;
}

public function §--___-__--§(param1:§--___--_-___-§) : void
{
invalidate();
this.§--_-_--_-----§();
this.§--_---_-___§ = param1;
}

override public function §---__---__-__§() : Boolean
{
return !this.§---_--__-_--_§;
}

override public function §-__--_----___§(param1:§---________§) : Boolean
{
return param1 && (this.§-__--_--_-_--§ || param1.§-____---_---__§ == DecoAssetType.MATERIAL);
}

override public function §-___-_-_-----_§(param1:§---________§) : void
{
var _loc2_:DecoTextureAsset = null;
var _loc3_:§--___--_-___-§ = null;
var _loc4_:§-___-_-_-_-__-§ = null;
var _loc5_:DecoIntegratedWallAsset = null;
var _loc6_:§--_-__-_-__-§ = null;
var _loc7_:DecoTileAsset = null;
var _loc8_:AnglePosElementSon = null;
if(this.§-__--_----___§(param1))
{
if(param1.asset is DecoTextureAsset)
{
_loc2_ = param1.asset as DecoTextureAsset;
if(this.§-__--_--_-_--§ && param1.§-____---_---__§ == DecoAssetType.TEXTURE)
{
this.§-__--_--_-_--§.textureAsset = _loc2_;
invalidateDisplay();
}
else
{
this.§----_---__-_§(param1);
if(_loc2_.isPictureAsset)
{
_loc3_ = new §--___--_-___-§();
_loc3_.brandGoodId = _loc2_.brandGoodId;
_loc3_.asset = _loc2_;
this.§--___-__--§(_loc3_);
}
else
{
_loc4_ = new §-___-_-_-_-__-§();
_loc4_.brandGoodId = _loc2_.brandGoodId;
_loc4_.asset = _loc2_;
this.changeTexture(_loc4_);
}
}
}
else if(param1.asset is DecoIntegratedWallAsset)
{
_loc5_ = param1.asset as DecoIntegratedWallAsset;
if(this.§-__--_--_-_--§)
{
this.§-__--_--_-_--§.textureAsset = _loc5_.textureData;
invalidateDisplay();
}
else
{
_loc6_ = new §--_-__-_-__-§(_loc5_);
this.§----__--_-__§(_loc6_);
}
}
else if(param1.asset is DecoTileAsset)
{
this.§----_---__-_§(param1);
_loc7_ = param1.asset as DecoTileAsset;
_loc8_ = new AnglePosElementSon();
_loc8_.tileId = _loc7_.id;
_loc8_.asset = _loc7_;
this.§-____-_-----_§(_loc8_);
}
}
}

override public function §--_-__-_--__§() : §---________§
{
var _loc1_:§---________§ = new §---________§();
_loc1_.alignment = this.alignmentMode;
_loc1_.rotation = this.rotation;
_loc1_.§-____---_---__§ = DecoAssetType.MATERIAL;
if(this.§----_-___-§)
{
_loc1_.asset = this.§----_-___-§.asset;
}
else if(this.§--_---_-___§)
{
_loc1_.asset = this.§--_---_-___§.asset;
}
else if(this.§-__--_--_-_--§)
{
_loc1_.asset = this.§-__--_--_-_--§.asset;
}
else if(this.mWallTile)
{
_loc1_.asset = this.mWallTile.asset;
}
else
{
_loc1_ = null;
}
return _loc1_;
}

public function §--_-_--_-----§() : void
{
this.mWallTile = null;
this.§----_-___-§ = null;
this.§---_--__-_--_§ = null;
this.§-__--_--_-_--§ = null;
this.§--_---_-___§ = null;
this.mPatternOffset.setZero();
}

public function §-___------_--_§(param1:AnglePosElementSon, param2:my2D_Edge) : void
{
var _loc7_:my_Range_Class_0 = null;
var _loc8_:§----__-___--§ = null;
var _loc9_:AnglePosElementSon = null;
invalidateDisplay();
var _loc3_:my_PolyTree = generatePolyTree();
var _loc4_:§-----_-----§ = new §-----_-----§(param2,param1);
_loc4_.execute();
var _loc5_:Vector.<my_Range_Class_0> = _loc4_.§-_______---§;
var _loc6_:Vector.<AnglePosElementSon> = new Vector.<AnglePosElementSon>();
for each(_loc7_ in _loc5_)
{
if(_loc3_.§-----_-__-_--§(_loc7_.getOutLinePolygon()))
{
_loc9_ = param1.clone();
_loc9_.position = _loc7_.position;
_loc6_.push(_loc9_);
this.addTile(_loc9_);
}
}
_loc8_ = new §----__-___--§(this);
_loc8_.§-___--___----§ = _loc6_;
_loc8_.execute();
}

public function addTiles(param1:Vector.<AnglePosElementSon>) : void
{
var _loc2_:AnglePosElementSon = null;
for each(_loc2_ in param1)
{
this.addTile(_loc2_);
}
}

public function addTile(param1:AnglePosElementSon) : Boolean
{
invalidateDisplay();
return ArrayHelperClass.ifHasAndSave(this.mTiles,param1);
}


public function renderRemoveSomeElement(param1:AnglePosElementSon) : Boolean
{
invalidateDisplay();
return ArrayHelperClass.removeItem(this.mTiles,param1);
}

public function §--___-_-_-__-§() : void
{
invalidateDisplay();
ArrayHelperClass.removeAll(this.mTiles);
}

public function §-_-___---_-__§() : void
{
invalidateDisplay();
this.mMap.clear();
ArrayHelperClass.removeAll(this.§--_-__-_---§);
}

public function §-----__-_-___§() : void
{
var _loc2_:§-_--_-_-----§ = null;
var _loc1_:int = this.mWall.models.length - 1;
while(_loc1_ >= 0)
{
_loc2_ = this.mWall.models[_loc1_];
if(containsPoint(_loc2_.§-_______-§()))
{
this.mWall.§--_-_-_---_--§(_loc2_);
}
_loc1_--;
}
}

override public function cloneProperties(param1:*) : void
{
var _loc2_:wallAreas_Class = param1 as wallAreas_Class;
this.mOffset = _loc2_.offset;
mRotation = _loc2_.rotation;
this.mWallTile = _loc2_.wallTile;
this.§----_-___-§ = _loc2_.wallTexture;
mAlignment = _loc2_.alignmentMode;
this.mMap = _loc2_.§-__-_---___--§;
this.§-__--_--_-_--§ = _loc2_.integratedWall;
this.§--_---_-___§ = _loc2_.wallPicture;
this.§---_--__-_--_§ = _loc2_.areaPattern;
this.§--________§ = _loc2_.§--__-_--_-_--§;
this.§--___-_-_-__-§();
this.addTiles(_loc2_.tiles);
this.mPatternOffset = _loc2_.patternOffset;
}

public function §--__-_-_-_--§(param1:wallAreas_Class) : Boolean
{
return my_number.isEqual(this.mOffset,param1.offset);
}

public function §-_-__--____--§(param1:Vec2) : void
{
var _loc3_:cornerSonClass = null;
var _loc4_:wallCurve = null;
var _loc5_:AnglePosElementSon = null;
var _loc2_:Vector.<cornerSonClass> = cornerSonClass.cloneParameter(cloneCurve());
for each(_loc3_ in _loc2_)
{
_loc3_.§-_-__--____--§(param1);
}
for each(_loc4_ in m_curves)
{
_loc4_.§-_-__--____--§(param1);
}
for each(_loc5_ in this.mTiles)
{
_loc5_.§-_-__--____--§(param1);
}
invalidateDisplay();
}

public function §--_-----_--§(param1:Vec2) : void
{
var _loc2_:Vec2 = getCornerAveragePos();
var _loc3_:Vec2 = param1.sub(_loc2_);
this.§-_-__--____--§(_loc3_);
}
*/

/*
public function getResources() : DecoResourceSet
{
var _loc2_:AnglePosElementSon = null;
var _loc3_:TileParamPattern = null;
var _loc4_:TileComponent = null;
var _loc1_:ResourceSet = new ResourceSet();
if(this.mWallTile != null)
{
_loc1_.addTile(this.mWallTile.asset);
}
if(this.§----_-___-§ != null)
{
_loc1_.addTexture(this.§----_-___-§.asset);
}
if(this.§-__--_--_-_--§ != null)
{
_loc1_.addProfile(this.§-__--_--_-_--§.§--_---_-__--_§);
_loc1_.addTexture(this.§-__--_--_-_--§.textureAsset);
_loc1_.addWallBoard(this.§-__--_--_-_--§.asset);
}
if(this.§--_---_-___§ != null)
{
_loc1_.addTexture(this.§--_---_-___§.asset);
}
for each(_loc2_ in this.mTiles)
{
_loc1_.addTile(_loc2_.asset);
}
if(this.§---_--__-_--_§ != null)
{
switch(this.areaPattern.patternTypeId)
{
case 0:
_loc1_.addWallDesignAsset((this.areaPattern.patternData as TileInternalPattern).tileTexture);
break;
case 1:
_loc3_ = this.§---_--__-_--_§.patternData as TileParamPattern;
_loc3_.pattern.id = this.mWall.id + ":" + this.§---_--__-_--_§.id;
_loc1_.addParamPattern(_loc3_.pattern);
for each(_loc4_ in _loc3_.pattern.components)
{
_loc1_.addWallDesignAsset(_loc4_.tileTexture);
}
}
}
return _loc1_;
}

public function setResources(param1:DecoResourceSet) : void
{
var _loc3_:AnglePosElementSon = null;
var _loc4_:DecoIntegratedWallAsset = null;
var _loc5_:DecoTileAsset = null;
var _loc6_:TileInternalPattern = null;
var _loc7_:TileParamPattern = null;
var _loc8_:TileComponent = null;
var _loc2_:ResourceSet = param1 as ResourceSet;
if(this.mWallTile != null)
{
this.mWallTile.asset = _loc2_.getCeilingTileByBrandGoodId(this.mWallTile.brandGoodId);
}
if(this.§----_-___-§ != null)
{
this.§----_-___-§.asset = _loc2_.getTextureByBrandGoodId(this.§----_-___-§.brandGoodId);
}
if(this.§-__--_--_-_--§ != null)
{
_loc4_ = _loc2_.getWallBoard(this.§-__--_--_-_--§.brandGoodId);
if(_loc4_ == null)
{
_loc4_ = new DecoIntegratedWallAsset();
LOG.error("Find null integrated wall asset!");
}
_loc4_.profileData = _loc2_.getProfile(this.§-__--_--_-_--§.profileId);
_loc4_.textureData = _loc2_.getTextureById(this.§-__--_--_-_--§.textureId);
this.§-__--_--_-_--§.asset = _loc4_;
}
if(this.§--_---_-___§ != null)
{
this.§--_---_-___§.asset = _loc2_.getTextureByBrandGoodId(this.§--_---_-___§.brandGoodId);
}
for each(_loc3_ in this.mTiles)
{
_loc5_ = _loc2_.getCeilingTileByBrandGoodId(_loc3_.brandGoodId);
_loc3_.asset = _loc5_;
}
if(this.§---_--__-_--_§ != null)
{
switch(this.areaPattern.patternTypeId)
{
case 0:
_loc6_ = this.areaPattern.patternData as TileInternalPattern;
_loc6_.tileTexture = _loc2_.getWallDesignAsset(_loc6_.tileBrandGoodId);
this.mMap.add(_loc6_.tileBrandGoodId,_loc6_.tileTexture);
break;
case 1:
_loc7_ = this.areaPattern.patternData as TileParamPattern;
_loc7_.pattern = _loc2_.getParamPattern(this.mWall.id + ":" + this.areaPattern.id);
for each(_loc8_ in _loc7_.pattern.components)
{
_loc8_.tileTexture = _loc2_.getWallDesignAsset(_loc8_.brandGoodId);
this.mMap.add(_loc8_.brandGoodId,_loc8_.tileTexture);
}
}
}
}
*/
/*
public function getAnchorPoint() : Vec2
{
var _loc1_:Vec2 = new Vec2();
switch(mAlignment)
{
case DecoAlignment.TOP_LEFT:
_loc1_ = curveAreaRelationshipHelper.§-____-_-__-__-§(this);
break;
case DecoAlignment.TOP_CENTER:
_loc1_ = curveAreaRelationshipHelper.§------_---§(this);
break;
case DecoAlignment.TOP_RIGHT:
_loc1_ = curveAreaRelationshipHelper.§--___--_--__-§(this);
break;
case DecoAlignment.MIDDLE_LEFT:
_loc1_ = curveAreaRelationshipHelper.§------__-__--§(this);
break;
case DecoAlignment.MIDDLE_CENTER:
_loc1_ = curveAreaRelationshipHelper.§--_-_____--_§(this);
break;
case DecoAlignment.MIDDLE_RIGHT:
_loc1_ = curveAreaRelationshipHelper.§-_____-__-_-__§(this);
break;
case DecoAlignment.BOTTOM_LEFT:
_loc1_ = curveAreaRelationshipHelper.§-__---------_§(this);
break;
case DecoAlignment.BOTTOM_CENTER:
_loc1_ = curveAreaRelationshipHelper.§-__-_-___--__§(this);
break;
case DecoAlignment.BOTTOM_RIGHT:
_loc1_ = curveAreaRelationshipHelper.§--__-__--§(this);
break;
default:
_loc1_ = curveAreaRelationshipHelper.§-____-_-__-__-§(this);
}
return _loc1_;
}

public function generateTileShapes() : void
{
this.§--_-__-_---§ = TileGenerator.§-___---_-___--§(this);
}
*/
MyArea.prototype.GetPolygonFromSelf = function()
{
    this.mPolygon = GeoHelpSomeClass.getPolygonFromAreaPath(this);
}

MyArea.prototype.getAbsArea = function()
{
    return Math.abs(this.getPolygon().getSignedArea());
}

MyArea.prototype.removeSpecificCurve_AH = function(param1)
{
    return ArrayHelperClass.removeItem(this.mCurves, param1);
}
/*
private function §-_---_-___-_§() : void
{
mRotation = 0;
mAlignment = DecoAlignment.TOP_LEFT;
}

private function §--__----__§() : void
{
mRotation = 0;
mAlignment = DecoAlignment.MIDDLE_LEFT;
}

public function §-__-_____--___§() : void
{
GeoHelpSomeClass.§--_-_-_-__---§(this);
GeoHelpSomeClass.§-__-_____--___§(this);
}

public function §-_---___---__§(param1:§--___----_-§) : void
{
GeoHelpSomeClass.§-_---___---__§(this.§-_--_---___-_§(),param1);
}

public function §-_--_---___-_§() : Vector.<§-----_-__----§>
{
var _loc7_:SideEnum = null;
var _loc8_:Vector.<§-----_-__----§> = null;
var _loc1_:m_pathOrMyPathClass = m_mmPath;
var _loc2_:Vector.<wallCurve> = wallCurve.cloneParameter(_loc1_.curves);
var _loc3_:Vector.<cornerSonClass> = cornerSonClass.cloneParameter(_loc1_.corners);
var _loc4_:Vector.<§-----_-__----§> = new Vector.<§-----_-__----§>();
var _loc5_:int = 0;
var _loc6_:int = _loc2_.length;
while(_loc5_ < _loc6_)
{
_loc7_ = !!_loc2_[_loc5_].isStart(_loc3_[_loc5_])?SideEnum.RIGHT:SideEnum.LEFT;
_loc8_ = _loc2_[_loc5_].§-_______--__--§(_loc7_);
if(_loc8_ && _loc8_.length > 0)
{
_loc4_.push(_loc8_[0]);
}
_loc5_++;
}
return _loc4_;
}

public function §-__-_--_-__---§(param1:§-----_-__----§) : Boolean
{
var _loc3_:§-----_-__----§ = null;
var _loc2_:Vector.<§-----_-__----§> = this.§-_--_---___-_§();
for each(_loc3_ in _loc2_)
{
if(_loc3_.equals(param1))
{
return true;
}
}
return false;
}

public function §--_-_-___-__§() : Boolean
{
return §-__--___---_§.§--_-_-___-__§(wallCurve.cloneParameter(m_mmPath.curves));
}

private function §-__--_-__-___§() : void
{
var _loc1_:int = 0;
if(this.§-__--_--_-_--§)
{
_loc1_ = Math.floor(mRotation * 2 / Math.PI);
if(_loc1_ % 2 == 0)
{
switch(mAlignment)
{
case DecoAlignment.BOTTOM_CENTER:
mAlignment = DecoAlignment.MIDDLE_RIGHT;
break;
case DecoAlignment.TOP_CENTER:
mAlignment = DecoAlignment.MIDDLE_LEFT;
}
}
else
{
switch(mAlignment)
{
case DecoAlignment.MIDDLE_RIGHT:
mAlignment = DecoAlignment.BOTTOM_CENTER;
break;
case DecoAlignment.MIDDLE_LEFT:
mAlignment = DecoAlignment.TOP_CENTER;
}
}
}
}

private function §----_---__-_§(param1:§---________§) : void
{
if(param1.alignment)
{
this.alignmentMode = param1.alignment;
}
if(param1.rotation)
{
this.rotation = param1.rotation;
}
}

public function get offset() : Number
{
return this.mOffset;
}

public function set offset(param1:Number) : void
{
this.mOffset = param1;
invalidate();
}

public function get tiles() : Vector.<AnglePosElementSon>
{
return this.mTiles;
}

public function set tiles(param1:Vector.<AnglePosElementSon>) : void
{
this.mTiles = param1;
}

public function get wallTile() : AnglePosElementSon
{
return this.mWallTile;
}

public function set wallTile(param1:AnglePosElementSon) : void
{
this.mWallTile = param1;
invalidateDisplay();
}

public function get integratedWall() : §--_-__-_-__-§
{
return this.§-__--_--_-_--§;
}

public function set integratedWall(param1:§--_-__-_-__-§) : void
{
this.§-__--_--_-_--§ = param1;
}

public function get wallTexture() : §-___-_-_-_-__-§
{
return this.§----_-___-§;
}

public function set wallTexture(param1:§-___-_-_-_-__-§) : void
{
this.§----_-___-§ = param1;
}

public function get rotation() : Number
{
return mRotation;
}

public function set rotation(param1:Number) : void
{
mRotation = param1;
this.§-__--_-__-___§();
invalidateDisplay();
}

public function get alignmentMode() : DecoAlignment
{
return mAlignment;
}

public function set alignmentMode(param1:DecoAlignment) : void
{
mAlignment = param1;
invalidateDisplay();
}

public function get wall() : my_xx_wall
{
return this.mWall;
}

public function set wall(param1:my_xx_wall) : void
{
this.mWall = param1;
}

public function get §-__-_---___--§() : Map
{
return this.mMap;
}

[Bindable(event="propertyChange")]
public function get areaPattern() : TileAreaPattern
{
return this.§---_--__-_--_§;
}

private function set §--_---___-§(param1:TileAreaPattern) : void
{
this.§---_--__-_--_§ = param1;
}

public function get §-_____-__-§() : Vector.<§-__-__--_---_-§>
{
return this.§--_-__-_---§;
}

public function set §-_____-__-§(param1:Vector.<§-__-__--_---_-§>) : void
{
this.§--_-__-_---§ = param1;
}

public function get getPolygonFunc_EH() : my_polygon
{
this.tryCalculatePolygon();
return this.mPolygon;
}

public function get §--__-_--_-_--§() : §--_---_-_---§
{
return this.§--________§ || new §--_---_-_---§();
}

public function set §--__-_--_-_--§(param1:§--_---_-_---§) : void
{
this.§--________§ = param1;
}

public function get wallPicture() : §--___--_-___-§
{
return this.§--_---_-___§;
}

public function set wallPicture(param1:§--___--_-___-§) : void
{
this.§--_---_-___§ = param1;
}

public function get patternOffset() : Vec2
{
return !!this.mPatternOffset?this.mPatternOffset:new Vec2();
}

public function set patternOffset(param1:Vec2) : void
{
this.mPatternOffset = param1;
}

public function set areaPattern(param1:TileAreaPattern) : void
{
var _loc2_:Object = this.areaPattern;
if(_loc2_ !== param1)
{
this.§--_---___-§ = param1;
if(this.hasEventListener("propertyChange"))
{
this.dispatchEvent(PropertyChangeEvent.createUpdateEvent(this,"areaPattern",_loc2_,param1));
}
}
}

public function addEventListener(param1:String, param2:Function, param3:Boolean = false, param4:int = 0, param5:Boolean = false) : void
{
this._bindingEventDispatcher.addEventListener(param1,param2,param3,param4,param5);
}

public function dispatchEvent(param1:Event) : Boolean
{
return this._bindingEventDispatcher.dispatchEvent(param1);
}

public function hasEventListener(param1:String) : Boolean
{
return this._bindingEventDispatcher.hasEventListener(param1);
}

public function removeEventListener(param1:String, param2:Function, param3:Boolean = false) : void
{
this._bindingEventDispatcher.removeEventListener(param1,param2,param3);
}

public function willTrigger(param1:String) : Boolean
{
return this._bindingEventDispatcher.willTrigger(param1);
}
*/

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
   
   public class MyBasicArea extends ObjectIndex implements AssetShowHideControlInterface, §-----_----__-§
   {
      
      private static const LOG:ILogger = getLogger(MyBasicArea);
      
      private static const TOLERANCE:Number = 0.001;
       
      
      protected var mAreaNotUnderstand:MyBasicArea;//整块的大属性？
      
      protected var m_Decorations:Vector.<MyBasicArea>;//里面好多块的属性？
      
      protected var m_curves:Vector.<curveBasicClass>;
      
      protected var mAlignment:DecoAlignment;
      
      protected var mRotation:Number;
      
      protected var m_mmPath:m_pathOrMyPathClass;
      
      private var m_isValidShowOrNotFlag:Boolean = true;
      
      public function MyBasicArea()
      {
         super();
      }
      
      override protected function initialize() : void
      {
         this.m_curves = new Vector.<curveBasicClass>();
         this.m_Decorations = new Vector.<MyBasicArea>();
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
      
      public function tryAddDectationAndSetNode(param1:MyBasicArea) : Boolean
      {
         var _loc2_:Boolean = ArrayHelperClass.ifHasAndSave(this.m_Decorations,param1);
         if(_loc2_)
         {
            param1.funcGetAreaNotUnderStand = this;
         }
         return _loc2_;
      }
      
      public function §----_--_--___§(param1:MyBasicArea) : Boolean
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
         var _loc4_:MyBasicArea = null;
         if(param2)
         {
            if(!this.getPolygon.containsInclusive(param1,param3))
            {
               return false;
            }
         }
         else if(!this.getPolygon.containsExclusive(param1,param3))
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
         var _loc2_:MyBasicArea = null;
         if(!this.getPolygon.isIncludedPolygon(param1))
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
         var _loc2_:MyBasicArea = null;
         var _loc3_:my_polygon = null;
         if(!this.getPolygon.isIntersected(param1))
         {
            return false;
         }
         for each(_loc2_ in this.m_Decorations)
         {
            _loc3_ = _loc2_.getPolygon;
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
         return this.getPolygon.getBoundingBox();
      }
      
      public function generatePolyTree() : my_PolyTree
      {
         return new my_PolyTree(this.getPolygon,this.clonePolygons());
      }
      
      public function §-___---_-_-__-§() : my_PolyTree
      {
         var pathFinder:curveCornerHelperClass = null;
         var borderCurves:Vector.<curveBasicClass> = null;
         var tmpPaths:Vector.<m_pathOrMyPathClass> = null;
         var tmpPath:m_pathOrMyPathClass = null;
         var outline:my_polygon = null;
         var holes:Vector.<my_polygon> = null;
         var child:MyBasicArea = null;
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
         return Math.abs(this.getPolygon.getSignedArea());
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
         var _loc2_:MyBasicArea = null;
         var _loc1_:Vector.<curveBasicClass> = this.m_curves.concat();
         for each(_loc2_ in this.m_Decorations)
         {
            ArrayHelperClass.deleteSameValues(_loc1_,_loc2_.curves);
         }
         return _loc1_;
      }
      
      public function clonePolygons() : Vector.<my_polygon>
      {
         var _loc2_:MyBasicArea = null;
         var _loc1_:Vector.<my_polygon> = new Vector.<my_polygon>();
         for each(_loc2_ in this.m_Decorations)
         {
            _loc1_.push(_loc2_.getPolygon);
         }
         return _loc1_;
      }
      
      public function getGravityCenter_XX() : Vec2
      {
         if(this.getPolygon == null)
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
      
      public function get getPolygon() : my_polygon
      {
         if(this.m_mmPath == null)
         {
            return null;
         }
         return this.m_mmPath.polygon;
      }
      
      public function get funcGetAreaNotUnderStand() : MyBasicArea
      {
         return this.mAreaNotUnderstand;
      }
      
      public function set funcGetAreaNotUnderStand(param1:MyBasicArea) : void
      {
         this.mAreaNotUnderstand = param1;
      }
      
      public function get getDectorationFunc() : Vector.<MyBasicArea>
      {
         return this.m_Decorations;
      }
      
      public function set getDectorationFunc(param1:Vector.<MyBasicArea>) : void
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