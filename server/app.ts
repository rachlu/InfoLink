import FriendConcept from "./concepts/friend";
import PostConcept from "./concepts/post";
import ReportConcept from "./concepts/report";
import TagConcept from "./concepts/tag";
import TimeoutConcept from "./concepts/timeout";
import UserConcept from "./concepts/user";
import WebSessionConcept from "./concepts/websession";

// App Definition using concepts
export const WebSession = new WebSessionConcept();
export const User = new UserConcept();
export const Post = new PostConcept();
export const Friend = new FriendConcept();
export const Timeout = new TimeoutConcept();
export const Report = new ReportConcept();
export const Tag = new TagConcept();
