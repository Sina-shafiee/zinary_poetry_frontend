import * as React from 'react';

import { EyeClosedIcon, EyeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Input } from './input';

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibilty = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="relative h-9 w-full rounded-md">
      <Input
        {...props}
        className={className}
        type={showPassword ? 'text' : 'password'}
        ref={ref}
      />
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent absolute top-1/2 -translate-y-1/2 right-2 z-10"
        type="button"
        onClick={togglePasswordVisibilty}
      >
        {showPassword ? (
          <EyeClosedIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
