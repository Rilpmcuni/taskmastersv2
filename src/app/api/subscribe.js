navigator.serviceWorker.ready.then(function (registration) {
    registration.pushManager
        .subscribe({
            userVisibleOnly: true,
            applicationServerKey: ONESIGNAL_API_KEY,
        })
        .then(function (subscription) {
            // Send the subscription details to the server
            fetch("/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subscription),
            });
        })
        .catch(function (error) {
            console.error("Failed to subscribe the user: ", error);
        });
});
