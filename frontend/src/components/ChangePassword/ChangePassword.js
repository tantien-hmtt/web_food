import React from 'react';
import { useForm } from 'react-hook-form';
import Title from '../Title/Title';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useAuth } from '../../hooks/useAuth';

export default function ChangePassword() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const { changePassword } = useAuth();
  const submit = passwords => {
    changePassword(passwords);
  };

  return (
    <div>
      <Title title="Đổi mật khẩu" />
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="password"
          label="Mật khẩu hiện tại"
          {...register('currentPassword', {
            required: true,
          })}
          error={errors.currentPassword}
        />

        <Input
          type="password"
          label="Mật khẩu mới"
          {...register('newPassword', {
            required: true,
            minLength: 5,
          })}
          error={errors.newPassword}
        />

        <Input
          type="password"
          label="Xác nhận"
          {...register('confirmNewPassword', {
            required: true,
            validate: value =>
              value != getValues('newPassword')
                ? 'Passwords Do No Match'
                : true,
          })}
          error={errors.confirmNewPassword}
        />

        <Button type="submit" text="Xác nhận" />
      </form>
    </div>
  );
}
