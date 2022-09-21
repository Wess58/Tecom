import { FirstNamePipe } from './first-name.pipe';

describe('FirstNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstNamePipe();
    expect(pipe).toBeTruthy();
  });
});
