import React from 'react';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import AppLayout from "../Layout";

interface AccountsProps {
  list: any[];
}

export default function Accounts({list}: AccountsProps) {
    return <AppLayout title="About page">
        <ul>
            {list.map((el, i) => <li key={i}>{el.name}</li>)}
        </ul>
    </AppLayout>;
}
