import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';

// eslint-disable-next-line
class CustomInput extends React.PureComponent {
  render() {
    const {
      innerRef,
      icon,
      isClearIconVisible,
      onClear,
      onClick,
      value,
      ...rest
    } = this.props;

    return (
      <Form.Input {...rest} icon onClick={onClick}>
        <Icon
          link
          name={isClearIconVisible ? 'close' : icon}
          onClick={isClearIconVisible ? onClear : onClick}
        />
        <input ref={innerRef} value={value} />
      </Form.Input>
    );
  }
}

CustomInput.propTypes = {
  icon: PropTypes.string,
  isClearIconVisible: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

CustomInput.defaultProps = {
  icon: 'calendar',
};

export default CustomInput;
