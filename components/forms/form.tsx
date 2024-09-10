'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSession, signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
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
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { IconButton } from '../custom-button';
import useAuthStore from '@/store/auth';
import { client } from '@/lib/graphql';
import { CREATE_COMMENT } from './data';
import { CommentFormType } from './type';

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
  website: z.string().url().nullable(),
});

export const LoginForm = () => {
  return (
    <div className="mt-6 flex flex-col items-center">
      <h6 className="font-semibold">Login </h6>
      <p className="mb-4 text-sm">Just log in and leave a quick note.</p>
      <div className="flex items-center gap-4 rounded-lg border-2 border-muted-foreground p-4">
        <IconButton onClick={() => signIn('github')} type="">
          <span className="icon-[bi--github] text-2xl"></span>
        </IconButton>
      </div>
    </div>
  );
};

export const CommentForm: React.FC<CommentFormType> = ({ showForm }) => {
  const { data: session } = useSession();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = useAuthStore.getState().jwt;
    setShowLoader(true);
    const data = {
      ...values,
      ...{ ...session?.user, avatar: session?.user?.image },
    };
    delete data.image;

    const { data: dataRespond, errors } = await client.mutate({
      mutation: CREATE_COMMENT,
      variables: { data },

      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });

    if (dataRespond?.createGuestbook) {
      form.reset();
      toast({
        title: 'Guestbook',
        description: 'Thank you!',
        variant: 'default',
      });
      showForm(false);
    }

    errors &&
      toast({
        title: 'Error',
        description: 'Une erreur est survenue',
        variant: 'destructive',
      });

    setShowLoader(false);
  }
  return (
    <Form {...form}>
      <div className="mb-6 flex flex-col items-center gap-y-2 text-center">
        <Avatar>
          <AvatarImage src={session?.user?.image ?? ''} />
          <AvatarFallback>
            {session?.user?.name ? session?.user?.name[0] : ''}
          </AvatarFallback>
        </Avatar>
        <h6>
          Hi <span className="font-semibold">{session?.user?.name}!</span>{' '}
        </h6>
        <p className="text-xs">
          Your name, your avatar and all infos you provide will be display with
          your comment
        </p>
      </div>
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
              <FormDescription className="text-xs">
                {'We will display your company name on your comment.'}
              </FormDescription>
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your website or company website</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: https:www.company.com"
                  onChange={field.onChange}
                />
              </FormControl>
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
        {showLoader ? 'Creating...' : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};
