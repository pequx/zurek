import React from 'react';
import './button.css';
import ReactDOM from 'react-dom';
import { Button as ButtonMui } from '@mui/material';

interface ButtonProps {
  primary?: boolean
  classes?: object
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  size?: 'small' | 'medium' | 'large'
  variant?: 'contained' | 'outlined' | 'text'
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interac tion
 */
export const Button = ({
  classes = {},
  color = 'inherit',
  size = 'medium',
  variant = 'contained',
  label,
  ...props
}: ButtonProps) => {
  return (
    <ButtonMui
      variant="contained"
      {...props}
    >
      {label}
    </ButtonMui>
  );
};
