import React from "react";
import { Subscription } from "rxjs";
import { settingsStore } from "./settings";
import { Settings } from "./types";

export interface InjectedWithSettingsProps {
  settings: Settings;
}

interface WithSettingsState {
  settings: Settings;
}

export const withSettings = <P extends InjectedWithSettingsProps>(Component: React.ComponentType<P>) =>
  class WithSettings extends React.PureComponent<Omit<P, keyof InjectedWithSettingsProps>, WithSettingsState> {
    private settingsSubscriber: Subscription | undefined;

    constructor(props: Readonly<P & InjectedWithSettingsProps>) {
      super(props);

      this.state = {
        settings: {
          kind: "people",
          player: {
            id: 0,
            points: NaN,
          },
          opponent: {
            id: 0,
            points: NaN,
          },
          npc: {
            player: true,
            opponent: true,
          },
          result: "unknown",
          scoreboard: {
            player: 0,
            opponent: 0,
          },
          totalMatches: 0,
        },
      };
    }

    componentDidMount() {
      this.settingsSubscriber = settingsStore.subscription().subscribe(this.handleSettingsSubscriber);
    }

    componentWillUnmount() {
      if (this.settingsSubscriber === undefined) {
        return;
      }

      this.settingsSubscriber.unsubscribe();
    }

    handleSettingsSubscriber = (next: Settings) => {
      this.setState({ settings: next });
    };

    render() {
      const { ...props } = this.props;
      const { settings } = this.state;

      return <Component settings={settings} {...(props as P)} />;
    }
  };
