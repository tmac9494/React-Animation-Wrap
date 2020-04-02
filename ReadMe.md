# Animation Wrap
A component built to easily add complex animations that run using JavaScript styling instead of keyframe animations in css.  
The reason the component works and stays light weight is because all values that are animated are based on Numbers not strings.  
While this covers most use cases, it also limits some things as well for example, this component can not animate colors because colors are string based values at their core. In the future the component will be updated to allow for color animations based on rgb values but it has not been worked out yet.

*there are two components that are exported from these files, default(index.js): AnimationWrap, InOutAnimation.js: InOutAnimation.*
  
  
  
## How to build an Animation:

The values for the animation can be passed using named props but the easiest and most optimal way is to write them using arrays.
the animation prop accepts an *Array* of *Arrays*. This is done so that multiple style animations can be used in a single animation.(ex: opacity to fade in, and transform to rotate).

#### The animation array should follow this order:
1. css style property - *String*,
2. guide that tells the animation at what percent the value should be(similiar to keyframe animations) - *Object*.
3. duration(miliseconds) - *Number*
4. options(easing, transform value to plug the animation value into, delay) - *Object*

Example: so to create an animation that fades in the child components and rotates them 360 degrees over 1 second would look like:

normal:

    [
        ['opacity', {0: 0, 100: 1}, 1000],
        ['transform', {0: 0, 100: 360}, 1000, {valueMap: 'rotate($vdeg)'}]
    ]

explained:
    
    [
        [
            'opacity', --> targeting the opacity style property
            {
                0: 0, --> at 0% of the duration the value should be 0
                100: 1 --> at 100% of the duration the value should be 1
            }, 
            1000, --> duration of the animation
        ],
        [ 
            'transform', --> targeting the transform style property
            {
                0: 0, --> at 0% of the duration the value should be 0
                100: 360 --> at 100% of the duration the value should be 360
            },
            1000, --> duration of the animation
            {
                valueMap: 'rotate($vdeg)' --> option that tells the animation what part of the value the current animation value should be plugged into($v will be replaced with the current value in the animation)
            }
        ]
    ]
  
  
#### Options available to the option object:

easing - *String* - (Default=linear)    
options: linear, easeIn, easeOut, easeInOut

valueMap - *String*  
examples: 'rotate($vdeg)', '$vpx', '$v%', 'translateY($v%)'.  
A string that will tell the animation that wherever '$v' is in the string, it should be replaced with the current number value of the animation. used for transform properties, declaring pixels or percents, etc.

delay - *Number* - (Default=0)(miliseconds)  
the amount of time you want this part of the animation to delay before it begins.
  
  
  
  
  
  
  
## Required Props:

##### animation - *Array* of *Array*
details the animation.

for default AnimationWrap export:
    
    animation={[
        ['opacity', {0: 1, 100: 1}, 180]
        ['transform', {0: 100, 80: -10, 100: 0}, 320, {valueMap: 'translateY($v%)'}]
    ]}
    
for InOutAnimation exoprt:

    animation={{
        in: [
            ['transform', {0: 100, 100: 0}, 320, {valueMap: 'translateY($vpx)'}]
        ],
        out: [
            ['transform', {0: 0, 100: 100}, 320, {valueMap: 'translateY($vpx)'}]
        ]
    }}

#### condition - *Boolean* - ***ONLY REQUIRED IF USING InOutAnimation.js***  
tells the component whether to use the 'in' animation(true) or the 'out' animation(false).
    
    const [menuIsOpen, setMenuIsOpen] = useState(false);
        
    ...
    condition={menuIsOpen}
    ...
  
  
  
  
  
  
  
## Optional Props:

#### wrapStyles - *Object*
style object you would like to apply to the div that wraps the children.

    wrapStyles={{
        display: 'inline-block',
        background: 'red'
    }}
    
#### fixedTransform - *String*
A string of css transform values you would like to stick throughout the animation.
*Useful if you need to animate a transform property of an element that also uses the transform property for styling, position, etc.*

    fixedTransform='translate(-50%, -50%) scale(1.1)'
    
#### callback - *Function*
A function you would like to run when the animation is complete.

    callback={() => console.log('animation has finished') }.

#### id - *String*
A string with an id to apply to the wrapping div element.

#### svg - *Boolean*
Tells the wrap if you are animating parts of an svg.
*Instead of creating a <div/> element to wrap the children in, it will creat a <g/> element*

#### alwaysRender - *Boolean* - (Default=False) ***Only available to the InOutAnimation***
Tells the component whether is should always render the children(true) or only wait until the condition prop has been true atleast once(false).
  
  
  
  
  
  
  
## AnimationWrap(Default Export)
The index.js file and default export -  will take in just one animation that will run when the component mounts.

    import {AnimationWrap} from '../general/AnimationWrap';
    
    const Example = props => {
        
        const inlineAnimation = [['opacity', {0: 0, 100: 1}, 320]]
        
        return(
            <AnimationWrap
                animation={inlineAnimation}
                wrapStyles={{display: 'inline-block'}}
            >
                <div style={{width: '100px', height: '100px', background: '#000'}}></div>
            </AnimationWrap>
        )
    }
    
    export default Example;

*This creates an animation and wraps it around a black colored div that is 100px X 100px. The animation will run as soon as this mounts and will fade in the opacity from 0 to 1 in 320 miliseconds.*
  
  
  
  
  
  
  
  
## InOutAnimation
the InOutAnimation.js file - will take two animations and a condition, if the condition is true it will run the 'in' animation, if condition is false it will run the 'out' animation.

***You do not need to render this conditionally if you  dont want the 'in' animation to run on mount. it will only run after the condition in the props has been true atleast once.***
So if you want to hide a menu wrapped in an inOut animation then just render it with the condition false and only when it is true the first time will it begin animating based on the condition.
to change this behavior and force the children to always render, set the alwaysRender prop to true.

    import {InOutAnimation} from '../general/AnimationWrap/InOutAnimation';
    
    const Example = props => {
    
        const [animationCondition, setAnimationCondition] = useState(false);
        
        const inlineAnimation = {
            in: [['opacity', {0: 0, 100: 1}, 320]],
            out: [['opacity', {0: 1, 100: 0}, 320]]
        }
        
        const toggleCondition = () => setAnimationCondition(!animationCondition);
        
        return(
            <div>
                <InOutAnimation
                    condition={animationCondition}
                    animation={inlineAnimation}
                    wrapStyles={{display: 'inline-block'}}
                >
                    <div style={{width: '100px', height: '100px', background: '#000'}}></div>
                </InOutAnimation>
                <button onClick={toggleCondition}>
                    Click me to toggle animation
                <button>
            </div>
        )
    }
    
    export default Example;
    
*This example creates a 100px X 100px black box and wraps it with an inOut animation.*    
*The box will not appear on the page initially because the condition is false.*  
*When the button is clicked, it will toggle the boolean to true causing the children on the inOutAnimation to render and use the 'in' animation declared in inlineAnimation.*  
*When the button is click again, it will toggle the boolean to false causing the inOutAnimation to switch to the 'out' animation.*  

    



