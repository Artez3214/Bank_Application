import React from 'react';
import { Account } from './models/Account';

interface AccountDetailProps {
  account: Account
}

const AccountDetail: React.FC<AccountDetailProps> = ({ account }) => {
    return (
        <div>Address:{account.address}</div>
    );
}



export default AccountDetail;