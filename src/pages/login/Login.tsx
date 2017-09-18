import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import AppMenu from '../../components/AppMenu';
import { ActionDispatcher } from './Container';
import { ILoginState } from './module';

/**
 * LoginProps IF
 */
export interface ILoginProps {
  value: ILoginState;
  actions: ActionDispatcher;
}

/**
 * Loginの親Component
 */
export default class Login extends React.PureComponent<ILoginProps, {}> {

  /**
   * @param {ITodoProps} props
   */
  constructor(props: ILoginProps) {
    super(props);
  }

  /**
   * @returns {any}
   */
  public render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppMenu />
          <p>ログイン</p>
        </div>
      </MuiThemeProvider>
    );
  }
}