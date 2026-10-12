"use client"

import StoreLayout from "@/components/store/StoreLayout";
export default function RootAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <StoreLayout>
                    {children}
                </StoreLayout>

            </body>
        </html>
    );
}
