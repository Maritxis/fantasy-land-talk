const MyMonad=require('../monad');
const {assert}=require('chai');
const FL=require('fantasy-land');
const {compose}=require('ramda');
const {mlog}=require('mocha-logger');


const functorOne=new MyMonad(4);
const double=x=>2*x;
const plusFive=x=>x+5;
const composedfunctions=compose(double, plusFive);
const applicative=new MyMonad(7);
const doubleMonad=new MyMonad(double);
const plusFiveMonad=new MyMonad(plusFive);
const composedMonad=new MyMonad(composedfunctions);

describe('test functor laws',function(){
    it('Maping whith an identity funtion returns the same functor',function(){
        assert.deepEqual(functorOne,functorOne[FL.map](x=>x));
    });
    it('Functors preserve composition',function(){        
        assert.deepEqual(functorOne[FL.map](composedfunctions),functorOne[FL.map](plusFive)[FL.map](double));
    })
})

describe.skip('test apply laws', function(){
    it('Apply preserves composition',function(){
        assert.deepEqual(functorOne[FL.ap](composedMonad), functorOne[FL.ap](plusFiveMonad)[FL.ap](doubleMonad))
    })
})

describe.skip('test applicative',function(){
    it('Applicative preserves identity', function(){
        assert.deepEqual(applicative, applicative[FL.ap](MyMonad[FL.of](x=>x)))
    });
    it('Applicative is homeomorphe', function(){
        assert.deepEqual(applicative[FL.ap](MyMonad[FL.of](double)),MyMonad[FL.of](double(7)))
    });
    it('Applicative can be interchanged', function(){
        assert.deepEqual(applicative[FL.ap](plusFiveMonad), plusFiveMonad[FL.ap](MyMonad[FL.of](f=>f(7))))
    })
})

describe.skip('test chain laws', function(){
    const chain=MyMonad[FL.of](8);
    const double=x=>MyMonad[FL.of](2*x);
    const plusFive=x=>MyMonad[FL.of](x+5);
    it('chain must follow associativity rules', function(){
        assert.deepEqual(chain[FL.chain](double)[FL.chain](plusFive), chain[FL.chain](x=>double(x)[FL.chain](plusFive)))
    })
})

describe('test monad chain laws', function(){
    it('left identity', function(){
        assert.deepEqual(MyMonad[FL.of](7)[FL.chain](doubleL=x=>MyMonad[FL.of](2*x)),MyMonad[FL.of](2*7));
    });
    it('right identity', function(){
        assert.deepEqual(MyMonad[FL.of](7)[FL.chain](MyMonad[FL.of]),MyMonad[FL.of](7));
    })
})
