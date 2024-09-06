'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LinkIcon from '../icon-link/link-icon';

const formSchema = z.object({
  comment: z.string().min(10, {
    message: 'Comments must be at least 10 characters.',
  }),
  company: z
    .string()
    .min(2, {
      message: 'Company name must be at least 2 characters.',
    })
    .nullable(),
  role: z
    .string()
    .min(2, {
      message: 'Role name must be at least 2 characters.',
    })
    .nullable(),
});

export const LoginForm = () => {
  return (
    <div className="mt-6 flex flex-col items-center">
      <h6 className="font-semibold">Login </h6>
      <p className="mb-4 text-sm">Just log in and leave a quick note.</p>
      <div className="flex items-center gap-4 rounded-lg border-2 border-muted-foreground p-4">
        <LinkIcon
          href="http://localhost:1337/api/connect/github"
          iconClassName="icon-[bi--google] text-2xl"
        />
        <LinkIcon
          href="http://localhost:1337/api/connect/github"
          iconClassName="icon-[bi--linkedin] text-2xl"
        />
        <LinkIcon
          href="http://localhost:1337/api/connect/github"
          iconClassName="icon-[bi--github] text-2xl"
        />
      </div>
    </div>
  );
};

export const CommentForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    alert(values.role);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your company</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Kadea Academy"
                  onChange={field.onChange}
                />
              </FormControl>
              {/* <FormDescription className="text-xs">
                {
                  "We're so excited to bring you this new comment on this page after moderation!"
                }{' '}
                {':)'}
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your role</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Trainer" onChange={field.onChange} />
              </FormControl>
              {/* <FormDescription className="text-xs">
                {
                  "We're so excited to bring you this new comment on this page after moderation!"
                }{' '}
                {':)'}
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Leave your comment here" {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                {
                  "We're so excited to bring you this new comment on this page after moderation!"
                }{' '}
                {':)'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
