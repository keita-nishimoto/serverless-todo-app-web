import {AxiosInstance} from "axios";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import HttpClientFactory from "../factories/HttpClientFactory";
import {ReduxAction, ReduxState} from "../store";
import {Counter} from "./Counter";
import {decrementAmount, fetchRequestFinish, fetchRequestStart, incrementAmount} from "./module";

export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void, private axiosInstance: AxiosInstance) {}

  public increment(amount: number): void {
    this.dispatch(incrementAmount(amount));
  }

  public decrement(amount: number): void {
    this.dispatch(decrementAmount(amount));
  }

  public async asyncIncrement(): Promise<void> {
    this.dispatch(fetchRequestStart());

    try {
      const axiosResponse = await this.axiosInstance.get("/api/count");

      if (axiosResponse.status !== 200) {
        throw new Error(`illegal status code: ${axiosResponse.status}`);
      }

      this.dispatch(
        incrementAmount(axiosResponse.data.amount),
      );

    } catch (error) {
      console.error(error);
    } finally {
      this.dispatch(fetchRequestFinish());
    }
  }
}

const axiosInstance = HttpClientFactory.create();

const mapStateToProps    = (state: ReduxState) => ({value: state.counter});
const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>, ownProps: RouteComponentProps<{myParams: string}>) => {
  return {actions: new ActionDispatcher(dispatch, axiosInstance)};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
