const FL=require('fantasy-land');
const {isNil}=require('ramda');

class Maybe{
    constructor(value){
        this._value=value;
    }
    static Just(value){
        return new Maybe(value);
    }
    static Nothing(){
        return new Maybe(null);
    }
    isNothing(){
        return isNil(this._value);
    }
    inspect(){
        return this.isNothing()?`Nothing()`:`Just(${this._value})`;
    }
    [FL.map](f){
        return this.isNothing()?this:new Maybe(f(this._value))
    }
    [FL.ap](functor){
        return isNil(this[FL.map](functor._value))?Maybe.Nothing():this[FL.map](functor._value);
    }
    static [FL.of](value){
        return isNil(value)?Maybe.Nothing():Maybe.Just(value);
    }
    [FL.chain](f){
        return this.isNothing()?this:new Maybe(f(this._value))._value;
    }
    static fromNullable(value){
        return isNil(value)?Maybe.Nothing():Maybe.Just(value);
    }
}



module.exports=Maybe;

