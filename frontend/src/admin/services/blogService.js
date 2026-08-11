import { makeResourceService } from "./resourceService";
export default makeResourceService("/blog/", { lookupField: "slug" });
