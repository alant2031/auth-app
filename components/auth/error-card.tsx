import { CardWrapper } from '@/components/auth/card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel="Ops! Algo deu errado. Estamos consertando."
			backButtonHref="/auth/login"
			backButtonLabel="Voltar para login"
		>
			<div className="w-full flex justify-center items-center">
				<ExclamationTriangleIcon className="text-destructive" />
			</div>
		</CardWrapper>
	);
};
