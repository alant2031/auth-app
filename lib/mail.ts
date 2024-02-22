import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Confirme seu email',
		html: `<p>Acesse <a href=${confirmLink}>aqui</a> para confirmar seu email.</p>`,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: '🔑 Redefinição de senha',
		html: `<p>Acesse <a href=${resetLink}>aqui</a> para redefinir sua senha.</p>`,
	});
};
