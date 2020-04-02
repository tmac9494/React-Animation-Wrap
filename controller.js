import easing from './easing'

class Animation {
  constructor(settings) {
    const options = settings[3] || {};
    this.prevRuntime = 0;
    this.prevDuration = 0;
    this.property = settings.property || settings[0];
    this.schedule = settings.schedule || settings[1];
    this.nextUpdate = settings.from || this.schedule[0];
    this.lastUpdate = settings.from || this.schedule[0];
    this.duration = settings.duration || settings[2];
    this.easing = settings.easing || options.easing || 'easeInOut';
    this.delay = settings.delay || options.delay || 0;
    this.running = true;
    this.schedule = settings.schedule || settings[1];
    this.step = 0;
    this.running = true;
    this.valueMap = settings.valueMap || options.valueMap;
    this.value = function() {
      return({
        [this.property] : this.valueMap
        ? this.valueMap.replace('$v', this.nextUpdate) : this.nextUpdate,
      })
    }
    this.updated = function() {
      this.lastUpdate = this.nextUpdate;
    }
    this.initialize();
  }

  initialize() {
    this.animationStatus = {};
    const scheduleKeys = Object.keys(this.schedule);
    scheduleKeys.forEach((percent, i) => {
      if (scheduleKeys[i + 1]) {
        this.animationStatus['step' + i] = {
          at: percent / 100,
          from: this.schedule[percent],
          to: this.schedule[scheduleKeys[i + 1]],
          duration: (scheduleKeys[i + 1] / 100) * this.duration,
          completed: false
        }
      }
    })
  }

  logic(runtime) {
    const thisStep = this.animationStatus['step' + this.step];
    const nextStep = this.animationStatus['step' + (this.step + 1)];
    const duration = thisStep.duration - this.prevDuration;
    let calcRuntime = runtime - this.delay;
    if (runtime >= this.delay) {
      const progress = easing[this.easing](
        Math.min((calcRuntime - this.prevRuntime) / duration, 1)
      );
      const distance = thisStep.from > thisStep.to
      ? thisStep.from - thisStep.to
      : thisStep.to - thisStep.from;
      const currentDistance = distance * progress;
      const progression = thisStep.from > thisStep.to
      ? thisStep.from - currentDistance
      : thisStep.from + currentDistance;
      this.nextUpdate = progression.toFixed(2);
      if (thisStep.duration <= calcRuntime && nextStep) {
        this.step++;
        thisStep.completed = calcRuntime;
        this.prevRuntime = calcRuntime;
        this.prevDuration = thisStep.duration;
      } else if (thisStep.duration <= calcRuntime) {
        this.step++;
        this.running = false;
        this.nextUpdate = thisStep.to;
        thisStep.completed = calcRuntime;
        this.prevRuntime = calcRuntime;
        this.prevDuration = thisStep.duration;
      }
    }
  }
}

const AnimationHandler = (anObj) => {
  return(new Animation(anObj));
}

export default AnimationHandler;
