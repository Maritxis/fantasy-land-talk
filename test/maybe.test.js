const Maybe=require('../maybe.js');

const MyMonad=require('../monad');
const {assert}=require('chai');
const FL=require('fantasy-land');
const {compose}=require('ramda');
const {mlog}=require('mocha-logger');


const functorOne=new Maybe(4);
const double=x=>2*x;
const plusFive=x=>x+5;
const composedfunctions=compose(double, plusFive);
const applicative=new Maybe(7);
const doubleMonad=new Maybe(double);
const plusFiveMonad=new Maybe(plusFive);
const composedMonad=new Maybe(composedfunctions);

describe('testing Just monad', function(){
    describe('test functor laws',function(){
        it('Maping whith an identity funtion returns the same functor',function(){
            assert.deepEqual(functorOne,functorOne[FL.map](x=>x));
        });
        it('Functors preserve composition',function(){        
            assert.deepEqual(functorOne[FL.map](composedfunctions),functorOne[FL.map](plusFive)[FL.map](double));
        })
    })

    describe('test apply laws', function(){
        it('Apply preserves composition',function(){
            assert.deepEqual(functorOne[FL.ap](composedMonad), functorOne[FL.ap](plusFiveMonad)[FL.ap](doubleMonad))
        })
    })

    describe('test applicative',function(){
        it('Applicative preserves identity', function(){
            assert.deepEqual(applicative, applicative[FL.ap](Maybe[FL.of](x=>x)))
        });
        it('Applicative is homeomorphe', function(){
            assert.deepEqual(applicative[FL.ap](Maybe[FL.of](double)),Maybe[FL.of](double(7)))
        });
        it('Applicative can be interchanged', function(){
            assert.deepEqual(applicative[FL.ap](plusFiveMonad), plusFiveMonad[FL.ap](Maybe[FL.of](f=>f(7))))
        })
    })

    describe('test chain laws', function(){
        const chain=Maybe[FL.of](8);
        const double=x=>Maybe[FL.of](2*x);
        const plusFive=x=>Maybe[FL.of](x+5);
        it('chain must follow associativity rules', function(){
            assert.deepEqual(chain[FL.chain](double)[FL.chain](plusFive), chain[FL.chain](x=>double(x)[FL.chain](plusFive)))
        })
    })

    describe('test monad chain laws', function(){
        it('left identity', function(){
            assert.deepEqual(Maybe[FL.of](7)[FL.chain](doubleL=x=>Maybe[FL.of](2*x)),Maybe[FL.of](2*7));
        });
        it('right identity', function(){
            assert.deepEqual(Maybe[FL.of](7)[FL.chain](Maybe[FL.of]),Maybe[FL.of](7));
        })
    })
})


describe('testing Nothing monad', function(){
    const nothingMonad=Maybe.Nothing();
    describe('test functor laws',function(){
        it('Maping whith an identity funtion returns the same functor',function(){
            assert.deepEqual(nothingMonad,nothingMonad[FL.map](x=>x));
        });
        it('Functors preserve composition',function(){        
            assert.deepEqual(nothingMonad[FL.map](composedfunctions),nothingMonad[FL.map](plusFive)[FL.map](double));
        })
    })

    describe('test apply laws', function(){
        it('Apply preserves composition',function(){
            assert.deepEqual(nothingMonad[FL.ap](composedMonad), nothingMonad[FL.ap](plusFiveMonad)[FL.ap](doubleMonad))
        })
    })

    describe('test applicative',function(){
        it('Applicative preserves identity', function(){
            assert.deepEqual(nothingMonad, nothingMonad[FL.ap](Maybe[FL.of](x=>x)))
        });
        it('Applicative is homeomorphe', function(){
            assert.deepEqual(nothingMonad[FL.ap](Maybe[FL.of](double)),Maybe[FL.of](null))
        });
        it('Applicative can be interchanged', function(){
            assert.deepEqual(nothingMonad[FL.ap](plusFiveMonad), plusFiveMonad[FL.ap](Maybe[FL.of](f=>null)))
        })
    })

    describe('test chain laws', function(){
        const chain=Maybe[FL.of](null);
        const double=x=>Maybe[FL.of](2*x);
        const plusFive=x=>Maybe[FL.of](x+5);
        it('chain must follow associativity rules', function(){
            assert.deepEqual(chain[FL.chain](double)[FL.chain](plusFive), chain[FL.chain](x=>double(x)[FL.chain](plusFive)))
        })
    })

    describe('test monad chain laws', function(){
        it('left identity', function(){
            assert.deepEqual(Maybe[FL.of](null)[FL.chain](doubleL=x=>Maybe[FL.of](2*x)),Maybe[FL.of](null));
        });
        it('right identity', function(){
            assert.deepEqual(Maybe[FL.of](null)[FL.chain](Maybe[FL.of]),Maybe[FL.of](null));
        })
    })
})