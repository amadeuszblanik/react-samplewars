/* eslint-env jest */
import React from "react";
import {shallow} from "enzyme";

import SelectPlayer, {SelectPlayerProps} from "./../index";
import {data} from "../__mock__";

const __SELECTPLATER__: SelectPlayerProps = {
    type: "player",
    data,
    initialValue: 1,
    kind: "people"
};

describe("SelectPlayer", () => {
    it("renders selectplayer title", () => {
        const detail = shallow(<SelectPlayer {...__SELECTPLATER__} />);
        expect(detail.find("#select-player-label_player").text()).toEqual("Select character for player");
    });

    it("renders selectplayer correct equipment list item", () => {
        const detail = shallow(<SelectPlayer {...__SELECTPLATER__} />);
        console.log(detail
            .children()
            .find("#select-player_player"));
        expect(
            detail
                .children()
                .find("#select-player_player")
                .childAt(1)
                .text()
        ).toEqual("Luke Skywalker");
    });
});