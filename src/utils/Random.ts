import { nanoid } from 'nanoid';

export class Random {
  makeDefaultNickname() {
    return nanoid(20);
  }

  makeRand6Num() {
    const randNum = Math.floor(Math.random() * 1000000);

    if (String(randNum).length < 6) {
      return String(randNum + 100000);
    }

    return String(randNum);
  }
}
