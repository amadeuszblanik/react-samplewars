import React from "react";
import { Loading } from "../src/components";
import { SwApi } from "../src/dao";
import { ResultListResponse } from "../src/dto";
import { hoursDiff } from "../src/utils";
import Welcome from "../src/modules/Welcome";

interface HomeState {
  fetching: boolean;
  error?: string;
}

// This app uses SSR-rendering, and data from API is stored on client-side in localStorage.
// So it's better to use class component here and starts fetching after component did mount.
//

class Home extends React.Component<{}, HomeState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      fetching: true,
    };
  }

  async componentDidMount() {
    if (this.checkCachedData()) {
      return;
    }

    const apiData: ResultListResponse | boolean = await this.fetchData();

    if (!apiData) {
      this.setState({ error: "Something went wrong during downloading data from API. Please try again." });
      return;
    }

    localStorage.setItem("apiDataSaved", JSON.stringify(apiData));
    localStorage.setItem("apiDataSavedTimestamp", String(new Date().getTime()));
  }

  checkCachedData = () => {
    const timeOfCachedData = Number(localStorage.getItem("apiDataSavedTimestamp"));
    const cachedData = localStorage.getItem("apiDataSaved");
    const currentDate = new Date();
    const validCacheDate = !isNaN(timeOfCachedData) ? hoursDiff(timeOfCachedData, currentDate) <= 8 : false;

    if (!validCacheDate || !cachedData) {
      return false;
    }

    this.setState({ fetching: false });
    return true;
  };

  fetchData = async () => {
    try {
      const { resultList: apiData } = await new SwApi().getResults();
      this.setState({
        fetching: false,
      });
      return apiData;
    } catch (err) {
      console.error("An error has occured", { err });
      this.setState({
        error: "Can't connect to SWAPI. Please try again later",
      });
      return false;
    }
  };

  render() {
    const { fetching, error } = this.state;

    if (error) {
      return <Loading content={error} />;
    }
    return <Welcome canPlay={!fetching} />;
  }
}

export default Home;
