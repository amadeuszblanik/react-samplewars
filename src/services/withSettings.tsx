import React from "react";
import { Settings, settingsStore } from "./settings";
import { Subscription } from "rxjs";

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
