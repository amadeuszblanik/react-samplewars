import React from "react";
import styled from "styled-components";
import { withSettings } from "../../services";
import { InjectedWithSettingsProps } from "../../services/withSettings";
import { Typography } from "@material-ui/core";
import { TRANSLATIONS } from "./translations";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
`;

const Result: React.FunctionComponent<InjectedWithSettingsProps> = ({ settings: { result, totalMatches } }) => (
  <Wrapper>
    <Typography variant="h4" gutterBottom>
      {TRANSLATIONS[totalMatches > 0 ? result : "initial"]}
    </Typography>
  </Wrapper>
);

export default withSettings(Result);
