import ContactTable from './ContactTable';
import ContactCards from './ContactCards';
import useWindowSize from '@/hooks/useWindowSize';
import { pxToNumber } from '@/helpers/helper.styles';
import { Breakpoints } from '@/styles/settings/mixins.constants';

export default function ContactList() {
    const { width } = useWindowSize();

    const isLargeScreen = width > pxToNumber(Breakpoints.lg);

    return (
        <>
            {isLargeScreen && <ContactTable />}
            {!isLargeScreen && <ContactCards />}
        </>
    );
}
