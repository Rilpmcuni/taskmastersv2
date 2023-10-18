const sendNotification = async (userId, message) => {
    const { data: userNotifications } = await supabase
        .from("user_notifications")
        .select("onesignal_player_id")
        .eq("user_id", userId);

    if (!userNotifications || userNotifications.length === 0) {
        return;
    }

    const playerIds = userNotifications.map((un) => un.onesignal_player_id);

    await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
        },
        body: JSON.stringify({
            app_id: process.env.ONESIGNAL_APP_ID,
            include_player_ids: playerIds,
            data: { foo: "bar" },
            contents: { en: message },
        }),
    });
};
