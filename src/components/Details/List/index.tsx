import React from "react";
import {Typography} from "@material-ui/core";
import {TRANSLATIONS} from "./translations";
import {DATA} from "../types";
import {SORT_VALUES} from "./sortValues";

interface ListProps {
    items: DATA;
}

const List: React.FunctionComponent<ListProps> = props => {
    const { items }  = props;
    const children: JSX.Element[] = Object.keys(items)
        .sort((keyA, keyB) => {
            return SORT_VALUES[keyA] - SORT_VALUES[keyB];
        })
        .filter(key => {
            if (key === "name") {
                return false;
            }

            return true;
        })
        .map(key => {
            return (
                <div key={key}>
                    <Typography color="textSecondary">
                        {TRANSLATIONS[key]}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {items[key as keyof DATA]}
                    </Typography>
                </div>
            );
        });

    return <>{children}</>;
};

export default List;
