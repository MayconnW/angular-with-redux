import { IAuth } from 'src/app/domain/session/i-auth';
import { Auth as FakeAuth } from 'src/app/infrastructure/fake/session/auth-facade';
import { Auth as Auth } from 'src/app/infrastructure/real/session/auth-facade';

const env = 'fake'; //process.env.NODE_ENV

const authProvider = {
  provide: IAuth, // or string token 'AppService'
  useClass: env === 'fake' ? FakeAuth : Auth,
};

export const providers = [authProvider];
