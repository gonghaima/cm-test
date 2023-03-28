import { processUserData } from '../../src/services';
import {
  userData,
  userDataWithEmptyPayload,
  expectedResult,
  expectedResultWithEmptyPayload,
} from '../../__mock__/index';

describe('user service', () => {
  it('should process user data as expected', () => {
    const processedData = processUserData(userData);
    expect(processedData).toEqual(expectedResult);
  });

  it('should handle user data with empty payload', () => {
    const processedData = processUserData(userDataWithEmptyPayload);
    expect(processedData).toEqual(expectedResultWithEmptyPayload);
  });
});
