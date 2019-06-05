import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';

const CustomInput = ({
  icon,
  isClearIconVisible,
  onClear,
  onClick,
  value,
  ...rest
}) => (
  <Form.Input
    {...rest}
    icon={
      <Icon
        link
        name={isClearIconVisible ? 'close' : icon}
        onClick={isClearIconVisible ? onClear : onClick}
      />
    }
    onClick={onClick}
    value={value}
    style={{ width: 117 }} // force minimal
  />
);

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
