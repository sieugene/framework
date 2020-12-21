import { storage } from "./../core/Utils";

const toHTML = (page) => {
  const model = storage(page);
  return `<li class="db__record">
    <a href="/#excel/${link(page)}">${model.title}</a>
    <strong>12.12.2020</strong>
  </li>`;
};

const link = (page) => {
  return page.replace("excel", "");
};

const getAllKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes("excel")) {
      continue;
    }
    keys.push(key);
  }
  return keys;
};

export const createRecordsTable = () => {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  } else {
    return `
    <div class="db__list-header">
    <span>Название</span>
    <span>Дата открытия</span>
  </div>
  <ul class="db__list">
    ${keys.map(toHTML).join("")}
  </ul>
  `;
  }
};
