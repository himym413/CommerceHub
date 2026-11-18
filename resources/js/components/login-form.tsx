import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';

export function LoginForm({ ...props }: React.ComponentProps<'div'>) {
    const form = useForm({ email: '', password: '' });

    return (
        <Card className="px-2" {...props}>
            <CardHeader className="gap-0">
                <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                <CardDescription className="text-sm font-medium text-storefront-muted">
                    Enter your email and password.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    method="POST"
                    action="/login"
                    onSubmit={(event) => {
                        event.preventDefault();
                        form.post('/login');
                    }}
                >
                    <FieldGroup>
                        <Field className="gap-1">
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.data.email}
                                onChange={(e) =>
                                    form.setData('email', e.target.value)
                                }
                                required
                            />
                            {form.errors.email && (
                                <FieldError className="m-0 p-0">
                                    {form.errors.email}
                                </FieldError>
                            )}
                        </Field>

                        <Field className="gap-1">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                value={form.data.password}
                                onChange={(e) =>
                                    form.setData('password', e.target.value)
                                }
                                required
                            />
                            {form.errors.password && (
                                <FieldError>{form.errors.password}</FieldError>
                            )}
                        </Field>

                        <Field className="gap-4">
                            <Button
                                type="submit"
                                variant={'default'}
                                className="cursor-pointer bg-storefront-brand py-5 hover:bg-storefront-brand hover:opacity-95"
                                disabled={form.processing}
                            >
                                Sign in
                            </Button>
                            <FieldDescription className="flex items-center justify-center gap-1 text-center">
                                <span>New to CommerceHub?</span>
                                <a
                                    href="/register"
                                    className="text-storefront-brand underline hover:scale-103"
                                >
                                    Create an account
                                </a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
