import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal'

type FunctionParam = () => any;
type DependencyArray = any[];

/**
 * Provides a deep-comparison version of useEffect,
 *   allowing the use of collections or objects as
 *   useEffect dependencies
 * @param {FunctionParam} fn
 * @param {DependencyArray} deps
 * @returns {void}
 */
export const useDeepEffect = (fn: FunctionParam, deps: DependencyArray): void => {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isFirstEffect = isFirst.current;
    const isSame = prevDeps.current.every((obj, index) =>
      isEqual(obj, deps[index])
    );

    isFirst.current = false;
    prevDeps.current = deps;

    if (isFirstEffect || !isSame) {
      return fn();
    }
  }, deps);
}
