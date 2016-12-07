import * as Immutable from 'immutable';

const immutableState = Immutable.Map({
  fetching: false,
  data: Immutable.Map({})
})

const reducers = (state = immutableState, action) => {
  switch (action.type) {
    case "STARTING_REQUEST":
      return state.set("fetching", true);
    case "FINISHED_REQUEST":
      return state.set("fetching", false).set("data", Immutable.Map(action.response.data.goldberg));
    default:
      return state
  }
}

export default reducers;