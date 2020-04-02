import React, {useRef} from 'react';
import AnimationWrap from './index';


const InOutAnimation = props => {
  const hasAnimated = useRef(false);
  const animation = props.animation || {};
  const inAnimation = animation.in;
  const outAnimation = animation.out;
  if (props.condition && !hasAnimated.current) hasAnimated.current = true
  else if (props.alwaysRender) hasAnimated.current = true;
  return(
    hasAnimated.current && props.animation !== null
      ? <AnimationWrap
          key={props.condition ? 'anim-in' : 'anim-out'}
          animation={props.condition ? inAnimation : outAnimation}
          wrapStyles={props.wrapStyles}
          callback={props.callback}
          fixedTransform={props.fixedTransform}
          id={props.id}
          svg={props.svg}
        >
          {props.children}
        </AnimationWrap>
      : null

  );
}

export default InOutAnimation;
