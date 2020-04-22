import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import {
  addResult,
  decResult,
  customChange,
  thunkCustomChange
} from "../../redux/actions/demoActions";

const Counter = () => {
  const dispatch = useDispatch();
  const [customState, setCustomState] = useState(0);

  const resultState = useSelector(
    state => state.demoReducer.result,
    shallowEqual
  );

  const handleSubmit = () => {
    dispatch(thunkCustomChange(customState));
  };

  return (
    <Container maxWidth="sm">
      <h1>Counter</h1>

      <div>
        <h2>RESULT: {resultState}</h2>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(addResult())}
          >
            +
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(decResult())}
          >
            -
          </Button>
        </div>
        <div>
          <input
            type="number"
            value={customState}
            onChange={e => setCustomState(Number(e.target.value))}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Send
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Counter;
