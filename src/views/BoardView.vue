<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="board__item">
      <div class="button__add">
        <span class="material-symbols-outlined">
          add_circle
        </span>
      </div>
      <ListComponent v-for="list in lists" :key="list.id" :title="list.title" :cards="list.cards" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ListComponent from '../components/List.vue';

export default Vue.extend({
  name: 'BoardView',
  components: {
    ListComponent,
  },
  data() {
    return {
      title: 'Моя тестовая доска',
      lists: [
        {
          id: 1,
          title: 'Запланировано',
          cards: [
            { id: 1, title: 'Закончить курс по программированию' },
            { id: 2, title: 'Записаться в спортзал' },
            { id: 3, title: 'Составить список покупок' },
          ],
        },
        {
          id: 2,
          title: 'В процессе',
          cards: [
            { id: 4, title: 'Подготовить отчёт по работе' },
            { id: 5, title: 'Посмотреть вебинар по продуктивности' },
          ],
        },
        {
          id: 3,
          title: 'Приоритетные задачи',
          cards: [
            { id: 6, title: 'Решить задачи по математике' },
            { id: 7, title: 'Выучить новые слова на английском' },
            { id: 8, title: 'Сходить к врачу' },
            { id: 9, title: 'Прочитать статью о финансовой грамотности' },
          ],
        },
        {
          id: 4,
          title: 'На проверке',
          cards: [
            { id: 10, title: 'Сдать проект в работу' },
            { id: 11, title: 'Исправить замечания по макету' },
            { id: 12, title: 'Проверить корректность данных' },
          ],
        },
        {
          id: 5,
          title: 'Завершено',
          cards: [
            { id: 13, title: 'Встретиться с другом' },
            { id: 14, title: 'Отправить документы' },
            { id: 15, title: 'Уборка в квартире' },
            { id: 16, title: 'Пробежать 5 км' },
            { id: 17, title: 'Прочитать книгу' },
          ],
        },
        {
          id: 6,
          title: 'Идеи',
          cards: [
            { id: 18, title: 'Начать вести блог' },
            { id: 19, title: 'Сделать фотоальбом' },
          ],
        },
        {
          id: 7,
          title: 'Долгосрочные цели',
          cards: [
            { id: 20, title: 'Купить машину' },
            { id: 21, title: 'Подготовиться к экзамену' },
            { id: 22, title: 'Открыть свой бизнес' },
            { id: 23, title: 'Посетить 5 новых стран' },
          ],
        },
        {
          id: 8,
          title: 'Личное',
          cards: [
            { id: 24, title: 'Позвонить родителям' },
            { id: 25, title: 'Записаться к стоматологу' },
            { id: 26, title: 'Организовать пикник' },
          ],
        },
        {
          id: 9,
          title: 'Работа',
          cards: [
            { id: 27, title: 'Провести собрание команды' },
            { id: 28, title: 'Написать документацию' },
            { id: 29, title: 'Настроить новый проект' },
            { id: 30, title: 'Проверить почту' },
          ],
        },
        {
          id: 10,
          title: 'Архив',
          cards: [
            { id: 31, title: 'Закончить ремонт' },
            { id: 32, title: 'Сделать резервное копирование' },
            { id: 33, title: 'Перевезти вещи на дачу' },
            { id: 34, title: 'Провести инвентаризацию' },
            { id: 35, title: 'Обновить резюме' },
            { id: 36, title: 'Удалить ненужные файлы' },
          ],
        },
      ],
    };
  },
});
</script>

<style>
.board__item {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.button__add {
  width: 100%;
  display: flex;
  text-align: center;
  background-color: lightgreen;
  padding: 16px;
  border: 1px solid crimson;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  text-transform: uppercase;
  justify-content: center;
  gap: 10px;
}
</style>
