import LocalizationComponent from "./LocalizationComponent";
import LocalizationManager, { LocalizationType } from "./LocalizationManager";
import LocalizationAsset from "./LocalizationAsset";
import Logger from "../Logger/Logger";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class LocalizationImg extends LocalizationComponent {

    //属性声明
    // @property(cc.Label)     // 使用 property 装饰器声明属性，括号里是属性类型，装饰器里的类型声明主要用于编辑器展示
    // label: cc.Label = null; // 这里是 TypeScript 用来声明变量类型的写法，冒号后面是属性类型，等号后面是默认值

    // 也可以使用完整属性定义格式
    // @property({
    //     visible: false
    //     displayName: "Score (player)"
    //     tooltip: "The score of player"
    // })
    // text: string = 'hello';

    @property(cc.Sprite)
    _sprite:cc.Sprite=null;

    
    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this._sprite=this.getComponent(cc.Sprite);
        if (this._sprite==null) 
        {
            console.error("Wrong Localization Component, can't find Sprite");
            
        }
    }
    // onEnable() {}
    // start() {}
    // update(dt) {}
    // lateUpdate(dt) {}
    // onDisable() {}
    // onDestroy() {}

    SetTerm(key:string,argTable:any=null)
    {
        if (this._sprite==null) 
        {
            this.onLoad();
        }
        this.key=key;
        if (!LocalizationManager.instance.localizationSource.ContainsKey(key)) 
        {
            Logger.warn("localization can't find key:"+key+"--"+this.name);
            return;
        }
        let asset:LocalizationAsset=LocalizationManager.instance.localizationSource.TryGetValue(key);
        if (asset.assetType==LocalizationType.TEXTRUE) 
        {
            this._sprite.spriteFrame=asset.spriteFrame;    
        }
        else
        {
            Logger.warn("Localization asset type error");
        }
    }
}
