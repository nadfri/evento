import React from 'react'
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();

    return (
        <div>
            <h1>
            {router.query.event}

            </h1>
        </div>
    )
}
