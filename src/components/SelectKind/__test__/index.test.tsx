/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";

import SelectKind, {SelectKindProps} from "./../index";

const __SELECTKIND__: SelectKindProps = {
    list: ["people", "starships"]
};

describe("SelectKind", () => {
    it("renders selectkind title", () => {
        const detail = shallow(<SelectKind {...__SELECTKIND__} />);
        expect(detail.find("#select-kind_label").text()).toEqual("Select kind of battle");
    });

    it("renders selectkind correct equipment list item", () => {
        const detail = shallow(<SelectKind {...__SELECTKIND__} />);
        expect(
            detail
                .children()
                .find("#select-kind_select")
                .childAt(1)
                .text()
        ).toEqual("starships");
    });
});
