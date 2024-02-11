import { CardWrapper } from './card-wrapper';

export const LoginForm = () => {
	return (
		<CardWrapper
			headerLabel="Seja bem-vindo de volta"
			backButtonLabel="Não possui uma conta?"
			backButtonHref="/auth/register"
			showSocial
		>
			Login Form!
		</CardWrapper>
	);
};
