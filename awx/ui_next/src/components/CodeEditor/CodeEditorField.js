import React from 'react';
import {
  string,
  oneOfType,
  object,
  func,
  bool,
  node,
  oneOf,
  number,
} from 'prop-types';
import { useField } from 'formik';
import { FormGroup } from '@patternfly/react-core';
import CodeEditor from './CodeEditor';
import Popover from '../Popover';

function CodeEditorField({
  id,
  name,
  label,
  tooltip,
  helperText,
  validate,
  isRequired,
  mode,
  ...rest
}) {
  const [field, meta, helpers] = useField({ name, validate });
  const isValid = !(meta.touched && meta.error);

  return (
    <FormGroup
      id={`${id}-field`}
      fieldId={id}
      helperText={helperText}
      helperTextInvalid={meta.error}
      isRequired={isRequired}
      validated={isValid ? 'default' : 'error'}
      label={label}
      labelIcon={<Popover content={tooltip} />}
    >
      <CodeEditor
        id={id}
        {...rest}
        {...field}
        onChange={(value) => {
          helpers.setValue(value);
        }}
        mode={mode}
      />
    </FormGroup>
  );
}
CodeEditorField.propTypes = {
  helperText: string,
  id: string.isRequired,
  name: string.isRequired,
  label: oneOfType([object, string]).isRequired,
  validate: func,
  isRequired: bool,
  tooltip: node,
  mode: oneOf(['javascript', 'yaml', 'jinja2']).isRequired,
  rows: number,
};

CodeEditorField.defaultProps = {
  helperText: '',
  validate: () => {},
  isRequired: false,
  tooltip: null,
  rows: 5,
};

export default CodeEditorField;
