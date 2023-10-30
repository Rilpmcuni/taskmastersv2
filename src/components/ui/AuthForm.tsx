"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ThemeMinimal, darkThemes } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { esES } from "@mui/material/locale";
import * as esES from "@/../public/locales/es/common.json";
import { Microsoft } from "@mui/icons-material";

export default function AuthForm() {
    const supabase = createClientComponentClient();

    return (
        <>
            <Auth
                view="sign_in"
                localization={{
                    variables: esES,
                }}
                supabaseClient={supabase}
                appearance={{
                    theme: ThemeSupa,
                    style: {
                        button: {
                            borderRadius: "0.5rem",
                            borderColor: "rgba(0,0,0,0)",
                        },
                        anchor: {
                            borderRadius: "0.5rem",
                        },
                        container: {
                            borderRadius: "0.5rem",
                        },
                        divider: {
                            borderRadius: "0.5rem",
                        },
                        input: {
                            borderRadius: "0.5rem",
                        },
                        label: {
                            borderRadius: "0.5rem",
                        },
                        loader: {
                            borderRadius: "0.5rem",
                        },
                        message: {
                            borderRadius: "0.5rem",
                            color: "white",
                        },
                    },
                    variables: {
                        default: {
                            colors: {
                                brand: "#1681ff",
                                brandAccent: "#449aff",
                            },
                        },
                    },
                }}
                theme="light"
                providers={[]}
                socialLayout="horizontal"
                showLinks={false}
                redirectTo="https://localhost:3000/Auth/Callback"
            />
            {/* <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/Auth/Callback"
    /> */}
        </>
    );
}
