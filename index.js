const Maybe=require('./maybe.js');
const {compose, toUpper, prop, map, lift, join, remove, split}=require('ramda');
const FtMaybe=require('folktale/maybe');
const FL=require('fantasy-land');
const MyMonad=require('./monad.js');
const Result=require('folktale/result');

const userOne={
    name:'Henar Hernandez Mendiola Cano Daroca'
}

const userTwo={
    name: null
}

const getName=prop('name');

const maybeUserOneName=FtMaybe.fromNullable(getName(userOne));
const monadUserOneName=new MyMonad(getName(userOne));
const maybeUserTwoName=FtMaybe.fromNullable(getName(userTwo));

const resultUserOneName=Result.Ok(getName(userOne));
const resultUserTwoName=Result.Error(getName(userTwo));


const getLastNames=compose(remove(0,1),split(' '));

console.log(map(getLastNames)(maybeUserOneName));
console.log(map(getLastNames)(maybeUserTwoName));
console.log(map(getLastNames)(resultUserOneName));
console.log(map(getLastNames)(resultUserTwoName));
console.log(map(getLastNames)(monadUserOneName));




