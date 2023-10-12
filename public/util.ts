type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type InputTag = "input" | "textarea";
type Field = InputTag | { [key: string]: Field };
type Fields = Record<string, Field>;

type operation = {
  name: string;
  endpoint: string;
  method: HttpMethod;
  fields: Fields;
};

const operations: operation[] = [
  {
    name: "Get Session User (logged in user)",
    endpoint: "/api/session",
    method: "GET",
    fields: {},
  },
  {
    name: "Get Tag Like Count",
    endpoint: "/api/count",
    method: "GET",
    fields: {},
  },
  {
    name: "Total Reports",
    endpoint: "/api/count/report",
    method: "GET",
    fields: {},
  },
  {
    name: "Get Verified Tags",
    endpoint: "/api/verify",
    method: "GET",
    fields: {},
  },
  {
    name: "Create User",
    endpoint: "/api/users",
    method: "POST",
    fields: { username: "input", password: "input" },
  },
  {
    name: "Login",
    endpoint: "/api/login",
    method: "POST",
    fields: { username: "input", password: "input" },
  },
  {
    name: "Logout",
    endpoint: "/api/logout",
    method: "POST",
    fields: {},
  },
  {
    name: "Update User",
    endpoint: "/api/users",
    method: "PATCH",
    fields: { update: { username: "input", password: "input" } },
  },
  {
    name: "Delete User",
    endpoint: "/api/users",
    method: "DELETE",
    fields: {},
  },
  {
    name: "Get Users (empty for all)",
    endpoint: "/api/users/:username",
    method: "GET",
    fields: { username: "input" },
  },
  {
    name: "Get Posts (empty for all)",
    endpoint: "/api/posts",
    method: "GET",
    fields: { author: "input" },
  },
  {
    name: "Create Post",
    endpoint: "/api/posts",
    method: "POST",
    fields: { content: "input" },
  },
  {
    name: "Update Post",
    endpoint: "/api/posts/:id",
    method: "PATCH",
    fields: { id: "input", update: { content: "input", options: { backgroundColor: "input" } } },
  },
  {
    name: "Delete Post",
    endpoint: "/api/posts/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Like Post",
    endpoint: "/api/like/post/:id",
    method: "POST",
    fields: { id: "input" },
  },
  {
    name: "Unlike Post",
    endpoint: "/api/unlike/post/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Add Tag to Post (Only Allowed if Post has No Comments/Edits)",
    endpoint: "/api/tags/:tag/:id",
    method: "POST",
    fields: { tag: "input", id: "input" },
  },
  {
    name: "Delete Tag from Post",
    endpoint: "/api/tags/:tag/:id",
    method: "DELETE",
    fields: { tag: "input", id: "input" },
  },
  {
    name: "Get Tags from Post",
    endpoint: "/api/tags/:id",
    method: "GET",
    fields: { id: "input" },
  },
  {
    name: "Get All Edits from Community Post",
    endpoint: "/api/edits/:id",
    method: "GET",
    fields: { id: "input" },
  },
  {
    name: "Add Edit to Community Post",
    endpoint: "/api/edits",
    method: "POST",
    fields: { postID: "input", content: "input" },
  },
  {
    name: "Update Edit",
    endpoint: "/api/edits/:id",
    method: "PATCH",
    fields: { id: "input", update: { content: "input" } },
  },
  {
    name: "Delete Edit",
    endpoint: "/api/edits/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Like Edit",
    endpoint: "/api/like/edit/:id",
    method: "POST",
    fields: { id: "input" },
  },
  {
    name: "Unlike Edit",
    endpoint: "/api/unlike/edit/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Create Comment",
    endpoint: "/api/comments/:id",
    method: "POST",
    fields: { id: "input", content: "input" },
  },
  {
    name: "Update Comment",
    endpoint: "/api/comments/:id",
    method: "PATCH",
    fields: { id: "input", update: { content: "input" } },
  },
  {
    name: "Delete Comment",
    endpoint: "/api/comments/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Like Comment",
    endpoint: "/api/like/comment/:id",
    method: "POST",
    fields: { id: "input" },
  },
  {
    name: "Unlike Comment",
    endpoint: "/api/unlike/comment/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Get Comments from Post",
    endpoint: "/api/comments/:id",
    method: "GET",
    fields: { id: "input" },
  },
  {
    name: "Report Post",
    endpoint: "/api/report/post/:id",
    method: "POST",
    fields: { id: "input" },
  },
  {
    name: "Delete Report Post",
    endpoint: "/api/report/post/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Report Comment",
    endpoint: "/api/report/comment/:id",
    method: "POST",
    fields: { id: "input" },
  },
  {
    name: "Delete Report Comment",
    endpoint: "/api/report/comment/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Report Edit",
    endpoint: "/api/report/edit/:id",
    method: "POST",
    fields: { id: "input" },
  },
  {
    name: "Delete Report Edit",
    endpoint: "/api/report/edit/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Get Blocked Posts with Tag",
    endpoint: "/api/blocked/posts/:tag",
    method: "GET",
    fields: { tag: "input" },
  },
  {
    name: "Approve Blocked Post",
    endpoint: "/api/post/approve/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Reject Blocked Post",
    endpoint: "/api/post/reject/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Get Blocked Comments with Tag",
    endpoint: "/api/blocked/comments/:tag",
    method: "GET",
    fields: { tag: "input" },
  },
  {
    name: "Approve Blocked Comment",
    endpoint: "/api/comment/approve/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Reject Blocked Comment",
    endpoint: "/api/comment/reject/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Get Blocked Edits with Tag",
    endpoint: "/api/blocked/edits/:tag",
    method: "GET",
    fields: { tag: "input" },
  },
  {
    name: "Approve Blocked Edit",
    endpoint: "/api/edit/approve/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
  {
    name: "Reject Blocked Edit",
    endpoint: "/api/edit/reject/:id",
    method: "DELETE",
    fields: { id: "input" },
  },
];

// Do not edit below here.
// If you are interested in how this works, feel free to ask on forum!

function updateResponse(code: string, response: string) {
  document.querySelector("#status-code")!.innerHTML = code;
  document.querySelector("#response-text")!.innerHTML = response;
}

async function request(method: HttpMethod, endpoint: string, params?: unknown) {
  try {
    if (method === "GET" && params) {
      endpoint += "?" + new URLSearchParams(params as Record<string, string>).toString();
      params = undefined;
    }

    const res = fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: params ? JSON.stringify(params) : undefined,
    });

    return {
      $statusCode: (await res).status,
      $response: await (await res).json(),
    };
  } catch (e) {
    console.log(e);
    return {
      $statusCode: "???",
      $response: { error: "Something went wrong, check your console log.", details: e },
    };
  }
}

