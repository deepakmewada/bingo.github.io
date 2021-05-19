import React, { useState, useEffect } from "react";

const bingoArray = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [5, 10, 15, 20, 25],
  [1, 7, 13, 19, 25],
  [5, 9, 13, 17, 21],
];

export default function Offline() {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [winLen, setWinLen] = useState(0);
  const [winArr, setWinArr] = useState([]);
  const [pending, setPending] = useState(26);

  useEffect(() => {
    resetBingo();
  }, []);

  useEffect(() => {
    if (count == 25) {
      let win = 0;
      let winArrz = [];
      let lastArr = null;
      let filterData = list.filter((item) => item.not === true);
      let newArr = [];
      filterData.map((item) => {
        newArr.push(item.num);
      });
      for (let i = 0; i < bingoArray.length; i++) {
        if (bingoArray[i].every((j) => newArr.includes(j))) {
          if (lastArr !== i) {
            win += 1;
            lastArr = i;
            winArrz.push(bingoArray[i]);
          }
        }
      }
      setWinArr([...winArrz]);
      setWinLen(win);
      setPending(pending - 1);
      console.log(newArr);
    }
  }, [list]);

  const resetBingo = () => {
    let listArr = [];
    for (let i = 1; i < 26; i++) {
      let newObj = { num: i };
      listArr.push(newObj);
    }
    setList(listArr);
    setCount(0);
    setWinLen(0);
  };

  const randomNumber = () => {
    if (list.length > 0) {
      let someOther = list;
      const newArr = [...list];
      const ranNums = [];
      let i = newArr.length;
      let j = 0;

      while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        ranNums.push(newArr[j].num);
        newArr.splice(j, 1);
      }
      for (let x = 1; x < 26; x++) {
        someOther[x - 1].value = ranNums[x - 1];
      }
      setList([...someOther]);
      setCount(25);
    }
  };

  const setHTML = async (num) => {
    if (count === 25) {
      let newArr = list;
      if (!newArr[num - 1].not) {
        newArr[num - 1].not = true;
      }
      setList([...newArr]);
    } else {
      let newArr = list;
      if (!newArr[num - 1].value) {
        let virtualCount = count + 1;
        setCount(virtualCount);
        newArr[num - 1].value = virtualCount;
      }
      setList([...newArr]);
    }
  };

  return (
    <div className="root">
      <div className="AppWrap">
        <h1>
          <span className={winLen > 0 ? "line" : ""}>B</span>
          <span className={winLen > 1 ? "line" : ""}>I</span>
          <span className={winLen > 2 ? "line" : ""}>N</span>
          <span className={winLen > 3 ? "line" : ""}>G</span>
          <span className={winLen > 4 ? "line" : ""}>O</span>
        </h1>
        <div className="list">
          {list &&
            list.map((item, i) => (
              <div
                key={i}
                className={item.not && item.not ? "disabled" : ""}
                onClick={() => setHTML(item.num)}
              >
                {item.value} {item.not}
              </div>
            ))}
          {winLen > 4 ? <div className="overlay">You Won</div> : null}
        </div>
        <div className="btn-wrap">
          <button
            onClick={() => randomNumber()}
            className="btn btn-sm btn-dark"
          >
            Random
          </button>{" "}
          &nbsp;
          <button
            onClick={() => resetBingo()}
            className="btn btn-sm btn-danger"
          >
            Reset
          </button>
        </div>
        <span>Pending Number Count : {count == "25" ? pending : null}</span>
      </div>
    </div>
  );
}
