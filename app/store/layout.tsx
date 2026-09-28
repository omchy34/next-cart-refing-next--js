import StoreLayout from "@/components/store/StoreLayout";
export default function RootAdminLayout({ children }: LayoutProps<"/">) {
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
