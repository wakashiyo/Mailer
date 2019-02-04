const assert   = require('power-assert')

const s = require('../src/sample');
//import { grouping } from '../src/sample';

describe('sample.jsのテスト', () => {

  it('test of grouping', () => {
    const items = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    const num = 10;
    
    const result = s.grouping(items, num);
    //const result = grouping(items, num);
    
    assert.equal(result.length, 2);
  });
});