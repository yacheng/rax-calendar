import {createElement, Component, PropTypes} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Touchable from 'rax-touchable';
import './index.css';

export default class Day extends Component {
  static defaultProps = {
    customStyle: {},
  }

  static propTypes = {
    caption: PropTypes.any,
    customStyle: PropTypes.object,
    filler: PropTypes.bool,
    hasEvent: PropTypes.bool,
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onPress: PropTypes.func,
    usingEvents: PropTypes.bool,
  }

  dayCircleStyle = (isWeekend, isSelected, isToday) => {
    const { customStyle } = this.props;
    const dayCircleStyle = [customStyle.dayCircleFiller && customStyle.dayCircleFiller];
    let dayCircleClassName = 'dayCircleFiller';
    if (isSelected && !isToday) {
      dayCircleClassName += ' selectedDayCircle';
      dayCircleStyle.push(customStyle.selectedDayCircle && customStyle.selectedDayCircle);
    } else if (isSelected && isToday) {
      dayCircleClassName += ' currentDayCircle';
      dayCircleStyle.push(customStyle.currentDayCircle && customStyle.currentDayCircle);
    }
    return {
      dayCircleStyle,
      dayCircleClassName
    };
  }

  dayTextStyle = (isWeekend, isSelected, isToday, isDisabled) => {
    const { customStyle } = this.props;
    const dayTextStyle = [customStyle.day];
    let dayTextClassName = 'day';
    if (isDisabled) {
      dayTextClassName += ' disabledDayText';
      dayTextStyle.push(customStyle.disabledDayText && customStyle.disabledDayText);
    } else if (isToday && !isSelected) {
      dayTextClassName += ' currentDayText';
      dayTextStyle.push(customStyle.currentDayText && customStyle.currentDayText);
    } else if (isToday || isSelected) {
      dayTextClassName += ' selectedDayText';
      dayTextStyle.push(customStyle.selectedDayText && customStyle.selectedDayText);
    } else if (isWeekend) {
      dayTextClassName += ' weekendDayText';
      dayTextStyle.push(customStyle.weekendDayText && customStyle.weekendDayText);
    }
    return {
      dayTextStyle,
      dayTextClassName
    };
  }

  render() {
    let { caption, customStyle } = this.props;
    const {
      filler,
      hasEvent,
      isWeekend,
      isSelected,
      isToday,
      isDisabled,
      usingEvents,
    } = this.props;

    const {dayCircleStyle, dayCircleClassName} = this.dayCircleStyle(isWeekend, isSelected, isToday);
    const {dayTextStyle, dayTextClassName} = this.dayTextStyle(isWeekend, isSelected, isToday, isDisabled);
    const usingEventsClassName = usingEvents && hasEvent ? 'eventIndicatorFiller eventIndicator' : 'eventIndicatorFiller';
    return filler
      ?
      <Touchable>
        <View className="dayButtonFiller" style={customStyle.dayButtonFiller}>
          <Text className="day" style={customStyle.day} />
        </View>
      </Touchable>
      :
      <Touchable onPress={isDisabled ? null : this.props.onPress}>
        <View className="dayButton" style={customStyle.dayButton}>
          <View className={dayCircleClassName} style={dayCircleStyle}>
            <Text className={dayTextClassName} style={dayTextStyle}>{caption}</Text>
          </View>
          {usingEvents &&
            <View className={usingEventsClassName} style={[
              customStyle.eventIndicatorFiller,
              hasEvent && customStyle.eventIndicator]}
            />
          }
        </View>
      </Touchable>
    ;
  }
}
