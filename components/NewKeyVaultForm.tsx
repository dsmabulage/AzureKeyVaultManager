'use client';

import { fetchKeyVaultValue } from '@/app/actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { KeyVault, keyVaultSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingButton from './loadingButton';
import { useToast } from './ui/use-toast';

export default function NewKeyVaultForm() {
  const { toast } = useToast();
  const [secret, setSecret] = useState<string | null>(null);

  const form = useForm<KeyVault>({
    resolver: zodResolver(keyVaultSchema),
    defaultValues: {
      azureTenantId: '',
      azureClientId: '',
      azureClientSecret: '',
      keyVaultUri: '',
      secretName: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: KeyVault) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const data = await fetchKeyVaultValue(formData);
      setSecret(data);
    } catch (error) {
      toast({
        title: 'Error fetching secret',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <main className='m-auto my-10 max-w-3xl space-y-10'>
      <Form {...form}>
        <form
          noValidate
          className='space-y-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='space-y-2'>
            <div className='flex justify-between gap-4'>
              <FormField
                control={control}
                name='azureTenantId'
                render={({ field }) => (
                  <FormItem className='grow'>
                    <FormLabel>Azure Tenant ID</FormLabel>
                    <FormControl>
                      <Input placeholder='Azure Tenant ID' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='azureClientId'
                render={({ field }) => (
                  <FormItem className='grow'>
                    <FormLabel>Azure Client ID</FormLabel>
                    <FormControl>
                      <Input placeholder='Azure Client ID' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={control}
            name='azureClientSecret'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='azureClientSecret'>
                  Azure Client Secret
                </FormLabel>
                <FormControl>
                  <Input placeholder='Azure Client Secret' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='space-y-2'>
            <div className='flex justify-between gap-4'>
              <FormField
                control={control}
                name='keyVaultUri'
                render={({ field }) => (
                  <FormItem className='grow'>
                    <FormLabel htmlFor='keyVaultUri'>
                      Azure KeyVault Url
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Azure KeyVault Url' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='secretName'
                render={({ field }) => (
                  <FormItem className='grow'>
                    <FormLabel htmlFor='keyVaultUri'>Secret Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Secret Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <LoadingButton type='submit' loading={isSubmitting}>
            Get Secret
          </LoadingButton>
        </form>
      </Form>
     
        {secret !== null && (
          <div className='bg-gray-100 p-4 rounded-md'>
            <div className='text-lg font-semibold'>Secret</div>
            <div className='text-gray-600'>{secret}</div>
          </div>
        )}
 
    </main>
  );
}
