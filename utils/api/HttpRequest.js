import url from "url";
import a from "axios";
// import { getAccessHeader } from "./DataUser";

class HttpRequest {
  getPath(uri) {
    return url
      .parse(uri)
      .pathname.replace("-", "_")
      .split("/")[1]
      .toLowerCase();
  }

  getToken(url) {
    const path = this.getPath(url),
      {
        REACT_APP_SECRET_KEY,
      } = process.env,
      token = {
        parser: REACT_APP_SECRET_KEY,
      };
    return { headers: {} };
    // return {
    //   headers: {
    //     "Api-Key": token[path],
    //   },
    // };
  }

  mergeRecursive(obj1, obj2) {
    if (!obj1) return obj2;
    for (let p in obj2) {
      try {
        // Property in destination object set; update its value.
        if (obj2[p].constructor === Object) {
          obj1[p] = this.mergeRecursive(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch (e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
      }
    }
    return obj1;
  }

  async get(resourceHttpRequest) {
    // let accesstToken;
    // try {
      // accesstToken = await getAccessHeader();
    // } catch (e) {
    let accesstToken = { headers: {} };
    // }
    const { url, config } = resourceHttpRequest,
      token = this.getToken(url);
    // CreateLog.set(3, {urldata: url})
    return a.get(url, {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }

  async post(resourceHttpRequest) {
    // let accesstToken;
    // try {
    //   accesstToken = await getAccessHeader();
    // } catch (e) {
    let accesstToken = { headers: {} };
    // }
    const { url, config, data } = resourceHttpRequest,
      token = this.getToken(url);
    // if (url !== 'https://api.beacukai.go.id/amws/v1/user-log/add') {
    //   CreateLog.set(2, {urldata: url})
    // }
    return a.post(url, data, {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }

  async put(resourceHttpRequest) {
    // let accesstToken;
    // try {
    //   accesstToken = await getAccessHeader();
    // } catch (e) {
    let accesstToken = { headers: {} };
    // }
    const { url, config, data } = resourceHttpRequest,
      token = this.getToken(url);
    // CreateLog.set(4, {urldata: url})
    return a.put(url, data, {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }

  async delete(resourceHttpRequest) {
    // let accesstToken;
    // try {
    //   accesstToken = await getAccessHeader();
    // } catch (e) {
    let accesstToken = { headers: {} };
    // }
    const { url, config } = resourceHttpRequest,
      token = this.getToken(url);
    // CreateLog.set(5, {urldata: url})
    return a.delete(url, {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }
}

export default new HttpRequest();
