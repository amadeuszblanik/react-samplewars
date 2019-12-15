/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";

import { data } from "../__mock__";
import { SelectCharacter, SelectCharacterProps } from "../index";
import { Settings } from "../../../services/settings";

const settings: Settings = {
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
};

const __SELECTCHARACTER__: SelectCharacterProps = {
  type: "player",
  data,
  settings,
};

describe("SelectPlayer", () => {
  it("renders SelectCharacter title", () => {
    const component = shallow(<SelectCharacter {...__SELECTCHARACTER__} />);
    expect(component.find("#select-character-label_player").text()).toEqual("Select character of player");
  });

  it("renders selectplayer correct equipment list item", () => {
    const component = shallow(<SelectCharacter {...__SELECTCHARACTER__} />);
    expect(
      component
        .children()
        .find("#select-character_player")
        .childAt(1)
        .text(),
    ).toEqual("Luke Skywalker");
  });
});
