import Vue from 'vue';

const notify = (notification) => {
  Vue.notify({
    duration: notification.duration || 5000,
    type: notification.type,
    title: notification.title,
  });
}

export {
  notify,
}
