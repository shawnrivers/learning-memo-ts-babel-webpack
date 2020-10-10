import { A } from '@components/A';
import { AtomOne } from '@components/atoms/AtomOne';
import { add } from './utils/math';

export class C {
  private x = 10;
  getX = () => this.x;
  setX = (newVal: number) => {
    this.x = newVal;
  };
}

export let x = new C();
export let y = { ...{ some: 'value' } };

const a = A();

console.log('x:', x.getX());
console.log('a:', a);
console.log('AtomOne:', AtomOne);
console.log('1 + 2 =', add(1, 2));
