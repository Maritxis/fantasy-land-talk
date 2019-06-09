const FL=require('fantasy-land');

class MyMonad{
    constructor(value){
        this._value=value;
    }
    [FL.map](f){
        return new MyMonad(f(this._value));
    }
    [FL.ap](apply){
        return this[FL.map](apply._value);
    }
    static [FL.of](value){
        return new MyMonad(value);
    }
    [FL.chain](f){
        return this[FL.map](f)._value;
    }
    inspect(){
        return `MyMonad (${this._value})`
    }
}

module.exports=MyMonad

