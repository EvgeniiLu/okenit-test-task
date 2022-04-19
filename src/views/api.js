export const loadUsers = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json());

export const loadPosts = (id) =>
  fetch(`https://jsonplaceholder.typicode.com/posts?${id}`).then((r) =>
    r.json()
  );

export const loadComments = () =>
  fetch("https://jsonplaceholder.typicode.com/comments").then((r) => r.json());
