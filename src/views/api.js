export const loadUsers = (data = false) => {
  let param = "";
  if (data) param = data;
  return fetch(`https://jsonplaceholder.typicode.com/users${param}`).then((r) =>
    r.json()
  );
};

export const loadPosts = (data = false) => {
  let param = "";
  if (data) param = data;
  return fetch(`https://jsonplaceholder.typicode.com/posts${param}`).then((r) =>
    r.json()
  );
};

export const loadComments = (postId) =>
  fetch(`https://jsonplaceholder.typicode.com/comments${postId}`).then((r) =>
    r.json()
  );

export const addComment = (data) =>
  fetch("https://jsonplaceholder.typicode.com/comments", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
