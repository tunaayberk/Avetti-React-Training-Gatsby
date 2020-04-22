import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const PageTwo = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1>Page Two</h1>
        <p>
          Vestibulum sollicitudin odio sed nisl consectetur, sit amet blandit
          lorem dapibus. Integer vel pulvinar dui. Duis nec faucibus lorem, non
          convallis sapien. Quisque vitae nisi ex. Mauris dictum consequat ipsum
          sit amet auctor. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam malesuada non justo quis sagittis. Morbi eu posuere enim. Donec
          sed nisl et risus eleifend congue et in orci. Maecenas orci diam,
          viverra sed mattis at, ullamcorper sed ex. Ut nisi augue, sagittis
          vitae sollicitudin non, iaculis aliquet est. Suspendisse efficitur
          arcu in ligula pulvinar, in venenatis mi tincidunt. Etiam vulputate
          tempor magna eget euismod. Quisque accumsan facilisis elit, quis
          mollis nibh euismod eget. Nullam eleifend vitae risus in venenatis.
        </p>
      </Container>
    </React.Fragment>
  );
};

export default PageTwo;
