import React from "react";
import { Main } from "../src/layout";
import styles from "./index.scss";
import { Container, Grid, Typography } from "@material-ui/core";
import { Controls, Details, TopBar, Loading, SelectCharacter } from "../src/components";
import { KIND, PeopleApi, ResultListResponse, ResultListResponseSingle, StarshipApi } from "../src/dto";
import { Subscription } from "rxjs";
import { settingsStore } from "../src/services";
import { Settings, SettingsCharacter } from "../src/services/settings";
import { getRandomNumber } from "../src/utils";

type RESULT_SCORE = "player" | "opponent" | "draw" | "unknown";

interface PlayProps {
  kind: KIND;
}

export interface Scoreboard {
  player: number;
  opponent: number;
}

interface PlayState {
  apiData: ResultListResponse | false;
  apiStatus: boolean;
  currentResult: RESULT_SCORE;
  characters: {
    player: SettingsCharacter;
    opponent: SettingsCharacter;
  };
  result: RESULT_SCORE;
  totalMatches: number;
  npc?: {
    player: boolean;
    opponent: boolean;
  };
}

interface HomeGetInitialProps {
  query: {
    kind: KIND;
  };
  req: any;
}

const CHARACTER_INNITIAL_VALUE: SettingsCharacter = {
  id: 0,
  points: NaN,
};

class Play extends React.Component<PlayProps, PlayState> {
  private scoreboard: Scoreboard = {
    player: 0,
    opponent: 0,
  };
  private settingsSubscriber: Subscription | undefined;

  constructor(props: PlayProps) {
    super(props);

    this.state = {
      apiData: false,
      apiStatus: true,
      currentResult: "draw",
      characters: {
        player: CHARACTER_INNITIAL_VALUE,
        opponent: CHARACTER_INNITIAL_VALUE,
      },
      result: "unknown",
      totalMatches: 0,
    };
  }

  static async getInitialProps({ query: { kind } }: HomeGetInitialProps) {
    return { kind };
  }

  componentDidMount() {
    const { kind } = this.props;
    this.settingsSubscriber = settingsStore.subscription().subscribe(this.handleSettingsSubscriber);
    const apiDataInLocalStorage = localStorage.getItem("apiDataSaved");

    settingsStore.setKind(kind);

    if (!apiDataInLocalStorage) {
      this.setState({ apiStatus: false });
      return;
    }

    this.setState({
      apiData: JSON.parse(apiDataInLocalStorage),
    });
  }

  componentWillUnmount() {
    if (this.settingsSubscriber === undefined) {
      return;
    }

    this.settingsSubscriber.unsubscribe();
  }

  handleSettingsSubscriber = (next: Settings) => {
    const characters = {
      player: next.player,
      opponent: next.opponent,
    };
    const npc = next.npc;

    this.setState({ characters, npc });
  };

  getCharacters = () => {
    const { npc } = this.state;
    const currentKindData = this.getCurrentKindData();
    const {
      characters: { player, opponent },
    } = this.state;

    if (npc && currentKindData) {
      if (npc.player) {
        player.id = getRandomNumber(1, currentKindData.list.length);
        player.points = this.getPointsOfId(player.id);
        settingsStore.setPlayer(player.id, player.points);
      }
      if (npc.opponent) {
        opponent.id = getRandomNumber(1, currentKindData.list.length);
        opponent.points = this.getPointsOfId(opponent.id);
        settingsStore.setOpponent(opponent.id, opponent.points);
      }
    }

    return { player, opponent };
  };

  getResult = () => {
    const {
      player: { points: valuePlayer },
      opponent: { points: valueOpponent },
    } = this.getCharacters();
    const isAnyNaN = isNaN(valuePlayer) || isNaN(valueOpponent);

    if (isAnyNaN) {
      return "unknown";
    }

    if (valuePlayer > valueOpponent) {
      this.increasePlayerScore(1);
      return "player";
    } else if (valuePlayer === valueOpponent) {
      this.increasePlayerScore(1);
      this.increaseOpponentScore(1);
      return "draw";
    } else if (valuePlayer < valueOpponent) {
      this.increaseOpponentScore(1);
      return "opponent";
    }
    return "unknown";
  };

  increasePlayerScore = (value: number) => {
    const { player } = this.scoreboard;
    this.scoreboard.player = player + value;
  };

  increaseOpponentScore = (value: number) => {
    const { opponent } = this.scoreboard;
    this.scoreboard.opponent = opponent + value;
  };

  getCurrentKindData = () => {
    const { kind } = this.props;
    const { apiData } = this.state;

    if (!apiData) {
      return undefined;
    }

    const dataKind: ResultListResponseSingle | undefined = apiData[kind];
    return dataKind;
  };

  getDetailsOfId = (id: number) => {
    const dataKind = this.getCurrentKindData();

    if (dataKind === undefined) {
      return undefined;
    }

    const dataOfId = dataKind.list[id];

    if (dataOfId === undefined) {
      return undefined;
    }

    return dataOfId.data;
  };

  getPointsOfId = (id: number) => {
    const data: PeopleApi | StarshipApi | undefined = this.getDetailsOfId(id);
    let points = NaN;

    if (data) {
      if ("mass" in data) {
        points = Number(data.mass);
      }
      if ("crew" in data) {
        points = Number(data.crew);
      }
    }

    return points;
  };

  setRandomCharacters = () => {
    const { npc } = this.state;

    if (!npc) {
      return;
    }

    const currentKindData = this.getCurrentKindData();

    if (!currentKindData) {
      return;
    }

    if (npc.player) {
      const id = getRandomNumber(1, currentKindData.list.length);
      const points = this.getPointsOfId(id);

      settingsStore.setPlayer(id, points);
    }
    if (npc.opponent) {
      const id = getRandomNumber(1, currentKindData.list.length);
      const points = this.getPointsOfId(id);

      settingsStore.setOpponent(id, points);
    }
  };

  handlePlay = () => {
    const { totalMatches } = this.state;
    this.setState({
      result: this.getResult(),
      totalMatches: totalMatches + 1,
    });
    this.forceUpdate();
  };

  handleReset = () => {
    this.setState({
      characters: {
        player: CHARACTER_INNITIAL_VALUE,
        opponent: CHARACTER_INNITIAL_VALUE,
      },
    });

    this.scoreboard = {
      player: 0,
      opponent: 0,
    };
  };

  render() {
    const { kind } = this.props;
    const {
      apiData,
      apiStatus,
      characters: {
        player: { id: id },
        opponent: { id: idOpponent },
      },
      result,
      totalMatches,
    } = this.state;

    if (!apiData) {
      return <Loading content={!apiStatus ? "You need to reinitialise application" : "Loading…"} />;
    }

    return (
      <Main>
        <TopBar />
        <Container>
          <Controls kind={kind} scoreboard={this.scoreboard} onPlay={this.handlePlay} onReset={this.handleReset} />
          <h1 className={styles.helloWorld}>
            {totalMatches > 0 ? `The winner is ${result}! 🎉` : "Select characters to start 👾"}
          </h1>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SelectCharacter type="player" data={apiData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectCharacter type="opponent" data={apiData} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Details title="player" data={this.getDetailsOfId(id)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Details title="opponent" data={this.getDetailsOfId(idOpponent)} />
            </Grid>
          </Grid>
          <a href="https://blanik.me">
            <Typography variant="body2" color="textSecondary" align="center">
              Amadeusz Blanik &copy; 2019
            </Typography>
          </a>
        </Container>
      </Main>
    );
  }
}

export default Play;
