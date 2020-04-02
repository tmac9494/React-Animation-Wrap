import React, {useState, useLayoutEffect, useRef} from 'react';
import AnimationHandler from './controller';

const AnimationWrap = props => {
  const hasMounted = useRef(false);
  const cbCalled = useRef(false);
  const [animationValue, setAnimationValue] = useState(null);
  const animationHandlers = useRef(props.animation.map(anObj =>
    AnimationHandler(anObj)
  ));
  const initialStyles = () => {
    let store = {}
    animationHandlers.current.forEach((animObj, i) => {
      store[animObj.property] = animObj.valueMap
      ? animObj.valueMap.replace('$v', animObj.schedule[0])
      : animObj.schedule[0];
    })
    if (props.fixedTransform && store.transform)
    store.transform += ' ' + props.fixedTransform;
    return store;
  }

  // check if animations have finished
  const stillRunning = () => {
    if (animationHandlers.current) {
      let value = false;
      animationHandlers.current.forEach(handler => {
        if (handler.running) value = true;
      })
      if (!value && props.callback && !cbCalled.current) {
        props.callback();
        cbCalled.current = true;
      }
      return value;
    }
  }

  let started = useRef(null);
  const animationRef = useRef(false);
  // anaimtion frame loop
  const handleRender = (timeStamp) => {
    if (hasMounted.current && stillRunning()) {
      if (!started.current) started.current = timeStamp;
      const runtime = timeStamp - started.current;
      let update = {};
      let setFixed = false;
      for (let i = 0;i < animationHandlers.current.length;i++) {
        const handler = animationHandlers.current[i];
        if (handler.running) handler.logic(runtime);

        // update = {...update, ...handler.value()}

        if (update.transform && handler.value().transform) {
          update.transform += ' ' + handler.value().transform
          // console.log(update.transform, handler.value())
        }
        else update = {...update, ...handler.value()};
        if (props.fixedTransform && update.transform && !setFixed) {
          update.transform += ' ' + props.fixedTransform;
          setFixed = true;
        }
        // if (update.transform) {
        //   console.log(update)
        // }
        handler.updated();
      }
      setAnimationValue(update);
    }
  }

  const prevAnimationValue = useRef(null);

  // check for animation value change
  const checkForChanges = () => {
    let result = false;
    if (prevAnimationValue.current === null && animationValue !== null)
      result = true;
    if (!result && animationValue !== null) {
      const prev = prevAnimationValue.current === null
      ? {...prevAnimationValue.current}
      : {};
      const oldValues = Object.values(prev);
      const newValues = Object.values(animationValue);
      oldValues.forEach((property, i) => {
        if (property !== newValues[i]) result = true;
      })
    }
    return result;
  }

  if (animationRef.current === false)
  animationRef.current = requestAnimationFrame(handleRender);

  if (checkForChanges() && stillRunning() && hasMounted.current)
  animationRef.current = requestAnimationFrame((timeStamp) => handleRender(timeStamp));

  // mount/unmount && animation setter/cleanup
  useLayoutEffect(() => {
    hasMounted.current = true;
    return(() => {
      cancelAnimationFrame(animationRef.current);
      hasMounted.current = false;
    })
  }, [])

  const Wrapper = React.createElement(
    props.svg ? 'g' : 'div',
    {
      style: {...initialStyles(), ...props.wrapStyles, ...animationValue},
      id: props.id,
    },
    props.children
  )

  // render
  return Wrapper;
}

export default AnimationWrap;
