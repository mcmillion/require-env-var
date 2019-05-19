import envRequire from '../';

describe('envRequire', () => {
  afterEach(() => {
    delete process.env.TEST_VARIABLE;
    delete process.env.BACKUP_VARIABLE;
    delete process.env.ANOTHER_ONE;
  });

  describe('single key', () => {
    it('returns an environment variable when it exists', () => {
      process.env.TEST_VARIABLE = 'test';
      expect(envRequire('TEST_VARIABLE')).toEqual('test');
    });

    it('throws an error when an environment variable is not set', () => {
      expect(() => {
        envRequire('TEST_VARIABLE');
      }).toThrow(new Error('Required environment variable [TEST_VARIABLE] is not set!'));
    });
  });

  describe('multiple keys', () => {
    it('returns the first environment variable found', () => {
      process.env.TEST_VARIABLE = 'test';
      process.env.BACKUP_VARIABLE = 'backup';
      expect(envRequire(['TEST_VARIABLE', 'BACKUP_VARIABLE'])).toEqual('test');
    });

    it('returns a backup environment variable when passed', () => {
      process.env.BACKUP_VARIABLE = 'backup';
      expect(envRequire(['TEST_VARIABLE', 'BACKUP_VARIABLE'])).toEqual('backup');
    });

    it('throws an error when backup environment variable is not set', async () => {
      expect(() => {
        envRequire(['TEST_VARIABLE', 'BACKUP_VARIABLE', 'ANOTHER_ONE']);
      }).toThrow(
        new Error(
          'Required environment variable [TEST_VARIABLE or BACKUP_VARIABLE or ANOTHER_ONE] is not set!'
        )
      );
    });
  });

  describe('fallback value', () => {
    it('returns an environment variable when it exists', () => {
      process.env.TEST_VARIABLE = 'test';
      expect(envRequire('TEST_VARIABLE')).toEqual('test');
    });

    it('returns the fallback if the environment variable is not set', () => {
      expect(envRequire('TEST_VARIABLE', 'fallback')).toEqual('fallback');
    });
  });

  describe('multiple keys with fallback', () => {
    it('returns a backup environment variable when passed', () => {
      process.env.BACKUP_VARIABLE = 'backup';
      expect(envRequire(['TEST_VARIABLE', 'BACKUP_VARIABLE'])).toEqual('backup');
    });

    it('returns the fallback if the environment variables are not set', () => {
      expect(envRequire(['TEST_VARIABLE', 'BACKUP_VARIABLE'], 'fallback')).toEqual('fallback');
    });
  });
});
