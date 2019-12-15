import React, {useEffect} from "react";
import styled from "styled-components";
import {Controls, Details, Footer, ScoreboardComponent, SelectCharacter, SelectKind, TopBar} from "../../components";
import { Container, Grid } from "@material-ui/core";
import { Main } from "../../layout";
import { getDataOfKind, withApiData } from "../../utils";
import { InjectedWithApiData } from "../../utils/withApiData";
import { KIND } from "../../dto";
import Result from "../../components/Result";
import {settingsStore} from "../../services";

interface GamecoreProps extends InjectedWithApiData {
  kind: KIND;
}

const Row = styled(Grid)`
  padding-top: 24px;
`;

const Col = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Game: React.FunctionComponent<GamecoreProps> = props => {
  const { kind, apiData } = props;
  const dataCurrentKind = getDataOfKind(apiData, kind);

  useEffect(() => {
    settingsStore.setKind(kind);
  })

  return (
    <Main>
      <TopBar />
      <Container>
        <Row container spacing={3}>
          <Col item xs={4} md={4}>
            <Controls data={dataCurrentKind} />
          </Col>
          <Col item xs={8} md={4}>
            <ScoreboardComponent />
          </Col>
          <Col item xs={12} md={4}>
            <SelectKind />
          </Col>
        </Row>
        <Result />
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
      <Footer variant="secondary" />
    </Main>
  );
};

export default withApiData(Game);
