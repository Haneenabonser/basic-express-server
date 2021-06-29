'use strict';
const validatorMiddleware = require('../src/middleware/validator');

describe('Validator Middleware',()=>{

  let consoleSpy;
  const req = {
    query:{}
  };
  const res = {};
  const next = jest.fn()

  beforeEach(()=>{
    consoleSpy = jest.spyOn(console,'log').mockImplementation();
  })
  afterEach(()=>{
    consoleSpy.mockRestore();
  })

  it('logs name property if found',()=>{
    validatorMiddleware(req,res,next);
    req.query.name = 'haneen';
    expect(consoleSpy).toHaveBeenCalled()
  })
  it('moves to the next middleware',()=>{
    validatorMiddleware(req,res,next);
    expect(next).toHaveBeenCalledWith();
  })
});