import { selectIsSignedIn } from './session.selectors';
import { AppState } from '../app.state';
import { SignStatus } from './session.reducer';

describe('Session selectors', () => {
  const initialState: Pick<AppState, 'session'> = {
    session: {
      signStatus: SignStatus.prestine,
    },
  };

  it('should not be signed in', () => {
    let result = selectIsSignedIn.projector(initialState.session);
    expect(result).toEqual(false);
    result = selectIsSignedIn.projector({
      ...initialState.session,
      signStatus: SignStatus.unauthenticated,
    });
    expect(result).toEqual(false);
  });

  it('should be signed in', () => {
    const result = selectIsSignedIn.projector({
      ...initialState.session,
      signStatus: SignStatus.authenticated,
    });
    expect(result).toEqual(true);
  });
});
