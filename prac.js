const viewState = {
  viewCount: 100,
};

// ...viewState = viewCount:100
console.log({ ...viewState, viewCount2: viewState.viewCount + 1 }); // { viewCount: 100, viewCount1: 101 }
console.log({ ...viewState, viewCount: viewState.viewCount + 1 }); // { viewCount: 101 }

// 즉 객체에서 spreadoperator연산자를 통해서 초기값을 복사한후 , 그 복사한 값에 새로 정의한 값을 넣는다.
// 앞에 ...을 한 이유는 state가 복사되는 것이고 , 그 이후 복사된 state값에 새로 정의한 state값을 넣게 되면
// 앞에 ...을 한 변수는 , 이후의 이름이 같은 변수로 오버라이드 된다. 즉 단 하나의 값만 return하게 된다.

//객체에서의 Spread Operator
let currentState = { name: '철수', species: 'human' };
currentState = { ...currentState, age: 10 };

console.log(currentState); // {name: "철수", species: "human", age: 10}

//객체의 프로퍼티를 오버라이드 한다. 이거 때문에 헷갈렸던것 같다.
//즉 객체 프로퍼티의 키 값이 같을 경우 새로 추가된 키의 value로 값이 수정된다.
currentState = { ...currentState, name: '영희', age: 11 };
console.log(currentState); // {name: "영희", species: "human", age: 11}
