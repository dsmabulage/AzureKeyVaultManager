'use client';

import { useFormStatus } from 'react-dom';
import LoadingButton from './loadingButton';

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { pending } = useFormStatus();

  return <LoadingButton {...props} type='submit' loading={pending} />;
}
