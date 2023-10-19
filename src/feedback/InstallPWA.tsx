// components/InstallPWA.tsx
import React, { useState, useEffect } from "react";

const InstallPWA: React.FC = () => {
    const [installPromptEvent, setInstallPromptEvent] = useState<any | null>(
        null
    );

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: any) => {
            // Prevenir el comportamiento predeterminado del evento
            event.preventDefault();

            // Guardar el evento para usarlo más tarde
            setInstallPromptEvent(event);
        };

        // Escuchar el evento beforeinstallprompt
        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        return () => {
            // Eliminar el listener cuando el componente se desmonte
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const handleInstallClick = () => {
        if (installPromptEvent) {
            // Mostrar la ventana de instalación
            installPromptEvent.prompt();

            // Esperar a que el usuario responda
            installPromptEvent.userChoice.then(
                (choiceResult: { outcome: any }) => {
                    // Registrar la elección del usuario (puede ser 'accepted' o 'dismissed')
                    console.log("Elección del usuario:", choiceResult.outcome);
                }
            );
        }
    };

    return (
        <div>
            <>
                {installPromptEvent ? (
                    <button
                        onClick={handleInstallClick}
                        disabled={!installPromptEvent}
                    >
                        Instalar la App
                    </button>
                ) : (
                    <span>
                        ¡aplicación instalada! te recomendamos que uses nuestra
                        aplicación ya instalada en tu sistema.
                    </span>
                )}
            </>
        </div>
    );
};

export default InstallPWA;
