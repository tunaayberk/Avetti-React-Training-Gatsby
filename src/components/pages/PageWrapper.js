import React from "react";

import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";

const PageWrapper = ({ match }) => {
  const handleComponentRender = () => {
    switch (match.params.pageId) {
      case "1":
        return <PageOne />;
      case "2":
        return <PageTwo />;
      case "3":
        return <PageThree />;
      default:
        return <h1>404</h1>;
    }
  };

  return <div>{handleComponentRender()}</div>;
};

export default PageWrapper;
