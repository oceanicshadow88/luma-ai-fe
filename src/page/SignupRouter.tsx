import { useSearchParams } from 'react-router-dom';
import { decodeJwt } from '@utils/jwtUtils';
import TeacherSignUpPage from './teacherPage';
import LearnerSignUpPage from '@page/learnerSignupPage';
import { UserRole } from '@features/auth/types';

export default function SignupRouter() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    if (!token) return <div>Missing invitation token</div>;

    interface InvitationTokenPayload {
        role: UserRole;
    }

    let decoded: InvitationTokenPayload | null = null;

    try {
        decoded = decodeJwt(token) as InvitationTokenPayload | null;
    } catch {
        return <div>Invalid invitation token</div>;
    }

    const role = decoded?.role;

    if (role === UserRole.INSTRUCTOR) return <TeacherSignUpPage />;
    if (role === UserRole.LEARNER) return <LearnerSignUpPage />;

    return <div>Unsupported role in invitation: {role}</div>;
}