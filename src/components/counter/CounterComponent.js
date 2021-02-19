import { useSelector, useDispatch } from 'react-redux';

const CounterComponent = () => {

    const selectCount = state => state.count;

    var count = useSelector(selectCount);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch({ type: 'INCREMENT' });
    }

    return (
        <div>
            <h3>This tab is a Redux demo using hooks.</h3>
            <button className="btn btn-primary my-3" onClick={handleClick}>Click Me!</button>
            <hr></hr>
            Clicks: {count}
        </div>
    );
}

export default CounterComponent;