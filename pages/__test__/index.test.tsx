/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";

import Home from "../index";

describe("Home", () => {
    it("renders the home page with correct user agent", () => {
        const wrapper = shallow(
            <Home
                userAgent="jest-tests"
            />
        );
        expect(
            wrapper
                .find("main")
                .find("span")
                .text()
        ).toEqual("jest-tests");
    });
});
