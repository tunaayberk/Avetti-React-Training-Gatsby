import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { I18nContext } from "../../i18n/index";
import LanguageChanger from "../../i18n/components/LanguageChanger";

const Home = props => {
  const {
    dispatchAvetti,
    langCode,
    langName,
    currency,
    convertionRate
  } = useContext(I18nContext);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1>This is Home Page</h1>
        <LanguageChanger />
        <h3
          onClick={() => dispatchAvetti({ type: "testType" })}
          style={{ cursor: "pointer" }}
        >
          {langCode} / {langName}
        </h3>
        <h4>
          {currency} / {convertionRate}
        </h4>
      </Container>
    </React.Fragment>
  );
};

export default Home;
