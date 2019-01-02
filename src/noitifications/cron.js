const { operations } = require('./operations');
const Process = require('./process');

async function fetch() {
    const now = new Date();
    return operations.list({ status: 'pending', processAt: { $lte: now.toISOString() } });
}

async function main() {
    const notifications = await fetch();
    const tasks = notifications.map((notification) => {
        if (notification.type === 'SMS') {
            return Process.sms(notification);
        } else if (notification.type === 'Email') {
            return Process.email(notification);
        }
        return null;
    });

    await Promise.all(tasks);
}

setInterval(main, 1 * 60 * 1000);
main();
