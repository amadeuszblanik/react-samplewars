import React from "react";
import { Controls, Details, SelectCharacter, TopBar } from "../../components";
import { Container, Grid } from "@material-ui/core";
import { Main } from "../../layout";
import { withApiData } from "../../utils";
import { InjectedWithApiData } from "../../utils/withApiData";
import { KIND } from "../../dto";

interface GamecoreProps extends InjectedWithApiData {
  kind: KIND;
}

const Game: React.FunctionComponent<GamecoreProps> = props => {
  const { kind, apiData } = props;

  return (
    <Main>
      <TopBar />
      <Container>
        <Controls kind={kind} data={apiData} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SelectCharacter type="player" data={apiData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectCharacter type="opponent" data={apiData} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Details type="player" data={apiData} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Details type="opponent" data={apiData} />
          </Grid>
        </Grid>
      </Container>
    </Main>
  );
};

export default withApiData(Game);
