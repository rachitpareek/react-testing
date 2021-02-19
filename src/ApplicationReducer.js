function ApplicationReducer(state, action) {

    if (typeof state === 'undefined') {
      return {count : 0};
    }

    switch (action.type) {
      case 'INCREMENT':
        return {count: state.count + 1}
      case 'DECREMENT':
        return {count: state.count - 1}
      default:
        return state
    }

  }

export { ApplicationReducer };