import { getCounterAction, incrementCounterAction } from "../actions/counter";
import {
  useCallback,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
export default function useIncrement() {
  const [isPending, startTransition] = useTransition();
  const [counter, setCounter] = useState(-1);

  const [optimisticCounter, incrementOptimisticCounter] = useOptimistic(
    counter,
    (state, value: number) => {
      return state + value;
    },
  );
  useEffect(() => {
    getCounterAction().then((data) => setCounter(data));
  }, []);

  const incrementAction = useCallback(() => {
    if (isPending) return;
    startTransition(async () => {
      incrementOptimisticCounter(1);
      incrementCounterAction().then((data) => setCounter(data));
    });
  }, [incrementOptimisticCounter, isPending]);

  return { optimisticCounter, incrementAction };
}