function fieldsToHtml(fields: Record<string, Field>, indent = 0, prefix = ""): string {
  return Object.entries(fields)
    .map(([name, tag]) => {
      return `
        <div class="field" style="margin-left: ${indent}px">
          <label>${name}:
          ${typeof tag === "string" ? `<${tag} name="${prefix}${name}"></${tag}>` : fieldsToHtml(tag, indent + 10, prefix + name + ".")}
          </label>
        </div>`;
    })
    .join("");
}

function getHtmlOperations() {
  return operations.map((operation) => {
    return `<li class="operation">
      <h3>${operation.name}</h3>
      <form class="operation-form">
        <input type="hidden" name="$endpoint" value="${operation.endpoint}" />
        <input type="hidden" name="$method" value="${operation.method}" />
        ${fieldsToHtml(operation.fields)}
        <button type="submit">Submit</button>
      </form>
    </li>`;
  });
}

function prefixedRecordIntoObject(record: Record<string, string>) {
  const obj: any = {}; // eslint-disable-line
  for (const [key, value] of Object.entries(record)) {
    if (!value) {
      continue;
    }
    const keys = key.split(".");
    const lastKey = keys.pop()!;
    let currentObj = obj;
    for (const key of keys) {
      if (!currentObj[key]) {
        currentObj[key] = {};
      }
      currentObj = currentObj[key];
    }
    currentObj[lastKey] = value;
  }
  return obj;
}

async function submitEventHandler(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const { $method, $endpoint, ...reqData } = Object.fromEntries(new FormData(form));

  // Replace :param with the actual value.
  const endpoint = ($endpoint as string).replace(/:(\w+)/g, (_, key) => {
    const param = reqData[key] as string;
    delete reqData[key];
    return param;
  });

  const data = prefixedRecordIntoObject(reqData as Record<string, string>);

  updateResponse("", "Loading...");
  const response = await request($method as HttpMethod, endpoint as string, Object.keys(data).length > 0 ? data : undefined);
  updateResponse(response.$statusCode.toString(), JSON.stringify(response.$response, null, 2));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#operations-list")!.innerHTML = getHtmlOperations().join("");
  document.querySelectorAll(".operation-form").forEach((form) => form.addEventListener("submit", submitEventHandler));
});
