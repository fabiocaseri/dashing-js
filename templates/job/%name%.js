function myJob() {
  send_event('widget_id', { });
}

// Schedule every minute
setInterval(myJob, 1 * 60 * 1000);
// ... and execute immediately first
myJob();
