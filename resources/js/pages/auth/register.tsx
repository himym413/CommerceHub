import { RegisterForm } from '@/components/register-form';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
}
