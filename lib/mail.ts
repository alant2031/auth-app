import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = domain + '/auth/new-verification?token=' + token;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Confirme seu email',
		html: `<p>Acesse <a href=${confirmLink}>aqui</a> para confirmar seu email.</p>`,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = domain + '/auth/new-password?token=' + token;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: '🔑 Redefinição de senha',
		html: `<p>Acesse <a href=${resetLink}>aqui</a> para redefinir sua senha.</p>`,
	});
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Verificação em duas etapas',
		html: `<p>Código 2FA: ${token}<p/>`,
	});
};
