import React, { useEffect, useState } from 'react';
import useUserStore from '../stores/user-store';
import Unauthorization from './Unauthorization';

export default function ProtectRouter(props) {
    const { element, reqRole } = props;
    const token = useUserStore((state) => state.token);
    const getMe = useUserStore((state) => state.getMe);
    const [isAllow, setIsAllow] = useState(null);

    useEffect(() => {
        checkRole();
    }, []);

    const checkRole = async () => {
        try {
            if (token) {
                const result = await getMe();
                const role = result.user.role;
                if (reqRole.includes(role)) {
                    return setIsAllow(true);
                }
            }
            setIsAllow(false);
        } catch (err) {
            const errCode = err?.response?.status || err.status;
            if (errCode === 401) {
                setIsAllow(false);
            } else {
                const errMsg = err?.response?.data?.message || err.message;
                console.log(errMsg);
                setIsAllow(false);
            }
        }
    };

    if (isAllow === null) return <div>loading ...</div>;
    if (isAllow) return element;
    return <Unauthorization />;
}
