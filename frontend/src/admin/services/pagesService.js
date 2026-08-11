import { makeResourceService } from "./resourceService";
export default makeResourceService("/pages/", { lookupField: "slug" });
