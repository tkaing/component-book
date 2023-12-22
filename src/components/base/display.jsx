import { forwardRef } from 'react';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PreH1 = forwardRef(({ sx, ...props }, ref) => <h1 ref={ref} {...props} />);

const PreSpan = forwardRef(({ sx, ...props }, ref) => <span ref={ref} {...props} />);

const PreA = forwardRef(({ sx, ...props }, ref) => <a ref={ref} {...props} />);

const PreIcon = forwardRef(({ sx, ...props }, ref) => <FontAwesomeIcon ref={ref} {...props} />);

export const H1 = styled(PreH1)`
	${props => props.sx}
`;
export const Span = styled(PreSpan)`
	${props => props.sx}
`;
export const A = styled(PreA)`
	${props => props.sx}
`;
export const Icon = styled(PreIcon)`
	${props => props.sx}
`;
