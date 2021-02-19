function CounterReducer(state, action) {

    if (typeof state === 'undefined') {
      return {count : 0};
    }

    switch (action.type) {
      case 'INCREMENT':
        return {...state, count: state.count + 1}
      default:
        return state
    }

  }

export { CounterReducer };