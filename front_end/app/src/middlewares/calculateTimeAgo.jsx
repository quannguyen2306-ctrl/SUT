import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi";

TimeAgo.addDefaultLocale(vi);
const timeAgo = new TimeAgo("vi-VN");

export default function calculateTimeAgo(time) {
  return timeAgo.format(Date.parse(time), "twitter-now");
}