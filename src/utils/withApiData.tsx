import React from "react";
import { ResultListResponse } from "../dto";
import { Loading } from "../components";

export interface InjectedWithApiData {
  apiData: ResultListResponse;
  apiStatus: boolean;
}

export interface WithApiDataProps {
  apiData: ResultListResponse | false;
  apiStatus: boolean;
}

export const withApiData = <P extends InjectedWithApiData>(Component: React.ComponentType<P>) =>
  class WithSettings extends React.PureComponent<Omit<P, keyof InjectedWithApiData>, WithApiDataProps> {
    constructor(props: Readonly<P & InjectedWithApiData>) {
      super(props);

      this.state = {
        apiData: false,
        apiStatus: true,
      };
    }

    componentDidMount() {
      const apiDataInLocalStorage = localStorage.getItem("apiDataSaved");

      if (!apiDataInLocalStorage) {
        this.setState({ apiStatus: false });
        return;
      }

      this.setState({
        apiData: JSON.parse(apiDataInLocalStorage),
      });
    }

    render() {
      const { ...props } = this.props;
      const { apiData, apiStatus } = this.state;

      if (!apiStatus || !apiData) {
        return <Loading content={!apiStatus ? "You need to reinitialise application" : "Loading…"} />;
      }

      return <Component apiData={apiData} {...(props as P)} />;
    }
  };
