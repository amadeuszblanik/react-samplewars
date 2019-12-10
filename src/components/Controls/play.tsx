import React from "react";
import {Button} from "@material-ui/core";
import {Subscription} from "rxjs";
import {settingsStore} from "../../services";
import {Settings} from "../../services/settings";
import {Link} from "../index";

interface PlayState {
    url: {
        href: string;
        as: string;
    };
}

export class Play extends React.PureComponent<{}, PlayState> {
    private settingsSubscriber: Subscription | undefined;

    static defaultProps = {
        list: ["people", "starships"]
    }

    constructor(props: {}) {
        super(props);

        this.state = { url: { href: "", as: "" } };
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
        this.setState({
            url: {
                href: `/play?kind=${next.kind}&id=${next.player}&idOpponent=${next.opponent}`,
                as: `/play/${next.kind}/${next.player}/${next.opponent}`
            }
        });
    }

    render() {
        const { url } = this.state;
        return (
            <Link href={url.href} as={url.as}>
                <Button variant="contained" color="secondary">
                        New battle ⚔️
                </Button>
            </Link>
        );
    }
}
