export const loadUsers = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json());

export const loadPosts = (userId) =>
  fetch(`https://jsonplaceholder.typicode.com/posts?${userId}`).then((r) =>
    r.json()
  );

export const loadComments = (postId) =>
  fetch(`https://jsonplaceholder.typicode.com/comments?${postId}`).then((r) =>
    r.json()
  );
