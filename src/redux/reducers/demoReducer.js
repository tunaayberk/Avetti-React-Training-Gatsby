import { ADD_ACTION, DEC_ACTION, CUSTOM_CHANGE } from "../types.js";

const initialState = {
  result: 1,
  test: "TEST",
  object1: {
    object2: {
      object3: {
        variable: "test",
        result: 1
      },
      var: 2,
      test: 3
    },
    testvar: "test"
  }
};

const mainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ACTION:
      return {
        ...state,
        result: state.result + 1,
        object1: {
          ...state.object1,
          object2: {
            ...state.object1.object2,
            object3: {
              ...state.object1.object2.object3,
              result: state.object1.object2.object3.result + 1
            }
          }
        }
      };
    case DEC_ACTION:
      return {
        ...state,
        result: state.result - 1,
        object1: {
          ...state.object1,
          object2: {
            ...state.object1.object2,
            object3: {
              ...state.object1.object2.object3,
              result: state.object1.object2.object3.result - 1
            }
          }
        }
      };
    case CUSTOM_CHANGE:
      return {
        ...state,
        result: state.result + payload
      };
    default:
      return state;
  }
};

export default mainReducer;
