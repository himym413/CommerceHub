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

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
    const form = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    return (
        <Card {...props}>
            <CardHeader className="gap-0">
                <CardTitle className="text-2xl font-bold">
                    Create an account
                </CardTitle>
                <CardDescription className="text-sm font-medium text-storefront-muted">
                    Create an account to shop at{' '}
                    <span className="font-bold text-storefront-brand">
                        CommerceHub
                    </span>
                    .
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    method="POST"
                    action="/register"
                    onSubmit={(event) => {
                        event.preventDefault();
                        form.post('/register');
                    }}
                >
                    <FieldGroup className="gap-3">
                        <Field className="gap-1">
                            <FieldLabel htmlFor="first_name">
                                First Name
                            </FieldLabel>
                            <Input
                                id="first_name"
                                type="text"
                                placeholder="John"
                                value={form.data.first_name}
                                onChange={(e) =>
                                    form.setData('first_name', e.target.value)
                                }
                                required
                            />
                            {form.errors.first_name && (
                                <FieldError className="m-0 p-0">
                                    {form.errors.first_name}
                                </FieldError>
                            )}
                        </Field>

                        <Field className="gap-1">
                            <FieldLabel htmlFor="last_name">
                                Last Name
                            </FieldLabel>
                            <Input
                                id="last_name"
                                type="text"
                                placeholder="Doe"
                                value={form.data.last_name}
                                onChange={(e) =>
                                    form.setData('last_name', e.target.value)
                                }
                                required
                            />
                            {form.errors.last_name && (
                                <FieldError className="m-0 p-0">
                                    {form.errors.last_name}
                                </FieldError>
                            )}
                        </Field>

                        <Field className="gap-1">
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
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
                                <FieldError className="m-0 p-0">
                                    {form.errors.password}
                                </FieldError>
                            )}
                        </Field>

                        <Field className="gap-1">
                            <FieldLabel htmlFor="password_confirmation">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={form.data.password_confirmation}
                                onChange={(e) =>
                                    form.setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                required
                            />
                        </Field>

                        <FieldGroup>
                            <Field className="gap-4">
                                <Button
                                    type="submit"
                                    variant={'default'}
                                    className="cursor-pointer bg-storefront-brand py-5 hover:bg-storefront-brand hover:opacity-95"
                                    disabled={form.processing}
                                >
                                    Create account
                                </Button>
                                <FieldDescription className="flex items-center justify-center gap-1 text-center">
                                    <span>Already have an account?</span>
                                    <a
                                        href="/login"
                                        className="text-storefront-brand underline hover:scale-103"
                                    >
                                        Sign in
                                    </a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
