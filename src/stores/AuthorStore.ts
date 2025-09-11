import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getAuthorsApiAsync } from "../api/Authors/GetAuthors";
import { addAuthorApiAsync } from "../api/Authors/AddAuthor";
import { deleteAuthorApiAsync } from "../api/Authors/DeleteAuthor";
import { userTokenIsSet, getUserToken } from "../localStorage/StorageAccess";

export interface Author {
  id: string;
  name: string;
}

export const useAuthorStore = defineStore("authorStore", () => {
  const authors = ref([] as Author[]);
  const getAuthors = computed(() => authors.value);
  async function loadAuthorsAsync() {
    const result = await getAuthorsApiAsync();
    if (result.ok) authors.value = result.authors;
  }

  async function addAuthorAsync(name: string) {
    if (userTokenIsSet()) {
      const token = getUserToken();
      const result = await addAuthorApiAsync(token, name);
      if (result.ok && result.author) {
        authors.value.push(result.author);
      }
    }
  }

  async function deleteAuthorAsync(id: string) {
    if (userTokenIsSet()) {
      const token = getUserToken();
      const ok = await deleteAuthorApiAsync(token, id);
      if (ok) {
        authors.value = authors.value.filter((author) => author.id !== id);
      }
    }
  }

  return {
    getAuthors,
    loadAuthorsAsync,
    addAuthorAsync,
    deleteAuthorAsync,
  };
});
