/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";

import Controls, {ControlsProps} from "./../index";

const __CONTROLS__: ControlsProps = {
    kind: "people",
    scoreboard: {
        player: 3,
        opponent: 0,
    },
    onPlay: () => { return; },
    onReset: () => {return; }
};

describe("Controls", () => {
    it("renders button play", () => {
        const detail = shallow(<Controls {...__CONTROLS__} />);
        expect(detail.find("#button_play").text()).toEqual("🔫 Battle");
    });

    it("renders button reset", () => {
        const detail = shallow(<Controls {...__CONTROLS__} />);
        expect(detail.find("#button_reset").text()).toEqual("Reset");
    });

    it("renders scoreboard player", () => {
        const detail = shallow(<Controls {...__CONTROLS__} />);
        expect(detail.find("#scoreboard_player").text()).toEqual("3");
    });

    it("renders scoreboard opponent", () => {
        const detail = shallow(<Controls {...__CONTROLS__} />);
        expect(detail.find("#scoreboard_opponent").text()).toEqual("0");
    });
});
