import React from "react";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

export class Main extends React.PureComponent<LayoutProps> {
  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}
