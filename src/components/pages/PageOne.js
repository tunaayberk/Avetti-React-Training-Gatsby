import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const PageOne = props => {
  console.log("PROPS", props);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1>Page One</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et
          tellus nec enim suscipit pulvinar. Sed pulvinar auctor sodales. Sed
          sit amet ex eget nunc maximus pulvinar sit amet vitae risus. Morbi
          condimentum est quis porta luctus. Proin sit amet molestie dolor,
          vitae cursus libero. Sed tortor nulla, viverra ut convallis et,
          malesuada in lorem. Aliquam ut justo a odio aliquet malesuada
          condimentum ut odio. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Etiam pellentesque dui tellus, congue sollicitudin
          quam gravida vel. Vivamus blandit facilisis erat, sit amet euismod
          elit suscipit at.
        </p>
      </Container>
    </React.Fragment>
  );
};

export default PageOne;
