import { catchAsync } from '../../../shared/utils/catchAsync';

describe('TEST shared/utils/catchAsync', () => {
  it('should call wrapped function', async () => {
    const req = {} as any;
    const res = {} as any;
    const next = jest.fn();
    const fn = jest.fn().mockResolvedValue(undefined);
    const wrapped = catchAsync(fn);

    wrapped(req, res, next);

    await Promise.resolve();

    expect(fn).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it('should pass rejected error to next', async () => {
    const req = {} as any;
    const res = {} as any;
    const next = jest.fn();
    const error = new Error('Something went wrong');
    const fn = jest.fn().mockRejectedValue(error);
    const wrapped = catchAsync(fn);

    wrapped(req, res, next);

    await Promise.resolve();

    expect(next).toHaveBeenCalledWith(error);
  });
});
