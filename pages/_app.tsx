import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./../src/settings";

export default class MyApp extends App {
    componentDidMount() {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            if (jssStyles.parentElement) {
                jssStyles.parentElement.removeChild(jssStyles);
            }
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <React.Fragment>
                <Head>
                    <title>My page</title>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </React.Fragment>
        );
    }
}
