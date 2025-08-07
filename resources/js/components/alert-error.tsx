import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { ErrorBag, Errors } from '@inertiajs/core';
import { AlertCircleIcon } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

interface AlertErrorProps {
    errorText: string;
    errors: Errors & ErrorBag;
}

export default function AlertError({ errorText, errors }: AlertErrorProps) {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    if (Object.keys(errors).length === 0) {
        return null;
    }

    const renderMessages = (msgs: string | string[]): ReactNode => {
        if (typeof msgs === 'string') {
            return <li>{msgs}</li>;
        } else {
            return Object.values(msgs).map((msg, index) => {
                return <li key={index}>{msg}</li>;
            });
        }
    };

    return (
        <div
            className={`absolute left-1/2 z-[100] -translate-x-1/2 transition-opacity duration-1000 ease-out md:right-10 md:bottom-10 ${showAlert ? 'opacity-100' : 'pointer-events-none opacity-0'} `}
        >
            <Alert variant="destructive">
                <AlertCircleIcon className="mr-2" />
                <AlertTitle className="mb-2">{errorText}</AlertTitle>
                <AlertDescription>
                    {Object.entries(errors).map(([field, msgs]) => {
                        return (
                            <div key={field} className="mb-2">
                                <ul className="list-inside list-disc text-sm">{renderMessages(msgs)}</ul>
                            </div>
                        );
                    })}
                </AlertDescription>
            </Alert>
        </div>
    );
}
