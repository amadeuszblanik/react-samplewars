import React from "react";
import { Avatar, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { withSettings } from "../../services";
import { InjectedWithSettingsProps } from "../../services/withSettings";
import { blue, deepPurple } from "@material-ui/core/colors";
import styled from "styled-components";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scoreboard: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    player: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    opponent: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
    },
  }),
);

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (min-width: 520px) {
    flex-direction: row;
  }
`

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: 767px) {
    flex-direction: row;
  }
`;

const Scoreboard: React.FunctionComponent<InjectedWithSettingsProps> = props => {
  const classes = useStyles();
  const {
    settings: {
      scoreboard: { player, opponent },
      totalMatches,
    },
  } = props;

  return (
    <Row className={classes.scoreboard}>
      <Item>
        <Typography variant="body2" component="p" align="center">
          Player:
        </Typography>
        <Avatar className={classes.player}>{player}</Avatar>
      </Item>
      <Item>
        <Typography variant="body2" component="p" align="center">
          Opponent:
        </Typography>
        <Avatar className={classes.opponent}>{opponent}</Avatar>
      </Item>
      <Item>
        <Typography variant="body2" component="p" align="center">
          Matches:
        </Typography>
        <Avatar>{totalMatches}</Avatar>
      </Item>
    </Row>
  );
};

export default withSettings(Scoreboard);
