'use client';

import { useEffect, useState } from 'react';
import IncompleteProfilePopup from './IncompleteProfilePopup'; // كمبوننت المودال بتاعك
import { useSelector } from 'react-redux';

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {

    const [showModal, setShowModal] = useState(false);
    const userData = useSelector((state: any) => state.displayUser);

    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        // if (Object.keys(userData).length && !userData?.phone_number) {
        if (Object.keys(userData).length && !userData?.is_phone_verified) {
            timer = setInterval(() => {
                setShowModal(true);
            }, 30000);
        }
        return () => clearInterval(timer);
    }, [userData])

    return (
        <>
            {showModal && <IncompleteProfilePopup onClose={handleClose} />}
            {children}
        </>
    );
}
