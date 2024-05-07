import { useSelector, useDispatch  } from 'react-redux';
import { useState } from 'react'
import { increment, decrement, reset, incrementByAmount } from '.'; // Import your action creators here

export const Counter = () => {
    const count = useSelector((state: { counter: { count: number } }) => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementByAmount] = useState(0)
    const resetAll = () => {
        setIncrementByAmount(0)
        dispatch(reset())
    }

    return (
        <>
            <section>
                <p>{count}</p>
                <div>
                    <button onClick={() => dispatch(increment())}>add</button>
                    <button onClick={() => dispatch(decrement())}>minus</button>
                    <input
                        type='number'
                        value={incrementAmount.toString()}
                        onChange={(e) => setIncrementByAmount(Number(e.target.value))}
                    />
                    <div>
                        <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>Add Amount</button>
                        <button onClick={resetAll}>Reset</button>
                    </div>
                </div>
            </section>
        </>
    );
};
